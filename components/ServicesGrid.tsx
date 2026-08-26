"use client";

import { useState, useMemo } from "react";
import { clsx } from "clsx";
import { ServiceCard } from "@/components/ServiceCard";
import { Service, categories } from "@/data/services";

export function ServicesGrid({ services }: { services: Service[] }) {
  const [active, setActive] = useState<string>("All");
  const filtered = useMemo(
    () => (active === "All" ? services : services.filter((s) => s.category === active)),
    [active, services]
  );

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-12">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={clsx(
              "rounded-full px-4 py-2 text-[13px] font-medium font-body border transition-colors",
              active === c
                ? "bg-ink text-cream border-ink"
                : "bg-white text-ink-soft border-line hover:border-ink"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </>
  );
}
