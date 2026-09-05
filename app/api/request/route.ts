import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.contact?.email || !Array.isArray(body?.serviceIds) || body.serviceIds.length === 0) {
    return NextResponse.json({ ok: false, error: "Incomplete request." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    // No database connected yet — log so nothing is silently lost.
    console.log("New service request (Supabase not configured):", JSON.stringify(body, null, 2));
    return NextResponse.json({ ok: true, receivedAt: new Date().toISOString(), stored: false });
  }

  try {
    // Check if the submitter has an active user session
    let userId: string | null = null;
    try {
      const userClient = await createClient();
      const {
        data: { user },
      } = await userClient.auth.getUser();
      userId = user?.id ?? null;
    } catch {
      userId = null;
    }

    // Use admin client if available (service role bypasses RLS) or fallback to server client
    const supabase = createAdminClient() ?? (await createClient());

    const { error } = await supabase.from("requests").insert({
      user_id: userId,
      contact_name: body.contact.name,
      contact_email: body.contact.email,
      contact_phone: body.contact.phone || null,
      company: body.contact.company || null,
      service_ids: body.serviceIds,
      answers: body.answers ?? {},
    });
    if (error) throw error;

    await supabase.from("activity_log").insert({
      user_id: userId,
      event_type: "request_submitted",
      metadata: { service_ids: body.serviceIds, email: body.contact.email },
    });

    return NextResponse.json({ ok: true, receivedAt: new Date().toISOString(), stored: true });
  } catch (err: any) {
    console.error("Failed to store request:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Storage failed." },
      { status: 500 }
    );
  }
}
