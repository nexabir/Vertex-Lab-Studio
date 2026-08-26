import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";
import { ComboForm } from "@/components/admin/ComboForm";

export default async function NewComboPage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("id, name").order("sort_order");

  return (
    <div>
      <AdminPageHeader title="New combo" />
      <ComboForm allServices={services ?? []} />
    </div>
  );
}
