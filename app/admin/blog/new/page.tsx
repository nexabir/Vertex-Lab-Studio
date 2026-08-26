import { AdminPageHeader } from "@/components/admin/Card";
import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <AdminPageHeader title="New post" />
      <BlogForm />
    </div>
  );
}
