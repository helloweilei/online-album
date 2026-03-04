import { redirect } from "next/navigation";
import { getAlbumById } from "@/lib/db";
import { EditAlbumForm } from "@/components/EditAlbumForm";
import Link from "next/link";

export default async function EditAlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const album = await getAlbumById(id);
  if (!album) redirect("/albums");

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
          <Link
            href={`/albums/${id}`}
            className="cursor-pointer text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← 返回相册
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-md px-4 py-8">
        <EditAlbumForm album={album} />
      </main>
    </div>
  );
}
