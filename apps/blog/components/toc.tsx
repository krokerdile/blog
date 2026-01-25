'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Heading = {
  id: string;
  text: string;
  level: number;
};

export function TOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Select all headings from h1 to h3 within the article content
    // Assuming the article content is wrapped in a container, ideally we scope this selection
    // For now we select globally but typically we'd scope to 'article' or specific ref
    const elements = Array.from(document.querySelectorAll('article h1, article h2, article h3'))
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.substring(1)),
      }))
      .filter((heading) => heading.id); // Only headers with IDs (added by rehype-slug)

    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    elements.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block w-64 flex-shrink-0">
      <div className="sticky top-24 pl-8 border-l border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">On this page</h4>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li 
                key={heading.id}
                className={cn(
                    "transition-colors",
                    heading.level === 3 && "pl-4",
                    activeId === heading.id ? "text-blue-600 font-medium" : "text-gray-500 hover:text-gray-900"
                )}
            >
              <a href={`#${heading.id}`} onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveId(heading.id);
              }}>
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
