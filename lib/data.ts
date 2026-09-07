import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { services as staticServices, Service, Accent } from "@/data/services";
import { combos as staticCombos, Combo } from "@/data/combos";
import { questionsByService as staticQuestions, Question } from "@/data/questions";
import { staticProjects, PortfolioProject } from "@/data/portfolio";

// These functions are the single source of truth the public site reads
// from. If Supabase is configured (env vars set + schema/seed run), they
// read live data the admin panel can edit. If not, they fall back to the
// static files in /data so the site works out of the box with zero setup.

export async function getServices(): Promise<Service[]> {
  if (!isSupabaseConfigured()) return staticServices;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("active", true)
      .order("sort_order");
    if (error || !data || data.length === 0) return staticServices;
    return data.map(
      (row): Service => ({
        id: row.slug,
        category: row.category,
        name: row.name,
        tagline: row.tagline,
        description: row.description,
        accent: row.accent as Accent,
        icon: row.icon,
      })
    );
  } catch {
    return staticServices;
  }
}

export async function getCombos(): Promise<Combo[]> {
  if (!isSupabaseConfigured()) return staticCombos;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("combos")
      .select("*, combo_services(services(slug))")
      .eq("active", true)
      .order("sort_order");
    if (error || !data || data.length === 0) return staticCombos;
    return data.map(
      (row): Combo => ({
        id: row.slug,
        name: row.name,
        summary: row.summary,
        accent: row.accent as Accent,
        serviceIds: (row.combo_services ?? [])
          .map((cs: { services: { slug: string } | null }) => cs.services?.slug)
          .filter(Boolean),
      })
    );
  } catch {
    return staticCombos;
  }
}

export async function getQuestionsByService(): Promise<Record<string, Question[]>> {
  if (!isSupabaseConfigured()) return staticQuestions;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("questions")
      .select("*, services(slug)")
      .order("sort_order");
    if (error || !data || data.length === 0) return staticQuestions;
    const map: Record<string, Question[]> = {};
    for (const row of data) {
      const slug = row.services?.slug;
      if (!slug) continue;
      if (!map[slug]) map[slug] = [];
      map[slug].push({
        id: row.id,
        label: row.label,
        type: row.type,
        options: row.options ?? undefined,
        placeholder: row.placeholder ?? undefined,
      });
    }
    return Object.keys(map).length > 0 ? map : staticQuestions;
  } catch {
    return staticQuestions;
  }
}

export interface SiteContact {
  email: string;
  phone: string;
  address: string;
}

const defaultContact: SiteContact = {
  email: "abirislam2020@gmail.com",
  phone: "01797989412",
  address: "",
};

export async function getSiteContact(): Promise<SiteContact> {
  if (!isSupabaseConfigured()) return defaultContact;
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("value").eq("key", "contact").single();
    return (data?.value as SiteContact) ?? defaultContact;
  } catch {
    return defaultContact;
  }
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  if (!isSupabaseConfigured()) return staticProjects;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("active", true)
      .order("sort_order");
    if (error || !data || data.length === 0) return staticProjects;
    return data.map((row): PortfolioProject => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      category: row.category,
      clientName: row.client_name,
      summary: row.summary,
      problem: row.problem,
      solution: row.solution,
      metrics: Array.isArray(row.metrics) ? row.metrics : [],
      tags: row.tags ?? [],
      liveUrl: row.live_url,
      coverImageUrl: row.cover_image_url,
      accent: row.accent as Accent,
      sortOrder: row.sort_order ?? 0,
      active: row.active ?? true,
    }));
  } catch {
    return staticProjects;
  }
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const all = await getPortfolioProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

export interface SocialProofStats {
  projectsDelivered: string;
  uptimeGuarantee: string;
  avgSprintWeeks: string;
  clientRetention: string;
}

const defaultStats: SocialProofStats = {
  projectsDelivered: "48+",
  uptimeGuarantee: "99.9%",
  avgSprintWeeks: "2-3 wks",
  clientRetention: "100%",
};

export async function getSocialProofStats(): Promise<SocialProofStats> {
  if (!isSupabaseConfigured()) return defaultStats;
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("value").eq("key", "social_proof").single();
    return (data?.value as SocialProofStats) ?? defaultStats;
  } catch {
    return defaultStats;
  }
}

export interface BookingSettings {
  url: string;
  enabled: boolean;
  label: string;
}

const defaultBooking: BookingSettings = {
  url: "https://cal.com/vertex-lab-studio/discovery",
  enabled: true,
  label: "Book a 15-min discovery call",
};

export async function getBookingSettings(): Promise<BookingSettings> {
  if (!isSupabaseConfigured()) return defaultBooking;
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("value").eq("key", "booking").single();
    return (data?.value as BookingSettings) ?? defaultBooking;
  } catch {
    return defaultBooking;
  }
}
