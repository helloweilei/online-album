import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    const base =
      "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20";
    return (
      <textarea
        ref={ref}
        className={`${base} ${className}`.trim()}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
