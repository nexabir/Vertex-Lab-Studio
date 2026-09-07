"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";
import { useSelection } from "@/context/SelectionContext";
import { BookingModal } from "./BookingModal";

export function StickyBottomCta() {
  const { selected } = useSelection();
  const [visible, setVisible] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const nearBottom = scrollY + windowHeight > documentHeight - 300;

      setVisible(scrollY > 420 && !nearBottom);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-5 left-0 right-0 z-30 pointer-events-none flex justify-center px-4">
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-4 bg-ink/92 backdrop-blur-xl border border-white/15 text-cream px-4 sm:px-6 py-2.5 rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.35)] animate-rise">
          <div className="hidden sm:flex items-center gap-2 text-[13px] text-cream/75 font-medium border-r border-white/15 pr-3.5">
            <Sparkles size={14} className="text-violet shrink-0" />
            <span>Need a tailored solution?</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] text-cream/85 hover:text-white font-medium px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <Calendar size={13} className="text-cyanx" />
              <span>Book Call</span>
            </button>
            <Link
              href="/problem-tracker"
              className="hidden xs:inline-block text-[12px] sm:text-[13px] text-cream/80 hover:text-white font-medium px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              Problem Tracker
            </Link>
            <Link
              href="/request"
              className="inline-flex items-center gap-1.5 rounded-full bg-violet text-white px-4 py-1.5 text-[12px] sm:text-[13px] font-medium transition-all hover:bg-[#5b3ce0] active:scale-[0.97]"
            >
              <span>Start request{selected.length > 0 ? ` (${selected.length})` : ""}</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
