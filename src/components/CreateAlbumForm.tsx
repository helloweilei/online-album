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
      className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
        新建相册
      </h3>
      <input
        type="text"
        name="name"
        required
        placeholder="相册名称"
        className="rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition-colors duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
      />
      <textarea
        name="description"
        rows={2}
        placeholder="描述（可选）"
        className="rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition-colors duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-slate-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-slate-900 dark:hover:bg-zinc-200"
      >
        {loading ? "创建中…" : "创建"}
      </button>
    </form>
  );
}
