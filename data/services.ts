export type Accent = "violet" | "cyanx" | "coral" | "lime";

export interface Service {
  id: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  accent: Accent;
  icon: string;
}

export const categories = ["Insights", "Presence", "Strategy", "Systems"] as const;

export const services: Service[] = [
  {
    id: "presentations",
    category: "Presence",
    name: "Presentations",
    tagline: "Decks built to be presented, not just read",
    description:
      "Pitch decks, sales presentations, and internal reports designed to carry an argument from open to close.",
    accent: "coral",
    icon: "Presentation",
  },
  {
    id: "business-dashboards",
    category: "Insights",
    name: "Business Dashboards",
    tagline: "Power BI, Looker, Excel, or HTML",
    description:
      "Dashboards built on the platform that fits your team, hosted locally or published for the whole company to see.",
    accent: "cyanx",
    icon: "LayoutDashboard",
  },
  {
    id: "websites",
    category: "Presence",
    name: "Websites",
    tagline: "Built, launched, and kept current",
    description:
      "Design and development for business websites, plus ongoing management once it's live.",
    accent: "coral",
    icon: "Globe",
  },
  {
    id: "business-consultancy",
    category: "Strategy",
    name: "Business Consultancy",
    tagline: "A second set of eyes on the hard calls",
    description:
      "Advisory support on operations and growth planning, brought in where you need outside judgment.",
    accent: "violet",
    icon: "Compass",
  },
  {
    id: "marketing-sales-strategy",
    category: "Strategy",
    name: "Marketing & Sales Strategy",
    tagline: "A plan for reaching and closing",
    description:
      "Go-to-market and sales-process strategy shaped around your market, not a generic playbook.",
    accent: "violet",
    icon: "TrendingUp",
  },
  {
    id: "business-documents",
    category: "Strategy",
    name: "Business Documents",
    tagline: "The paperwork that keeps a company running",
    description:
      "Creation and ongoing management of SOPs, policies, proposals, and other core documentation.",
    accent: "violet",
    icon: "FileText",
  },
  {
    id: "business-analysis",
    category: "Insights",
    name: "Business Analysis",
    tagline: "Structured reads on process and performance",
    description:
      "A close look at how a process, team, or data set is actually performing, with findings you can act on.",
    accent: "cyanx",
    icon: "BarChart3",
  },
  {
    id: "erp-development",
    category: "Systems",
    name: "ERP Development",
    tagline: "Odoo, or built from scratch",
    description:
      "ERP systems on Odoo or custom code, scoped to the business functions that actually need covering.",
    accent: "lime",
    icon: "Boxes",
  },
  {
    id: "business-apps",
    category: "Systems",
    name: "Business Apps",
    tagline: "Software for one specific job",
    description:
      "Purpose-built apps for a business need that off-the-shelf software doesn't quite solve.",
    accent: "lime",
    icon: "AppWindow",
  },
];

export function getService(id: string) {
  return services.find((s) => s.id === id);
}
