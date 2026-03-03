"use client";

import { useRef, useState } from "react";
import { createAlbum } from "@/app/actions/album";

export function CreateAlbumForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await createAlbum(formData);
    setLoading(false);
    if (result.success) {
      formRef.current?.reset();
      onSuccess?.();
    } else {
      setError(result.error ?? "创建失败");
    }
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
    >
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        新建相册
      </h3>
      <input
        type="text"
        name="name"
        required
        placeholder="相册名称"
        className="rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
      />
      <textarea
        name="description"
        rows={2}
        placeholder="描述（可选）"
        className="rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "创建中…" : "创建"}
      </button>
    </form>
  );
}
