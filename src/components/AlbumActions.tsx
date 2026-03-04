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
        className="cursor-pointer rounded p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
        aria-label="更多操作"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
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
          <div className="absolute right-0 bottom-full z-20 mt-1 w-40 rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            <a
              href={`/albums/${album.id}/edit`}
              className="block cursor-pointer px-3 py-2 text-sm text-slate-700 transition-colors duration-200 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              编辑相册
            </a>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="w-full cursor-pointer px-3 py-2 text-left text-sm text-red-600 transition-colors duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 disabled:opacity-50"
            >
              {loading ? "删除中…" : "删除相册"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
