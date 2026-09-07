"use client";

import { useState } from "react";
import { X, Calendar, Phone, Mail, Clock, CheckCircle2, ExternalLink } from "lucide-react";

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-[560px] rounded-2xl border border-line bg-white shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-muted hover:text-ink hover:bg-cream transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet/10 text-violet text-[12px] font-semibold tracking-wide uppercase mb-3">
            <Calendar size={13} /> Direct Scheduling
          </span>
          <h2 className="font-display text-[24px] sm:text-[28px] font-semibold text-ink">
            Book a 15-Minute Discovery Call
          </h2>
          <p className="font-body text-[14px] text-muted mt-2 leading-relaxed">
            Discuss your technical requirements, architectural scope, or existing bottlenecks directly with our solutions lead.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="rounded-xl border border-line bg-cream/30 p-4 space-y-3">
            <div className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
              <CheckCircle2 size={16} className="text-lime" /> Zero sales pitch — purely technical & scope diagnosis
            </div>
            <div className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
              <CheckCircle2 size={16} className="text-lime" /> Immediate timeline & feasibility assessment
            </div>
            <div className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
              <CheckCircle2 size={16} className="text-lime" /> Actionable architectural recommendations you can keep
            </div>
          </div>

          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-6 py-3.5 font-body text-[14px] font-semibold hover:bg-violet transition-colors shadow-sm"
          >
            Open Interactive Calendar <ExternalLink size={15} />
          </a>
        </div>

        <div className="pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-body text-[13px] text-muted">
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
