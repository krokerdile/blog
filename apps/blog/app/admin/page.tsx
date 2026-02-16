import { AdminWorkspace } from "@/components/admin/AdminWorkspace";
import { getAllEditablePosts } from "@/lib/posts";

export default function AdminPage() {
  const posts = getAllEditablePosts();
  return <AdminWorkspace initialPosts={posts} />;
}
