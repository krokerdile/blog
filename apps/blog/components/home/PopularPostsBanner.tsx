'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@hyunu/ui';
import { type PostMeta } from '@/lib/posts';

interface PopularPostsBannerProps {
  posts: PostMeta[];
}

export function PopularPostsBanner({ posts }: PopularPostsBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % posts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [posts.length]);

  const nextSlide = () => setCurrentIndex((current) => (current + 1) % posts.length);
  const prevSlide = () => setCurrentIndex((current) => (current === 0 ? posts.length - 1 : current - 1));

  if (posts.length === 0) return null;

  return (
    <div className="relative w-full h-[400px] bg-gray-900 rounded-3xl overflow-hidden mb-12 group">
      {/* Background/Current Slide */}
      {posts.map((post, index) => (
        <div
          key={post.slug}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* In real app, use post.coverImage. For now, gradient placeholder */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90" />
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499750310159-a51f338a5be4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-2xl">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 backdrop-blur-sm border border-blue-500/30 text-sm font-medium mb-4">
                        Popular this week
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h2>
                    <p className="text-lg text-gray-300 mb-8 line-clamp-2">
                        {post.description}
                    </p>
                    <Link href={`/blog/${post.slug}`}>
                        <Button variant="primary" size="lg" className="bg-white text-gray-900 hover:bg-gray-100 border-none">
                            Read Article
                        </Button>
                    </Link>
                </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <button 
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/10"
        >
            <ArrowLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <button 
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/10"
        >
            <ArrowRight className="w-6 h-6" />
        </button>
      </div>

       {/* Indicators */}
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {posts.map((_, index) => (
            <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
            />
        ))}
       </div>
    </div>
  );
}
