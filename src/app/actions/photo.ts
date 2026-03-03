"use server";

import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import {
  addPhoto,
  deletePhoto as dbDeletePhoto,
  getPhotoById,
  getAlbumById,
} from "@/lib/db";
import type { Photo } from "@/types/album";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

function safeFilename(original: string): string {
  const ext = path.extname(original) || ".jpg";
  const base = `img_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  return base + ext.toLowerCase();
}

export async function uploadPhotos(
  albumId: string,
  formData: FormData
): Promise<
  | { success: true; photos: Photo[] }
  | { success: false; error: string }
> {
  const album = await getAlbumById(albumId);
  if (!album) return { success: false, error: "相册不存在" };

  const files = formData.getAll("files") as File[];
  if (!files?.length) return { success: false, error: "请选择至少一张图片" };

  await mkdir(UPLOAD_DIR, { recursive: true });
  const created: Photo[] = [];
  const now = new Date().toISOString();

  for (const file of files) {
    if (!(file instanceof File) || !file.size) continue;
    if (!ALLOWED_TYPES.includes(file.type))
      return { success: false, error: `不支持的文件类型: ${file.type}` };
    if (file.size > MAX_SIZE)
      return { success: false, error: "单张图片不能超过 10MB" };

    const filename = safeFilename(file.name);
    const filepath = path.join(UPLOAD_DIR, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    const url = `/uploads/${filename}`;
    const photo: Photo = {
      id: `photo_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      albumId,
      filename,
      originalName: file.name,
      url,
      size: file.size,
      createdAt: now,
    };
    await addPhoto(photo);
    created.push(photo);
  }

  revalidatePath("/");
  revalidatePath("/albums");
  revalidatePath(`/albums/${albumId}`);
  return { success: true, photos: created };
}

export async function deletePhotoAction(
  photoId: string
): Promise<{ success: boolean; error?: string }> {
  const photo = await getPhotoById(photoId);
  if (!photo) return { success: false, error: "图片不存在" };
  const filepath = path.join(process.cwd(), "public", photo.url);
  try {
    await unlink(filepath);
  } catch {
    // 文件可能已被删，继续删元数据
  }
  const ok = await dbDeletePhoto(photoId);
  if (!ok) return { success: false, error: "删除失败" };
  revalidatePath("/");
  revalidatePath("/albums");
  revalidatePath(`/albums/${photo.albumId}`);
  return { success: true };
}

export async function setAsCover(
  albumId: string,
  photoId: string
): Promise<{ success: boolean; error?: string }> {
  const [album, photo] = await Promise.all([
    getAlbumById(albumId),
    getPhotoById(photoId),
  ]);
  if (!album) return { success: false, error: "相册不存在" };
  if (!photo || photo.albumId !== albumId)
    return { success: false, error: "图片不属于该相册" };
  const { setAlbumCover } = await import("./album");
  return setAlbumCover(albumId, photoId);
}
