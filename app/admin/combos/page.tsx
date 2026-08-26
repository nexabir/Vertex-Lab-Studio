import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";
import { ActiveToggle } from "@/components/admin/ActiveToggle";

export default async function AdminCombosPage() {
  const supabase = await createClient();
  const { data: combos } = await supabase
    .from("combos")
    .select("*, combo_services(services(name))")
    .order("sort_order");

  return (
    <div>
      <AdminPageHeader
        title="Combos"
        action={
          <Link href="/admin/combos/new" className="inline-flex items-center gap-1.5 rounded-full bg-ink text-cream px-4 py-2 text-[13px] font-medium font-body hover:bg-violet">
            <Plus size={14} /> New combo
          </Link>
        }
      />
      <div className="rounded-xl2 border border-line bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-line">
              <th className="text-left px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Name</th>
              <th className="text-left px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Includes</th>
              <th className="text-left px-6 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Active</th>
            </tr>
          </thead>
          <tbody>
            {(combos ?? []).map((c) => (
              <tr key={c.id} className="border-b border-line last:border-0 hover:bg-cream/30">
                <td className="px-6 py-4">
                  <Link href={`/admin/combos/${c.id}`} className="font-body text-[13.5px] font-medium text-ink hover:text-violet">
                    {c.name}
                  </Link>
                </td>
                <td className="px-6 py-4 font-body text-[13px] text-muted">
                  {(c.combo_services ?? []).map((cs: { services: { name: string } | null }) => cs.services?.name).filter(Boolean).join(", ")}
                </td>
                <td className="px-6 py-4">
                  <ActiveToggle table="combos" id={c.id} value={c.active} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
