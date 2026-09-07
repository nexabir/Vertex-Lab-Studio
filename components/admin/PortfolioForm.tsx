"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/Button";
import { Accent } from "@/data/services";

export interface PortfolioFormRow {
  id?: string;
  slug: string;
  title: string;
  category: "Insights" | "Systems" | "Presence" | "Strategy";
  client_name: string;
  summary: string;
  problem: string;
  solution: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  live_url: string | null;
  cover_image_url: string | null;
  accent: Accent;
  sort_order: number;
  active: boolean;
}

const empty: PortfolioFormRow = {
  slug: "",
  title: "",
  category: "Insights",
  client_name: "",
  summary: "",
  problem: "",
  solution: "",
  metrics: [
    { label: "Key Outcome", value: "+40%" },
    { label: "Delivery Time", value: "3 weeks" },
  ],
  tags: ["Full-Stack", "Custom Solution"],
  live_url: "",
  cover_image_url: "",
  accent: "cyanx",
  sort_order: 0,
  active: true,
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function PortfolioForm({ initial }: { initial?: PortfolioFormRow }) {
  const [form, setForm] = useState<PortfolioFormRow>(initial ?? empty);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  function set<K extends keyof PortfolioFormRow>(key: K, value: PortfolioFormRow[K]) {
    setForm((f) => ({
      ...f,
      [key]: value,
      slug: key === "title" && !isEdit ? slugify(value as string) : f.slug,
    }));
  }

  function handleAddMetric() {
    setForm((f) => ({
      ...f,
      metrics: [...f.metrics, { label: "Metric Name", value: "100%" }],
    }));
  }

  function handleUpdateMetric(index: number, key: "label" | "value", val: string) {
    setForm((f) => {
      const next = [...f.metrics];
      next[index] = { ...next[index], [key]: val };
      return { ...f, metrics: next };
    });
  }

  function handleRemoveMetric(index: number) {
    setForm((f) => ({
      ...f,
      metrics: f.metrics.filter((_, i) => i !== index),
    }));
  }

  function handleAddTag() {
    const trimmed = tagInput.trim();
    if (!trimmed || form.tags.includes(trimmed)) return;
    setForm((f) => ({ ...f, tags: [...f.tags, trimmed] }));
    setTagInput("");
  }

  function handleRemoveTag(tag: string) {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  }

  async function handleSave() {
    if (!form.title.trim() || !form.slug.trim()) {
      alert("Title and slug are required");
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const payload = {
      slug: form.slug,
      title: form.title,
      category: form.category,
      client_name: form.client_name,
      summary: form.summary,
      problem: form.problem,
      solution: form.solution,
      metrics: form.metrics,
      tags: form.tags,
      live_url: form.live_url || null,
      cover_image_url: form.cover_image_url || null,
      accent: form.accent,
      sort_order: Number(form.sort_order) || 0,
      active: form.active,
      updated_at: new Date().toISOString(),
    };

    try {
      if (isEdit && initial?.id) {
        const { error } = await supabase.from("portfolio_projects").update(payload).eq("id", initial.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("portfolio_projects").insert(payload);
        if (error) throw error;
      }
      router.push("/admin/portfolio");
      router.refresh();
    } catch (err: any) {
      alert("Error saving project: " + (err?.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Are you sure you want to delete this case study?")) return;
    const supabase = createClient();
    await supabase.from("portfolio_projects").delete().eq("id", initial.id);
    router.push("/admin/portfolio");
    router.refresh();
  }

  return (
    <form onSubmit={(e: FormEvent) => e.preventDefault()} className="max-w-[760px] space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block font-body text-[13px] font-medium text-ink mb-1.5">Project Title</label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Unified Executive Revenue & Performance Intelligence"
            className="w-full rounded-lg border border-line px-4 py-3 font-display text-[18px] font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-body text-[13px] font-medium text-ink mb-1.5">URL Slug</label>
            <input
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="project-slug"
              className="w-full rounded-lg border border-line px-3 py-2 font-body text-[13px] text-ink-soft"
            />
          </div>
          <div>
            <label className="block font-body text-[13px] font-medium text-ink mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value as any)}
              className="w-full rounded-lg border border-line px-3 py-2 font-body text-[13px]"
            >
              <option value="Insights">Insights</option>
              <option value="Systems">Systems</option>
              <option value="Presence">Presence</option>
              <option value="Strategy">Strategy</option>
            </select>
          </div>
          <div>
            <label className="block font-body text-[13px] font-medium text-ink mb-1.5">Accent Color</label>
            <select
              value={form.accent}
              onChange={(e) => set("accent", e.target.value as any)}
              className="w-full rounded-lg border border-line px-3 py-2 font-body text-[13px]"
            >
              <option value="cyanx">Cyan (Insights)</option>
              <option value="lime">Lime (Systems)</option>
              <option value="coral">Coral (Presence)</option>
              <option value="violet">Violet (Strategy)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-[13px] font-medium text-ink mb-1.5">Client / Partner Name</label>
            <input
              value={form.client_name}
              onChange={(e) => set("client_name", e.target.value)}
              placeholder="e.g. Apex Logistics Group"
              className="w-full rounded-lg border border-line px-3 py-2 font-body text-[13px]"
            />
          </div>
          <div>
            <label className="block font-body text-[13px] font-medium text-ink mb-1.5">Live Demo / Site URL (optional)</label>
            <input
              value={form.live_url ?? ""}
              onChange={(e) => set("live_url", e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-line px-3 py-2 font-body text-[13px]"
            />
          </div>
        </div>

        <div>
          <label className="block font-body text-[13px] font-medium text-ink mb-1.5">Brief Summary</label>
          <textarea
            rows={2}
            value={form.summary}
            onChange={(e) => set("summary", e.target.value)}
            placeholder="A single compelling sentence describing what was built..."
            className="w-full rounded-lg border border-line px-4 py-2.5 font-body text-[13.5px] resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-[13px] font-medium text-ink mb-1.5">The Problem (What wasn't working)</label>
            <textarea
              rows={4}
              value={form.problem}
              onChange={(e) => set("problem", e.target.value)}
              placeholder="Describe the bottleneck, manual chaos, or legacy issue..."
              className="w-full rounded-lg border border-line px-4 py-2.5 font-body text-[13.5px]"
            />
          </div>
          <div>
            <label className="block font-body text-[13px] font-medium text-ink mb-1.5">The Solution (Engineered by VLS)</label>
            <textarea
              rows={4}
              value={form.solution}
              onChange={(e) => set("solution", e.target.value)}
              placeholder="How VLS solved the problem..."
              className="w-full rounded-lg border border-line px-4 py-2.5 font-body text-[13.5px]"
            />
          </div>
        </div>

        {/* Measurable Metrics */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-body text-[13px] font-medium text-ink">Measurable Impact / Metrics</label>
            <button
              type="button"
              onClick={handleAddMetric}
              className="font-body text-[12px] text-violet font-medium inline-flex items-center gap-1 hover:underline"
            >
              <Plus size={13} /> Add Metric
            </button>
          </div>
          <div className="space-y-2">
            {form.metrics.map((metric, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  value={metric.label}
                  onChange={(e) => handleUpdateMetric(idx, "label", e.target.value)}
                  placeholder="Metric Label (e.g. Speed)"
                  className="flex-1 rounded-lg border border-line px-3 py-2 font-body text-[13px]"
                />
                <input
                  value={metric.value}
                  onChange={(e) => handleUpdateMetric(idx, "value", e.target.value)}
                  placeholder="Value (e.g. +48%)"
                  className="w-[140px] rounded-lg border border-line px-3 py-2 font-body text-[13px] font-semibold text-ink"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMetric(idx)}
                  className="p-2 text-muted hover:text-coral transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block font-body text-[13px] font-medium text-ink mb-1.5">Tech Stack / Capability Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream border border-line font-body text-[12px] text-ink"
              >
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-coral">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              placeholder="Add tag (e.g. PostgreSQL) and press Enter"
              className="flex-1 rounded-lg border border-line px-3 py-2 font-body text-[13px]"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-2 rounded-lg bg-cream border border-line font-body text-[12px] font-medium text-ink hover:bg-cream/60"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer font-body text-[13.5px] text-ink">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => set("active", e.target.checked)}
              className="rounded text-violet focus:ring-violet"
            />
            Publish project on live website
          </label>
          <div className="flex items-center gap-2">
            <label className="font-body text-[13px] text-muted">Sort order:</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => set("sort_order", Number(e.target.value))}
              className="w-16 rounded-lg border border-line px-2 py-1 text-[13px]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-line">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Update Case Study" : "Create Case Study"}
        </Button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1.5 font-body text-[13px] text-muted hover:text-coral transition-colors"
          >
            <Trash2 size={15} /> Delete
          </button>
        )}
      </div>
    </form>
  );
}
