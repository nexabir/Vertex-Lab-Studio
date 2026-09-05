"use client";

import { BarChart3, Monitor, Layers, Settings } from "lucide-react";

const nodes = [
  { label: "Strategy", sub: "Plan smarter", color: "#6D4AFF", bg: "rgba(109,74,255,0.12)", icon: BarChart3, y: 18 },
  { label: "Insights", sub: "See clearer", color: "#17C3E6", bg: "rgba(23,195,230,0.12)", icon: Monitor, y: 38 },
  { label: "Presence", sub: "Show stronger", color: "#FF6B4A", bg: "rgba(255,107,74,0.12)", icon: Layers, y: 60 },
  { label: "Systems", sub: "Work smarter", color: "#7A9A0E", bg: "rgba(198,241,53,0.18)", icon: Settings, y: 82 },
];

export function ProblemHub() {
  return (
    <div className="relative w-full h-full min-h-[280px]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        {nodes.map((n, i) => (
          <path
            key={n.label}
            d={`M 10 50 C 40 50, 30 ${n.y}, 62 ${n.y}`}
            fill="none"
            stroke={n.color}
            strokeWidth="0.6"
            opacity="0.8"
          />
        ))}
      </svg>
      <div
        className="absolute rounded-full"
        style={{
          left: "10%", top: "50%", width: 18, height: 18, transform: "translate(-50%,-50%)",
          background: "#14131F", boxShadow: "0 0 0 6px rgba(20,19,31,0.08), 0 0 24px rgba(109,74,255,0.5)",
        }}
      />
      {nodes.map((n) => {
        const Icon = n.icon;
        return (
          <div
            key={n.label}
            className="absolute flex items-center gap-2.5 rounded-full pl-2 pr-4 py-2 bg-white border border-line shadow-card"
            style={{ left: "62%", top: `${n.y}%`, transform: "translateY(-50%)" }}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: n.bg, color: n.color }}
            >
              <Icon size={15} />
            </span>
            <span>
              <span className="block font-display text-[13.5px] font-medium text-ink leading-tight">{n.label}</span>
              <span className="block font-body text-[11px] text-muted leading-tight">{n.sub}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
