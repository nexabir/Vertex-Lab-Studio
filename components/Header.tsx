"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Menu, X } from "lucide-react";
import { RaysMark } from "./RaysMark";
import { AuthStatus } from "./AuthStatus";
import { useSelection } from "@/context/SelectionContext";

const links = [
  { href: "/services", label: "Services" },
  { href: "/combos", label: "Combos" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { selected } = useSelection();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const transparentEligible = pathname === "/";
  const isTransparent = transparentEligible && !scrolled;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 transition-colors duration-300",
        isTransparent ? "bg-transparent" : "bg-paper/90 backdrop-blur border-b border-line"
      )}
    >
      <div className="max-w-content mx-auto px-6 h-[76px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <RaysMark size={30} hubColor={isTransparent ? "#F5F3EE" : "#14131F"} />
          <span
            className={clsx(
              "font-display text-[16px] font-semibold tracking-tight",
              isTransparent ? "text-cream" : "text-ink"
            )}
          >
            Vertex Lab Studio
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "font-body text-[14px] font-medium transition-colors",
                isTransparent ? "text-cream/80 hover:text-cream" : "text-ink-soft hover:text-ink"
              )}
            >
              {l.label}
            </Link>
          ))}
          <AuthStatus dark={isTransparent} />
          <Link
            href="/request"
            className={clsx(
              "font-body text-[13px] font-medium rounded-full px-5 py-2.5 transition-colors",
              isTransparent
                ? "bg-cream text-ink hover:bg-white"
                : "bg-ink text-cream hover:bg-violet"
            )}
          >
            Start a request{selected.length > 0 ? ` (${selected.length})` : ""}
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X size={22} className={isTransparent ? "text-cream" : "text-ink"} />
          ) : (
            <Menu size={22} className={isTransparent ? "text-cream" : "text-ink"} />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-paper border-t border-line px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-[15px] text-ink-soft"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <AuthStatus />
          <Link
            href="/request"
            className="font-body text-[14px] font-medium rounded-full bg-ink text-cream px-5 py-3 text-center"
            onClick={() => setMobileOpen(false)}
          >
            Start a request{selected.length > 0 ? ` (${selected.length})` : ""}
          </Link>
        </div>
      )}
    </header>
  );
}
