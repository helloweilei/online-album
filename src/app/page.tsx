import Link from "next/link";
import { getAllAlbums } from "@/lib/db";
import { AlbumCard } from "@/components/AlbumCard";
import { CreateAlbumForm } from "@/components/CreateAlbumForm";
import { UserNav } from "@/components/UserNav";

export default async function HomePage() {
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
          <nav className="flex items-center gap-6">
            <Link
              href="/albums"
              className="cursor-pointer text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              全部相册
            </Link>
            <Link
              href="/help"
              className="cursor-pointer text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              帮助
            </Link>
            <UserNav />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CreateAlbumForm />
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
        {albums.length === 0 && (
          <p className="text-center text-slate-500 dark:text-zinc-500">
            还没有相册，在左侧卡片中创建一个吧
          </p>
        )}
      </main>
    </div>
  );
}
