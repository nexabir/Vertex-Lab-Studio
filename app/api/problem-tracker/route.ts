import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.name || !body?.email) {
    return NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    console.log("Problem Tracker lead (Supabase not configured):", JSON.stringify(body, null, 2));
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const supabase = await createClient();
    // Deliberately a separate table from `requests` — tracker leads are
    // top-of-funnel and shouldn't mix with actual service requests.
    const { error } = await supabase.from("problem_tracker_leads").insert({
      name: body.name,
      email: body.email,
      company: body.company || null,
      selected_problems: body.selectedProblems ?? [],
      free_text: body.freeText || null,
      recommended_services: body.recommendedServices ?? [],
      matched_combo: body.matchedCombo || null,
    });
    if (error) throw error;

    await supabase.from("activity_log").insert({
      event_type: "tracker_lead_submitted",
      metadata: { email: body.email, recommended_services: body.recommendedServices ?? [] },
    });

    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("Failed to store tracker lead:", err);
    return NextResponse.json({ ok: false, error: "Storage failed." }, { status: 500 });
  }
}
