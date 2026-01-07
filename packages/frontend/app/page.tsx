export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-16 px-8 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-black dark:text-zinc-50 mb-4">
              Hyunu Blog
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
          </div>
          
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Welcome to the main frontend of Hyunu Blog. This is the public-facing application where visitors can read blog posts and explore content.
          </p>

          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-4">
            <a
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-black px-6 text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              href="/blog"
            >
              Browse Posts
            </a>
            <a
              className="flex h-12 items-center justify-center rounded-full border border-solid border-zinc-300 px-6 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
              href="/about"
            >
              About
            </a>
          </div>

          <div className="mt-8 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg w-full">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              This frontend runs on port 3000 by default. Start it from the root directory with <code className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded">npm run dev:frontend</code>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
