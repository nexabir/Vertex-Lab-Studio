export interface PortfolioSlot {
  category: string;
  accent: "violet" | "cyanx" | "coral" | "lime";
}

export const portfolioSlots: PortfolioSlot[] = [
  { category: "Business Dashboards", accent: "cyanx" },
  { category: "Websites", accent: "coral" },
  { category: "ERP Development", accent: "lime" },
];
