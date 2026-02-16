import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
  coverImage?: string;
  content: any; // MDX content
  readingTime?: string; // Placeholder for future
};

export type PostMeta = Omit<Post, 'content'>;

export type EditablePost = {
  fileName: string;
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
  coverImage?: string;
  body: string;
};

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Parse frontmatter just to get meta (we could use compileMDX for everything but this separates concerns slightly if we use other parsers later)
  const { data } = matter(fileContents);

  // Compile MDX
  const { content } = await compileMDX({
    source: fileContents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }]
        ],
      },
    },
    components: {}, // passed in at render time usually, or here global
  });

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    description: data.description,
    tags: data.tags || [],
    category: data.category || 'General',
    coverImage: data.coverImage || '',
    content,
  };
}

export function getAllPosts(): PostMeta[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const slugs = getPostSlugs();
    const posts = slugs
        .filter((slug) => slug.endsWith('.mdx'))
        .map((slug) => {
            const realSlug = slug.replace(/\.mdx$/, '');
            const fullPath = path.join(postsDirectory, slug);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug: realSlug,
                title: data.title,
                date: data.date,
                description: data.description,
                tags: data.tags || [],
                category: data.category || 'General',
                coverImage: data.coverImage || '',
            };
        })
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

    return posts;
}

export function getPopularPosts(): PostMeta[] {
    // For now, just return specific posts or the most recent ones.
    // In a real app, this would use analytics data.
    return getAllPosts().slice(0, 3);
}

export function getAllCategories(): Record<string, number> {
  const posts = getAllPosts();
  const categories: Record<string, number> = {};
  
  posts.forEach(post => {
    const category = post.category || 'Uncategorized';
    categories[category] = (categories[category] || 0) + 1;
  });
  
  return categories;
}

export function getPostsByCategorySlug(slug: string): PostMeta[] {
  return getAllPosts().filter((post) => categoryToSlug(post.category || 'Uncategorized') === slug);
}

export function getAllEditablePosts(): EditablePost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const slug = fileName.replace(/\.mdx$/, '');

      return {
        fileName,
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
        tags: data.tags || [],
        category: data.category || 'General',
        coverImage: data.coverImage || '',
        body: content.trim(),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
