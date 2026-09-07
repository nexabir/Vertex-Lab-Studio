import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";
import { PortfolioForm, PortfolioFormRow } from "@/components/admin/PortfolioForm";
import { staticProjects } from "@/data/portfolio";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function AdminPortfolioEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  let initial: PortfolioFormRow | undefined = undefined;

  if (!isNew) {
    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        const { data } = await supabase
          .from("portfolio_projects")
          .select("*")
          .eq("id", params.id)
          .single();
        if (data) {
          initial = {
            id: data.id,
            slug: data.slug,
            title: data.title,
            category: data.category,
            client_name: data.client_name,
            summary: data.summary,
            problem: data.problem,
            solution: data.solution,
            metrics: Array.isArray(data.metrics) ? data.metrics : [],
            tags: data.tags ?? [],
            live_url: data.live_url,
            cover_image_url: data.cover_image_url,
            accent: data.accent,
            sort_order: data.sort_order ?? 0,
            active: data.active ?? true,
          };
        }
      } catch {
        // fallback
      }
    }

    if (!initial) {
      const match = staticProjects.find((p) => p.id === params.id || p.slug === params.id);
      if (match) {
        initial = {
          slug: match.slug,
          title: match.title,
          category: match.category,
          client_name: match.clientName,
          summary: match.summary,
          problem: match.problem,
          solution: match.solution,
          metrics: match.metrics,
          tags: match.tags,
          live_url: match.liveUrl ?? null,
          cover_image_url: match.coverImageUrl ?? null,
          accent: match.accent,
          sort_order: match.sortOrder,
          active: match.active,
        };
      }
    }
  }

  return (
    <div>
      <AdminPageHeader title={isNew ? "New Case Study" : `Edit: ${initial?.title ?? "Case Study"}`} />
      <div className="rounded-xl2 border border-line bg-white p-8 shadow-xs">
        <PortfolioForm initial={initial} />
      </div>
    </div>
  );
}
