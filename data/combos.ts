export interface Combo {
  id: string;
  name: string;
  summary: string;
  serviceIds: string[];
  accent: "violet" | "cyanx" | "coral" | "lime";
}

export const combos: Combo[] = [
  {
    id: "launch-kit",
    name: "Launch Kit",
    summary:
      "Everything a new venture needs to show up ready: a site, a pitch deck, and the core paperwork.",
    serviceIds: ["websites", "presentations", "business-documents"],
    accent: "violet",
  },
  {
    id: "insight-engine",
    name: "Insight Engine",
    summary:
      "Turn scattered data into decisions, with a dashboard, the analysis behind it, and a consultant to interpret it.",
    serviceIds: ["business-dashboards", "business-analysis", "business-consultancy"],
    accent: "cyanx",
  },
  {
    id: "operations-core",
    name: "Operations Core",
    summary:
      "The systems layer: an ERP, the internal apps your team actually uses, and analysis to keep it tuned.",
    serviceIds: ["erp-development", "business-apps", "business-analysis"],
    accent: "coral",
  },
  {
    id: "go-to-market",
    name: "Go-To-Market",
    summary:
      "Position, publish, and pitch — the three things a market push needs in place before anything else.",
    serviceIds: ["marketing-sales-strategy", "websites", "presentations"],
    accent: "lime",
  },
];

export function getCombo(id: string) {
  return combos.find((c) => c.id === id);
}
