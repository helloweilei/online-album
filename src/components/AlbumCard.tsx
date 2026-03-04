import Link from "next/link";
import Image from "next/image";
import type { Album } from "@/types/album";
import { getPhotosByAlbumId } from "@/lib/db";
import { AlbumActions } from "./AlbumActions";
import { IconCamera } from "./icons";

export async function AlbumCard({ album }: { album: Album }) {
  const photos = await getPhotosByAlbumId(album.id);
  const cover = album.coverPhotoId
    ? photos.find((p) => p.id === album.coverPhotoId) ?? photos[0]
    : photos[0];
  const count = photos.length;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <Link
        href={`/albums/${album.id}`}
        className="block aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-zinc-800"
      >
        {cover ? (
          <Image
            src={cover.url}
            alt={album.name}
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400 dark:text-zinc-500">
            <IconCamera className="h-16 w-16" />
          </div>
        )}
      </Link>
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="min-w-0 flex-1">
          <Link
            href={`/albums/${album.id}`}
            className="block truncate font-medium text-slate-900 transition-colors duration-200 hover:text-slate-700 dark:text-zinc-100 dark:hover:text-zinc-300"
          >
            {album.name}
          </Link>
          <p className="text-sm text-slate-500 dark:text-zinc-500">
            {count} 张照片
          </p>
        </div>
        <AlbumActions album={album} />
      </div>
    </div>
  );
}
