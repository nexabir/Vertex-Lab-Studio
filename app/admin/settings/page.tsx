import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const [{ data: contactRow }, { data: seoRow }, { data: bookingRow }, { data: socialProofRow }] = await Promise.all([
    supabase.from("site_settings").select("value").eq("key", "contact").single(),
    supabase.from("site_settings").select("value").eq("key", "seo_defaults").single(),
    supabase.from("site_settings").select("value").eq("key", "booking").single(),
    supabase.from("site_settings").select("value").eq("key", "social_proof").single(),
  ]);

  return (
    <div>
      <AdminPageHeader title="Studio Settings & Config" />
      <SettingsForm
        contact={contactRow?.value ?? { email: "abirislam2020@gmail.com", phone: "01797989412", address: "" }}
        seo={
          seoRow?.value ?? {
            title: "Vertex Lab Studio — Digital products for business development",
            description:
              "Vertex Lab Studio turns business problems into engineered digital solutions — dashboards, ERP, websites, and strategy — built to your brief.",
          }
        }
        booking={
          bookingRow?.value ?? {
            url: "https://cal.com/vertex-lab-studio/discovery",
            enabled: true,
            label: "Book a 15-min discovery call",
          }
        }
        socialProof={
          socialProofRow?.value ?? {
            projectsDelivered: "48+",
            uptimeGuarantee: "99.9%",
            avgSprintWeeks: "2-3 wks",
            clientRetention: "100%",
          }
        }
      />
    </div>
  );
}
