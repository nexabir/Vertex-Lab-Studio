"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/Button";

interface Props {
  contact: { email: string; phone: string; address: string };
  seo: { title: string; description: string };
  booking: { url: string; enabled: boolean; label: string };
  socialProof: { projectsDelivered: string; uptimeGuarantee: string; avgSprintWeeks: string; clientRetention: string };
}

export function SettingsForm({
  contact: initialContact,
  seo: initialSeo,
  booking: initialBooking,
  socialProof: initialSocialProof,
}: Props) {
  const [contact, setContact] = useState(initialContact);
  const [seo, setSeo] = useState(initialSeo);
  const [booking, setBooking] = useState(initialBooking);
  const [socialProof, setSocialProof] = useState(initialSocialProof);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    await Promise.all([
      supabase.from("site_settings").upsert({ key: "contact", value: contact }),
      supabase.from("site_settings").upsert({ key: "seo_defaults", value: seo }),
      supabase.from("site_settings").upsert({ key: "booking", value: booking }),
      supabase.from("site_settings").upsert({ key: "social_proof", value: socialProof }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-[640px] space-y-10">
      {/* Discovery Booking Link */}
      <div className="rounded-xl2 border border-line bg-white p-6 shadow-xs">
        <p className="font-display text-[16px] font-medium text-ink mb-1">Discovery Call & Scheduling Link</p>
        <p className="font-body text-[13px] text-muted mb-4">
          Allows prospective clients to book calls directly via Cal.com, Calendly, or WhatsApp.
        </p>
        <div className="space-y-4">
          <Field
            label="Booking Link (Cal.com / Calendly URL)"
            value={booking.url}
            onChange={(v) => setBooking({ ...booking, url: v })}
            placeholder="https://cal.com/vertex-lab-studio/discovery"
          />
          <Field
            label="Call to Action Label"
            value={booking.label}
            onChange={(v) => setBooking({ ...booking, label: v })}
            placeholder="Book a 15-min discovery call"
          />
          <label className="flex items-center gap-2 cursor-pointer font-body text-[13px] text-ink">
            <input
              type="checkbox"
              checked={booking.enabled}
              onChange={(e) => setBooking({ ...booking, enabled: e.target.checked })}
              className="rounded text-violet"
            />
            Show "Book Discovery Call" button across Header, Hero & Sticky Bar
          </label>
        </div>
      </div>

      {/* Social Proof & Metrics */}
      <div className="rounded-xl2 border border-line bg-white p-6 shadow-xs">
        <p className="font-display text-[16px] font-medium text-ink mb-1">Live Social Proof & Studio Stats</p>
        <p className="font-body text-[13px] text-muted mb-4">
          Numbers displayed across the Bento Grid and homepage credibility banners.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Projects Delivered"
            value={socialProof.projectsDelivered}
            onChange={(v) => setSocialProof({ ...socialProof, projectsDelivered: v })}
            placeholder="48+"
          />
          <Field
            label="Avg. Sprint Timeline"
            value={socialProof.avgSprintWeeks}
            onChange={(v) => setSocialProof({ ...socialProof, avgSprintWeeks: v })}
            placeholder="2-3 wks"
          />
          <Field
            label="System Reliability / Uptime"
            value={socialProof.uptimeGuarantee}
            onChange={(v) => setSocialProof({ ...socialProof, uptimeGuarantee: v })}
            placeholder="99.9%"
          />
          <Field
            label="Client Retention / Growth"
            value={socialProof.clientRetention}
            onChange={(v) => setSocialProof({ ...socialProof, clientRetention: v })}
            placeholder="100%"
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="rounded-xl2 border border-line bg-white p-6 shadow-xs">
        <p className="font-display text-[16px] font-medium text-ink mb-4">Direct Studio Contact</p>
        <div className="space-y-4">
          <Field label="Email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
          <Field label="Phone / WhatsApp" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
          <Field label="Office / Base Address" value={contact.address} onChange={(v) => setContact({ ...contact, address: v })} />
        </div>
      </div>

      {/* SEO */}
      <div className="rounded-xl2 border border-line bg-white p-6 shadow-xs">
        <p className="font-display text-[16px] font-medium text-ink mb-4">Default SEO & Search Meta</p>
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
          {saving ? "Saving…" : "Save All Settings"}
        </Button>
        {saved && <span className="font-body text-[13px] text-lime font-medium">All settings updated successfully!</span>}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-body text-[13px] font-medium text-ink mb-1.5">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line px-3.5 py-2.5 font-body text-[13.5px]"
      />
    </div>
  );
}
