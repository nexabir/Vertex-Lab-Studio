import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/data";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = marked.parse(post.content, { async: false }) as string;

  return (
    <article className="max-w-content mx-auto px-6 pt-[150px] pb-24">
      <div className="max-w-[680px] mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-body text-[13px] text-muted hover:text-ink mb-8"
        >
          <ArrowLeft size={14} /> Back to blog
        </Link>
        {post.published_at && (
          <p className="font-body text-[12px] text-muted mb-3">
            {new Date(post.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
        <h1 className="font-display text-[34px] sm:text-[40px] font-medium text-ink mb-8 leading-tight">
          {post.title}
        </h1>
        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt=""
            className="w-full rounded-xl2 mb-10 border border-line"
          />
        )}
        <div
          className="prose-vls font-body text-[16px] leading-[1.75] text-ink-soft"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </article>
  );
}
