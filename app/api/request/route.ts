import { NextResponse } from "next/server";
import { getSupabaseUrl, getSupabaseServiceRoleKey } from "@/lib/supabase/config";

/**
 * POST /api/request
 * Inserts a service request into the Supabase `requests` table.
 *
 * Uses direct fetch to the Supabase REST API instead of the JS client
 * to avoid any module-bundling or env-var issues on Vercel.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (
    !body?.contact?.email ||
    !Array.isArray(body?.serviceIds) ||
    body.serviceIds.length === 0
  ) {
    return NextResponse.json(
      { ok: false, error: "Incomplete request." },
      { status: 400 }
    );
  }

  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  const row = {
    user_id: null,
    contact_name: body.contact.name ?? "",
    contact_email: body.contact.email,
    contact_phone: body.contact.phone || null,
    company: body.contact.company || null,
    service_ids: body.serviceIds,
    answers: body.answers ?? {},
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

    // Activity log — best-effort, don't block success
    fetch(`${supabaseUrl}/rest/v1/activity_log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        event_type: "request_submitted",
        metadata: {
          service_ids: body.serviceIds,
          email: body.contact.email,
        },
      }),
    }).catch(() => {});

    return NextResponse.json({
      ok: true,
      receivedAt: new Date().toISOString(),
      stored: true,
    });
  } catch (err: any) {
    console.error("Failed to store request:", err);
    return NextResponse.json(
      {
        ok: false,
        error: err?.message ?? "Storage failed.",
      },
      { status: 500 }
    );
  }
}
