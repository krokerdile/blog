import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { Button } from "@hyunu/ui";
import Link from "next/link";

interface BlogIndexPageProps {
  searchParams: Promise<{ sort?: string }>;
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const { sort = 'Latest' } = await searchParams;
  let posts = getAllPosts();

  // Sorting logic
  if (sort === 'Latest') {
    posts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (sort === 'Popular') {
    // Mock popular sorting for now, maybe by tags length or something for demonstration
    posts = [...posts].sort((a, b) => (b.tags?.length || 0) - (a.tags?.length || 0));
  }

  const sortOptions = [
    { name: 'Latest', value: 'Latest' },
    { name: 'Popular', value: 'Popular' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
        
        {/* Sorting Toggles */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            {sortOptions.map((option) => (
                <Link
                    key={option.value}
                    href={`/blog?sort=${option.value}`}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                        sort === option.value 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                    {option.name}
                </Link>
            ))}
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} layout="list" />
        ))}
      </div>

       {/* Pagination (Mock) */}
       <div className="mt-12 flex justify-center">
            <Button variant="outline">Load More</Button>
       </div>
    </div>
  );
}
