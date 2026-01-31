'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block transform transition-all duration-300 hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A916C] focus-visible:ring-offset-2 rounded-sm"
    >
      {/* Image Container - Enhanced Hover */}
      <div className="relative aspect-[2/3] overflow-hidden bg-[#F9F9F9] mb-4 shadow-sm group-hover:shadow-2xl transition-shadow duration-300 border border-transparent group-hover:border-[#7A916C]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="bg-[#2D2D2D] text-white px-4 py-2 text-xs uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}

        {/* Sale Badge - Priority */}
        {product.onSale ? (
          <div className="absolute top-4 left-4">
            <span className="bg-[#8B0000] text-white px-3 py-1 text-xs uppercase tracking-wider font-bold">
              ON-SALE
            </span>
          </div>
        ) : product.featured ? (
          <div className="absolute top-4 left-4">
            <span className="bg-[#7A916C] text-white px-3 py-1 text-xs uppercase tracking-wider">
              New
            </span>
          </div>
        ) : null}
      </div>

      {/* Product Info - Enhanced Typography */}
      <div className="space-y-2">
        {/* Category - Small and Subtle */}
        <p className="text-xs uppercase tracking-widest text-[#6B6B6B] font-[family-name:var(--font-montserrat)] group-hover:text-[#7A916C] transition-colors duration-300">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="text-base font-[family-name:var(--font-montserrat)] text-[#2D2D2D] group-hover:text-[#7A916C] transition-all duration-300 group-hover:font-semibold">
          {product.name}
        </h3>

        {/* Price - Enhanced */}
        <div className="flex items-center gap-2">
          {product.onSale && product.salePrice ? (
            <>
              <p className="text-sm font-medium text-[#8B0000] font-[family-name:var(--font-montserrat)] group-hover:text-[#6B0000] transition-colors duration-300">
                {formatPrice(product.salePrice)}
              </p>
              <p className="text-xs line-through text-[#6B6B6B] font-[family-name:var(--font-montserrat)]">
                {formatPrice(product.price)}
              </p>
            </>
          ) : (
            <p className="text-sm font-medium text-[#2D2D2D] font-[family-name:var(--font-montserrat)] group-hover:text-[#7A916C] transition-colors duration-300">
              {formatPrice(product.price)}
            </p>
          )}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#7A916C] text-xs">→</span>
        </div>
      </div>
    </Link>
  );
}
