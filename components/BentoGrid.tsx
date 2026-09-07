"use client";

import {
  Layers,
  Sparkles,
  TrendingUp,
  Cpu,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { SocialProofStats } from "@/lib/data";

interface BentoGridProps {
  stats?: SocialProofStats;
}

export function BentoGrid({
  stats = {
    projectsDelivered: "48+",
    uptimeGuarantee: "99.9%",
    avgSprintWeeks: "2-3 wks",
    clientRetention: "100%",
  },
}: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Bento Card 1: Main Feature (Spans 2 columns) */}
      <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:p-10 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all shadow-xl group">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyanx animate-ping" />
            <span className="font-body text-[11px] font-bold uppercase tracking-wider text-cyanx">
              Unrivaled Technical Range
            </span>
          </div>
          <h3 className="font-display text-[26px] md:text-[32px] font-semibold text-cream leading-tight mb-4">
            One engineering studio instead of four fragmented vendors.
          </h3>
          <p className="font-body text-[15px] text-cream/65 leading-relaxed max-w-[540px]">
            Eliminate communication gaps between your web agency, ERP developer, BI analyst, and business consultant. Vertex Lab Studio routes your entire digital ecosystem through a single point of technical ownership.
          </p>
        </div>

        {/* Mini Capability Stack */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="w-2 h-2 rounded-full bg-cyanx block mb-2" />
            <p className="font-display text-[13px] font-semibold text-cream">BI & Insights</p>
            <p className="font-body text-[11px] text-cream/40">Real-time metrics</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="w-2 h-2 rounded-full bg-lime block mb-2" />
            <p className="font-display text-[13px] font-semibold text-cream">Custom ERP</p>
            <p className="font-body text-[11px] text-cream/40">Fulfillment engine</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="w-2 h-2 rounded-full bg-coral block mb-2" />
            <p className="font-display text-[13px] font-semibold text-cream">Web & Portals</p>
            <p className="font-body text-[11px] text-cream/40">High conversion</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="w-2 h-2 rounded-full bg-violet block mb-2" />
            <p className="font-display text-[13px] font-semibold text-cream">Architecture</p>
            <p className="font-body text-[11px] text-cream/40">Scale & security</p>
          </div>
        </div>
      </div>

      {/* Bento Card 2: Live Proof Metrics (1 column) */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all shadow-xl">
        <div>
          <span className="font-body text-[11px] font-bold uppercase tracking-wider text-lime block mb-4">
            Audited Performance
          </span>
          <div className="space-y-6">
            <div>
              <p className="font-display text-[38px] font-bold text-cream tracking-tight">
                {stats.projectsDelivered}
              </p>
              <p className="font-body text-[13px] text-cream/60">Digital Products Deployed</p>
            </div>
            <div>
              <p className="font-display text-[38px] font-bold text-cyanx tracking-tight">
                {stats.avgSprintWeeks}
              </p>
              <p className="font-body text-[13px] text-cream/60">Average Production Runway</p>
            </div>
            <div>
              <p className="font-display text-[38px] font-bold text-lime tracking-tight">
                {stats.uptimeGuarantee}
              </p>
              <p className="font-body text-[13px] text-cream/60">Production SLA & Reliability</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 mt-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 font-body text-[13px] font-semibold text-cream hover:text-cyanx transition-colors"
          >
            Explore Case Studies <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Bento Card 3: Code & Tailored Engineering (1 column) */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all shadow-xl">
        <div>
          <div className="w-9 h-9 rounded-xl bg-violet/20 border border-violet/30 flex items-center justify-center text-violet mb-4">
            <Cpu size={18} />
          </div>
          <h4 className="font-display text-[20px] font-semibold text-cream mb-2">
            Engineered to Brief, Never Copied
          </h4>
          <p className="font-body text-[14px] text-cream/65 leading-relaxed">
            Every database schema, UI workflow, and integration pipeline is written for your exact operational bottlenecks, giving you a defensible technology advantage.
          </p>
        </div>

        <div className="rounded-xl bg-black/40 border border-white/10 p-3.5 font-mono text-[11px] text-cream/80 mt-6">
          <p className="text-lime">// 100% Client Ownership</p>
          <p className="text-cream/60">export const license = &apos;CLIENT_PROPRIETARY&apos;;</p>
          <p className="text-cyanx">export const vendorLockIn = false;</p>
        </div>
      </div>

      {/* Bento Card 4: Structured Intake & Rapid Execution (Spans 2 columns) */}
      <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:p-10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-8 hover:border-white/20 transition-all shadow-xl">
        <div className="space-y-3 max-w-[480px]">
          <div className="flex items-center gap-2">
            <Workflow size={16} className="text-coral" />
            <span className="font-body text-[11px] font-bold uppercase tracking-wider text-coral">
              Frictionless Process
            </span>
          </div>
          <h4 className="font-display text-[22px] md:text-[24px] font-semibold text-cream">
            No endless scoping meetings. Start with clarity in 3 minutes.
          </h4>
          <p className="font-body text-[14px] text-cream/65 leading-relaxed">
            Our interactive problem tracker and guided intake questionnaire extract your technical priorities before call #1, enabling immediate engineering estimates.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href="/problem-tracker"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 text-cream px-5 py-3 text-[13.5px] font-semibold hover:bg-white/20 transition-colors"
          >
            Diagnose Problem
          </Link>
          <Link
            href="/request"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-violet text-cream px-5 py-3 text-[13.5px] font-semibold hover:bg-violet/90 transition-colors shadow-lg"
          >
            Start Request <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
