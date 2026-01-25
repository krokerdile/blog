import { getPostBySlug } from "@/lib/posts";
import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Hyunu's Blog",
  description: "Professional experience and skills",
};

export default async function ResumePage() {
  const resumePath = path.join(process.cwd(), 'content/resume.mdx');
  
  if (!fs.existsSync(resumePath)) {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Resume not found</h1>
        </div>
    )
  }

  const fileContents = fs.readFileSync(resumePath, 'utf8');

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
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <article className="prose prose-lg prose-blue max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {content}
      </article>
    </div>
  );
}
