import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";
import { getService } from "@/data/services";

export default async function AdminTrackerLeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("problem_tracker_leads")
    .select("id, name, email, company, selected_problems, recommended_services, matched_combo, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader title="Tracker Leads" />
      <p className="font-body text-[13px] text-muted mb-6 -mt-4">
        People who used the Business Problem Tracker — separate from the Requests queue, since these are earlier-funnel leads, not committed briefs.
      </p>
      <div className="rounded-xl2 border border-line bg-white overflow-hidden">
        {!leads || leads.length === 0 ? (
          <p className="font-body text-[13px] text-muted px-6 py-12 text-center">
            No Tracker leads yet.
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Contact</th>
                <th className="text-left px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Problems</th>
                <th className="text-left px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Top recommendation</th>
                <th className="text-left px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Combo match</th>
                <th className="text-right px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const topService = lead.recommended_services?.[0]
                  ? getService(lead.recommended_services[0])
                  : null;
                return (
                  <tr key={lead.id} className="border-b border-line last:border-0 hover:bg-cream/30">
                    <td className="px-6 py-4">
                      <Link href={`/admin/problem-tracker/${lead.id}`} className="block">
                        <p className="font-body text-[13.5px] font-medium text-ink">{lead.name}</p>
                        <p className="font-body text-[12px] text-muted">{lead.email}</p>
                        {lead.company && <p className="font-body text-[11.5px] text-muted">{lead.company}</p>}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-body text-[13px] text-ink-soft">
                      {(lead.selected_problems ?? []).length}
                    </td>
                    <td className="px-6 py-4 font-body text-[13px] text-ink-soft">
                      {topService?.name ?? "—"}
                    </td>
                    <td className="px-6 py-4">
                      {lead.matched_combo ? (
                        <span className="inline-block rounded-full px-3 py-1 text-[11px] font-medium bg-violet/10 text-violet capitalize">
                          {lead.matched_combo.replace("-", " ")}
                        </span>
                      ) : (
                        <span className="font-body text-[12px] text-muted">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-body text-[12px] text-muted">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
