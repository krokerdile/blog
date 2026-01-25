import Link from 'next/link';
import { cn } from '@/lib/utils';

export type Category = {
  name: string;
  count: number;
  slug: string;
};

// Mock data or pass real data
const categories: Category[] = [
  { name: 'Development', count: 12, slug: 'development' },
  { name: 'Life', count: 5, slug: 'life' },
  { name: 'Projects', count: 8, slug: 'projects' },
  { name: 'React', count: 4, slug: 'react' },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("w-64 flex-shrink-0 hidden lg:block", className)}>
      <div className="sticky top-24 space-y-8">
        <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            Categories
            </h3>
            <ul className="space-y-3">
            <li>
                <Link 
                    href="/blog" 
                    className="flex justify-between items-center text-gray-600 hover:text-blue-600 group"
                >
                    <span>All Posts</span>
                    <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs group-hover:bg-blue-50 group-hover:text-blue-600">
                        29
                    </span>
                </Link>
            </li>
            {categories.map((category) => (
                <li key={category.slug}>
                <Link
                    href={`/blog/category/${category.slug}`}
                    className="flex justify-between items-center text-gray-600 hover:text-blue-600 group"
                >
                    <span>{category.name}</span>
                    <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs group-hover:bg-blue-50 group-hover:text-blue-600">
                    {category.count}
                    </span>
                </Link>
                </li>
            ))}
            </ul>
        </div>
        
        {/* About Me Section in Sidebar */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">About Me</h3>
            <p className="text-sm text-gray-600 mb-4">
                Full-stack developer passionate about building great user experiences.
            </p>
             <Link href="/resume" className="text-sm text-blue-600 hover:underline">
                View Resume →
            </Link>
        </div>
      </div>
    </aside>
  );
}
