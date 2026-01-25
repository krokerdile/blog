import { Sidebar } from "@/components/layout/Sidebar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Left Sidebar - Hidden on mobile, visible on desktop */}
        <Sidebar className="hidden lg:block w-64 shrink-0" />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
