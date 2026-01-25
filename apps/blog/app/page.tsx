import { getAllPosts, getPopularPosts } from "@/lib/posts";
import { PopularPostsBanner } from "@/components/home/PopularPostsBanner";
import { PostCard } from "@/components/blog/PostCard";
import Link from 'next/link';

export default async function Home() {
  const popularPosts = getPopularPosts();
  const allPosts = getAllPosts();
  // Get recent 6 posts excluding popular ones if needed, or just most recent
  const recentPosts = allPosts.slice(0, 6);

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Popular Posts Slider */}
        <section className="mb-16">
           <PopularPostsBanner posts={popularPosts} />
        </section>

        {/* Recent Posts */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Articles</h2>
                <p className="text-gray-600">Discover the latest thoughts and tutorials.</p>
            </div>
            <Link href="/blog" className="text-blue-600 font-medium hover:text-blue-700 hover:underline">
                View all posts →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} layout="grid" />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
