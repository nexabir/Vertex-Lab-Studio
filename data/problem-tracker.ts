// Business Problem Tracker — the matching logic.
// Transparent, rule-based scoring: every checked problem statement and every
// matched keyword casts a weighted vote for a service. No black-box claims —
// this is deliberately explainable, so "why was this recommended" always has
// a real answer (see `reasons` in the result).

export interface ProblemStatement {
  id: string;
  category: "Insights" | "Presence" | "Strategy" | "Systems";
  text: string;
  services: { id: string; weight: number }[];
}

export const problemStatements: ProblemStatement[] = [
  // Insights
  { id: "no-profit-visibility", category: "Insights", text: "I can't tell which parts of my business are actually making money.",
    services: [{ id: "business-analysis", weight: 2 }, { id: "business-dashboards", weight: 1 }] },
  { id: "gut-feel-decisions", category: "Insights", text: "My team makes decisions based on gut feeling, not data.",
    services: [{ id: "business-dashboards", weight: 2 }] },
  { id: "scattered-data", category: "Insights", text: "I have data everywhere but no single place to see it.",
    services: [{ id: "business-dashboards", weight: 2 }] },
  { id: "unclear-trends", category: "Insights", text: "I don't know why a recent number went up or down.",
    services: [{ id: "business-analysis", weight: 2 }] },

  // Presence
  { id: "no-website", category: "Presence", text: "My business doesn't have a professional website yet.",
    services: [{ id: "websites", weight: 2 }] },
  { id: "outdated-website", category: "Presence", text: "My website looks outdated or doesn't work well on phones.",
    services: [{ id: "websites", weight: 2 }] },
  { id: "no-pitch-deck", category: "Presence", text: "I don't have a proper deck to pitch investors or big clients.",
    services: [{ id: "presentations", weight: 2 }] },
  { id: "weak-online-presence", category: "Presence", text: "My online presence doesn't match how good my work actually is.",
    services: [{ id: "websites", weight: 1 }, { id: "presentations", weight: 1 }] },

  // Strategy
  { id: "no-sales-plan", category: "Strategy", text: "I don't have a clear plan for growing sales.",
    services: [{ id: "marketing-sales-strategy", weight: 2 }] },
  { id: "undocumented-process", category: "Strategy", text: "My business processes only exist in my head, not on paper.",
    services: [{ id: "business-documents", weight: 2 }] },
  { id: "need-outside-opinion", category: "Strategy", text: "I'm making a big decision and want an outside opinion first.",
    services: [{ id: "business-consultancy", weight: 2 }] },
  { id: "random-marketing", category: "Strategy", text: "My marketing feels random, not part of a real plan.",
    services: [{ id: "marketing-sales-strategy", weight: 2 }] },

  // Systems
  { id: "manual-tracking", category: "Systems", text: "My team still tracks things manually in spreadsheets or paper.",
    services: [{ id: "erp-development", weight: 1 }, { id: "business-apps", weight: 1 }] },
  { id: "disconnected-systems", category: "Systems", text: "Different parts of my business don't talk to each other (sales, inventory, accounts).",
    services: [{ id: "erp-development", weight: 2 }] },
  { id: "need-specific-tool", category: "Systems", text: "I need software for one specific job that generic tools don't do.",
    services: [{ id: "business-apps", weight: 2 }] },
  { id: "slow-onboarding", category: "Systems", text: "Onboarding new staff takes too long because nothing is documented or systemized.",
    services: [{ id: "business-documents", weight: 1 }, { id: "erp-development", weight: 1 }] },
];

// Free-text matching — plain keyword lookup, not AI. Kept simple and honest.
export const keywordMap: Record<string, string[]> = {
  website: ["websites"], site: ["websites"], online: ["websites"],
  dashboard: ["business-dashboards"], data: ["business-dashboards", "business-analysis"],
  spreadsheet: ["erp-development", "business-apps"], manual: ["erp-development", "business-apps"],
  pitch: ["presentations"], deck: ["presentations"], presentation: ["presentations"],
  sales: ["marketing-sales-strategy"], marketing: ["marketing-sales-strategy"],
  document: ["business-documents"], sop: ["business-documents"], process: ["business-documents"],
  consult: ["business-consultancy"], advice: ["business-consultancy"],
  strategy: ["business-consultancy", "marketing-sales-strategy"],
  app: ["business-apps"], software: ["business-apps", "erp-development"],
  analysis: ["business-analysis"], performance: ["business-analysis"], profit: ["business-analysis"],
};

export interface RankedService {
  id: string;
  score: number;
  reasons: string[];
}

export function scoreServices(selectedIds: string[], freeText: string): RankedService[] {
  const scores: Record<string, number> = {};
  const reasons: Record<string, string[]> = {};

  const addVote = (serviceId: string, weight: number, reason: string) => {
    scores[serviceId] = (scores[serviceId] ?? 0) + weight;
    reasons[serviceId] = reasons[serviceId] ?? [];
    if (!reasons[serviceId].includes(reason)) reasons[serviceId].push(reason);
  };

  selectedIds.forEach((id) => {
    const stmt = problemStatements.find((p) => p.id === id);
    stmt?.services.forEach(({ id: sid, weight }) => addVote(sid, weight, stmt.text));
  });

  if (freeText.trim()) {
    const lower = freeText.toLowerCase();
    Object.entries(keywordMap).forEach(([keyword, serviceIds]) => {
      if (lower.includes(keyword)) {
        serviceIds.forEach((sid) => addVote(sid, 1, "what you described"));
      }
    });
  }

  return Object.entries(scores)
    .map(([id, score]) => ({ id, score, reasons: reasons[id] ?? [] }))
    .sort((a, b) => b.score - a.score);
}

export function categoryBreakdown(selectedIds: string[]): Record<string, number> {
  const counts: Record<string, number> = { Insights: 0, Presence: 0, Strategy: 0, Systems: 0 };
  selectedIds.forEach((id) => {
    const stmt = problemStatements.find((p) => p.id === id);
    if (stmt) counts[stmt.category] += 1;
  });
  return counts;
}
