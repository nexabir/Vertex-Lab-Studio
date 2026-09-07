import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Inbox,
  User,
  Calendar,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";

export const dynamic = "force-dynamic";

const statusDetails: Record<
  string,
  { label: string; step: number; color: string; desc: string }
> = {
  new: {
    label: "Received — Awaiting Review",
    step: 1,
    color: "bg-violet/10 text-violet border-violet/20",
    desc: "Your brief is in our intake queue. Lead architect will review within 24 hours.",
  },
  reviewed: {
    label: "Technical Assessment Underway",
    step: 2,
    color: "bg-cyanx/10 text-[#0B93AE] border-cyanx/20",
    desc: "We are scoping engineering feasibility and drafting milestone architecture.",
  },
  proposal_sent: {
    label: "Proposal & Scope Ready",
    step: 3,
    color: "bg-coral/10 text-coral border-coral/20",
    desc: "Detailed scope, runway timeline, and pricing breakdown delivered to your email.",
  },
  won: {
    label: "In Active Development",
    step: 4,
    color: "bg-lime/20 text-[#7A9A0E] border-lime/30",
    desc: "Production sprints underway with weekly staging demonstrations.",
  },
  lost: {
    label: "Archived",
    step: 0,
    color: "bg-line text-muted border-line",
    desc: "This request was closed or superseded.",
  },
};

export default async function ClientDashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="max-w-content mx-auto px-6 pt-[150px] pb-24 text-center">
        <Eyebrow>Client Portal</Eyebrow>
        <h1 className="font-display text-[32px] font-medium text-ink mb-4">
          Client Portal Setup
        </h1>
        <p className="font-body text-[15px] text-muted max-w-[480px] mx-auto mb-8">
          The client portal connects automatically once Supabase is configured.
        </p>
        <Button href="/">Back to Home</Button>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  // Fetch user requests matching user.id or email
  const { data: userRequests } = await supabase
    .from("requests")
    .select("*")
    .or(`user_id.eq.${user.id},contact_email.eq.${user.email}`)
    .order("created_at", { ascending: false });

  const requests = userRequests ?? [];
  const activeCount = requests.filter(
    (r) => r.status !== "lost" && r.status !== "won"
  ).length;

  return (
    <div className="max-w-content mx-auto px-6 pt-[150px] pb-24">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-10 border-b border-line">
        <div>
          <Eyebrow>Client Hub</Eyebrow>
          <h1 className="font-display text-[32px] sm:text-[40px] font-semibold text-ink tracking-tight">
            Welcome back, {profile?.full_name || user.email?.split("@")[0]}
          </h1>
          <p className="font-body text-[15px] text-muted mt-2">
            Track your submitted project briefs, technical assessments, and engineering progress in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button href="/request" size="md">
            Start New Request
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="rounded-xl2 border border-line bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="font-body text-[13px] font-medium">Total Briefs Submitted</span>
            <FileText size={18} className="text-violet" />
          </div>
          <p className="font-display text-[32px] font-bold text-ink">{requests.length}</p>
        </div>

        <div className="rounded-xl2 border border-line bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="font-body text-[13px] font-medium">Active in Review</span>
            <Clock size={18} className="text-cyanx" />
          </div>
          <p className="font-display text-[32px] font-bold text-ink">{activeCount}</p>
        </div>

        <div className="rounded-xl2 border border-line bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="font-body text-[13px] font-medium">Direct Point of Contact</span>
            <Sparkles size={18} className="text-coral" />
          </div>
          <p className="font-display text-[18px] font-semibold text-ink mt-2">Vertex Studio Lead</p>
          <p className="font-body text-[12px] text-muted">Dedicated Architecture Lead</p>
        </div>
      </div>

      {/* Requests Stream */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[22px] font-semibold text-ink">Submitted Projects</h2>
          <span className="font-body text-[13px] text-muted">{requests.length} brief{requests.length === 1 ? "" : "s"} found</span>
        </div>

        {requests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-white/70 p-12 text-center">
            <Inbox size={36} className="mx-auto text-muted mb-3" />
            <p className="font-display text-[18px] font-medium text-ink mb-1">
              No project briefs submitted yet
            </p>
            <p className="font-body text-[14px] text-muted max-w-[420px] mx-auto mb-6">
              When you submit a guided request or diagnose a problem with the Problem Tracker, your scope and status will appear here.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button href="/problem-tracker" variant="secondary">
                Diagnose a Problem
              </Button>
              <Button href="/request">Start a Request</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((req) => {
              const status = statusDetails[req.status] || statusDetails.new;
              const dateStr = new Date(req.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={req.id}
                  className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-xs hover:shadow-card transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-line">
                    <div>
                      <span className="font-body text-[11px] font-mono text-muted uppercase tracking-wider block mb-1">
                        Brief #{req.id.slice(0, 8)} • Submitted {dateStr}
                      </span>
                      <h3 className="font-display text-[20px] font-semibold text-ink">
                        {req.company ? `${req.company} — ` : ""}
                        {(req.service_ids ?? []).length} Required Service{req.service_ids?.length === 1 ? "" : "s"}
                      </h3>
                    </div>

                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold border ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Stepper */}
                  <div className="py-6 border-b border-line">
                    <p className="font-body text-[12px] font-bold text-muted uppercase tracking-wider mb-4">
                      Execution Milestones
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { step: 1, label: "1. Brief Received" },
                        { step: 2, label: "2. Architecture Scoped" },
                        { step: 3, label: "3. Proposal & Timeline" },
                        { step: 4, label: "4. Production Sprints" },
                      ].map((s) => {
                        const isDone = status.step >= s.step;
                        const isCurrent = status.step === s.step;
                        return (
                          <div
                            key={s.step}
                            className={`p-3 rounded-xl border text-[12px] font-medium transition-all ${
                              isDone
                                ? "border-[#7A9A0E]/30 bg-[#7A9A0E]/5 text-[#7A9A0E]"
                                : isCurrent
                                ? "border-violet bg-violet/5 text-violet font-semibold"
                                : "border-line bg-cream/30 text-muted"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              {isDone ? (
                                <CheckCircle2 size={13} />
                              ) : (
                                <Clock size={13} />
                              )}
                              <span>{s.label}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="font-body text-[13px] text-ink-soft mt-3 bg-cream/40 p-3 rounded-lg border border-line/60">
                      <strong>Current Phase:</strong> {status.desc}
                    </p>
                  </div>

                  {/* Services & Contact Breakdown */}
                  <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="font-body text-[11px] font-bold text-muted uppercase tracking-wider block mb-2">
                        Configured Modules
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(req.service_ids ?? []).map((slug: string) => (
                          <span
                            key={slug}
                            className="px-2.5 py-1 rounded-md bg-cream text-ink text-[12px] font-medium border border-line"
                          >
                            {slug.replace(/-/g, " ")}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 font-body text-[13px] font-medium text-violet hover:underline"
                      >
                        Ask Architecture Lead <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
