import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";

const statusColor: Record<string, string> = {
  new: "bg-violet/10 text-violet",
  reviewed: "bg-cyanx/10 text-[#0B93AE]",
  proposal_sent: "bg-coral/10 text-coral",
  won: "bg-lime/20 text-[#7A9A0E]",
  lost: "bg-line text-muted",
};

export default async function AdminRequestsPage() {
  const supabase = await createClient();
  const { data: requests } = await supabase
    .from("requests")
    .select("id, contact_name, contact_email, service_ids, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader title="Requests" />
      <div className="rounded-xl2 border border-line bg-white overflow-hidden">
        {!requests || requests.length === 0 ? (
          <p className="font-body text-[13px] text-muted px-6 py-12 text-center">
            No requests submitted yet.
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Contact</th>
                <th className="text-left px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Services</th>
                <th className="text-left px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Status</th>
                <th className="text-right px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-line last:border-0 hover:bg-cream/30">
                  <td className="px-6 py-4">
                    <Link href={`/admin/requests/${r.id}`} className="block">
                      <p className="font-body text-[13.5px] font-medium text-ink">{r.contact_name}</p>
                      <p className="font-body text-[12px] text-muted">{r.contact_email}</p>
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-body text-[13px] text-ink-soft">
                    {(r.service_ids ?? []).length || "General"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium capitalize ${statusColor[r.status] ?? ""}`}>
                      {r.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-body text-[12px] text-muted">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
