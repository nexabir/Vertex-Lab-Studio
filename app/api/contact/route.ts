import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    console.log("Contact form submission (Supabase not configured):", body);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const supabase = await createClient();
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
  } catch (err) {
    console.error("Failed to store contact submission:", err);
    return NextResponse.json({ ok: false, error: "Storage failed." }, { status: 500 });
  }
}
