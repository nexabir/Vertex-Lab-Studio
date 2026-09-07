"use client";

import { Service } from "@/data/services";
import { getIcon } from "@/lib/icons";
import { useSelection } from "@/context/SelectionContext";
import { Check, Plus } from "lucide-react";
import { clsx } from "clsx";

const borderClass: Record<Service["accent"], string> = {
  violet: "before:bg-violet",
  cyanx: "before:bg-cyanx",
  coral: "before:bg-coral",
  lime: "before:bg-lime",
};

const iconBg: Record<Service["accent"], string> = {
  violet: "bg-violet/10 text-violet",
  cyanx: "bg-cyanx/10 text-[#0B93AE]",
  coral: "bg-coral/10 text-coral",
  lime: "bg-lime/20 text-[#7A9A0E]",
};

export function ServiceCard({ service }: { service: Service }) {
  const { has, toggle } = useSelection();
  const Icon = getIcon(service.icon);
  const active = has(service.id);

  return (
    <div className="group rounded-2xl p-1 bg-paper/70 border border-line/80 hover:border-line transition-all duration-300 hover:-translate-y-1 hover:shadow-card flex flex-col h-full">
      <div
        className={clsx(
          "relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:rounded-t-xl",
          borderClass[service.accent],
          "rounded-[calc(1rem-2px)] bg-white p-6 flex flex-col h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <div
            className={clsx(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105",
              iconBg[service.accent]
            )}
          >
            <Icon size={19} strokeWidth={1.8} />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted/70">
            {service.category}
          </span>
        </div>

        <h3 className="font-display text-[18px] font-semibold text-ink mb-1 group-hover:text-violet transition-colors">
          {service.name}
        </h3>
        <p className="font-body text-[12.5px] font-medium text-muted mb-3">{service.tagline}</p>
        <p className="font-body text-[13.5px] leading-relaxed text-ink-soft mb-6 flex-1">
          {service.description}
        </p>

        {/* Pin to bottom */}
        <div className="pt-2 mt-auto border-t border-line/50 flex items-center justify-between">
          <button
            onClick={() => toggle(service.id)}
            className={clsx(
              "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-medium font-body transition-all duration-200 active:scale-[0.96]",
              active
                ? "bg-ink text-cream shadow-sm"
                : "bg-cream/70 text-ink hover:bg-ink hover:text-cream"
            )}
          >
            {active ? <Check size={13} /> : <Plus size={13} />}
            {active ? "Added to request" : "Add to request"}
          </button>
        </div>
      </div>
    </div>
  );
}
