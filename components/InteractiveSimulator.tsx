"use client";

import { useState } from "react";
import {
  BarChart3,
  Layers,
  Globe,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Smartphone,
  Monitor,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const biDataSets: Record<string, { month: string; revenue: number; margin: number }[]> = {
  all: [
    { month: "Jan", revenue: 142000, margin: 52000 },
    { month: "Feb", revenue: 168000, margin: 64000 },
    { month: "Mar", revenue: 185000, margin: 73000 },
    { month: "Apr", revenue: 210000, margin: 89000 },
    { month: "May", revenue: 238000, margin: 104000 },
    { month: "Jun", revenue: 275000, margin: 128000 },
  ],
  logistics: [
    { month: "Jan", revenue: 62000, margin: 24000 },
    { month: "Feb", revenue: 74000, margin: 31000 },
    { month: "Mar", revenue: 81000, margin: 36000 },
    { month: "Apr", revenue: 95000, margin: 44000 },
    { month: "May", revenue: 108000, margin: 51000 },
    { month: "Jun", revenue: 129000, margin: 63000 },
  ],
  wholesale: [
    { month: "Jan", revenue: 80000, margin: 28000 },
    { month: "Feb", revenue: 94000, margin: 33000 },
    { month: "Mar", revenue: 104000, margin: 37000 },
    { month: "Apr", revenue: 115000, margin: 45000 },
    { month: "May", revenue: 130000, margin: 53000 },
    { month: "Jun", revenue: 146000, margin: 65000 },
  ],
};

type SimulatorTab = "bi" | "erp" | "web";

export function InteractiveSimulator() {
  const [activeTab, setActiveTab] = useState<SimulatorTab>("bi");

  // BI State
  const [biFilter, setBiFilter] = useState<"all" | "logistics" | "wholesale">("all");

  // ERP State
  const [erpStage, setErpStage] = useState(2);
  const [isSimulating, setIsSimulating] = useState(false);

  // Web Preview State
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  function triggerErpSimulation() {
    setIsSimulating(true);
    setErpStage(0);
    const intervals = [
      setTimeout(() => setErpStage(1), 600),
      setTimeout(() => setErpStage(2), 1400),
      setTimeout(() => setErpStage(3), 2200),
      setTimeout(() => {
        setErpStage(4);
        setIsSimulating(false);
      }, 3000),
    ];
    return () => intervals.forEach(clearTimeout);
  }

  const currentChartData = biDataSets[biFilter];
  const totalRevenue = currentChartData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalMargin = currentChartData.reduce((acc, curr) => acc + curr.margin, 0);

  return (
    <div className="w-full rounded-2xl border border-line bg-white shadow-xl overflow-hidden">
      {/* Top Header & Guidde-Style Tab Switcher */}
      <div className="border-b border-line bg-cream/40 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="font-body text-[12px] font-semibold text-muted tracking-wide uppercase ml-2">
            Interactive Product Simulator — Live VLS Engine
          </span>
        </div>

        {/* Tabs */}
        <div className="flex items-center p-1 bg-cream/80 border border-line/70 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("bi")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
              activeTab === "bi"
                ? "bg-white text-ink shadow-xs font-semibold"
                : "text-muted hover:text-ink"
            }`}
          >
            <BarChart3 size={15} className={activeTab === "bi" ? "text-cyanx" : ""} />
            Executive BI Dashboard
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("erp")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
              activeTab === "erp"
                ? "bg-white text-ink shadow-xs font-semibold"
                : "text-muted hover:text-ink"
            }`}
          >
            <Layers size={15} className={activeTab === "erp" ? "text-lime" : ""} />
            Supply Chain & ERP
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("web")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
              activeTab === "web"
                ? "bg-white text-ink shadow-xs font-semibold"
                : "text-muted hover:text-ink"
            }`}
          >
            <Globe size={15} className={activeTab === "web" ? "text-coral" : ""} />
            High-Conversion Web App
          </button>
        </div>
      </div>

      {/* Simulator Content Body */}
      <div className="p-6 md:p-8 min-h-[460px]">
        {/* ==================== TAB 1: EXECUTIVE BI DASHBOARD ==================== */}
        {activeTab === "bi" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyanx animate-pulse" />
                  <h3 className="font-display text-[19px] font-semibold text-ink">
                    Enterprise Financial & Margin Intelligence
                  </h3>
                </div>
                <p className="font-body text-[13px] text-muted">
                  Interactive real-time model syncing ERP, QuickBooks, and sales pipeline.
                </p>
              </div>

              {/* Filter toggle */}
              <div className="flex items-center gap-2 bg-cream/60 border border-line rounded-lg p-1">
                <span className="font-body text-[12px] text-muted px-2">Segment:</span>
                <button
                  type="button"
                  onClick={() => setBiFilter("all")}
                  className={`px-2.5 py-1 rounded text-[12px] font-medium ${
                    biFilter === "all" ? "bg-white text-ink shadow-2xs" : "text-muted hover:text-ink"
                  }`}
                >
                  Consolidated
                </button>
                <button
                  type="button"
                  onClick={() => setBiFilter("logistics")}
                  className={`px-2.5 py-1 rounded text-[12px] font-medium ${
                    biFilter === "logistics" ? "bg-white text-ink shadow-2xs" : "text-muted hover:text-ink"
                  }`}
                >
                  Fleet & Logistics
                </button>
                <button
                  type="button"
                  onClick={() => setBiFilter("wholesale")}
                  className={`px-2.5 py-1 rounded text-[12px] font-medium ${
                    biFilter === "wholesale" ? "bg-white text-ink shadow-2xs" : "text-muted hover:text-ink"
                  }`}
                >
                  Wholesale & Retail
                </button>
              </div>
            </div>

            {/* Live KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-line bg-cream/20 p-4">
                <p className="font-body text-[12px] text-muted mb-1 flex items-center justify-between">
                  Trailing Revenue
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0B93AE]">
                    <TrendingUp size={12} /> +18.4% YoY
                  </span>
                </p>
                <p className="font-display text-[26px] font-bold text-ink">
                  ${(totalRevenue / 1000).toFixed(1)}k
                </p>
                <p className="font-body text-[11px] text-muted mt-1">Refreshed 4 mins ago via Webhook</p>
              </div>

              <div className="rounded-xl border border-line bg-cream/20 p-4">
                <p className="font-body text-[12px] text-muted mb-1 flex items-center justify-between">
                  Net Operating Margin
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7A9A0E]">
                    <CheckCircle2 size={12} /> Target Exceeded
                  </span>
                </p>
                <p className="font-display text-[26px] font-bold text-ink">
                  ${(totalMargin / 1000).toFixed(1)}k
                </p>
                <p className="font-body text-[11px] text-muted mt-1">Margin yield: 38.6% of gross</p>
              </div>

              <div className="rounded-xl border border-line bg-cream/20 p-4">
                <p className="font-body text-[12px] text-muted mb-1 flex items-center justify-between">
                  Automated Decision Engine
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-violet">
                    <Sparkles size={12} /> Active
                  </span>
                </p>
                <p className="font-display text-[26px] font-bold text-ink">Zero Manual Hours</p>
                <p className="font-body text-[11px] text-muted mt-1">Replaces 12h/wk spreadsheet compilation</p>
              </div>
            </div>

            {/* Recharts Live Visualization */}
            <div className="rounded-xl border border-line bg-paper/60 p-4">
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="font-body text-[12.5px] font-semibold text-ink">
                  Revenue (Dark Ink) vs. Recovered Margin (Cyan)
                </span>
                <span className="font-body text-[11px] text-muted">Click segments above to re-render</span>
              </div>
              <div className="h-[210px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14131F" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#14131F" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#17C3E6" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#17C3E6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE8E0" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#7E7C88" }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#7E7C88" }} tickFormatter={(val) => `$${val / 1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#14131F",
                        borderColor: "#14131F",
                        borderRadius: "8px",
                        color: "#FCFBF8",
                        fontSize: "12px",
                      }}
                      formatter={(val: any) => [`$${Number(val).toLocaleString()}`, ""]}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#14131F" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="margin" stroke="#17C3E6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMargin)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-body text-[13px] text-muted">
                Need customized executive reporting for your operations?
              </span>
              <Link
                href="/request"
                className="inline-flex items-center gap-1.5 font-body text-[13px] font-semibold text-cyanx hover:underline"
              >
                Request Custom BI Solution <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: SUPPLY CHAIN & ERP PIPELINE ==================== */}
        {activeTab === "erp" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                  <h3 className="font-display text-[19px] font-semibold text-ink">
                    Omnichannel ERP & Multi-Warehouse Fulfillment Pipeline
                  </h3>
                </div>
                <p className="font-body text-[13px] text-muted">
                  Simulate live order dispatching, inventory lock, and automated PO replenishment.
                </p>
              </div>

              <button
                type="button"
                onClick={triggerErpSimulation}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-3.5 py-2 font-body text-[12.5px] font-medium text-cream hover:bg-violet transition-colors disabled:opacity-50"
              >
                <RefreshCw size={13} className={isSimulating ? "animate-spin" : ""} />
                {isSimulating ? "Processing Pipeline..." : "Simulate Incoming Order Surge"}
              </button>
            </div>

            {/* Stepper Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { stage: 1, title: "1. Order Intake", desc: "Omnichannel sync from Shopify + EDI wholesale", icon: Clock },
                { stage: 2, title: "2. Inventory Allocated", desc: "Sub-second cross-warehouse lock", icon: CheckCircle2 },
                { stage: 3, title: "3. Barcode Picking", desc: "Zero pick errors via handheld scanner API", icon: Zap },
                { stage: 4, title: "4. Carrier Dispatch", desc: "Auto-label generated with FedEx/DHL API", icon: TrendingUp },
              ].map((step, idx) => {
                const isPassed = erpStage >= idx + 1;
                const isCurrent = erpStage === idx;
                const Icon = step.icon;
                return (
                  <div
                    key={step.stage}
                    className={`rounded-xl p-4 border transition-all ${
                      isPassed
                        ? "border-[#7A9A0E]/30 bg-[#7A9A0E]/5"
                        : isCurrent
                        ? "border-violet bg-violet/5 shadow-xs"
                        : "border-line bg-cream/20 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        isPassed ? "bg-lime text-ink" : "bg-line text-muted"
                      }`}>
                        {step.stage}
                      </span>
                      <Icon size={16} className={isPassed ? "text-[#7A9A0E]" : "text-muted"} />
                    </div>
                    <p className="font-display text-[14px] font-semibold text-ink mb-1">{step.title}</p>
                    <p className="font-body text-[12px] text-muted leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Live Terminal / Transaction Log */}
            <div className="rounded-xl border border-line bg-ink p-4 font-mono text-[12px] text-cream/90 shadow-inner">
              <div className="flex items-center justify-between border-b border-cream/10 pb-2 mb-3">
                <span className="text-cream/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-lime animate-ping" />
                  ERP State Engine Log
                </span>
                <span className="text-cream/40 text-[11px]">Sub-second WebSocket stream</span>
              </div>
              <div className="space-y-1.5 text-cream/70">
                <p className="text-cream/90">
                  <span className="text-lime">[2026-09-07T11:20:01Z]</span> Event: <span className="text-cream font-bold">PO_BATCH_ALLOCATED</span> — Warehouse #02 (East Hub)
                </p>
                <p>
                  <span className="text-cyanx">[2026-09-07T11:20:02Z]</span> Stock reservation: 1,420 units locked | Reorder threshold: OK
                </p>
                <p className="text-[#27C93F]">
                  <span className="text-lime">[2026-09-07T11:20:03Z]</span> Carrier API handshake: Label 94001000281928 generated (Fulfillment latency: 0.18s)
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-body text-[13px] text-muted">
                Replace clunky legacy software with a high-speed custom ERP.
              </span>
              <Link
                href="/request"
                className="inline-flex items-center gap-1.5 font-body text-[13px] font-semibold text-lime hover:underline"
              >
                Scope Your ERP System <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: HIGH-CONVERSION WEB EXPERIENCE ==================== */}
        {activeTab === "web" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                  <h3 className="font-display text-[19px] font-semibold text-ink">
                    High-Conversion Digital Presence & Client Portal
                  </h3>
                </div>
                <p className="font-body text-[13px] text-muted">
                  Instant page speeds, guided intake funnels, and frictionless onboarding.
                </p>
              </div>

              {/* Viewport switch */}
              <div className="flex items-center gap-1 bg-cream/60 border border-line rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setDeviceMode("desktop")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-[12px] font-medium ${
                    deviceMode === "desktop" ? "bg-white text-ink shadow-2xs font-semibold" : "text-muted hover:text-ink"
                  }`}
                >
                  <Monitor size={14} /> Desktop (1440px)
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceMode("mobile")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-[12px] font-medium ${
                    deviceMode === "mobile" ? "bg-white text-ink shadow-2xs font-semibold" : "text-muted hover:text-ink"
                  }`}
                >
                  <Smartphone size={14} /> Mobile (390px)
                </button>
              </div>
            </div>

            {/* Simulated Frame */}
            <div className="flex justify-center">
              <div
                className={`transition-all duration-300 rounded-2xl border-2 border-line bg-paper p-5 shadow-sm ${
                  deviceMode === "desktop" ? "w-full" : "max-w-[360px] w-full"
                }`}
              >
                {/* Simulated Web Nav */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-line">
                  <span className="font-display text-[14px] font-bold tracking-tight text-ink">Acme Digital Pro</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-coral/10 text-coral px-2.5 py-0.5 text-[11px] font-semibold">
                    Live Demo
                  </span>
                </div>

                {/* Simulated Content with Hotspots */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      id: 0,
                      title: "99/100 Core Web Vitals",
                      badge: "Sub-Second Speed",
                      desc: "Zero layout shift, edge-cached static assets, and lightning-quick first contentful paint.",
                    },
                    {
                      id: 1,
                      title: "Guided Intake Funnel",
                      badge: "Conversion Engine",
                      desc: "Step-by-step qualification flow that converts anonymous traffic into qualified leads.",
                    },
                    {
                      id: 2,
                      title: "Authenticated Portal",
                      badge: "Institutional Trust",
                      desc: "Bank-grade client dashboard with real-time status and encrypted document transfer.",
                    },
                  ].map((hotspot) => (
                    <div
                      key={hotspot.id}
                      onClick={() => setActiveHotspot(hotspot.id)}
                      className={`cursor-pointer rounded-xl p-4 border transition-all ${
                        activeHotspot === hotspot.id
                          ? "border-coral bg-coral/5 shadow-xs ring-1 ring-coral/20"
                          : "border-line bg-white hover:border-line/80"
                      }`}
                    >
                      <span className="inline-block font-body text-[10.5px] font-bold uppercase tracking-wider text-coral mb-1">
                        {hotspot.badge}
                      </span>
                      <p className="font-display text-[14px] font-semibold text-ink mb-1">{hotspot.title}</p>
                      <p className="font-body text-[12px] text-muted leading-relaxed">{hotspot.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-body text-[13px] text-muted">
                Transform your company website into a revenue-generating asset.
              </span>
              <Link
                href="/request"
                className="inline-flex items-center gap-1.5 font-body text-[13px] font-semibold text-coral hover:underline"
              >
                Build High-Conversion Web App <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
