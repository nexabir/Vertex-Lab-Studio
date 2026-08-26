import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/Card";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, status, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <AdminPageHeader
        title="Blog"
        action={
          <Link href="/admin/blog/new" className="inline-flex items-center gap-1.5 rounded-full bg-ink text-cream px-4 py-2 text-[13px] font-medium font-body hover:bg-violet">
            <Plus size={14} /> New post
          </Link>
        }
      />
      <div className="rounded-xl2 border border-line bg-white overflow-hidden">
        {!posts || posts.length === 0 ? (
          <p className="font-body text-[13px] text-muted px-6 py-12 text-center">No posts yet.</p>
        ) : (
          <table className="w-full">
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-line last:border-0 hover:bg-cream/30">
                  <td className="px-6 py-4">
                    <Link href={`/admin/blog/${p.id}`} className="font-body text-[13.5px] font-medium text-ink hover:text-violet">
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium capitalize ${p.status === "published" ? "bg-lime/20 text-[#7A9A0E]" : "bg-line text-muted"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-body text-[12px] text-muted">
                    {new Date(p.updated_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
