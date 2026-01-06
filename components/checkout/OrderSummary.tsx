import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export default function OrderSummary() {
  const { items, subtotal, tax, shipping, total } = useCartStore();

  return (
    <div className="bg-warm-white p-6">
      <h2 className="text-2xl font-light mb-6">Order Summary</h2>

      {/* Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
            className="flex gap-4"
          >
            <div className="relative w-16 h-20 flex-shrink-0 bg-whisper-gray overflow-hidden">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex-grow text-sm">
              <p className="font-medium text-charcoal">{item.product.name}</p>
              <p className="text-soft-gray">
                {item.selectedSize} | {item.selectedColor}
              </p>
              <p className="text-soft-gray">Qty: {item.quantity}</p>
            </div>
            <div className="text-sm font-medium">
              {formatPrice(item.product.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-2 border-t border-light-gray pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-soft-gray">Subtotal</span>
          <span className="text-charcoal">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-soft-gray">Tax</span>
          <span className="text-charcoal">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-soft-gray">Shipping</span>
          <span className="text-charcoal">
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>
        <div className="flex justify-between items-center text-lg font-medium pt-2 border-t border-light-gray">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
