import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Calendar, MessageCircle, Heart, Eye } from 'lucide-react';
import { type PostMeta } from '@/lib/posts';

interface PostCardProps {
  post: PostMeta;
  layout?: 'grid' | 'list';
}

export function PostCard({ post, layout = 'list' }: PostCardProps) {
  return (
    <div className={cn(
        "group relative bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100",
        layout === 'list' ? "flex flex-col md:flex-row gap-6 p-6" : "flex flex-col h-full"
    )}>
      {/* Image Placeholder - In real app, render post.coverImage */}
      <div className={cn(
         "bg-gray-200 shrink-0", 
         layout === 'list' ? "w-full md:w-64 h-48 rounded-xl object-cover" : "w-full h-48"
      )}>
        {/* <Image /> */}
      </div>

      <div className={cn("flex flex-col justify-between flex-1", layout === 'grid' && "p-6")}>
        <div>
            <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {post.category}
                </span>
                <div className="flex items-center text-xs text-gray-500 gap-1">
                    <Calendar className="w-3 h-3" />
                    <time dateTime={post.date}>{post.date}</time>
                </div>
            </div>

            <Link href={`/blog/${post.slug}`} className="block group-hover:text-blue-600 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                </h3>
            </Link>

            <p className="text-gray-600 line-clamp-2 md:line-clamp-3 mb-4 text-sm leading-relaxed">
                {post.description}
            </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
            <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> 1.2k
                </span>
                <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4" /> 48
                </span>
                <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" /> 12
                </span>
            </div>
            
            <div className="flex gap-2">
                {post.tags.slice(0, 3).map(tag => (
                     <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
