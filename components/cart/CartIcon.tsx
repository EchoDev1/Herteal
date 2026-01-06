'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import Badge from '../ui/Badge';

export default function CartIcon() {
  const itemCount = useCartStore((state) => state.itemCount);

  return (
    <Link
      href="/cart"
      className="relative p-2 text-white hover:text-amber-300 transition-all duration-300 hover:scale-110"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      {itemCount > 0 && (
        <div className="absolute -top-1 -right-1">
          <Badge variant="primary">{itemCount}</Badge>
        </div>
      )}
    </Link>
  );
}
