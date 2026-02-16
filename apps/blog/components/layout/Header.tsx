'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@hyunu/ui';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Popular', href: '/#popular' },
  { name: 'Posts', href: '/blog/posts' },
  { name: 'History', href: '/history' },
  { name: 'Resume', href: '/resume' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuId = 'mobile-main-menu';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="-m-1.5 p-1.5 text-xl font-bold text-gray-900">
              Hyunu's Blog
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-x-8 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
             <Button type="button" variant="ghost" size="icon" aria-label="Search">
                <Search className="h-5 w-5 text-gray-500" aria-hidden="true" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuId}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div id={mobileMenuId} className={cn("md:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <div className="space-y-1 px-4 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md px-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="px-3 py-2">
            <form className="relative" role="search">
                <label htmlFor="mobile-search" className="sr-only">Search posts</label>
                <input 
                    id="mobile-search"
                    type="text" 
                    placeholder="Search..." 
                    className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
