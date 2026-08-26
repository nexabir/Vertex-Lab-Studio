import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase.from("services").select("*").eq("id", id).single();
  if (!service) notFound();

  return (
    <div>
      <AdminPageHeader title={service.name} />
      <ServiceForm initial={service} />
    </div>
  );
}
