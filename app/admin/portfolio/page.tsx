import Link from "next/link";
import { Plus, Eye, CheckCircle2, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";
import { staticProjects } from "@/data/portfolio";
import { isSupabaseConfigured } from "@/lib/supabase/config";

interface AdminPortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  client_name: string;
  active: boolean;
  updated_at: string;
}

export default async function AdminPortfolioPage() {
  let projects: AdminPortfolioItem[] = [];
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("portfolio_projects")
        .select("id, slug, title, category, client_name, active, updated_at")
        .order("sort_order");
      if (data && data.length > 0) {
        projects = data;
      }
    } catch {
      // fallback to static
    }
  }

  // Fallback to static if no Supabase records yet
  if (projects.length === 0) {
    projects = staticProjects.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      client_name: p.clientName,
      active: p.active,
      updated_at: new Date().toISOString(),
    }));
  }

  return (
    <div>
      <AdminPageHeader
        title="Portfolio & Case Studies"
        action={
          <div className="flex items-center gap-3">
            <Link
              href="/portfolio"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-[12.5px] font-medium font-body text-ink hover:bg-cream"
            >
              <Eye size={13} /> View Live Page
            </Link>
            <Link
              href="/admin/portfolio/new"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink text-cream px-4 py-2 text-[13px] font-medium font-body hover:bg-violet"
            >
              <Plus size={14} /> New Case Study
            </Link>
          </div>
        }
      />

      <div className="rounded-xl2 border border-line bg-white overflow-hidden shadow-xs">
        <table className="w-full">
          <thead>
            <tr className="border-b border-line bg-cream/30 text-left font-body text-[11px] font-semibold uppercase tracking-wider text-muted">
              <th className="px-6 py-3.5">Case Study</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Client</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0 hover:bg-cream/20 transition-colors">
                <td className="px-6 py-4">
                  <Link href={`/admin/portfolio/${p.id}`} className="font-body text-[13.5px] font-medium text-ink hover:text-violet block">
                    {p.title}
                  </Link>
                  <span className="font-body text-[11px] text-muted">/{p.slug}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-body text-[12.5px] text-ink-soft">{p.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-body text-[12.5px] text-muted">{p.client_name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${p.active ? "bg-lime/20 text-[#7A9A0E]" : "bg-line text-muted"}`}>
                    {p.active ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                    {p.active ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/portfolio/${p.id}`}
                    className="font-body text-[12.5px] font-medium text-violet hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
