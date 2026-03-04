import Link from "next/link";
import { getAllAlbums } from "@/lib/db";
import { AlbumCard } from "@/components/AlbumCard";
import { UserNav } from "@/components/UserNav";

export default async function AlbumsPage() {
  const albums = await getAllAlbums();

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
              href="/"
              className="cursor-pointer text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              返回首页
            </Link>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-zinc-100">
          全部相册
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
        {albums.length === 0 && (
          <p className="py-12 text-center text-slate-500 dark:text-zinc-500">
            <Link
              href="/"
              className="cursor-pointer text-slate-900 underline transition-colors duration-200 hover:text-slate-700 dark:text-zinc-100 dark:hover:text-zinc-300"
            >
              去首页创建一个相册
            </Link>
          </p>
        )}
      </main>
    </div>
  );
}
