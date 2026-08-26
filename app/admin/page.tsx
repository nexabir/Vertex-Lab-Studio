import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader, AdminCard } from "@/components/admin/Card";
import { RequestsTrendChart } from "@/components/admin/RequestsTrendChart";
import { ArrowUpRight } from "lucide-react";

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ data: requests }, { data: services }, { data: combos }] = await Promise.all([
    supabase.from("requests").select("id, created_at, service_ids, contact_name, contact_email, status"),
    supabase.from("services").select("id").eq("active", true),
    supabase.from("combos").select("id").eq("active", true),
  ]);

  const allRequests = requests ?? [];
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const thisWeek = allRequests.filter((r) => new Date(r.created_at) >= weekAgo);

  const serviceCounts = new Map<string, number>();
  allRequests.forEach((r) => {
    (r.service_ids ?? []).forEach((id: string) => {
      serviceCounts.set(id, (serviceCounts.get(id) ?? 0) + 1);
    });
  });
  const topService =
    [...serviceCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  // Last 30 days trend
  const days: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = startOfDay(new Date());
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const count = allRequests.filter((r) => startOfDay(new Date(r.created_at)).getTime() === d.getTime()).length;
    days.push({ date: label, count });
  }

  const recent = [...allRequests]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  return (
    <div>
      <AdminPageHeader title="Dashboard" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <AdminCard label="Total requests" value={allRequests.length} />
        <AdminCard label="This week" value={thisWeek.length} />
        <AdminCard label="Most requested" value={topService} />
        <AdminCard label="Active combos" value={combos?.length ?? 0} hint={`${services?.length ?? 0} active services`} />
      </div>

      <div className="rounded-xl2 border border-line bg-white p-6 mb-10">
        <p className="font-body text-[13px] font-medium text-ink mb-6">Requests — last 30 days</p>
        <RequestsTrendChart data={days} />
      </div>

      <div className="rounded-xl2 border border-line bg-white overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <p className="font-body text-[13px] font-medium text-ink">Recent activity</p>
          <Link href="/admin/requests" className="font-body text-[12px] text-muted hover:text-ink inline-flex items-center gap-1">
            View all <ArrowUpRight size={12} />
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="font-body text-[13px] text-muted px-6 py-10 text-center">No requests yet.</p>
        ) : (
          <table className="w-full">
            <tbody>
              {recent.map((r) => (
                <tr key={r.id} className="border-b border-line last:border-0">
                  <td className="px-6 py-3.5 font-body text-[13px] text-ink">{r.contact_name}</td>
                  <td className="px-6 py-3.5 font-body text-[13px] text-muted">{r.contact_email}</td>
                  <td className="px-6 py-3.5 font-body text-[12px] text-muted">
                    {(r.service_ids ?? []).length} service{(r.service_ids ?? []).length === 1 ? "" : "s"}
                  </td>
                  <td className="px-6 py-3.5 font-body text-[12px] text-muted text-right">
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
