'use client';

import { FormEvent, useMemo, useState } from 'react';
import type { EditablePost } from '@/lib/posts';

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME ?? '';
const ADMIN_PASSWORD_SHA256 = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_SHA256 ?? '';
const SESSION_KEY = 'admin-authenticated';

type AdminWorkspaceProps = {
  initialPosts: EditablePost[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function renderPreview(content: string) {
  return content.split('\n').map((line, index) => {
    const key = `line-${index}`;
    const text = line.trim();

    if (!text) return <div key={key} className="h-2" />;
    if (text.startsWith('### ')) return <h3 key={key} className="mt-4 text-xl font-semibold text-gray-900">{text.slice(4)}</h3>;
    if (text.startsWith('## ')) return <h2 key={key} className="mt-5 text-2xl font-bold text-gray-900">{text.slice(3)}</h2>;
    if (text.startsWith('# ')) return <h1 key={key} className="mt-6 text-3xl font-bold text-gray-900">{text.slice(2)}</h1>;
    if (text.startsWith('- ')) return <li key={key} className="ml-5 list-disc text-gray-700">{text.slice(2)}</li>;
    if (text.startsWith('```')) return <p key={key} className="rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-700">code block</p>;
    return <p key={key} className="leading-7 text-gray-700">{text}</p>;
  });
}

export function AdminWorkspace({ initialPosts }: AdminWorkspaceProps) {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(SESSION_KEY) === 'true';
  });
  const [posts, setPosts] = useState(initialPosts);
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [loginError, setLoginError] = useState('');

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [tags, setTags] = useState('nextjs, blog');
  const [content, setContent] = useState('# New Post\n\nWrite your post here.');
  const [copyDone, setCopyDone] = useState(false);

  const envReady = Boolean(ADMIN_USERNAME && ADMIN_PASSWORD_SHA256);

  const fileName = `${slug || slugify(title || 'new-post')}.mdx`;

  const mdxText = useMemo(() => {
    const tagList = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => `"${t}"`)
      .join(', ');

    return `---\ntitle: "${title || 'Untitled'}"\ndate: "${date}"\ndescription: "${description}"\ntags: [${tagList}]\ncategory: "${category || 'Development'}"\n---\n\n${content}\n`;
  }, [category, content, date, description, tags, title]);

  const deleteCommands = useMemo(
    () => deletedFiles.map((name) => `git rm apps/blog/content/blog/${name}`),
    [deletedFiles]
  );

  async function onLogin(e: FormEvent) {
    e.preventDefault();
    setLoginError('');

    if (!envReady) {
      setLoginError('Admin is disabled. Configure GitHub secrets first.');
      return;
    }

    const hashed = await sha256(loginPw);
    const ok = loginId === ADMIN_USERNAME && hashed === ADMIN_PASSWORD_SHA256;
    if (!ok) {
      setLoginError('Invalid credentials.');
      return;
    }

    window.sessionStorage.setItem(SESSION_KEY, 'true');
    setIsAuthed(true);
    setLoginPw('');
  }

  function logout() {
    window.sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
  }

  function loadPostForEdit(post: EditablePost) {
    setEditingSlug(post.slug);
    setTitle(post.title);
    setSlug(post.slug);
    setDate(post.date);
    setDescription(post.description);
    setCategory(post.category);
    setTags(post.tags.join(', '));
    setContent(post.body || '');
    setShowPreview(false);
  }

  function removePost(post: EditablePost) {
    const confirmed = window.confirm(`Delete "${post.title}"? This will generate a delete command.`);
    if (!confirmed) return;

    setPosts((prev) => prev.filter((p) => p.slug !== post.slug));
    setDeletedFiles((prev) => (prev.includes(post.fileName) ? prev : [...prev, post.fileName]));
    if (editingSlug === post.slug) {
      setEditingSlug(null);
    }
  }

  async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
    setCopyDone(true);
    setTimeout(() => setCopyDone(false), 1200);
  }

  function downloadFile(name: string, text: string) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen max-w-xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin</h1>
        <p className="text-sm text-gray-600 mb-8">Temporary login for post management.</p>
        <form onSubmit={onLogin} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Account</span>
            <input value={loginId} onChange={(e) => setLoginId(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" autoComplete="username" required />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Password</span>
            <input value={loginPw} onChange={(e) => setLoginPw(e.target.value)} type="password" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" autoComplete="current-password" required />
          </label>
          {loginError && <p className="text-sm text-red-600">{loginError}</p>}
          <button type="submit" className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white">Sign in</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin</h1>
        <button type="button" onClick={logout} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700">Logout</button>
      </div>
      <p className="mb-6 text-sm text-amber-700">Static mode: edit/delete actions generate files/commands. You still commit changes via git.</p>

      <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-900">Posts</h2>
        <div className="space-y-2">
          {posts.map((post) => (
            <div key={post.slug} className="flex flex-col gap-2 rounded-xl bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-gray-900">{post.title}</p>
                <p className="text-xs text-gray-500">{post.category} · {post.date} · {post.slug}.mdx</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => loadPostForEdit(post)} className="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white">Edit</button>
                <button type="button" onClick={() => removePost(post)} className="rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{editingSlug ? `Editing: ${editingSlug}` : 'New Post'}</h2>
            {editingSlug && (
              <button
                type="button"
                onClick={() => setEditingSlug(null)}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700"
              >
                Clear
              </button>
            )}
          </div>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Slug</span>
            <div className="flex gap-2">
              <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              <button type="button" onClick={() => setSlug(slugify(title))} className="rounded-lg border border-gray-300 px-3 text-sm">Auto</button>
            </div>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Description</span>
            <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Category</span>
            <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Tags (comma separated)</span>
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Content (MDX)</span>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={14} className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" />
          </label>
        </section>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Generated MDX</h2>
          <p className="text-sm text-gray-600">Save to `apps/blog/content/blog/{fileName}`</p>
          <pre className="max-h-[420px] overflow-auto rounded-lg bg-gray-950 p-4 text-xs text-gray-100">{mdxText}</pre>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => copyToClipboard(mdxText)} className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white">{copyDone ? 'Copied' : 'Copy MDX'}</button>
            <button type="button" onClick={() => downloadFile(fileName, mdxText)} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700">Download .mdx</button>
            <button type="button" onClick={() => setShowPreview((v) => !v)} className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {showPreview ? 'Hide Preview' : 'Preview'}
            </button>
          </div>

          {deleteCommands.length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="mb-2 text-sm font-semibold text-red-700">Pending Delete Commands</p>
              <pre className="mb-2 overflow-auto rounded bg-white p-2 text-xs text-red-700">{deleteCommands.join('\n')}</pre>
              <button type="button" onClick={() => copyToClipboard(deleteCommands.join('\n'))} className="rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-700">
                Copy Delete Commands
              </button>
            </div>
          )}
        </section>
      </div>

      {showPreview && (
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">Preview</p>
          <article className="prose prose-lg max-w-none">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">{category}</span>
            <h1 className="mt-3 text-4xl font-bold text-gray-900">{title || 'Untitled'}</h1>
            <p className="text-gray-500">{date} · {description}</p>
            <div className="mt-4 space-y-2">{renderPreview(content)}</div>
          </article>
        </section>
      )}
    </div>
  );
}
