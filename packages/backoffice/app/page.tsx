export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16 px-8 bg-white dark:bg-zinc-900 sm:items-start">
        <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left w-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
              Back Office
            </h1>
          </div>
          
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Welcome to the administrative dashboard. This package is designed to support back-office operations and administrative functions independently from the main frontend.
          </p>

          <div className="w-full mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold text-lg mb-2 text-black dark:text-zinc-50">Content Management</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Manage blog posts, pages, and media assets</p>
            </div>
            
            <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold text-lg mb-2 text-black dark:text-zinc-50">User Administration</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Control user access and permissions</p>
            </div>
            
            <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold text-lg mb-2 text-black dark:text-zinc-50">Analytics</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">View site statistics and performance metrics</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg w-full">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> This back-office package runs independently on port 3001. Start it with <code className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded">npm run dev:backoffice</code>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
