import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";
import { AdminRequestsList } from "@/components/admin/AdminRequestsList";

export default async function AdminRequestsPage() {
  const supabase = await createClient();
  const { data: requests } = await supabase
    .from("requests")
    .select("id, contact_name, contact_email, contact_phone, company, service_ids, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader
        title="Lead Pipeline & Requests"
        description="Triage inbound client briefs, adjust proposal pipeline stages, and send instant responses."
      />
      <AdminRequestsList initialRequests={requests ?? []} />
    </div>
  );
}
