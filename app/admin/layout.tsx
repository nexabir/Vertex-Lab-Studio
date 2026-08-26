import { requireAdmin } from "@/lib/admin-guard";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile, user } = await requireAdmin();
  return <AdminShell adminEmail={profile?.email ?? user.email ?? ""}>{children}</AdminShell>;
}
