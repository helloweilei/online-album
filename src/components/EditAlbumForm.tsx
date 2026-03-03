"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateAlbumAction } from "@/app/actions/album";
import type { Album } from "@/types/album";

export function EditAlbumForm({ album }: { album: Album }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await updateAlbumAction(album.id, formData);
    setLoading(false);
    if (result.success) {
      router.push(`/albums/${album.id}`);
      router.refresh();
    } else {
      setError(result.error ?? "保存失败");
    }
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
    >
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        编辑相册
      </h2>
      <input
        type="text"
        name="name"
        required
        defaultValue={album.name}
        placeholder="相册名称"
        className="rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
      />
      <textarea
        name="description"
        rows={2}
        defaultValue={album.description ?? ""}
        placeholder="描述（可选）"
        className="rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "保存中…" : "保存"}
        </button>
        <a
          href={`/albums/${album.id}`}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          取消
        </a>
      </div>
    </form>
  );
}
