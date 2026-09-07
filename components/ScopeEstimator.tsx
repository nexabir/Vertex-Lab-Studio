"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useSelection } from "@/context/SelectionContext";
import { Button } from "@/components/Button";

interface CapabilityOption {
  id: string;
  name: string;
  category: "Insights" | "Systems" | "Presence" | "Strategy";
  baseWeeks: number;
  serviceId: string;
}

const capabilities: CapabilityOption[] = [
  { id: "bi", name: "Executive BI Dashboard", category: "Insights", baseWeeks: 2, serviceId: "business-dashboard" },
  { id: "erp", name: "Custom ERP & Inventory Pipeline", category: "Systems", baseWeeks: 3.5, serviceId: "erp-development" },
  { id: "web", name: "High-Conversion Web Experience", category: "Presence", baseWeeks: 2, serviceId: "business-website" },
  { id: "strategy", name: "Architecture & Systems Audit", category: "Strategy", baseWeeks: 1.5, serviceId: "technology-roadmap" },
];

const addons = [
  { id: "realtime", label: "Real-Time WebSocket / Webhook Sync", weeks: 0.5, serviceId: "bi-data-cleaning" },
  { id: "migration", label: "Legacy Database & CRM Migration", weeks: 1, serviceId: "odoo-erp-customization" },
  { id: "portal", label: "Client Portal & Auth Permissions", weeks: 1, serviceId: "client-portal" },
  { id: "sla", label: "Dedicated Staging & SLA Guarantee", weeks: 0.5, serviceId: "support-retainer" },
];

export function ScopeEstimator() {
  const router = useRouter();
  const { setAll } = useSelection();

  const [selectedCap, setSelectedCap] = useState<string>("bi");
  const [scale, setScale] = useState<"mvp" | "core" | "enterprise">("core");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["realtime"]);

  const cap = capabilities.find((c) => c.id === selectedCap) ?? capabilities[0];

  const scaleMultiplier = scale === "mvp" ? 0.8 : scale === "core" ? 1 : 1.4;
  const scaleWeeks = cap.baseWeeks * scaleMultiplier;
  const addonWeeks = selectedAddons.reduce((acc, currId) => {
    const found = addons.find((a) => a.id === currId);
    return acc + (found ? found.weeks : 0);
  }, 0);

  const minWeeks = Math.max(1, Math.round(scaleWeeks + addonWeeks - 0.5));
  const maxWeeks = Math.max(minWeeks + 1, Math.round(scaleWeeks + addonWeeks + 1));

  function toggleAddon(id: string) {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function handleTransferToRequest() {
    const serviceIds: string[] = [cap.serviceId];
    selectedAddons.forEach((addonId) => {
      const match = addons.find((a) => a.id === addonId);
      if (match && match.serviceId) serviceIds.push(match.serviceId);
    });
    setAll(serviceIds);
    router.push("/request");
  }

  return (
    <div className="w-full rounded-2xl border border-line bg-white shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left: Interactive Configurator */}
        <div className="p-8 md:p-10 space-y-8 border-b lg:border-b-0 lg:border-r border-line">
          <div>
            <span className="font-body text-[11.5px] font-bold uppercase tracking-wider text-violet mb-2 block">
              1. Choose Core Foundation
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {capabilities.map((item) => {
                const isSelected = selectedCap === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedCap(item.id)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? "border-violet bg-violet/5 ring-2 ring-violet/20 shadow-xs"
                        : "border-line bg-paper hover:bg-cream/40"
                    }`}
                  >
                    <span className="font-body text-[11px] font-semibold text-muted uppercase block mb-1">
                      {item.category}
                    </span>
                    <p className="font-display text-[15px] font-semibold text-ink">{item.name}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="font-body text-[11.5px] font-bold uppercase tracking-wider text-violet mb-2 block">
              2. Select Scope Tier
            </span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "mvp", title: "Rapid MVP", desc: "Core essentials launched fast" },
                { id: "core", title: "Full System", desc: "Comprehensive production build" },
                { id: "enterprise", title: "Enterprise", desc: "Multi-tenant & high concurrency" },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setScale(tier.id as any)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    scale === tier.id
                      ? "border-violet bg-violet/5 ring-1 ring-violet/20 shadow-xs"
                      : "border-line bg-paper hover:bg-cream/40"
                  }`}
                >
                  <p className="font-display text-[14px] font-semibold text-ink">{tier.title}</p>
                  <p className="font-body text-[11px] text-muted mt-1 leading-snug">{tier.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="font-body text-[11.5px] font-bold uppercase tracking-wider text-violet mb-2 block">
              3. Advanced Architecture Add-ons
            </span>
            <div className="space-y-2">
              {addons.map((addon) => {
                const checked = selectedAddons.includes(addon.id);
                return (
                  <label
                    key={addon.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      checked ? "border-ink bg-cream/40" : "border-line bg-paper hover:bg-cream/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAddon(addon.id)}
                        className="rounded text-violet focus:ring-violet"
                      />
                      <span className="font-body text-[13px] text-ink font-medium">{addon.label}</span>
                    </div>
                    <span className="font-body text-[12px] text-muted font-medium">+{addon.weeks} wk</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Calculated Timeline & Instant Transfer */}
        <div className="p-8 md:p-10 bg-ink text-cream flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream/10 text-cream text-[11px] font-medium tracking-wide uppercase mb-4">
                <Clock size={12} className="text-cyanx" /> Estimated Project Runway
              </span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-[44px] font-bold tracking-tight text-cream">
                  {minWeeks}–{maxWeeks}
                </span>
                <span className="font-body text-[20px] text-cream/60">Weeks</span>
              </div>
              <p className="font-body text-[13px] text-cream/55 leading-relaxed">
                From initial intake to production rollout, backed by weekly milestone reviews.
              </p>
            </div>

            <div className="space-y-3.5 border-t border-cream/10 pt-6">
              <div className="flex items-start gap-3">
                <Users size={18} className="text-cyanx shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-[13.5px] font-semibold text-cream">Dedicated Studio Pod</p>
                  <p className="font-body text-[12px] text-cream/50">
                    Lead engineer & solution architect assigned directly to your project.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap size={18} className="text-lime shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-[13.5px] font-semibold text-cream">Weekly Continuous Delivery</p>
                  <p className="font-body text-[12px] text-cream/50">
                    Interactive staging links updated every Friday with tangible progress.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-coral shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-[13.5px] font-semibold text-cream">Clean Code & Ownership</p>
                  <p className="font-body text-[12px] text-cream/50">
                    100% intellectual property transferred to you with zero vendor lock-in.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-cream/10 mt-8">
            <button
              type="button"
              onClick={handleTransferToRequest}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-violet text-cream px-6 py-4 font-body text-[14px] font-semibold hover:bg-violet/90 transition-colors shadow-lg"
            >
              Transfer Scope to Guided Request <ArrowRight size={16} />
            </button>
            <p className="font-body text-[11px] text-cream/40 text-center mt-3">
              Pushes your configuration into the request builder for a tailored proposal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
