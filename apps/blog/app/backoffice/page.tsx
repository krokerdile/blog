'use client';

import { FormEvent, useMemo, useState } from 'react';

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_BACKOFFICE_USERNAME ?? '';
const ADMIN_PASSWORD_SHA256 = process.env.NEXT_PUBLIC_BACKOFFICE_PASSWORD_SHA256 ?? '';
const SESSION_KEY = 'backoffice-authenticated';

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

export default function BackofficePage() {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(SESSION_KEY) === 'true';
  });

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

  const mdxText = useMemo(() => {
    const finalSlug = slug || slugify(title);
    const tagList = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => `"${t}"`)
      .join(', ');

    return `---\ntitle: "${title || 'Untitled'}"\ndate: "${date}"\ndescription: "${description}"\ntags: [${tagList}]\ncategory: "${category || 'Development'}"\n---\n\n${content}\n`;
  }, [category, content, date, description, slug, tags, title]);

  const fileName = `${slug || slugify(title || 'new-post')}.mdx`;
  const envReady = Boolean(ADMIN_USERNAME && ADMIN_PASSWORD_SHA256);

  async function onLogin(e: FormEvent) {
    e.preventDefault();
    setLoginError('');

    if (!envReady) {
      setLoginError('Backoffice is disabled. Configure GitHub secrets first.');
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

  async function copyToClipboard() {
    await navigator.clipboard.writeText(mdxText);
    setCopyDone(true);
    setTimeout(() => setCopyDone(false), 1200);
  }

  function downloadFile() {
    const blob = new Blob([mdxText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen max-w-xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Backoffice</h1>
        <p className="text-sm text-gray-600 mb-8">Temporary login for writing post drafts.</p>

        <form onSubmit={onLogin} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Account</span>
            <input
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              autoComplete="username"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Password</span>
            <input
              value={loginPw}
              onChange={(e) => setLoginPw(e.target.value)}
              type="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              autoComplete="current-password"
              required
            />
          </label>
          {loginError && <p className="text-sm text-red-600">{loginError}</p>}
          <button type="submit" className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white">
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Post Editor</h1>
        <button
          type="button"
          onClick={logout}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Slug</span>
            <div className="flex gap-2">
              <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
              <button type="button" onClick={() => setSlug(slugify(title))} className="rounded-lg border border-gray-300 px-3 text-sm">
                Auto
              </button>
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
          <p className="text-sm text-gray-600">Save file to `apps/blog/content/blog/{fileName}`.</p>
          <pre className="max-h-[520px] overflow-auto rounded-lg bg-gray-950 p-4 text-xs text-gray-100">{mdxText}</pre>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={copyToClipboard} className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white">
              {copyDone ? 'Copied' : 'Copy MDX'}
            </button>
            <button type="button" onClick={downloadFile} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700">
              Download .mdx
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
