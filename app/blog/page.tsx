import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { getPublishedPosts } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="max-w-content mx-auto px-6 pt-[150px] pb-24">
      <Eyebrow>From the studio</Eyebrow>
      <h1 className="font-display text-[36px] sm:text-[44px] font-medium text-ink mb-5 max-w-[640px]">
        Blog
      </h1>
      <p className="font-body text-[15px] leading-relaxed text-muted max-w-[540px] mb-14">
        Notes on the products we build and how we build them.
      </p>

      {posts.length === 0 ? (
        <div className="rounded-xl2 border border-dashed border-line bg-white/60 p-10 text-center">
          <p className="font-body text-[14px] text-muted">
            {isSupabaseConfigured()
              ? "No posts published yet — check back soon."
              : "The blog goes live once Supabase is connected and a post is published from the admin panel."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="rounded-xl2 border border-line bg-white p-7 hover:shadow-card transition-shadow"
            >
              <p className="font-body text-[12px] text-muted mb-3">
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>
              <h2 className="font-display text-[19px] font-medium text-ink mb-2">{post.title}</h2>
              {post.excerpt && (
                <p className="font-body text-[14px] leading-relaxed text-ink-soft">{post.excerpt}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
