import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";
import { ActiveToggle } from "@/components/admin/ActiveToggle";

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("*").order("sort_order");

  return (
    <div>
      <AdminPageHeader
        title="Services"
        action={
          <Link href="/admin/services/new" className="inline-flex items-center gap-1.5 rounded-full bg-ink text-cream px-4 py-2 text-[13px] font-medium font-body hover:bg-violet">
            <Plus size={14} /> New service
          </Link>
        }
      />
      <div className="rounded-xl2 border border-line bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-line">
              <th className="text-left px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Name</th>
              <th className="text-left px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Category</th>
              <th className="text-left px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Active</th>
            </tr>
          </thead>
          <tbody>
            {(services ?? []).map((s) => (
              <tr key={s.id} className="border-b border-line last:border-0 hover:bg-cream/30">
                <td className="px-6 py-4">
                  <Link href={`/admin/services/${s.id}`} className="font-body text-[13.5px] font-medium text-ink hover:text-violet">
                    {s.name}
                  </Link>
                </td>
                <td className="px-6 py-4 font-body text-[13px] text-muted">{s.category}</td>
                <td className="px-6 py-4">
                  <ActiveToggle table="services" id={s.id} value={s.active} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
