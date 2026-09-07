"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Anmi } from "./Anmi";
import { AnmiPose } from "@/data/anmi";

interface WorkflowStep {
  stepNumber: string;
  tabTitle: string;
  heading: string;
  description: string;
  pose: AnmiPose;
  accent: string;
  accentBg: string;
  highlights: string[];
  ctaLabel: string;
  ctaHref: string;
}

const steps: WorkflowStep[] = [
  {
    stepNumber: "01",
    tabTitle: "1. Diagnose",
    heading: "Write the Problem Down Clearly",
    description:
      "Kidlin's Law says: 'If you write the problem down clearly, the matter is half solved.' We don't push pre-packaged templates. We start by unpacking your exact friction point — whether it's messy data, outdated pitch decks, or broken operations.",
    pose: "thinking-happy",
    accent: "#17C3E6",
    accentBg: "rgba(23, 195, 230, 0.12)",
    highlights: [
      "No sales pressure — diagnose first",
      "Identifies root causes across your business",
      "Connects to our guided Problem Tracker",
    ],
    ctaLabel: "Open Problem Tracker",
    ctaHref: "/problem-tracker",
  },
  {
    stepNumber: "02",
    tabTitle: "2. Scope & Architect",
    heading: "Tailored Architecture, One Intake",
    description:
      "Select as many services as you need — Power BI analytics, Next.js web applications, custom ERP, or growth roadmaps. Answer a focused questionnaire and get a unified, transparent scope without hiring four separate agencies.",
    pose: "working-laptop",
    accent: "#6D4AFF",
    accentBg: "rgba(109, 74, 255, 0.14)",
    highlights: [
      "Combine services or select pre-built combos",
      "Instant PDF summary generated for your team",
      "Single point of contact for every discipline",
    ],
    ctaLabel: "Browse Service Catalog",
    ctaHref: "/services",
  },
  {
    stepNumber: "03",
    tabTitle: "3. Build & Deliver",
    heading: "Production-Ready Digital Solutions",
    description:
      "We engineer your solution to exact specifications — high-performance code, automated data pipelines, and responsive designs. We deploy, train your team, and ensure measurable business progress.",
    pose: "celebrating",
    accent: "#C6F135",
    accentBg: "rgba(198, 241, 53, 0.15)",
    highlights: [
      "Bespoke engineering, not off-the-shelf fluff",
      "Direct handoff with team onboarding",
      "Clear milestones & post-launch support",
    ],
    ctaLabel: "Start a Request",
    ctaHref: "/request",
  },
];

export function InteractiveWorkflow() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = steps[activeStep];

  return (
    <div className="w-full">
      {/* Step Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {steps.map((s, idx) => {
          const isActive = idx === activeStep;
          return (
            <button
              key={s.stepNumber}
              onClick={() => setActiveStep(idx)}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-[14px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet"
              style={{
                backgroundColor: isActive ? "#0E0D18" : "#FFFFFF",
                color: isActive ? "#F5F3EE" : "#44434F",
                borderColor: isActive ? "#0E0D18" : "#E7E4DC",
                boxShadow: isActive ? "0 4px 14px rgba(14, 13, 24, 0.12)" : "none",
              }}
            >
              <span
                className="w-2 h-2 rounded-full transition-colors"
                style={{ backgroundColor: s.accent }}
              />
              <span>{s.tabTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Main Double-Bezel Showcase Box */}
      <div className="rounded-3xl p-1.5 border border-line bg-paper shadow-card">
        <div className="bg-white rounded-[calc(1.5rem-4px)] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="font-display text-[12px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{ backgroundColor: current.accentBg, color: current.accent }}
              >
                Step {current.stepNumber}
              </span>
              <span className="font-body text-[13px] text-muted">Guided Workflow</span>
            </div>

            <h3 className="font-display text-[26px] sm:text-[32px] font-semibold text-ink leading-tight mb-4">
              {current.heading}
            </h3>

            <p className="font-body text-[15px] leading-relaxed text-ink-soft mb-8">
              {current.description}
            </p>

            {/* Highlights bullet list */}
            <div className="space-y-3 mb-8">
              {current.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2.5 text-[14px] text-ink font-medium">
                  <CheckCircle2 size={16} style={{ color: current.accent }} className="shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <Link
              href={current.ctaHref}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14.5px] font-medium bg-ink text-cream hover:bg-violet transition-all duration-200 hover:-translate-y-0.5 shadow-sm active:scale-[0.97]"
            >
              <span>{current.ctaLabel}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Staged Character Visual Container */}
          <div className="relative flex items-center justify-center p-6 bg-paper rounded-2xl border border-line/60 min-h-[340px]">
            <div
              className="pointer-events-none absolute w-56 h-56 rounded-full blur-[80px] opacity-40 transition-colors duration-500"
              style={{ backgroundColor: current.accent }}
            />
            <div className="relative z-10 transition-transform duration-300 transform hover:scale-[1.03]">
              <Anmi pose={current.pose} size={280} priority />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
