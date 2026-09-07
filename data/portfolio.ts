import { Accent } from "@/data/services";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: "Insights" | "Systems" | "Presence" | "Strategy";
  clientName: string;
  summary: string;
  problem: string;
  solution: string;
  metrics: ProjectMetric[];
  tags: string[];
  liveUrl?: string | null;
  coverImageUrl?: string | null;
  accent: Accent;
  sortOrder: number;
  active: boolean;
}

export const staticProjects: PortfolioProject[] = [
  {
    id: "proj-1",
    slug: "executive-bi-revenue-dashboard",
    title: "Unified Executive Revenue & Performance Intelligence",
    category: "Insights",
    clientName: "Apex Logistics Group",
    summary: "Consolidated 6 fragmented data streams into a single real-time executive dashboard for 50+ decision-makers.",
    problem: "Executives were spending 12+ hours every Monday compiling disconnected reports from Stripe, QuickBooks, Excel, and custom warehouses, causing delayed operational decisions and missed margin leakages.",
    solution: "Engineered an automated data ingestion pipeline connected to an interactive high-density BI dashboard with predictive margin alerts, departmental breakdowns, and instant PDF/Slack reporting.",
    metrics: [
      { label: "Report prep time", value: "Zero manual hrs" },
      { label: "Margin recovery", value: "+14.8%" },
      { label: "Active leadership users", value: "52 leaders" }
    ],
    tags: ["Power BI / Supabase", "PostgreSQL ETL", "Real-time WebSockets", "Automated Slack Webhooks"],
    liveUrl: null,
    accent: "cyanx",
    sortOrder: 1,
    active: true,
  },
  {
    id: "proj-2",
    slug: "multi-warehouse-inventory-erp",
    title: "Centralized Multi-Warehouse Supply Chain & ERP Platform",
    category: "Systems",
    clientName: "Nordic Gear Co.",
    summary: "Custom-engineered enterprise resource planning platform unifying purchasing, stock forecasting, and order dispatching.",
    problem: "Rapid omnichannel growth across 4 warehouses led to frequent stockouts, double-allocated inventory, and chaotic paper-based picking workflows costing an estimated $180k in annual delivery penalties.",
    solution: "Built a unified web-first ERP system featuring live barcode scanning, automated PO generation based on seasonal sales velocity, and sub-second inventory sync across retail and wholesale channels.",
    metrics: [
      { label: "Stockout reduction", value: "-86%" },
      { label: "Fulfillment speed", value: "2.4x faster" },
      { label: "Annual cost saved", value: "$165,000" }
    ],
    tags: ["Next.js", "PostgreSQL", "Tailwind CSS", "Hardware Scanner API", "Role-Based Access"],
    liveUrl: null,
    accent: "lime",
    sortOrder: 2,
    active: true,
  },
  {
    id: "proj-3",
    slug: "fintech-customer-portal-presence",
    title: "High-Conversion Platform & Institutional Client Portal",
    category: "Presence",
    clientName: "Vanguard Capital Partners",
    summary: "Complete digital repositioning, marketing engine, and authenticated customer onboarding portal.",
    problem: "The firm was relying on a slow, outdated 2018 WordPress brochure site with a 1.2% inquiry rate and manual PDF email onboarding that scared away tier-1 institutional investors.",
    solution: "Designed and developed a lightning-fast digital presence with interactive ROI calculators, bank-grade secure client document upload portal, and frictionless digital identity verification.",
    metrics: [
      { label: "Inquiry conversion", value: "+185%" },
      { label: "Time to onboard", value: "3 days → 14 mins" },
      { label: "Page speed score", value: "99/100" }
    ],
    tags: ["Next.js App Router", "Tailwind CSS", "Framer Motion", "Supabase Auth & Storage"],
    liveUrl: null,
    accent: "coral",
    sortOrder: 3,
    active: true,
  },
  {
    id: "proj-4",
    slug: "cross-department-operating-strategy",
    title: "Digital Architecture Blueprint & Systems Audit",
    category: "Strategy",
    clientName: "Beacon Health Network",
    summary: "Architectural roadmap eliminating redundant SaaS spend and standardizing compliance for 28 clinics.",
    problem: "Clinics were individually subscribing to conflicting point solutions, resulting in duplicated software expenses exceeding $220k/yr and HIPAA compliance vulnerabilities.",
    solution: "Conducted an end-to-end technical infrastructure audit, drafted a unified microservices roadmap, and negotiated enterprise vendor consolidation with centralized audit logging.",
    metrics: [
      { label: "Annual software savings", value: "$135,000" },
      { label: "Audit compliance", value: "100% HIPAA" },
      { label: "Transition roadmap", value: "6-week rollout" }
    ],
    tags: ["Enterprise Architecture", "Security Audit", "Vendor Consolidation", "Compliance"],
    liveUrl: null,
    accent: "violet",
    sortOrder: 4,
    active: true,
  }
];
