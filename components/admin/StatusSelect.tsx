"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const options = ["new", "reviewed", "proposal_sent", "won", "lost"];

export function StatusSelect({ id, value }: { id: string; value: string }) {
  const [status, setStatus] = useState(value);
  const [saving, setSaving] = useState(false);

  async function update(next: string) {
    setStatus(next);
    setSaving(true);
    const supabase = createClient();
    await supabase.from("requests").update({ status: next }).eq("id", id);
    setSaving(false);
  }

  return (
    <select
      value={status}
      onChange={(e) => update(e.target.value)}
      disabled={saving}
      className="rounded-full border border-line px-4 py-2 text-[13px] font-body font-medium bg-white capitalize"
    >
      {options.map((o) => (
        <option key={o} value={o}>{o.replace("_", " ")}</option>
      ))}
    </select>
  );
}
