import Link from "next/link";
import Image from "next/image";
import type { Album } from "@/types/album";
import { getPhotosByAlbumId } from "@/lib/db";
import { AlbumActions } from "./AlbumActions";

export async function AlbumCard({ album }: { album: Album }) {
  const photos = await getPhotosByAlbumId(album.id);
  const cover = album.coverPhotoId
    ? photos.find((p) => p.id === album.coverPhotoId) ?? photos[0]
    : photos[0];
  const count = photos.length;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <Link href={`/albums/${album.id}`} className="block aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {cover ? (
          <Image
            src={cover.url}
            alt={album.name}
            width={400}
            height={300}
            className="h-full w-full object-cover transition group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-400 dark:text-zinc-500">
            <span className="text-4xl">📷</span>
          </div>
        )}
      </Link>
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="min-w-0 flex-1">
          <Link
            href={`/albums/${album.id}`}
            className="block truncate font-medium text-zinc-900 hover:underline dark:text-zinc-100"
          >
            {album.name}
          </Link>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {count} 张照片
          </p>
        </div>
        <AlbumActions album={album} />
      </div>
    </div>
  );
}
