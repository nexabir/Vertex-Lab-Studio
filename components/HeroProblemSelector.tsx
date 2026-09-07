"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Globe, Cpu, Compass, CheckCircle2 } from "lucide-react";

interface ProblemOption {
  id: string;
  category: "Insights" | "Presence" | "Systems" | "Strategy";
  shortLabel: string;
  question: string;
  painPoint: string;
  recommended: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  icon: typeof BarChart3;
  targetHref: string;
}

const problems: ProblemOption[] = [
  {
    id: "insights",
    category: "Insights",
    shortLabel: "Data & Dashboards",
    question: "Scattered data & blind spots",
    painPoint: "No single source of truth, manual Excel reporting, or unclear KPIs across teams.",
    recommended: "Business Dashboards & In-depth Business Analysis",
    accent: "#17C3E6",
    accentBg: "rgba(23, 195, 230, 0.12)",
    accentBorder: "rgba(23, 195, 230, 0.35)",
    icon: BarChart3,
    targetHref: "/services?category=Insights",
  },
  {
    id: "presence",
    category: "Presence",
    shortLabel: "Web & Pitch Decks",
    question: "Outdated website or presentation",
    painPoint: "Website isn't converting, brand looks amateur, or pitch deck doesn't close investors.",
    recommended: "Modern Responsive Websites & High-Stakes Presentations",
    accent: "#FF6B4A",
    accentBg: "rgba(255, 107, 74, 0.12)",
    accentBorder: "rgba(255, 107, 74, 0.35)",
    icon: Globe,
    targetHref: "/services?category=Presence",
  },
  {
    id: "systems",
    category: "Systems",
    shortLabel: "ERP & Workflows",
    question: "Disconnected manual operations",
    painPoint: "Double-entry errors, lack of central ERP, and teams stuck doing repetitive copy-paste.",
    recommended: "Custom ERP Development & Internal Business Apps",
    accent: "#C6F135",
    accentBg: "rgba(198, 241, 53, 0.12)",
    accentBorder: "rgba(198, 241, 53, 0.35)",
    icon: Cpu,
    targetHref: "/services?category=Systems",
  },
  {
    id: "strategy",
    category: "Strategy",
    shortLabel: "Strategy & Documents",
    question: "Unclear sales or growth roadmap",
    painPoint: "Unstructured sales processes, vague positioning, or messy business documents.",
    recommended: "Business Consultancy, Marketing Strategy & Executive Documents",
    accent: "#6D4AFF",
    accentBg: "rgba(109, 74, 255, 0.14)",
    accentBorder: "rgba(109, 74, 255, 0.40)",
    icon: Compass,
    targetHref: "/services?category=Strategy",
  },
];

export function HeroProblemSelector() {
  const [activeId, setActiveId] = useState<string>("insights");
  const active = problems.find((p) => p.id === activeId) ?? problems[0];
  const Icon = active.icon;

  return (
    <div className="w-full">
      {/* Question prompt label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block w-2 h-2 rounded-full bg-violet animate-pulse" />
        <p className="font-body text-[13px] font-medium tracking-wide uppercase text-cream/70">
          Where is your business feeling friction?
        </p>
      </div>

      {/* Interactive chip selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-5">
        {problems.map((p) => {
          const isSelected = p.id === activeId;
          const PIcon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className="relative group text-left p-3 sm:p-3.5 rounded-xl transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              style={{
                backgroundColor: isSelected ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.03)",
                borderColor: isSelected ? p.accent : "rgba(255, 255, 255, 0.10)",
                boxShadow: isSelected ? `0 0 20px -4px ${p.accentBg}` : "none",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: isSelected ? p.accentBg : "rgba(255, 255, 255, 0.05)",
                    color: isSelected ? p.accent : "rgba(245, 243, 238, 0.7)",
                  }}
                >
                  <PIcon size={13} />
                </div>
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider transition-colors"
                  style={{ color: isSelected ? p.accent : "rgba(245, 243, 238, 0.6)" }}
                >
                  {p.category}
                </span>
              </div>
              <p className="font-display text-[13px] font-medium text-cream leading-tight">
                {p.shortLabel}
              </p>
            </button>
          );
        })}
      </div>

      {/* Dynamic Recommendation Card (Double-Bezel Hardware aesthetic) */}
      <div
        className="rounded-2xl p-1 border transition-all duration-300"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          borderColor: active.accentBorder,
        }}
      >
        <div className="bg-[#14131F]/90 backdrop-blur-md rounded-[calc(1rem-2px)] p-5 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: active.accentBg,
                    color: active.accent,
                  }}
                >
                  <CheckCircle2 size={11} /> {active.category} Solution Path
                </span>
              </div>
              <h3 className="font-display text-[17px] sm:text-[19px] font-semibold text-cream">
                {active.question}
              </h3>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <Link
                href={`/problem-tracker?category=${active.category}`}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-medium text-ink transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] shadow-sm"
                style={{ backgroundColor: active.accent }}
              >
                Start Problem Brief <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-cream/70 text-[13.5px]">
            <p className="font-body leading-relaxed max-w-[500px]">
              <strong className="text-cream/90 font-medium">Challenge:</strong> {active.painPoint}
            </p>
            <Link
              href={active.targetHref}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors hover:text-cream whitespace-nowrap self-start sm:self-auto"
              style={{ color: active.accent }}
            >
              Browse {active.category} catalog <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
