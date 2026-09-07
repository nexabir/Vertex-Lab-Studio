import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Zap, BarChart3, Boxes, Laptop } from "lucide-react";
import { Eyebrow } from "./Eyebrow";

interface PackageOffer {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  timeline: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  icon: React.ElementType;
  deliverables: string[];
  ctaText: string;
  requestServices: string[];
}

const flagshipOffers: PackageOffer[] = [
  {
    id: "rapid-mvp",
    badge: "Most Popular for Founders",
    title: "Rapid Web & App MVP",
    tagline: "Turn your validated idea into a live, scalable digital product in weeks.",
    timeline: "3–4 weeks delivery",
    accent: "text-violet",
    accentBg: "bg-violet/10",
    accentBorder: "border-violet/20",
    icon: Laptop,
    deliverables: [
      "Custom responsive Next.js web application",
      "Full Auth & database architecture (Supabase / PostgreSQL)",
      "Interactive customer onboarding & payment integration",
      "Production deployment with CI/CD & analytics",
    ],
    ctaText: "Start Rapid MVP",
    requestServices: ["websites", "business-apps"],
  },
  {
    id: "bi-command-center",
    badge: "High ROI for Scaling Teams",
    title: "BI & Analytics Command Center",
    tagline: "Stop drowning in scattered spreadsheets. Automated clarity on every KPI.",
    timeline: "1–2 weeks delivery",
    accent: "text-[#0B93AE]",
    accentBg: "bg-cyanx/10",
    accentBorder: "border-cyanx/20",
    icon: BarChart3,
    deliverables: [
      "Executive Looker / Power BI / custom web dashboards",
      "Automated pipeline syncing CRM, ERP, and sales data",
      "Role-based views for Leadership vs. Ops managers",
      "Scheduled KPI summary emails & alert thresholds",
    ],
    ctaText: "Deploy BI Center",
    requestServices: ["business-dashboards", "business-analysis"],
  },
  {
    id: "erp-ops-automation",
    badge: "Enterprise Operations",
    title: "ERP & Workflow Modernization",
    tagline: "Unify inventory, order fulfillment, invoicing, and client records in one hub.",
    timeline: "4–6 weeks delivery",
    accent: "text-[#7A9A0E]",
    accentBg: "bg-lime/20",
    accentBorder: "border-lime/30",
    icon: Boxes,
    deliverables: [
      "Odoo setup or custom micro-ERP tailored to workflow",
      "Automated procurement, invoicing & delivery tracking",
      "Granular team permissions & audit logs",
      "Legacy data migration & team training session",
    ],
    ctaText: "Modernize Operations",
    requestServices: ["erp-development", "business-documents"],
  },
];

export function FlagshipOffers() {
  return (
    <section className="max-w-content mx-auto px-6 py-24 scroll-mt-20" id="flagship-solutions">
      <div className="text-center mb-16">
        <Eyebrow>Flagship Solutions</Eyebrow>
        <h2 className="font-display text-[32px] sm:text-[40px] font-medium text-ink max-w-[680px] mx-auto mb-4">
          Three engineered paths to solve business bottlenecks
        </h2>
        <p className="font-body text-[15px] text-muted max-w-[520px] mx-auto">
          Skip generic agencies. Choose a battle-tested package designed for immediate clarity, measurable ROI, and fast delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {flagshipOffers.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <div
              key={pkg.id}
              className={`rounded-2xl border ${pkg.accentBorder} bg-white p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
            >
              {/* Badge */}
              <div className="mb-6 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase ${pkg.accentBg} ${pkg.accent}`}>
                  <Zap size={12} /> {pkg.badge}
                </span>
                <span className="inline-flex items-center gap-1 font-body text-[12px] text-muted font-medium">
                  <Clock size={12} /> {pkg.timeline}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="mb-6">
                <div className={`w-11 h-11 rounded-xl ${pkg.accentBg} ${pkg.accent} flex items-center justify-center mb-4`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-[22px] font-semibold text-ink mb-2">
                  {pkg.title}
                </h3>
                <p className="font-body text-[14px] text-muted leading-relaxed">
                  {pkg.tagline}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="border-t border-line pt-6 mb-8 flex-1">
                <p className="font-body text-[12px] font-semibold uppercase tracking-wider text-ink mb-3.5">
                  What&rsquo;s included:
                </p>
                <ul className="space-y-3">
                  {pkg.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 font-body text-[13px] text-ink-soft leading-snug">
                      <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${pkg.accent}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div>
                <Link
                  href={`/request?services=${pkg.requestServices.join(",")}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink hover:bg-ink/90 text-cream px-5 py-3 font-body text-[14px] font-medium transition-colors"
                >
                  {pkg.ctaText} <ArrowRight size={14} />
                </Link>
                <p className="font-body text-[11px] text-center text-muted mt-2.5">
                  Direct kickoff brief &bull; No commitment discovery
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
