'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-[#87A96B] text-white py-2.5 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-2 text-center">
          <p className="text-sm font-medium tracking-wide">
            Explore our Spring 2025 Collection - Free Shipping on Orders Over ₦50,000
            <Link
              href="/shop"
              className="ml-2 underline underline-offset-4 hover:text-[#2C5530] transition-colors font-semibold"
            >
              Shop Now
            </Link>
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
