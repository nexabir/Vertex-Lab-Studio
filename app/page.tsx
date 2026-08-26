import Link from "next/link";
import { ArrowRight, ArrowDown, BarChart3, Globe, Compass, Boxes } from "lucide-react";
import { RaysMark } from "@/components/RaysMark";
import { ServiceCard } from "@/components/ServiceCard";
import { ComboCard } from "@/components/ComboCard";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { getServices, getCombos } from "@/lib/data";
import { categories, Service } from "@/data/services";

export const dynamic = "force-dynamic";

const categoryMeta: Record<string, { desc: string; icon: typeof BarChart3 }> = {
  Insights: { desc: "Dashboards and analysis that turn data into decisions.", icon: BarChart3 },
  Presence: { desc: "Sites and decks that represent you well.", icon: Globe },
  Strategy: { desc: "The plans and paperwork that guide the business.", icon: Compass },
  Systems: { desc: "ERP and apps that run day-to-day operations.", icon: Boxes },
};

const steps = [
  { n: "01", title: "Browse services", desc: "Find the products that match your need in the catalog below.", accent: "#6D4AFF" },
  { n: "02", title: "Answer the brief", desc: "A short guided questionnaire captures your requirements.", accent: "#17C3E6" },
  { n: "03", title: "Get a proposal", desc: "We review your answers and propose the right solution.", accent: "#FF6B4A" },
  { n: "04", title: "Delivery", desc: "We build it and hand off, ready to use.", accent: "#7A9A0E" },
];

const whyPoints = [
  { title: "One point of contact", desc: "Every digital need — dashboards, ERP, web, strategy — routes through a single studio instead of a different vendor for each." },
  { title: "Built to your brief", desc: "Solutions are scoped from your actual questionnaire answers, not assembled from a fixed template." },
  { title: "Technical range", desc: "One team spans BI tooling, ERP platforms, web development, and business strategy." },
  { title: "Structured intake", desc: "A guided questionnaire replaces scattered emails and calls before any work begins." },
];

export default async function HomePage() {
  const services = await getServices();
  const combos = await getCombos();
  const grouped = categories.map((cat) => ({
    cat,
    items: services.filter((s: Service) => s.category === cat),
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-violet/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-coral/10 blur-[100px]" />
        <div className="relative max-w-content mx-auto px-6 pt-[168px] pb-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <Eyebrow dark>Digital products for business development</Eyebrow>
            <h1 className="font-display text-[40px] sm:text-[52px] lg:text-[58px] leading-[1.05] font-semibold text-cream tracking-tight mb-6">
              Where business problems meet engineered solutions.
            </h1>
            <p className="font-body text-[17px] leading-relaxed text-cream/65 max-w-[480px] mb-9">
              Vertex Lab Studio is a digital products studio: dashboards, ERP, websites,
              strategy, and more — offered as a catalog you can mix into exactly the
              solution your business needs.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <a href="#categories">
                <Button variant="primary" size="lg" className="!bg-cream !text-ink hover:!bg-white">
                  Browse services <ArrowDown size={16} />
                </Button>
              </a>
              <Button href="/combos" variant="ghost" size="lg" className="!text-cream/80 hover:!text-cream">
                See combo bundles <ArrowRight size={16} />
              </Button>
            </div>
            <div className="flex items-center gap-8 border-t border-cream/10 pt-6 max-w-[420px]">
              <div>
                <p className="font-display text-[22px] font-medium text-cream">4</p>
                <p className="font-body text-[12px] text-cream/45">Categories</p>
              </div>
              <div>
                <p className="font-display text-[22px] font-medium text-cream">{services.length}</p>
                <p className="font-body text-[12px] text-cream/45">Services</p>
              </div>
              <div>
                <p className="font-display text-[22px] font-medium text-cream">1</p>
                <p className="font-body text-[12px] text-cream/45">Request to submit</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <RaysMark size={280} animated hubColor="#F5F3EE" />
          </div>
        </div>
      </section>

      {/* CATEGORY ORIENTATION */}
      <section id="categories" className="max-w-content mx-auto px-6 py-24 scroll-mt-[76px]">
        <Eyebrow>Four ways in</Eyebrow>
        <h2 className="font-display text-[30px] sm:text-[34px] font-medium text-ink mb-14 max-w-[600px]">
          Start from the category that matches your problem.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const meta = categoryMeta[cat];
            const Icon = meta.icon;
            const count = services.filter((s) => s.category === cat).length;
            return (
              <a
                key={cat}
                href={`#${cat.toLowerCase()}`}
                className="rounded-xl2 border border-line bg-white p-6 hover:shadow-card transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center mb-5">
                  <Icon size={18} strokeWidth={1.75} className="text-ink" />
                </div>
                <h3 className="font-display text-[17px] font-medium text-ink mb-1.5">{cat}</h3>
                <p className="font-body text-[13px] leading-relaxed text-muted mb-3">{meta.desc}</p>
                <p className="font-body text-[12px] text-muted">{count} services →</p>
              </a>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-cream/40 border-y border-line">
        <div className="max-w-content mx-auto px-6 py-24">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display text-[30px] sm:text-[34px] font-medium text-ink mb-14 max-w-[600px]">
            Four steps between "we have a problem" and a delivered solution.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {steps.map((s) => (
              <div key={s.n}>
                <div className="h-[3px] w-10 rounded-full mb-5" style={{ backgroundColor: s.accent }} />
                <p className="font-display text-[26px] font-semibold mb-2" style={{ color: s.accent }}>
                  {s.n}
                </p>
                <h3 className="font-display text-[17px] font-medium text-ink mb-2">{s.title}</h3>
                <p className="font-body text-[14px] leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — grouped by category */}
      <section className="max-w-content mx-auto px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
          <Eyebrow>Full catalog</Eyebrow>
          <p className="font-body text-[14px] text-muted max-w-[320px]">
            Select as many as you need — they combine into a single request.
          </p>
        </div>
        {grouped.map(({ cat, items }) => (
          <div key={cat} id={cat.toLowerCase()} className="mb-16 scroll-mt-[90px]">
            <h2 className="font-display text-[22px] font-medium text-ink mb-6 pb-4 border-b border-line">
              {cat}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* COMBOS */}
      <section className="bg-cream/40 border-y border-line">
        <div className="max-w-content mx-auto px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <Eyebrow>Prefer a starting point?</Eyebrow>
              <h2 className="font-display text-[30px] sm:text-[34px] font-medium text-ink max-w-[560px]">
                Pre-built combos
              </h2>
            </div>
            <Link href="/combos" className="font-body text-[14px] font-medium text-ink-soft hover:text-ink inline-flex items-center gap-1.5">
              View all combos <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {combos.map((c) => (
              <ComboCard key={c.id} combo={c} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY VLS */}
      <section className="bg-ink">
        <div className="max-w-content mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-14">
          <div>
            <Eyebrow dark>Why Vertex Lab Studio</Eyebrow>
            <h2 className="font-display text-[30px] sm:text-[34px] font-medium text-cream max-w-[400px]">
              A studio built around one intake, not one specialty.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
            {whyPoints.map((p) => (
              <div key={p.title}>
                <h3 className="font-display text-[17px] font-medium text-cream mb-2">{p.title}</h3>
                <p className="font-body text-[14px] leading-relaxed text-cream/55">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-content mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="font-display text-[30px] sm:text-[34px] font-medium text-ink">
            Before you submit a request
          </h2>
        </div>
        <Faq />
      </section>

      {/* FINAL CTA */}
      <section className="max-w-content mx-auto px-6 py-24 text-center">
        <h2 className="font-display text-[28px] sm:text-[32px] font-medium text-ink mb-5">
          Know what you need? Start your request.
        </h2>
        <p className="font-body text-[15px] text-muted mb-9 max-w-[440px] mx-auto">
          Pick one service or several — the guided brief adjusts to whatever you've selected.
        </p>
        <Button href="/request" size="lg">
          Start a request <ArrowRight size={16} />
        </Button>
      </section>
    </>
  );
}
