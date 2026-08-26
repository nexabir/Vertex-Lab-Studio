"use client";

import { Combo } from "@/data/combos";
import { useSelection } from "@/context/SelectionContext";
import { accentBg } from "@/lib/accent";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

export function ComboCard({ combo }: { combo: Combo }) {
  const { setAll, getService } = useSelection();
  const router = useRouter();
  const includedServices = combo.serviceIds
    .map((id) => getService(id))
    .filter(Boolean);

  function selectCombo() {
    setAll(combo.serviceIds);
    router.push("/request");
  }

  function customize() {
    setAll(combo.serviceIds);
    router.push("/services");
  }

  return (
    <div className="rounded-xl2 border border-line bg-white p-7 flex flex-col h-full">
      <div className={clsx("w-8 h-1.5 rounded-full mb-5", accentBg[combo.accent])} />
      <h3 className="font-display text-[21px] font-medium text-ink mb-2">{combo.name}</h3>
      <p className="font-body text-[14px] leading-relaxed text-ink-soft mb-5">{combo.summary}</p>
      <ul className="mb-7 space-y-1.5">
        {includedServices.map((s) => (
          <li key={s!.id} className="font-body text-[13px] text-muted flex items-center gap-2">
            <span className={clsx("w-1.5 h-1.5 rounded-full", accentBg[s!.accent])} />
            {s!.name}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2">
        <button
          onClick={selectCombo}
          className="rounded-full bg-ink text-cream px-4 py-2 text-[13px] font-medium font-body hover:bg-violet transition-colors"
        >
          Use this combo
        </button>
        <button
          onClick={customize}
          className="rounded-full border border-line px-4 py-2 text-[13px] font-medium font-body text-ink hover:border-ink transition-colors"
        >
          Customize
        </button>
      </div>
    </div>
  );
}
