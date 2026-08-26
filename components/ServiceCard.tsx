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
    <div
      className={clsx(
        "relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:rounded-t-xl2",
        borderClass[service.accent],
        "rounded-xl2 border border-line bg-white p-6 flex flex-col h-full transition-shadow hover:shadow-card"
      )}
    >
      <div className={clsx("w-11 h-11 rounded-full flex items-center justify-center mb-5", iconBg[service.accent])}>
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <h3 className="font-display text-[19px] font-medium text-ink mb-1">{service.name}</h3>
      <p className="font-body text-[13px] text-muted mb-3">{service.tagline}</p>
      <p className="font-body text-[14px] leading-relaxed text-ink-soft mb-6 flex-1">
        {service.description}
      </p>
      <button
        onClick={() => toggle(service.id)}
        className={clsx(
          "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium font-body transition-colors self-start",
          active
            ? "bg-ink text-cream"
            : "bg-cream text-ink hover:bg-ink hover:text-cream"
        )}
      >
        {active ? <Check size={14} /> : <Plus size={14} />}
        {active ? "Added to request" : "Add to request"}
      </button>
    </div>
  );
}
