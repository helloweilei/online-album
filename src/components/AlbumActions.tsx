"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteAlbumAction } from "@/app/actions/album";
import type { Album } from "@/types/album";

export function AlbumActions({ album }: { album: Album }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`确定要删除相册「${album.name}」吗？相册内所有图片将一并删除。`))
      return;
    setLoading(true);
    const result = await deleteAlbumAction(album.id);
    setLoading(false);
    setOpen(false);
    if (result.success) router.refresh();
    else alert(result.error);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
        aria-label="更多操作"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            <a
              href={`/albums/${album.id}/edit`}
              className="block px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              编辑相册
            </a>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 disabled:opacity-50"
            >
              {loading ? "删除中…" : "删除相册"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
