import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import Button from '../ui/Button';

export default function CartSummary() {
  const { subtotal, tax, shipping, total } = useCartStore();
  const freeShippingRemaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="bg-[#F9F9F9] p-6 md:p-8 lg:sticky lg:top-28 border border-[#F0F0F0]">
      <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-6">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm font-[family-name:var(--font-montserrat)]">
          <span className="text-[#6B6B6B]">Subtotal</span>
          <span className="text-[#2D2D2D]">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm font-[family-name:var(--font-montserrat)]">
          <span className="text-[#6B6B6B]">Tax</span>
          <span className="text-[#2D2D2D]">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-sm font-[family-name:var(--font-montserrat)]">
          <span className="text-[#6B6B6B]">Shipping</span>
          <span className="text-[#2D2D2D]">
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>
      </div>

      {freeShippingRemaining > 0 && (
        <div className="mb-6 p-3 bg-white border border-[#F0F0F0] text-sm text-[#6B6B6B] font-[family-name:var(--font-montserrat)]">
          Add {formatPrice(freeShippingRemaining)} more for free shipping
        </div>
      )}

      <div className="flex justify-between items-center text-lg font-medium mb-6 pt-4 border-t border-[#F0F0F0] font-[family-name:var(--font-montserrat)]">
        <span className="text-[#2D2D2D]">Total</span>
        <span className="text-[#2D2D2D]">{formatPrice(total)}</span>
      </div>

      <Link href="/checkout">
        <Button variant="primary" size="lg" className="w-full">
          Proceed to Checkout
        </Button>
      </Link>

      <Link href="/shop">
        <Button variant="text" size="md" className="w-full mt-3">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}
