import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  try {
    // Always use admin client (service role key) to bypass RLS
    const supabase = createAdminClient();

    // Reuse the requests table with no service_ids so every inbound lead —
    // general question or full brief — shows up in one admin queue.
    const { error } = await supabase.from("requests").insert({
      contact_name: body.name,
      contact_email: body.email,
      answers: { general_message: body.message },
      service_ids: [],
    });
    if (error) throw error;

    await supabase.from("activity_log").insert({
      event_type: "contact_submitted",
      metadata: { email: body.email },
    });

    return NextResponse.json({ ok: true, stored: true });
  } catch (err: any) {
    console.error("Failed to store contact submission:", err);
    const detail = err?.cause
      ? `${err.message} (cause: ${err.cause?.code ?? err.cause})`
      : err?.message ?? "Storage failed.";
    return NextResponse.json(
      { ok: false, error: detail },
      { status: 500 }
    );
  }
}
