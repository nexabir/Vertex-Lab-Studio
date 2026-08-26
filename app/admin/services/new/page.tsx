import { AdminPageHeader } from "@/components/admin/Card";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <AdminPageHeader title="New service" />
      <ServiceForm />
    </div>
  );
}
