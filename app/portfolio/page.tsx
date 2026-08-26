import { Eyebrow } from "@/components/Eyebrow";
import { portfolioSlots } from "@/data/portfolio";
import { accentBg } from "@/lib/accent";

export default function PortfolioPage() {
  return (
    <div className="max-w-content mx-auto px-6 pt-[150px] pb-24">
      <Eyebrow>Selected work</Eyebrow>
      <h1 className="font-display text-[36px] sm:text-[44px] font-medium text-ink mb-5 max-w-[640px]">
        Portfolio
      </h1>
      <p className="font-body text-[15px] leading-relaxed text-muted max-w-[540px] mb-14">
        Case studies land here as projects wrap. First up — a slot for each product line.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {portfolioSlots.map((slot) => (
          <div
            key={slot.category}
            className="rounded-xl2 border border-dashed border-line bg-white/60 p-7 h-[240px] flex flex-col justify-between"
          >
            <span className={`w-8 h-1.5 rounded-full ${accentBg[slot.accent]}`} />
            <div>
              <p className="font-body text-[12px] font-semibold tracking-[0.14em] uppercase text-muted mb-2">
                Coming soon
              </p>
              <p className="font-display text-[17px] font-medium text-ink-soft">{slot.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
