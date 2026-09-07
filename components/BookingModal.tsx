"use client";

import { useEffect } from "react";
import { X, Calendar, Phone, Mail, CheckCircle2, ExternalLink } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  bookingUrl = "https://cal.com/vertex-lab-studio/discovery",
}: BookingModalProps) {
  // Close on Escape key & freeze body scroll
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-auto flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      {/* Dark backdrop with explicit click handler */}
      <div
        className="fixed inset-0 bg-ink/70 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        aria-hidden="true"
      />

      {/* Modal Card with stopPropagation to prevent outside close when clicking inside */}
      <div
        className="relative w-full max-w-[560px] rounded-2xl border border-line bg-white shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close 'X' button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-4 top-4 p-2.5 rounded-full text-muted hover:text-ink hover:bg-cream active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet"
          aria-label="Close booking modal"
        >
          <X size={20} />
        </button>

        <div className="mb-6 pr-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet/10 text-violet text-[12px] font-semibold tracking-wide uppercase mb-3">
            <Calendar size={13} /> Direct Scheduling
          </span>
          <h2
            id="booking-modal-title"
            className="font-display text-[24px] sm:text-[28px] font-semibold text-ink"
          >
            Book a 15-Minute Discovery Call
          </h2>
          <p className="font-body text-[14px] text-muted mt-2 leading-relaxed">
            Discuss your technical requirements, architectural scope, or existing bottlenecks directly with our solutions lead.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="rounded-xl border border-line bg-cream/30 p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
              <CheckCircle2 size={16} className="text-lime shrink-0" /> Zero sales pitch — purely technical & scope diagnosis
            </div>
            <div className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
              <CheckCircle2 size={16} className="text-lime shrink-0" /> Immediate timeline & feasibility assessment
            </div>
            <div className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
              <CheckCircle2 size={16} className="text-lime shrink-0" /> Actionable architectural recommendations you can keep
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-6 py-3.5 font-body text-[14px] font-semibold hover:bg-violet transition-colors shadow-sm"
            >
              Open Interactive Calendar <ExternalLink size={15} />
            </a>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-3.5 rounded-full border border-line font-body text-[13.5px] font-medium text-muted hover:text-ink hover:bg-cream transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        <div className="pt-5 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-body text-[13px] text-muted">
          <span className="font-semibold text-ink">Need immediate answers?</span>
          <div className="flex items-center gap-4">
            <a
              href="mailto:abirislam2020@gmail.com"
              className="inline-flex items-center gap-1.5 text-ink-soft hover:text-violet transition-colors"
            >
              <Mail size={14} /> abirislam2020@gmail.com
            </a>
            <a
              href="tel:01797989412"
              className="inline-flex items-center gap-1.5 text-ink-soft hover:text-violet transition-colors"
            >
              <Phone size={14} /> 01797989412
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
