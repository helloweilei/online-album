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
      className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
        编辑相册
      </h2>
      <input
        type="text"
        name="name"
        required
        defaultValue={album.name}
        placeholder="相册名称"
        className="rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition-colors duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
      />
      <textarea
        name="description"
        rows={2}
        defaultValue={album.description ?? ""}
        placeholder="描述（可选）"
        className="rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition-colors duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-slate-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-slate-900 dark:hover:bg-zinc-200"
        >
          {loading ? "保存中…" : "保存"}
        </button>
        <a
          href={`/albums/${album.id}`}
          className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2.5 text-slate-700 transition-colors duration-200 hover:bg-slate-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          取消
        </a>
      </div>
    </form>
  );
}
