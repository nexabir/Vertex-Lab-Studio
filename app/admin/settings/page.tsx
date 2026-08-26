import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const [{ data: contactRow }, { data: seoRow }] = await Promise.all([
    supabase.from("site_settings").select("value").eq("key", "contact").single(),
    supabase.from("site_settings").select("value").eq("key", "seo_defaults").single(),
  ]);

  return (
    <div>
      <AdminPageHeader title="Settings" />
      <SettingsForm
        contact={contactRow?.value ?? { email: "", phone: "", address: "" }}
        seo={seoRow?.value ?? { title: "", description: "" }}
      />
    </div>
  );
}
