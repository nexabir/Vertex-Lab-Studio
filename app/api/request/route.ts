import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.contact?.email || !Array.isArray(body?.serviceIds) || body.serviceIds.length === 0) {
    return NextResponse.json({ ok: false, error: "Incomplete request." }, { status: 400 });
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

    // Always use admin client (service role key) to bypass RLS
    const supabase = createAdminClient();

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
    // Surface diagnostic info for debugging (safe: no secrets leaked)
    const detail = err?.cause
      ? `${err.message} (cause: ${err.cause?.code ?? err.cause})`
      : err?.message ?? "Storage failed.";
    return NextResponse.json(
      { ok: false, error: detail },
      { status: 500 }
    );
  }
}
