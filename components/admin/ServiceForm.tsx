"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/Button";
import { categories } from "@/data/services";

interface ServiceRow {
  id?: string;
  slug: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  icon: string;
}

const emptyService: ServiceRow = {
  slug: "",
  category: categories[0],
  name: "",
  tagline: "",
  description: "",
  accent: "violet",
  icon: "Globe",
};

export function ServiceForm({ initial }: { initial?: ServiceRow }) {
  const [form, setForm] = useState<ServiceRow>(initial ?? emptyService);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  function set<K extends keyof ServiceRow>(key: K, value: ServiceRow[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    if (isEdit && initial?.id) {
      await supabase.from("services").update(form).eq("id", initial.id);
    } else {
      await supabase.from("services").insert(form);
    }
    setSaving(false);
    router.push("/admin/services");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Delete this service? This can't be undone.")) return;
    const supabase = createClient();
    await supabase.from("services").delete().eq("id", initial.id);
    router.push("/admin/services");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-[560px]">
      <Field label="Name" value={form.name} onChange={(v) => set("name", v)} required />
      <Field
        label="Slug (used as the internal id — no spaces)"
        value={form.slug}
        onChange={(v) => set("slug", v)}
        required
      />
      <div>
        <label className="block font-body text-[13px] font-medium text-ink mb-2">Category</label>
        <select
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] bg-white"
        >
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <Field label="Tagline" value={form.tagline} onChange={(v) => set("tagline", v)} required />
      <div>
        <label className="block font-body text-[13px] font-medium text-ink mb-2">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] resize-none"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block font-body text-[13px] font-medium text-ink mb-2">Accent color</label>
          <select
            value={form.accent}
            onChange={(e) => set("accent", e.target.value)}
            className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] bg-white"
          >
            <option value="violet">Violet</option>
            <option value="cyanx">Cyan</option>
            <option value="coral">Coral</option>
            <option value="lime">Lime</option>
          </select>
        </div>
        <Field
          label="Icon (lucide name)"
          value={form.icon}
          onChange={(v) => set("icon", v)}
          hint="e.g. Globe, Boxes, FileText"
        />
      </div>

      <div className="flex items-center justify-between pt-4">
        {isEdit ? (
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 font-body text-[13px] text-coral"
          >
            <Trash2 size={14} /> Delete
          </button>
        ) : <span />}
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create service"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block font-body text-[13px] font-medium text-ink mb-2">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px]"
      />
      {hint && <p className="font-body text-[11px] text-muted mt-1.5">{hint}</p>}
    </div>
  );
}
