"use client";

const capabilities = [
  { text: "Custom Power BI & Analytics", accent: "#17C3E6" },
  { text: "High-Converting Next.js Websites", accent: "#FF6B4A" },
  { text: "Bespoke ERP & Business Systems", accent: "#C6F135" },
  { text: "Market & Growth Playbooks", accent: "#6D4AFF" },
  { text: "Executive Investor Pitch Decks", accent: "#FF6B4A" },
  { text: "Automated Operations & Workflow Apps", accent: "#C6F135" },
  { text: "One Intake · Zero Vendor Fragmentation", accent: "#6D4AFF" },
  { text: "Root Cause Diagnostics via Kidlin's Law", accent: "#17C3E6" },
];

export function CapabilitiesTicker() {
  return (
    <div className="relative border-y border-line/70 bg-[#12111D] text-cream/75 overflow-hidden py-4 select-none">
      {/* Subtle fade edges for infinity effect */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#12111D] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#12111D] to-transparent z-10" />

      <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
        {/* Double list for continuous seamless looping */}
        {[...capabilities, ...capabilities].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 px-6 shrink-0">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: item.accent }}
            />
            <span className="font-display text-[13.5px] font-medium tracking-wide text-cream/85">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
