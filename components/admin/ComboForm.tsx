"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/Button";

interface ServiceOption { id: string; name: string }
interface ComboRow {
  id?: string;
  slug: string;
  name: string;
  summary: string;
  accent: string;
}

export function ComboForm({
  initial,
  allServices,
  initialServiceIds = [],
}: {
  initial?: ComboRow;
  allServices: ServiceOption[];
  initialServiceIds?: string[];
}) {
  const [form, setForm] = useState<ComboRow>(initial ?? { slug: "", name: "", summary: "", accent: "violet" });
  const [selected, setSelected] = useState<string[]>(initialServiceIds);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  function toggleService(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    let comboId = initial?.id;

    if (isEdit && comboId) {
      await supabase.from("combos").update(form).eq("id", comboId);
      await supabase.from("combo_services").delete().eq("combo_id", comboId);
    } else {
      const { data } = await supabase.from("combos").insert(form).select("id").single();
      comboId = data?.id;
    }

    if (comboId && selected.length > 0) {
      await supabase.from("combo_services").insert(
        selected.map((service_id) => ({ combo_id: comboId, service_id }))
      );
    }

    setSaving(false);
    router.push("/admin/combos");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Delete this combo?")) return;
    const supabase = createClient();
    await supabase.from("combos").delete().eq("id", initial.id);
    router.push("/admin/combos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-[560px]">
      <div>
        <label className="block font-body text-[13px] font-medium text-ink mb-2">Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px]"
        />
      </div>
      <div>
        <label className="block font-body text-[13px] font-medium text-ink mb-2">Slug</label>
        <input
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          required
          className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px]"
        />
      </div>
      <div>
        <label className="block font-body text-[13px] font-medium text-ink mb-2">Summary</label>
        <textarea
          rows={2}
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          required
          className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] resize-none"
        />
      </div>
      <div>
        <label className="block font-body text-[13px] font-medium text-ink mb-2">Accent color</label>
        <select
          value={form.accent}
          onChange={(e) => setForm({ ...form, accent: e.target.value })}
          className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] bg-white"
        >
          <option value="violet">Violet</option>
          <option value="cyanx">Cyan</option>
          <option value="coral">Coral</option>
          <option value="lime">Lime</option>
        </select>
      </div>
      <div>
        <label className="block font-body text-[13px] font-medium text-ink mb-3">Included services</label>
        <div className="grid grid-cols-2 gap-2">
          {allServices.map((s) => (
            <label key={s.id} className="flex items-center gap-2 font-body text-[13px] text-ink-soft">
              <input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggleService(s.id)} />
              {s.name}
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        {isEdit ? (
          <button type="button" onClick={handleDelete} className="inline-flex items-center gap-1.5 font-body text-[13px] text-coral">
            <Trash2 size={14} /> Delete
          </button>
        ) : <span />}
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create combo"}
        </Button>
      </div>
    </form>
  );
}
