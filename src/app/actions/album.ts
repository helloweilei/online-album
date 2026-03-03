"use server";

import { revalidatePath } from "next/cache";
import {
  createAlbum as dbCreateAlbum,
  updateAlbum as dbUpdateAlbum,
  deleteAlbum as dbDeleteAlbum,
  getAlbumById,
  getAllAlbums,
} from "@/lib/db";
import type { Album } from "@/types/album";

export async function createAlbum(formData: FormData): Promise<
  | { success: true; album: Album }
  | { success: false; error: string }
> {
  const name = (formData.get("name") as string)?.trim();
  if (!name) return { success: false, error: "相册名称不能为空" };
  const description = (formData.get("description") as string)?.trim();
  const album = await dbCreateAlbum({ name, description });
  revalidatePath("/");
  revalidatePath("/albums");
  return { success: true, album };
}

export async function updateAlbumAction(
  id: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const existing = await getAlbumById(id);
  if (!existing) return { success: false, error: "相册不存在" };
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  await dbUpdateAlbum(id, { name: name || existing.name, description });
  revalidatePath("/");
  revalidatePath("/albums");
  revalidatePath(`/albums/${id}`);
  return { success: true };
}

export async function deleteAlbumAction(id: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const ok = await dbDeleteAlbum(id);
  if (!ok) return { success: false, error: "相册不存在或删除失败" };
  revalidatePath("/");
  revalidatePath("/albums");
  return { success: true };
}

export async function setAlbumCover(
  albumId: string,
  photoId: string | null
): Promise<{ success: boolean; error?: string }> {
  const album = await getAlbumById(albumId);
  if (!album) return { success: false, error: "相册不存在" };
  await dbUpdateAlbum(albumId, { coverPhotoId: photoId });
  revalidatePath("/");
  revalidatePath("/albums");
  revalidatePath(`/albums/${albumId}`);
  return { success: true };
}

export async function getAlbumsList(): Promise<Album[]> {
  return getAllAlbums();
}
