import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { Album, Photo } from "@/types/album";

const DATA_DIR = path.join(process.cwd(), "data");
const ALBUMS_FILE = path.join(DATA_DIR, "albums.json");
const PHOTOS_FILE = path.join(DATA_DIR, "photos.json");

export interface DbData {
  albums: Album[];
  photos: Photo[];
}

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

async function readDb(): Promise<DbData> {
  await ensureDataDir();
  try {
    const [albumsBuf, photosBuf] = await Promise.all([
      readFile(ALBUMS_FILE, "utf-8").catch(() => "[]"),
      readFile(PHOTOS_FILE, "utf-8").catch(() => "[]"),
    ]);
    return {
      albums: JSON.parse(albumsBuf) as Album[],
      photos: JSON.parse(photosBuf) as Photo[],
    };
  } catch {
    return { albums: [], photos: [] };
  }
}

async function writeDb(data: DbData) {
  await ensureDataDir();
  await Promise.all([
    writeFile(ALBUMS_FILE, JSON.stringify(data.albums, null, 2), "utf-8"),
    writeFile(PHOTOS_FILE, JSON.stringify(data.photos, null, 2), "utf-8"),
  ]);
}

export async function getAllAlbums(): Promise<Album[]> {
  const { albums } = await readDb();
  return albums.sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export async function getAlbumById(id: string): Promise<Album | null> {
  const { albums } = await readDb();
  return albums.find((a) => a.id === id) ?? null;
}

export async function getPhotosByAlbumId(albumId: string): Promise<Photo[]> {
  const { photos } = await readDb();
  return photos
    .filter((p) => p.albumId === albumId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export async function getAlbumWithPhotos(
  albumId: string
): Promise<{ album: Album; photos: Photo[] } | null> {
  const album = await getAlbumById(albumId);
  if (!album) return null;
  const photos = await getPhotosByAlbumId(albumId);
  return { album, photos };
}

export async function createAlbum(input: {
  name: string;
  description?: string;
}): Promise<Album> {
  const data = await readDb();
  const now = new Date().toISOString();
  const id = `album_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const album: Album = {
    id,
    name: input.name.trim(),
    description: input.description?.trim() || undefined,
    coverPhotoId: null,
    createdAt: now,
    updatedAt: now,
  };
  data.albums.push(album);
  await writeDb(data);
  return album;
}

export async function updateAlbum(
  id: string,
  input: { name?: string; description?: string; coverPhotoId?: string | null }
): Promise<Album | null> {
  const data = await readDb();
  const index = data.albums.findIndex((a) => a.id === id);
  if (index === -1) return null;
  const now = new Date().toISOString();
  data.albums[index] = {
    ...data.albums[index],
    ...(input.name !== undefined && { name: input.name.trim() }),
    ...(input.description !== undefined && {
      description: input.description?.trim() || undefined,
    }),
    ...(input.coverPhotoId !== undefined && {
      coverPhotoId: input.coverPhotoId,
    }),
    updatedAt: now,
  };
  await writeDb(data);
  return data.albums[index];
}

export async function deleteAlbum(id: string): Promise<boolean> {
  const data = await readDb();
  const before = data.albums.length;
  data.albums = data.albums.filter((a) => a.id !== id);
  data.photos = data.photos.filter((p) => p.albumId !== id);
  if (data.albums.length === before) return false;
  await writeDb(data);
  return true;
}

export async function addPhoto(photo: Photo): Promise<Photo> {
  const data = await readDb();
  data.photos.push(photo);
  await writeDb(data);
  return photo;
}

export async function getPhotoById(id: string): Promise<Photo | null> {
  const { photos } = await readDb();
  return photos.find((p) => p.id === id) ?? null;
}

export async function deletePhoto(id: string): Promise<boolean> {
  const data = await readDb();
  const photo = data.photos.find((p) => p.id === id);
  if (!photo) return false;
  data.photos = data.photos.filter((p) => p.id !== id);
  const album = data.albums.find((a) => a.coverPhotoId === id);
  if (album) {
    album.coverPhotoId = null;
    album.updatedAt = new Date().toISOString();
  }
  await writeDb(data);
  return true;
}

export async function movePhotoToAlbum(
  photoId: string,
  targetAlbumId: string
): Promise<boolean> {
  const data = await readDb();
  const photo = data.photos.find((p) => p.id === photoId);
  const targetExists = data.albums.some((a) => a.id === targetAlbumId);
  if (!photo || !targetExists) return false;
  photo.albumId = targetAlbumId;
  await writeDb(data);
  return true;
}
