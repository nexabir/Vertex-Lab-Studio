import Link from "next/link";
import { clsx } from "clsx";
import { ReactNode } from "react";

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-body font-medium transition-all duration-200 ease-[cubic-bezier(.16,.8,.3,1)] whitespace-nowrap active:scale-[0.97] select-none";

const variants = {
  primary:
    "bg-ink text-cream hover:bg-violet hover:text-white hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(109,74,255,0.24)]",
  secondary:
    "bg-white text-ink border border-line hover:border-ink/50 hover:bg-white hover:-translate-y-0.5 shadow-sm",
  ghost: "text-ink-soft hover:text-ink hover:bg-ink/5",
};

const sizes = {
  md: "px-5 py-2.5 text-[14.5px]",
  lg: "px-7 py-3.5 text-[15.5px]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  onClick,
  type = "button",
  disabled,
}: BaseProps & {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const cls = clsx(base, variants[variant], sizes[size], disabled && "opacity-40 pointer-events-none", className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}
