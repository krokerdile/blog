'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type CategoryTab = {
  name: string;
  slug: string;
  count: number;
};

interface CategoryTabsProps {
  totalPosts: number;
  categories: CategoryTab[];
}

export function CategoryTabs({ totalPosts, categories }: CategoryTabsProps) {
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/\/+$/, '');
  const isAllActive = normalizedPath.endsWith('/blog/posts');

  return (
    <section className="mb-8">
      <div className="rounded-2xl bg-white/85 px-4 py-3 shadow-sm backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/blog/posts"
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              isAllActive
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>All</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{totalPosts}</span>
          </Link>

          {categories.map((category) => {
            const href = `/blog/posts/${category.slug}`;
            const isActive = normalizedPath.endsWith(href);

            return (
              <Link
                key={category.slug}
                href={href}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <span>{category.name}</span>
                <span className="rounded-full bg-white/30 px-2 py-0.5 text-xs">{category.count}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
