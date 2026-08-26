"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { marked } from "marked";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/Button";
import { clsx } from "clsx";

interface PostRow {
  id?: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: "draft" | "published";
}

const empty: PostRow = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  seo_title: "",
  seo_description: "",
  status: "draft",
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function BlogForm({ initial }: { initial?: PostRow }) {
  const [form, setForm] = useState<PostRow>(initial ?? empty);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  function set<K extends keyof PostRow>(key: K, value: PostRow[K]) {
    setForm((f) => ({
      ...f,
      [key]: value,
      slug: key === "title" && !isEdit ? slugify(value as string) : f.slug,
    }));
  }

  async function save(status: "draft" | "published") {
    setSaving(true);
    const supabase = createClient();
    const payload = {
      ...form,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };
    if (isEdit && initial?.id) {
      await supabase.from("blog_posts").update(payload).eq("id", initial.id);
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      await supabase.from("blog_posts").insert({ ...payload, author_id: user?.id });
    }
    setSaving(false);
    router.push("/admin/blog");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial?.id || !confirm("Delete this post?")) return;
    const supabase = createClient();
    await supabase.from("blog_posts").delete().eq("id", initial.id);
    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <form onSubmit={(e: FormEvent) => e.preventDefault()} className="max-w-[720px] space-y-5">
      <input
        value={form.title}
        onChange={(e) => set("title", e.target.value)}
        placeholder="Post title"
        className="w-full rounded-lg border border-line px-4 py-3 font-display text-[20px] font-medium"
      />
      <input
        value={form.slug}
        onChange={(e) => set("slug", e.target.value)}
        placeholder="url-slug"
        className="w-full rounded-lg border border-line px-4 py-2.5 font-body text-[13px] text-muted"
      />
      <textarea
        rows={2}
        value={form.excerpt ?? ""}
        onChange={(e) => set("excerpt", e.target.value)}
        placeholder="Short excerpt shown on the blog list"
        className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] resize-none"
      />

      <div>
        <div className="flex items-center gap-4 mb-2">
          <button type="button" onClick={() => setPreview(false)} className={clsx("font-body text-[12px] font-medium", !preview ? "text-ink" : "text-muted")}>
            Write (Markdown)
          </button>
          <button type="button" onClick={() => setPreview(true)} className={clsx("font-body text-[12px] font-medium", preview ? "text-ink" : "text-muted")}>
            Preview
          </button>
        </div>
        {preview ? (
          <div
            className="prose-vls border border-line rounded-lg p-5 min-h-[300px] font-body text-[15px]"
            dangerouslySetInnerHTML={{ __html: marked.parse(form.content, { async: false }) as string }}
          />
        ) : (
          <textarea
            rows={16}
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            placeholder="Write in Markdown — # headings, **bold**, - lists..."
            className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] font-mono resize-y"
          />
        )}
      </div>

      <input
        value={form.cover_image_url ?? ""}
        onChange={(e) => set("cover_image_url", e.target.value)}
        placeholder="Cover image URL (optional)"
        className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px]"
      />

      <div className="border-t border-line pt-5">
        <p className="font-body text-[12px] font-semibold uppercase tracking-[0.06em] text-muted mb-3">SEO</p>
        <input
          value={form.seo_title ?? ""}
          onChange={(e) => set("seo_title", e.target.value)}
          placeholder="SEO title (defaults to post title)"
          className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] mb-3"
        />
        <textarea
          rows={2}
          value={form.seo_description ?? ""}
          onChange={(e) => set("seo_description", e.target.value)}
          placeholder="Meta description"
          className="w-full rounded-lg border border-line px-4 py-3 font-body text-[14px] resize-none"
        />
      </div>

      <div className="flex items-center justify-between pt-4">
        {isEdit ? (
          <button type="button" onClick={handleDelete} className="inline-flex items-center gap-1.5 font-body text-[13px] text-coral">
            <Trash2 size={14} /> Delete
          </button>
        ) : <span />}
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={() => save("draft")} disabled={saving}>
            Save draft
          </Button>
          <Button type="button" onClick={() => save("published")} disabled={saving}>
            Publish
          </Button>
        </div>
      </div>
    </form>
  );
}
