"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { clsx } from "clsx";
import { faqs } from "@/data/faq";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-[680px] mx-auto divide-y divide-line border-t border-b border-line">
      {faqs.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-display text-[16px] font-medium text-ink">{item.q}</span>
              <Plus
                size={18}
                className={clsx("shrink-0 text-muted transition-transform duration-200", open && "rotate-45")}
              />
            </button>
            <div
              className={clsx(
                "grid transition-all duration-300 ease-out",
                open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
              )}
              style={{ display: "grid" }}
            >
              <div className="overflow-hidden">
                <p className="font-body text-[14px] leading-relaxed text-muted max-w-[560px]">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
