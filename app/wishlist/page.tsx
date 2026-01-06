'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600 font-[family-name:var(--font-montserrat)]">
              Save your favorite items for later
            </p>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-gray-300" />
            </div>
            <h2 className="text-xl font-[family-name:var(--font-playfair)] font-semibold text-[#2D2D2D] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6 font-[family-name:var(--font-montserrat)]">
              Start adding items you love to your wishlist
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#7A916C] text-white font-[family-name:var(--font-montserrat)] text-sm uppercase tracking-widest font-semibold hover:bg-[#6A816C] transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
