"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePhotoAction, setAsCover } from "@/app/actions/photo";
import type { Photo } from "@/types/album";

export function PhotoItemActions({
  albumId,
  photo,
  onSetCover,
}: {
  albumId: string;
  photo: Photo;
  onSetCover?: () => void;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSetCover() {
    setLoading(true);
    const result = await setAsCover(albumId, photo.id);
    setLoading(false);
    setMenuOpen(false);
    onSetCover?.();
    if (result.success) router.refresh();
    else alert(result.error);
  }

  async function handleDelete() {
    if (!confirm("确定要删除这张图片吗？")) return;
    setLoading(true);
    const result = await deletePhotoAction(photo.id);
    setLoading(false);
    setMenuOpen(false);
    if (result.success) router.refresh();
    else alert(result.error);
  }

  return (
    <div className="absolute right-2 top-2">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setMenuOpen((v) => !v);
        }}
        className="cursor-pointer rounded bg-black/50 p-1.5 text-white opacity-0 transition-colors duration-200 hover:bg-black/70 group-hover:opacity-100"
        aria-label="更多操作"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            aria-hidden
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMenuOpen(false);
            }}
          />
          <div
            className="absolute right-0 top-full z-20 mt-1 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleSetCover}
              disabled={loading}
              className="w-full cursor-pointer px-3 py-2 text-left text-sm text-slate-700 transition-colors duration-200 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50"
            >
              设为封面
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="w-full cursor-pointer px-3 py-2 text-left text-sm text-red-600 transition-colors duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 disabled:opacity-50"
            >
              删除
            </button>
          </div>
        </>
      )}
    </div>
  );
}
