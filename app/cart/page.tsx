'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-4">Your Cart is Empty</h1>
            <p className="text-[#6B6B6B] mb-8 font-[family-name:var(--font-montserrat)]">
              Discover our exquisite collection and find pieces that define your style.
            </p>
            <Link href="/shop">
              <Button variant="primary" size="lg">
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.map((item) => (
              <CartItem
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                item={item}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
