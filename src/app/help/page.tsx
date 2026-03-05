import Link from "next/link";
import { UserNav } from "@/components/UserNav";

export default function HelpPage() {
  return (
    <div className="bg-[#FAFAFA] dark:bg-black">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-black/95">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link
            href="/"
            className="text-lg font-semibold text-slate-900 transition-colors duration-200 hover:text-slate-700 dark:text-zinc-100 dark:hover:text-zinc-300"
          >
            在线相册
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="cursor-pointer text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              返回首页
            </Link>
            <UserNav />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-zinc-100">
          帮助
        </h1>
        <div className="space-y-4 text-slate-600 dark:text-zinc-400">
          <p>
            在线相册是一款方便快捷的相册管理工具，支持图片上传、预览与分组管理。
          </p>
          <h2 className="text-lg font-medium text-slate-900 dark:text-zinc-100">
            使用方法
          </h2>
          <ol className="list-inside list-decimal space-y-2">
            <li>点击「新建相册」卡片，输入相册名称和描述，点击「创建」。</li>
            <li>进入相册后，点击「上传图片」选择图片，支持多选上传。</li>
            <li>点击任意照片可全屏预览，支持键盘左右键切换。</li>
            <li>在照片右上角菜单中可设为封面或删除。</li>
          </ol>
        </div>
      </main>
    </div>
  );
}