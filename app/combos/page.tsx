import { Eyebrow } from "@/components/Eyebrow";
import { ComboCard } from "@/components/ComboCard";
import { getCombos } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CombosPage() {
  const combos = await getCombos();

  return (
    <div className="max-w-content mx-auto px-6 pt-[150px] pb-24">
      <Eyebrow>Pre-built bundles</Eyebrow>
      <h1 className="font-display text-[36px] sm:text-[44px] font-medium text-ink mb-5 max-w-[640px]">
        A faster starting point than a blank catalog.
      </h1>
      <p className="font-body text-[15px] leading-relaxed text-muted max-w-[540px] mb-14">
        Each combo groups services that are commonly requested together. Use one as-is, or
        customize it further on the services page.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {combos.map((c) => (
          <ComboCard key={c.id} combo={c} />
        ))}
      </div>
    </div>
  );
}
