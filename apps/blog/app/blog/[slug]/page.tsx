import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { TOC } from "@/components/toc";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Calendar, User, Tag } from "lucide-react";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: `${post.title} | Hyunu's Blog`,
      description: post.description,
    };
  } catch (e) {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    notFound();
  }

  return (
    <div className="flex gap-12">
      {/* Main Content */}
      <article className="flex-1 min-w-0 max-w-4xl prose prose-lg prose-blue">
        <header className="mb-8 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {post.category}
                </span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-sm text-gray-500">{post.readingTime || '5 min read'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium text-gray-900">Hyunu</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>{post.date}</time>
                </div>
                 <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <div className="flex gap-1">
                        {post.tags.map(tag => (
                            <span key={tag}>#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </header>

        <div className="prose prose-lg prose-blue max-w-none prose-headings:scroll-mt-24">
          {post.content}
        </div>
      </article>

      {/* Right Sidebar - TOC */}
      <TOC />
    </div>
  );
}
