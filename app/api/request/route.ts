import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSupabaseUrl, getSupabaseServiceRoleKey } from "@/lib/supabase/config";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.contact?.email || !Array.isArray(body?.serviceIds) || body.serviceIds.length === 0) {
    return NextResponse.json({ ok: false, error: "Incomplete request." }, { status: 400 });
  }

  // Capture config for diagnostics (safe: only URL prefix + key length, no secrets)
  const diagUrl = getSupabaseUrl();
  const diagKeyLen = getSupabaseServiceRoleKey().length;

  try {
    // Always use admin client (service role key) to bypass RLS
    const supabase = createAdminClient();

    const { error } = await supabase.from("requests").insert({
      user_id: null,
      contact_name: body.contact.name,
      contact_email: body.contact.email,
      contact_phone: body.contact.phone || null,
      company: body.contact.company || null,
      service_ids: body.serviceIds,
      answers: body.answers ?? {},
    });
    if (error) throw error;

    // Activity log is best-effort — don't let it block success
    await supabase.from("activity_log").insert({
      event_type: "request_submitted",
      metadata: { service_ids: body.serviceIds, email: body.contact.email },
    }).then(() => {}).catch(() => {});

    return NextResponse.json({ ok: true, receivedAt: new Date().toISOString(), stored: true });
  } catch (err: any) {
    console.error("Failed to store request:", err);
    const causeCode = err?.cause?.code ?? err?.cause?.message ?? String(err?.cause ?? "");
    return NextResponse.json(
      {
        ok: false,
        error: err?.message ?? "Storage failed.",
        cause: causeCode || undefined,
        diagUrl: diagUrl.substring(0, 40) + "...",
        diagKeyLen,
      },
      { status: 500 }
    );
  }
}
