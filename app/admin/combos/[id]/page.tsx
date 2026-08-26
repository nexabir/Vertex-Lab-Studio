import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";
import { ComboForm } from "@/components/admin/ComboForm";

export default async function EditComboPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: combo }, { data: services }, { data: links }] = await Promise.all([
    supabase.from("combos").select("*").eq("id", id).single(),
    supabase.from("services").select("id, name").order("sort_order"),
    supabase.from("combo_services").select("service_id").eq("combo_id", id),
  ]);
  if (!combo) notFound();

  return (
    <div>
      <AdminPageHeader title={combo.name} />
      <ComboForm
        initial={combo}
        allServices={services ?? []}
        initialServiceIds={(links ?? []).map((l) => l.service_id)}
      />
    </div>
  );
}
