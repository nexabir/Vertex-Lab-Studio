"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle, ExternalLink, Sparkles } from "lucide-react";
import { PortfolioProject } from "@/data/portfolio";
import { accentBg } from "@/lib/accent";

const categories = ["All", "Insights", "Systems", "Presence", "Strategy"] as const;

export function PortfolioShowcase({ projects }: { projects: PortfolioProject[] }) {
  const [selectedCat, setSelectedCat] = useState<string>("All");

  const filtered =
    selectedCat === "All"
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === selectedCat.toLowerCase());

  return (
    <div className="space-y-10">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {categories.map((cat) => {
          const isSelected = selectedCat === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full font-body text-[13px] font-medium transition-all ${
                isSelected
                  ? "bg-ink text-cream shadow-sm"
                  : "bg-white border border-line text-muted hover:text-ink hover:border-ink/40"
              }`}
            >
              {cat}
              {cat === "All" && ` (${projects.length})`}
            </button>
          );
        })}
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 gap-8">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="rounded-2xl border border-line bg-white p-8 md:p-10 shadow-sm hover:shadow-card transition-all"
          >
            {/* Top metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${accentBg[proj.accent] ?? "bg-violet"}`} />
                <span className="font-body text-[12px] font-bold uppercase tracking-wider text-muted">
                  {proj.category}
                </span>
                <span className="text-muted/40">•</span>
                <span className="font-body text-[13px] font-medium text-ink-soft">
                  Client: {proj.clientName}
                </span>
              </div>

              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-body text-[12.5px] font-medium text-violet hover:underline"
                >
                  Live Product <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Title & Summary */}
            <h2 className="font-display text-[24px] md:text-[28px] font-semibold text-ink mb-3 leading-snug">
              {proj.title}
            </h2>
            <p className="font-body text-[15.5px] text-ink-soft leading-relaxed max-w-[800px] mb-8">
              {proj.summary}
            </p>

            {/* Problem vs Solution Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 rounded-xl bg-paper/60 border border-line">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-coral">
                  <AlertCircle size={16} />
                  <span className="font-body text-[12px] font-bold uppercase tracking-wider">
                    The Business Problem
                  </span>
                </div>
                <p className="font-body text-[13.5px] text-muted leading-relaxed">
                  {proj.problem}
                </p>
              </div>

              <div className="space-y-2 md:border-l md:border-line md:pl-6">
                <div className="flex items-center gap-2 text-[#7A9A0E]">
                  <CheckCircle2 size={16} />
                  <span className="font-body text-[12px] font-bold uppercase tracking-wider">
                    Engineered Solution
                  </span>
                </div>
                <p className="font-body text-[13.5px] text-ink-soft leading-relaxed">
                  {proj.solution}
                </p>
              </div>
            </div>

            {/* Measurable Impact Metrics */}
            {proj.metrics && proj.metrics.length > 0 && (
              <div className="mb-8">
                <span className="font-body text-[11px] font-bold uppercase tracking-wider text-muted block mb-3">
                  Verified Operational Impact
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {proj.metrics.map((metric, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-line bg-cream/30">
                      <p className="font-display text-[22px] md:text-[26px] font-bold text-ink tracking-tight">
                        {metric.value}
                      </p>
                      <p className="font-body text-[12px] text-muted mt-1">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-line">
              <div className="flex flex-wrap items-center gap-2">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-cream text-ink-soft border border-line/80 font-body text-[11.5px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/request`}
                className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-5 py-2.5 font-body text-[13px] font-medium hover:bg-violet transition-colors self-start sm:self-auto shrink-0"
              >
                Discuss Similar Scope <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line p-12 text-center bg-white/60">
            <p className="font-body text-[15px] text-muted">
              No case studies in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
