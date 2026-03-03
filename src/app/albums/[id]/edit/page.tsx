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
    <div className="mx-auto max-w-md px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href={`/albums/${id}`}
          className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← 返回相册
        </Link>
      </div>
      <EditAlbumForm album={album} />
    </div>
  );
}
