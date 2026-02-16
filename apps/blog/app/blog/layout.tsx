import { CategoryTabs } from "@/components/blog/CategoryTabs";
import { categoryToSlug, getAllCategories, getAllPosts } from "@/lib/posts";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categoriesMap = getAllCategories();
  const categories = Object.entries(categoriesMap).map(([name, count]) => ({
    name,
    count,
    slug: categoryToSlug(name),
  }));
  const totalPosts = getAllPosts().length;

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CategoryTabs totalPosts={totalPosts} categories={categories} />
      <main className="min-w-0">{children}</main>
    </div>
  );
}
