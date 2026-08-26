"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useSelection } from "@/context/SelectionContext";
import { accentBg } from "@/lib/accent";
import { RaysMark } from "./RaysMark";

export function SelectionTray() {
  const { selected, remove, clear, getService } = useSelection();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/request" || selected.length === 0) return null;

  const items = selected.map((id) => getService(id)).filter(Boolean);
  const lit = [0, 1, 2, 3].map((i) => items.length > i);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="w-[300px] rounded-xl2 border border-line bg-white shadow-lift p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-display text-[15px] font-medium text-ink">
                Your request ({items.length})
              </p>
              <button onClick={clear} className="font-body text-[12px] text-muted hover:text-ink">
                Clear
              </button>
            </div>
            <ul className="space-y-2.5 mb-5 max-h-[240px] overflow-y-auto">
              {items.map((s) => (
                <li key={s!.id} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-body text-[13px] text-ink-soft">
                    <span className={`w-1.5 h-1.5 rounded-full ${accentBg[s!.accent]}`} />
                    {s!.name}
                  </span>
                  <button onClick={() => remove(s!.id)} aria-label={`Remove ${s!.name}`}>
                    <X size={14} className="text-muted hover:text-coral" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => router.push("/request")}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-4 py-2.5 text-[13px] font-medium font-body hover:bg-violet transition-colors"
            >
              Start your request
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 rounded-full bg-ink text-cream pl-3 pr-5 py-2.5 shadow-lift hover:bg-violet transition-colors"
      >
        <RaysMark size={26} lit={lit} hubColor="#F5F3EE" />
        <span className="font-body text-[13px] font-medium">
          {items.length} service{items.length === 1 ? "" : "s"} selected
        </span>
      </button>
    </div>
  );
}
