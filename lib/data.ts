import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { services as staticServices, Service, Accent } from "@/data/services";
import { combos as staticCombos, Combo } from "@/data/combos";
import { questionsByService as staticQuestions, Question } from "@/data/questions";

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
