import Link from "next/link";
import { notFound } from "next/navigation";
import { getAlbumWithPhotos } from "@/lib/db";
import { PhotoUpload } from "@/components/PhotoUpload";
import { PhotoGrid } from "@/components/PhotoGrid";
import { UserNav } from "@/components/UserNav";

export default async function AlbumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getAlbumWithPhotos(id);
  if (!data) notFound();
  const { album, photos } = data;

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-black">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-black/95">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link
            href="/"
            className="text-lg font-semibold text-slate-900 transition-colors duration-200 hover:text-slate-700 dark:text-zinc-100 dark:hover:text-zinc-300"
          >
            在线相册
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/albums"
              className="cursor-pointer text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              全部相册
            </Link>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
              {album.name}
            </h1>
            {album.description && (
              <p className="mt-1 text-slate-600 dark:text-zinc-400">
                {album.description}
              </p>
            )}
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-500">
              {photos.length} 张照片
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <PhotoUpload albumId={album.id} />
            <Link
              href={`/albums/${album.id}/edit`}
              className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 transition-colors duration-200 hover:bg-slate-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              编辑相册
            </Link>
          </div>
        </div>

        <PhotoGrid photos={photos} albumId={album.id} />
      </main>
    </div>
  );
}
