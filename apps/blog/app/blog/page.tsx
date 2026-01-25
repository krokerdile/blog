import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { Button } from "@hyunu/ui";

export default async function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
        
        {/* Sorting Toggles */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            {['Latest', 'Popular', 'Comments'].map((sort) => (
                <button
                    key={sort}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                        sort === 'Latest' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                    {sort}
                </button>
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
