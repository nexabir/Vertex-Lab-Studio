import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";
import { StatusSelect } from "@/components/admin/StatusSelect";

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: request } = await supabase.from("requests").select("*").eq("id", id).single();
  if (!request) notFound();

  const { data: services } = await supabase
    .from("services")
    .select("slug, name")
    .in("slug", request.service_ids ?? []);
  const nameBySlug = new Map((services ?? []).map((s) => [s.slug, s.name]));

  return (
    <div>
      <Link href="/admin/requests" className="inline-flex items-center gap-1.5 font-body text-[13px] text-muted hover:text-ink mb-6">
        <ArrowLeft size={14} /> All requests
      </Link>
      <AdminPageHeader
        title={request.contact_name}
        action={<StatusSelect id={request.id} value={request.status} />}
      />

      <div className="rounded-xl2 border border-line bg-white p-6 mb-6">
        <p className="font-body text-[13px] font-medium text-muted uppercase tracking-[0.06em] mb-3">Contact</p>
        <p className="font-body text-[14px] text-ink">{request.contact_email}</p>
        {request.contact_phone && <p className="font-body text-[14px] text-ink">{request.contact_phone}</p>}
        {request.company && <p className="font-body text-[14px] text-ink">{request.company}</p>}
        <p className="font-body text-[12px] text-muted mt-2">
          Submitted {new Date(request.created_at).toLocaleString()}
        </p>
      </div>

      {(request.service_ids ?? []).length === 0 ? (
        <div className="rounded-xl2 border border-line bg-white p-6">
          <p className="font-body text-[13px] font-medium text-muted uppercase tracking-[0.06em] mb-3">Message</p>
          <p className="font-body text-[14px] text-ink-soft whitespace-pre-wrap">
            {request.answers?.general_message ?? "—"}
          </p>
        </div>
      ) : (
        (request.service_ids as string[]).map((slug) => (
          <div key={slug} className="rounded-xl2 border border-line bg-white p-6 mb-4">
            <p className="font-display text-[16px] font-medium text-ink mb-4">
              {nameBySlug.get(slug) ?? slug}
            </p>
            {Object.entries((request.answers?.[slug] as Record<string, string>) ?? {}).map(([k, v]) => (
              <p key={k} className="font-body text-[14px] text-ink-soft mb-1.5">
                <span className="text-muted">{k}: </span>
                {v || "—"}
              </p>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
