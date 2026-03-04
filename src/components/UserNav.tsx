"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
}

export function UserNav() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null));
  }, []);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
    window.location.href = "/";
  }

  if (user === undefined) {
    return (
      <span className="text-sm text-slate-400 dark:text-zinc-500">加载中…</span>
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="cursor-pointer text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-zinc-100"
      >
        登录
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-600 dark:text-zinc-400">
        {user.name}
        <span className="ml-1.5 text-slate-400 dark:text-zinc-500">
          ({user.email})
        </span>
      </span>
      <button
        type="button"
        onClick={handleLogout}
        className="cursor-pointer text-sm text-slate-500 transition-colors duration-200 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300"
      >
        退出
      </button>
    </div>
  );
}
