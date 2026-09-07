"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Menu, X, Calendar } from "lucide-react";
import { RaysMark } from "./RaysMark";
import { AuthStatus } from "./AuthStatus";
import { BookingModal } from "./BookingModal";
import { useSelection } from "@/context/SelectionContext";

const links = [
  { href: "/problem-tracker", label: "Problem Tracker" },
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
  const [bookingOpen, setBookingOpen] = useState(false);

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
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none transition-all duration-300">
      <div
        className={clsx(
          "pointer-events-auto max-w-content mx-auto h-[64px] sm:h-[68px] px-4 sm:px-6 rounded-full flex items-center justify-between transition-all duration-300 shadow-sm",
          isTransparent
            ? "bg-ink/80 backdrop-blur-xl border border-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-cream"
            : "bg-paper/90 backdrop-blur-xl border border-line shadow-card text-ink"
        )}
      >
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <RaysMark size={28} hubColor={isTransparent ? "#F5F3EE" : "#14131F"} />
          <span
            className={clsx(
              "font-display text-[15px] sm:text-[16px] font-semibold tracking-tight",
              isTransparent ? "text-cream" : "text-ink"
            )}
          >
            Vertex Lab Studio
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "font-body text-[13.5px] font-medium transition-colors hover:-translate-y-0.5 transform duration-150",
                isTransparent ? "text-cream/75 hover:text-cream" : "text-ink-soft hover:text-ink"
              )}
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className={clsx(
              "inline-flex items-center gap-1.5 font-body text-[13px] font-medium px-3.5 py-1.5 rounded-full transition-colors",
              isTransparent
                ? "text-cream/80 hover:text-cream hover:bg-white/10"
                : "text-ink-soft hover:text-ink hover:bg-cream"
            )}
          >
            <Calendar size={13} className="text-cyanx" />
            Book Call
          </button>
          <AuthStatus dark={isTransparent} />
          <Link
            href="/request"
            className={clsx(
              "font-body text-[13px] font-medium rounded-full px-5 py-2 transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5 shadow-sm",
              isTransparent
                ? "bg-cream text-ink hover:bg-white"
                : "bg-ink text-cream hover:bg-violet"
            )}
          >
            Start a request{selected.length > 0 ? ` (${selected.length})` : ""}
          </Link>
        </nav>

        <button
          className="md:hidden p-1.5 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X size={20} className={isTransparent ? "text-cream" : "text-ink"} />
          ) : (
            <Menu size={20} className={isTransparent ? "text-cream" : "text-ink"} />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="pointer-events-auto md:hidden mt-2 mx-auto max-w-content bg-paper/98 backdrop-blur-2xl border border-line rounded-3xl p-5 shadow-lift flex flex-col gap-3.5 animate-rise">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-[14.5px] font-medium text-ink-soft hover:text-ink px-2 py-1.5 rounded-lg hover:bg-ink/5 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-line flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setBookingOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 font-body text-[13.5px] font-medium rounded-full border border-line py-2.5 text-ink hover:bg-cream transition-colors"
            >
              <Calendar size={15} className="text-cyanx" />
              Book a 15-Min Discovery Call
            </button>
            <AuthStatus />
            <Link
              href="/request"
              className="font-body text-[13.5px] font-medium rounded-full bg-ink text-cream px-5 py-2.5 text-center shadow-sm"
              onClick={() => setMobileOpen(false)}
            >
              Start a request{selected.length > 0 ? ` (${selected.length})` : ""}
            </Link>
          </div>
        </div>
      )}

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </header>
  );
}
