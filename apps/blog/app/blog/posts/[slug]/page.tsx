import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { categoryToSlug, getAllCategories, getAllPosts, getPostsByCategorySlug } from "@/lib/posts";

interface CategoryPostsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(getAllCategories()).map((name) => ({
    slug: categoryToSlug(name),
  }));
}

export const dynamicParams = false;

function formatCategoryName(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function CategoryPostsPage({ params }: CategoryPostsPageProps) {
  const { slug } = await params;
  const posts = getPostsByCategorySlug(slug);

  if (posts.length === 0) {
    notFound();
  }

  const title = posts[0]?.category || formatCategoryName(slug);
  const totalPosts = getAllPosts().length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">
          {posts.length} / {totalPosts} posts
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} layout="list" />
        ))}
      </div>
    </div>
  );
}
