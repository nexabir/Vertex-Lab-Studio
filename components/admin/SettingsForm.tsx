"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/Button";

interface Props {
  contact: { email: string; phone: string; address: string };
  seo: { title: string; description: string };
}

export function SettingsForm({ contact: initialContact, seo: initialSeo }: Props) {
  const [contact, setContact] = useState(initialContact);
  const [seo, setSeo] = useState(initialSeo);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    await Promise.all([
      supabase.from("site_settings").upsert({ key: "contact", value: contact }),
      supabase.from("site_settings").upsert({ key: "seo_defaults", value: seo }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-[560px] space-y-10">
      <div>
        <p className="font-display text-[16px] font-medium text-ink mb-4">Contact</p>
        <div className="space-y-4">
          <Field label="Email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
          <Field label="Phone" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
          <Field label="Address" value={contact.address} onChange={(v) => setContact({ ...contact, address: v })} />
        </div>
      </div>

      <div>
        <p className="font-display text-[16px] font-medium text-ink mb-4">Default SEO</p>
        <div className="space-y-4">
          <Field label="Site title" value={seo.title} onChange={(v) => setSeo({ ...seo, title: v })} />
          <div>
            <label className="block font-body text-[13px] font-medium text-ink mb-2">Meta description</label>
            <textarea
              rows={3}
              value={seo.description}
              onChange={(e) => setSeo({ ...seo, description: e.target.value })}
              className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save settings"}
        </Button>
        {saved && <span className="font-body text-[13px] text-violet">Saved</span>}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block font-body text-[13px] font-medium text-ink mb-2">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px]"
      />
    </div>
  );
}
