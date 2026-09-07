import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { ComboCard } from "@/components/ComboCard";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { Anmi } from "@/components/Anmi";
import { PoseCard } from "@/components/PoseCard";
import { AnmiFeatureCard } from "@/components/AnmiFeatureCard";
import { ProblemHub } from "@/components/ProblemHub";
import { HeroProblemSelector } from "@/components/HeroProblemSelector";
import { CapabilitiesTicker } from "@/components/CapabilitiesTicker";
import { InteractiveWorkflow } from "@/components/InteractiveWorkflow";
import { getServices, getCombos } from "@/lib/data";
import { categories, Service } from "@/data/services";
import { problemFinderCategories, howItWorksSteps } from "@/data/problem-finder";

export const dynamic = "force-dynamic";

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
        <div className="relative max-w-content mx-auto px-6 pt-[160px] pb-24 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
          <div>
            <h1 className="font-display text-[38px] sm:text-[48px] lg:text-[54px] leading-[1.08] font-semibold text-cream tracking-tight mb-6">
              Something isn&rsquo;t working in your business?
            </h1>
            <p className="font-body text-[16px] leading-relaxed text-cream/65 max-w-[460px] mb-8">
              Let&rsquo;s make the problem clear first. Vertex Lab Studio helps businesses turn
              unclear challenges into practical digital solutions — one point of contact for
              every digital need.
            </p>
            <HeroProblemSelector />
            <div className="grid grid-cols-4 gap-4 border-t border-cream/10 pt-6 mt-8 max-w-[440px]">
              <div>
                <p className="font-display text-[22px] font-semibold text-cream">{services.length}</p>
                <p className="font-body text-[11px] text-cream/45">Services</p>
              </div>
              <div>
                <p className="font-display text-[22px] font-semibold text-cream">4</p>
                <p className="font-body text-[11px] text-cream/45">Expertise Areas</p>
              </div>
              <div>
                <p className="font-display text-[22px] font-semibold text-cream">1</p>
                <p className="font-body text-[11px] text-cream/45">Point of Contact</p>
              </div>
              <div>
                <p className="font-display text-[22px] font-semibold text-cream">100%</p>
                <p className="font-body text-[11px] text-cream/45">Focused on Growth</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative h-[440px]">
            <div className="absolute right-0 top-0 w-[65%] h-full">
              <ProblemHub />
            </div>
            <div className="absolute left-0 bottom-0 w-[280px]">
              <div className="relative mb-3 ml-2 max-w-[210px] rounded-2xl bg-cream/95 px-4 py-3">
                <p className="font-body text-[12.5px] leading-snug text-ink">
                  Hi! I&rsquo;m Anmi. I&rsquo;ll help you find the right solution.
                </p>
              </div>
              <Anmi pose="crouching-confident-hero" size={280} priority />
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES MARQUEE */}
      <CapabilitiesTicker />

      {/* PROBLEM FINDER */}
      <section className="max-w-content mx-auto px-6 py-28 text-center">
        <Eyebrow>Problem finder</Eyebrow>
        <h2 className="font-display text-[30px] sm:text-[36px] font-medium text-ink mb-3 max-w-[600px] mx-auto">
          Where does the problem live?
        </h2>
        <p className="font-body text-[15px] text-muted max-w-[480px] mx-auto mb-14">
          Not sure which service you need? That&rsquo;s okay. Start with the area that feels
          closest to your challenge.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {problemFinderCategories.map((cat) => (
            <div
              key={cat.category}
              className="rounded-xl2 border border-line p-6 flex flex-col"
              style={{ background: cat.accentBg }}
            >
              <h3 className="font-display text-[18px] font-medium text-ink mb-2">{cat.category}</h3>
              <p className="font-body text-[13.5px] text-ink-soft italic leading-relaxed mb-5">
                &ldquo;{cat.quote}&rdquo;
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {cat.services.map((s) => (
                  <li key={s} className="font-body text-[13px] text-ink-soft flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cat.accent }} />
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services?category=${cat.category}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-medium text-white"
                style={{ background: cat.accent }}
              >
                Explore {cat.category} <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* KIDLIN'S LAW */}
      <section className="bg-cream/40 border-y border-line">
        <div className="max-w-content mx-auto px-6 py-28 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <h2 className="font-display text-[30px] sm:text-[36px] font-medium text-ink mb-4">
              Kidlin&rsquo;s Law
            </h2>
            <p className="font-display text-[20px] sm:text-[22px] font-medium text-ink-soft italic mb-5 max-w-[520px]">
              &ldquo;If you write the problem down clearly, then the matter is half solved.&rdquo;
            </p>
            <p className="font-body text-[14.5px] leading-relaxed text-muted max-w-[520px] mb-8">
              That&rsquo;s how VLS works. We start by understanding your problem, then match it
              with the right expertise to build a practical solution.
            </p>
            <Button href="/problem-tracker" variant="secondary">
              Start Writing Your Problem <ArrowRight size={15} />
            </Button>
          </div>
          <AnmiFeatureCard pose="thinking-casual" size={260} />
        </div>
      </section>

      {/* HOW IT WORKS — Interactive Workflow */}
      <section id="how-it-works" className="max-w-content mx-auto px-6 py-28 scroll-mt-[76px]">
        <div className="text-center mb-12">
          <Eyebrow>How It Works</Eyebrow>
          <h2 className="font-display text-[30px] sm:text-[36px] font-medium text-ink max-w-[600px] mx-auto">
            From Problem to Progress
          </h2>
        </div>
        <InteractiveWorkflow />
      </section>

      {/* SERVICES */}
      <section className="bg-cream/40 border-y border-line">
        <div className="max-w-content mx-auto px-6 py-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
            <h2 className="font-display text-[28px] font-medium text-ink">Full catalog</h2>
            <p className="font-body text-[14px] text-muted max-w-[320px]">
              Select as many as you need — they combine into a single request.
            </p>
          </div>
          {grouped.map(({ cat, items }) => (
            <div key={cat} id={cat.toLowerCase()} className="mb-16 last:mb-0 scroll-mt-[90px]">
              <h2 className="font-display text-[22px] font-medium text-ink mb-6 pb-4 border-b border-line">{cat}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((s) => <ServiceCard key={s.id} service={s} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMBOS */}
      <section className="max-w-content mx-auto px-6 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div className="flex items-center gap-5">
            <AnmiFeatureCard pose="pointing-up-excited" size={110} className="!p-3" />
            <h2 className="font-display text-[30px] sm:text-[34px] font-medium text-ink max-w-[560px]">Pre-built combos</h2>
          </div>
          <Link href="/combos" className="font-body text-[14px] font-medium text-ink-soft hover:text-ink inline-flex items-center gap-1.5">
            View all combos <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {combos.map((c) => <ComboCard key={c.id} combo={c} />)}
        </div>
      </section>

      {/* WHY VLS */}
      <section className="bg-ink">
        <div className="max-w-content mx-auto px-6 py-28 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-14">
          <div>
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
      <section className="max-w-content mx-auto px-6 py-28">
        <div className="text-center mb-14">
          <h2 className="font-display text-[30px] sm:text-[34px] font-medium text-ink">Before you submit a request</h2>
        </div>
        <Faq />
      </section>

      {/* FINAL CTA */}
      <section className="bg-cream/40 border-t border-line">
        <div className="max-w-content mx-auto px-6 py-28 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 items-center">
          <AnmiFeatureCard pose="thumbs-up-portrait" size={220} />
          <div className="text-center lg:text-left">
            <h2 className="font-display text-[28px] sm:text-[32px] font-medium text-ink mb-4">
              Ready to make it clear?
            </h2>
            <p className="font-body text-[15px] text-muted mb-8 max-w-[440px] mx-auto lg:mx-0">
              Write down what&rsquo;s not working and get a tailored proposal back.
            </p>
            <Button href="/problem-tracker" size="lg">
              Write Your Problem <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
