"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Download, CheckCircle2 } from "lucide-react";
import { Anmi } from "@/components/Anmi";
import { Button } from "@/components/Button";
import { useSelection } from "@/context/SelectionContext";
import { combos } from "@/data/combos";
import {
  problemStatements,
  scoreServices,
  categoryBreakdown,
  RankedService,
} from "@/data/problem-tracker";

const categories = ["Insights", "Presence", "Strategy", "Systems"] as const;
const categoryColor: Record<string, string> = {
  Insights: "#17C3E6",
  Presence: "#FF6B4A",
  Strategy: "#6D4AFF",
  Systems: "#7A9A0E",
};

type Phase = "select" | "preview" | "gate" | "results";

export default function ProblemTrackerPage() {
  const [phase, setPhase] = useState<Phase>("select");
  const [selected, setSelected] = useState<string[]>([]);
  const [freeText, setFreeText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { setAll, getService } = useSelection();
  const router = useRouter();

  const ranked = useMemo(() => scoreServices(selected, freeText), [selected, freeText]);
  const breakdown = useMemo(() => categoryBreakdown(selected), [selected]);
  const topServices = ranked.slice(0, 4);

  const matchedCombo = useMemo(() => {
    const topIds = new Set(topServices.map((r) => r.id));
    return combos.find((c) => c.serviceIds.every((id) => topIds.has(id))) ?? null;
  }, [topServices]);

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  async function handleGateSubmit() {
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/problem-tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          selectedProblems: selected,
          freeText,
          recommendedServices: topServices.map((r) => r.id),
          matchedCombo: matchedCombo?.id ?? null,
        }),
      });
    } catch {
      // Non-blocking — still show results even if storage failed
    }
    setSubmitting(false);
    setPhase("results");
  }

  function goToRequest() {
    setAll(topServices.map((r) => r.id));
    router.push("/request");
  }

  async function downloadPdf() {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    let y = 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Vertex Lab Studio — Business Problem Report", 14, y);
    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Prepared for ${name}${company ? ` — ${company}` : ""}`, 14, y);
    y += 12;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Problems identified", 14, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    selected.forEach((id) => {
      const stmt = problemStatements.find((p) => p.id === id);
      if (!stmt) return;
      const lines = doc.splitTextToSize(`- ${stmt.text}`, 180);
      doc.text(lines, 14, y);
      y += lines.length * 5 + 1;
    });

    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Recommended solutions", 14, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    topServices.forEach((r) => {
      const service = getService(r.id);
      const lines = doc.splitTextToSize(`- ${service?.name ?? r.id}`, 180);
      doc.text(lines, 14, y);
      y += lines.length * 5 + 1;
    });

    doc.save("vertex-lab-studio-business-problem-report.pdf");
  }

  return (
    <div className="max-w-content mx-auto px-6 pt-[150px] pb-28">
      <div className="max-w-[720px] mx-auto">
        {phase === "select" && (
          <>
            <div className="flex items-center gap-4 mb-8">
              <Anmi pose="pointing-forward" size={64} />
              <div>
                <p className="font-body text-[12px] font-semibold tracking-[0.14em] uppercase text-muted mb-1.5">
                  Business Problem Tracker
                </p>
                <h1 className="font-display text-[26px] sm:text-[30px] font-medium text-ink">
                  What isn&rsquo;t working?
                </h1>
              </div>
            </div>
            <p className="font-body text-[14.5px] text-muted mb-10 max-w-[520px]">
              Check anything that sounds familiar. No pressure, no sales call — just tell us
              what&rsquo;s happening and we&rsquo;ll show you where it usually leads.
            </p>

            {categories.map((cat) => (
              <div key={cat} className="mb-9">
                <h2 className="font-display text-[15px] font-medium text-ink mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: categoryColor[cat] }} />
                  {cat}
                </h2>
                <div className="space-y-2.5">
                  {problemStatements.filter((p) => p.category === cat).map((p) => (
                    <label
                      key={p.id}
                      className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5 cursor-pointer hover:border-ink transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selected.includes(p.id)}
                        onChange={() => toggle(p.id)}
                        className="mt-0.5"
                      />
                      <span className="font-body text-[14px] text-ink-soft leading-snug">{p.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="mb-10">
              <label className="block font-body text-[13px] font-medium text-ink mb-2">
                Anything else, in your own words? (optional)
              </label>
              <textarea
                rows={3}
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                placeholder="Describe anything not covered above..."
                className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] resize-none focus:border-ink outline-none"
              />
            </div>

            <Button
              onClick={() => setPhase("preview")}
              disabled={selected.length === 0 && !freeText.trim()}
              size="lg"
            >
              See where this leads <ArrowRight size={16} />
            </Button>
          </>
        )}

        {phase === "preview" && (
          <div className="text-center">
            <Anmi pose="thinking-happy" size={110} className="mx-auto mb-6" />
            <h1 className="font-display text-[26px] sm:text-[30px] font-medium text-ink mb-3">
              Here&rsquo;s where your problems live
            </h1>
            <p className="font-body text-[14.5px] text-muted mb-10 max-w-[440px] mx-auto">
              Based on what you checked, your challenges cluster here. Get your full,
              ranked report next — free, just needs an email to send it to.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-[480px] mx-auto">
              {categories.map((cat) => (
                <div key={cat} className="rounded-xl border border-line bg-white p-4">
                  <p className="font-display text-[24px] font-semibold mb-1" style={{ color: categoryColor[cat] }}>
                    {breakdown[cat]}
                  </p>
                  <p className="font-body text-[11.5px] text-muted">{cat}</p>
                </div>
              ))}
            </div>
            <Button onClick={() => setPhase("gate")} size="lg">
              Get my full report <ArrowRight size={16} />
            </Button>
          </div>
        )}

        {phase === "gate" && (
          <div className="max-w-[420px] mx-auto text-center">
            <Anmi pose="standing-relaxed" size={100} className="mx-auto mb-6" />
            <h1 className="font-display text-[24px] font-medium text-ink mb-3">
              Where should we send it?
            </h1>
            <p className="font-body text-[14px] text-muted mb-8">
              Your ranked recommendations, ready to view now and download as a PDF.
            </p>
            <div className="space-y-4 text-left mb-8">
              <div>
                <label className="block font-body text-[13px] font-medium text-ink mb-2">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none" />
              </div>
              <div>
                <label className="block font-body text-[13px] font-medium text-ink mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none" />
              </div>
              <div>
                <label className="block font-body text-[13px] font-medium text-ink mb-2">Company (optional)</label>
                <input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none" />
              </div>
            </div>
            <Button onClick={handleGateSubmit} disabled={!name.trim() || !email.trim() || submitting} size="lg" className="w-full">
              {submitting ? "Preparing…" : "Show my report"}
            </Button>
          </div>
        )}

        {phase === "results" && (
          <div>
            <div className="flex items-center gap-4 mb-10">
              <Anmi pose="celebrating" size={72} />
              <div>
                <p className="font-body text-[12px] font-semibold tracking-[0.14em] uppercase text-muted mb-1">
                  Your report
                </p>
                <h1 className="font-display text-[24px] sm:text-[28px] font-medium text-ink">
                  Here&rsquo;s what would help
                </h1>
              </div>
            </div>

            {matchedCombo && (
              <div className="rounded-xl2 border border-violet/30 bg-violet/5 p-5 mb-6">
                <p className="font-body text-[12px] font-semibold text-violet uppercase tracking-[0.08em] mb-1.5">
                  Matches a pre-built combo
                </p>
                <p className="font-display text-[17px] font-medium text-ink mb-1">{matchedCombo.name}</p>
                <p className="font-body text-[13.5px] text-ink-soft">{matchedCombo.summary}</p>
              </div>
            )}

            <div className="space-y-3 mb-10">
              {topServices.map((r, i) => {
                const service = getService(r.id);
                if (!service) return null;
                return (
                  <div key={r.id} className="rounded-xl border border-line bg-white p-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-display text-[16px] font-medium text-ink">
                        {i + 1}. {service.name}
                      </h3>
                    </div>
                    <p className="font-body text-[13.5px] text-ink-soft mb-2">{service.description}</p>
                    <p className="font-body text-[12px] text-muted italic">
                      Because: {r.reasons.slice(0, 2).join("; ")}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl2 bg-cream/60 border border-line p-6 flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button onClick={downloadPdf} variant="secondary">
                <Download size={15} /> Download PDF report
              </Button>
              <Button onClick={goToRequest}>
                Contact us to implement <ArrowRight size={15} />
              </Button>
            </div>
            <p className="font-body text-[12px] text-muted text-center mt-4">
              Both are optional — this report is yours either way.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
