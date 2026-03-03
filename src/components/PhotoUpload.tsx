"use client";

import { useRef, useState } from "react";
import { uploadPhotos } from "@/app/actions/photo";

export function PhotoUpload({ albumId }: { albumId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setError(null);
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    const result = await uploadPhotos(albumId, formData);
    setLoading(false);
    e.target.value = "";
    if (result.success) {
      window.location.reload(); // 简单刷新以更新列表；也可用 router.refresh()
    } else {
      setError(result.error ?? "上传失败");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        multiple
        className="hidden"
        onChange={handleChange}
        disabled={loading}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-zinc-700 transition hover:border-blue-400 hover:bg-blue-50 disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
      >
        <span className="text-xl">📤</span>
        {loading ? "上传中…" : "上传图片"}
      </button>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
