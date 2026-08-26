"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Download, Pencil } from "lucide-react";
import { useSelection } from "@/context/SelectionContext";
import type { Service } from "@/data/services";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { accentBg } from "@/lib/accent";

type Contact = { name: string; email: string; phone: string; company: string };
type Answers = Record<string, Record<string, string>>;
type StepDef = { type: "contact" } | { type: "service"; service: Service } | { type: "review" };

export default function RequestPage() {
  const { selected, clear, getService, questions } = useSelection();
  const services = useMemo(
    () => selected.map((id) => getService(id)).filter(Boolean) as Service[],
    [selected]
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<"form" | "success">("form");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "error">("idle");
  const [contact, setContact] = useState<Contact>({ name: "", email: "", phone: "", company: "" });
  const [answers, setAnswers] = useState<Answers>({});
  const [lastSubmission, setLastSubmission] = useState<{ contact: Contact; services: Service[]; answers: Answers } | null>(null);

  const steps: StepDef[] = useMemo(
    () => [{ type: "contact" }, ...services.map((s) => ({ type: "service" as const, service: s })), { type: "review" }],
    [services]
  );

  if (services.length === 0 && phase === "form") {
    return (
      <div className="max-w-content mx-auto px-6 pt-[150px] pb-24 text-center">
        <Eyebrow>Start a request</Eyebrow>
        <h1 className="font-display text-[32px] sm:text-[38px] font-medium text-ink mb-5">
          Nothing selected yet
        </h1>
        <p className="font-body text-[15px] text-muted max-w-[440px] mx-auto mb-10">
          Choose one or more services, or pick a pre-built combo, and they'll show up here as a
          single guided request.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button href="/services">Browse services</Button>
          <Button href="/combos" variant="secondary">See combos</Button>
        </div>
      </div>
    );
  }

  if (phase === "success" && lastSubmission) {
    return <SuccessScreen submission={lastSubmission} />;
  }

  const current = steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isReview = current.type === "review";

  function updateAnswer(serviceId: string, questionId: string, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [serviceId]: { ...(prev[serviceId] ?? {}), [questionId]: value },
    }));
  }

  function canAdvance() {
    if (current.type === "contact") return contact.name.trim() !== "" && contact.email.trim() !== "";
    return true;
  }

  function goNext() {
    if (!canAdvance()) return;
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function handleSubmit() {
    setSubmitStatus("sending");
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, serviceIds: services.map((s) => s.id), answers }),
      });
      if (!res.ok) throw new Error("failed");
      setLastSubmission({ contact, services, answers });
      setPhase("success");
      clear();
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <div className="max-w-content mx-auto px-6 pt-[150px] pb-24">
      <div className="max-w-[640px] mx-auto">
        {/* progress */}
        <div className="mb-10">
          <p className="font-body text-[12px] font-semibold tracking-[0.14em] uppercase text-muted mb-3">
            Step {stepIndex + 1} of {steps.length}
          </p>
          <div className="h-1 w-full bg-line rounded-full overflow-hidden">
            <div
              className="h-full bg-violet rounded-full transition-all duration-300"
              style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {current.type === "contact" && (
          <div>
            <h1 className="font-display text-[28px] sm:text-[32px] font-medium text-ink mb-2">
              A little about you
            </h1>
            <p className="font-body text-[14px] text-muted mb-9">
              So we know who a proposal is for.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
              <Field label="Name" value={contact.name} onChange={(v) => setContact({ ...contact, name: v })} required />
              <Field label="Email" type="email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} required />
              <Field label="Phone" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
              <Field label="Company" value={contact.company} onChange={(v) => setContact({ ...contact, company: v })} />
            </div>
          </div>
        )}

        {current.type === "service" && (
          <div>
            <div className={`w-8 h-1.5 rounded-full mb-5 ${accentBg[current.service.accent]}`} />
            <h1 className="font-display text-[28px] sm:text-[32px] font-medium text-ink mb-2">
              {current.service.name}
            </h1>
            <p className="font-body text-[14px] text-muted mb-9">{current.service.description}</p>
            <div className="space-y-5">
              {questions[current.service.id]?.map((q) => (
                <QuestionField
                  key={q.id}
                  question={q}
                  value={answers[current.service.id]?.[q.id] ?? ""}
                  onChange={(v) => updateAnswer(current.service.id, q.id, v)}
                />
              ))}
            </div>
          </div>
        )}

        {isReview && (
          <div>
            <h1 className="font-display text-[28px] sm:text-[32px] font-medium text-ink mb-2">
              Review your request
            </h1>
            <p className="font-body text-[14px] text-muted mb-9">
              Check everything looks right, then send it our way.
            </p>

            <ReviewBlock title="Contact" onEdit={() => setStepIndex(0)}>
              <p className="font-body text-[14px] text-ink-soft">{contact.name} · {contact.email}</p>
              {(contact.phone || contact.company) && (
                <p className="font-body text-[14px] text-ink-soft">
                  {[contact.phone, contact.company].filter(Boolean).join(" · ")}
                </p>
              )}
            </ReviewBlock>

            {services.map((s, i) => (
              <ReviewBlock key={s.id} title={s.name} onEdit={() => setStepIndex(i + 1)}>
                {questions[s.id]?.map((q) => {
                  const v = answers[s.id]?.[q.id];
                  if (!v) return null;
                  return (
                    <p key={q.id} className="font-body text-[14px] text-ink-soft mb-1">
                      <span className="text-muted">{q.label} </span>
                      {v}
                    </p>
                  );
                })}
              </ReviewBlock>
            ))}

            {submitStatus === "error" && (
              <p className="font-body text-[13px] text-coral mb-4">
                Something went wrong sending your request — please try again.
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-12">
          <button
            onClick={goBack}
            disabled={isFirst}
            className="inline-flex items-center gap-1.5 font-body text-[14px] font-medium text-ink-soft hover:text-ink disabled:opacity-0"
          >
            <ArrowLeft size={15} /> Back
          </button>

          {isReview ? (
            <Button onClick={handleSubmit} disabled={submitStatus === "sending"}>
              {submitStatus === "sending" ? "Sending…" : "Send request"} <ArrowRight size={15} />
            </Button>
          ) : (
            <Button onClick={goNext} disabled={!canAdvance()}>
              Continue <ArrowRight size={15} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block font-body text-[13px] font-medium text-ink mb-2">
        {label} {required && <span className="text-coral">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none"
      />
    </div>
  );
}

function QuestionField({
  question,
  value,
  onChange,
}: {
  question: { id: string; label: string; type: string; options?: string[]; placeholder?: string };
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block font-body text-[13px] font-medium text-ink mb-2">{question.label}</label>
      {question.type === "textarea" && (
        <textarea
          rows={3}
          value={value}
          placeholder={question.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none resize-none"
        />
      )}
      {question.type === "text" && (
        <input
          value={value}
          placeholder={question.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none"
        />
      )}
      {question.type === "select" && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] focus:border-ink outline-none bg-white"
        >
          <option value="">Select…</option>
          {question.options?.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      )}
    </div>
  );
}

function ReviewBlock({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-line py-5 first:pt-0">
      <div className="flex items-center justify-between mb-2">
        <p className="font-display text-[15px] font-medium text-ink">{title}</p>
        <button onClick={onEdit} className="inline-flex items-center gap-1 font-body text-[12px] text-muted hover:text-ink">
          <Pencil size={12} /> Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function SuccessScreen({
  submission,
}: {
  submission: { contact: Contact; services: Service[]; answers: Answers };
}) {
  const { questions } = useSelection();
  async function downloadPdf() {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    let y = 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Vertex Lab Studio — Request Summary", 14, y);
    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${submission.contact.name} · ${submission.contact.email}`, 14, y);
    y += 10;

    submission.services.forEach((s) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(s.name, 14, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const qs = questions[s.id] ?? [];
      qs.forEach((q) => {
        const v = submission.answers[s.id]?.[q.id];
        if (!v) return;
        const lines = doc.splitTextToSize(`${q.label} ${v}`, 180);
        doc.text(lines, 14, y);
        y += lines.length * 5 + 2;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });
      y += 6;
    });

    doc.save("vertex-lab-studio-request.pdf");
  }

  return (
    <div className="max-w-content mx-auto px-6 pt-[150px] pb-24 text-center">
      <div className="w-14 h-14 rounded-full bg-violet/10 text-violet flex items-center justify-center mx-auto mb-7">
        <CheckCircle2 size={28} />
      </div>
      <h1 className="font-display text-[32px] sm:text-[38px] font-medium text-ink mb-4">
        Request received
      </h1>
      <p className="font-body text-[15px] text-muted max-w-[440px] mx-auto mb-10">
        We'll review what you've shared and follow up at {submission.contact.email} with a
        tailored proposal.
      </p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Button onClick={downloadPdf} variant="secondary">
          <Download size={15} /> Download a copy
        </Button>
        <Button href="/">Back to home</Button>
      </div>
    </div>
  );
}
