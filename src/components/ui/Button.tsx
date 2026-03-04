import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", disabled, ...props }, ref) => {
    const base =
      "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 dark:focus-visible:ring-zinc-400/20";
    const variants = {
      default:
        "bg-slate-900 text-white hover:bg-slate-800 dark:bg-zinc-100 dark:text-slate-900 dark:hover:bg-zinc-200",
      outline:
        "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700",
      ghost:
        "text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
    };
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${base} ${variants[variant]} ${className}`.trim()}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
