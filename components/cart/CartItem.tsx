import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/types/cart';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(
      item.product.id,
      item.selectedSize,
      item.selectedColor,
      newQuantity
    );
  };

  const handleRemove = () => {
    removeItem(item.product.id, item.selectedSize, item.selectedColor);
  };

  return (
    <div className="flex gap-6 py-6 border-b border-[#F0F0F0]">
      {/* Product Image */}
      <Link
        href={`/product/${item.product.slug}`}
        className="relative w-24 h-32 flex-shrink-0 bg-[#F9F9F9] overflow-hidden"
      >
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="96px"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link
              href={`/product/${item.product.slug}`}
              className="text-lg font-[family-name:var(--font-montserrat)] text-[#2D2D2D] hover:text-[#7A916C] transition-colors"
            >
              {item.product.name}
            </Link>
            <p className="text-sm text-[#6B6B6B] mt-1 font-[family-name:var(--font-montserrat)]">
              Size: {item.selectedSize} | Color: {item.selectedColor}
            </p>
          </div>
          <p className="text-lg font-medium text-[#2D2D2D] font-[family-name:var(--font-montserrat)]">
            {formatPrice(item.product.price * item.quantity)}
          </p>
        </div>

        {/* Quantity & Remove */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
              className={`w-8 h-8 border border-[#F0F0F0] transition-colors text-sm font-[family-name:var(--font-montserrat)] ${item.quantity <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#7A916C]'}`}
            >
              −
            </button>
            <span className="text-sm font-medium w-8 text-center font-[family-name:var(--font-montserrat)]">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 border border-[#F0F0F0] hover:border-[#7A916C] transition-colors text-sm font-[family-name:var(--font-montserrat)]"
            >
              +
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="text-sm text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors font-[family-name:var(--font-montserrat)] underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
