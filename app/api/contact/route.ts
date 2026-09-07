import { NextResponse } from "next/server";
import { getSupabaseUrl, getSupabaseServiceRoleKey } from "@/lib/supabase/config";

/**
 * POST /api/contact
 * Inserts a contact-form submission into the Supabase `requests` table.
 *
 * Uses direct fetch to the Supabase REST API to avoid module-bundling
 * or env-var issues on Vercel.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  const row = {
    contact_name: body.name,
    contact_email: body.email,
    answers: { general_message: body.message },
    service_ids: [],
  };

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      throw new Error(`Supabase insert failed (${res.status}): ${errBody}`);
    }

    // Activity log — best-effort
    fetch(`${supabaseUrl}/rest/v1/activity_log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        event_type: "contact_submitted",
        metadata: { email: body.email },
      }),
    }).catch(() => {});

    return NextResponse.json({ ok: true, stored: true });
  } catch (err: any) {
    console.error("Failed to store contact submission:", err);
    return NextResponse.json(
      {
        ok: false,
        error: err?.message ?? "Storage failed.",
      },
      { status: 500 }
    );
  }
}
