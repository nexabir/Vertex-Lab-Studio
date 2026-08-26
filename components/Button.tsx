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
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-medium transition-all duration-200 whitespace-nowrap";

const variants = {
  primary: "bg-ink text-cream hover:bg-violet",
  secondary: "bg-white text-ink border border-line hover:border-ink",
  ghost: "text-ink hover:text-violet",
};

const sizes = {
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-7 py-3.5 text-[16px]",
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
