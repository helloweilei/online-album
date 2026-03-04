"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "登录失败");
        return;
      }
      router.push(from);
      router.refresh();
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] dark:bg-black">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-8 block text-center text-lg font-semibold text-slate-900 transition-colors duration-200 hover:text-slate-700 dark:text-zinc-100 dark:hover:text-zinc-300"
        >
          在线相册
        </Link>
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h1 className="mb-6 text-xl font-semibold text-slate-900 dark:text-zinc-100">
            登录
          </h1>
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-zinc-300">
                邮箱
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="123@qq.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition-colors duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-zinc-300">
                密码
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="admin"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition-colors duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
              />
            </label>
          </div>
          {error && (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full cursor-pointer rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-slate-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-slate-900 dark:hover:bg-zinc-200"
          >
            {loading ? "登录中…" : "登录"}
          </button>
          <p className="mt-4 text-center text-sm text-slate-500 dark:text-zinc-500">
            演示账号：123@qq.com / admin
          </p>
        </form>
        <p className="mt-6 text-center">
          <Link
            href="/"
            className="cursor-pointer text-sm text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← 返回首页
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">加载中…</div>}>
      <LoginForm />
    </Suspense>
  );
}
