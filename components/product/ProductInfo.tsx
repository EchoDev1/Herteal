'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import ProductSizeGuide from './ProductSizeGuide';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const selectedColorData = product.colors.find((c) => c.name === selectedColor);
  const selectedSizeData = product.sizes.find((s) => s.label === selectedSize);

  const canAddToCart =
    selectedSize &&
    selectedColorData?.inStock &&
    selectedSizeData?.inStock &&
    product.inStock;

  const handleAddToCart = () => {
    if (!canAddToCart || !selectedSize) return;

    setIsAdding(true);
    addItem(product, selectedSize, selectedColor, quantity);

    // Show feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-2">{product.name}</h1>
        <p className="text-2xl text-[#2D2D2D] font-medium font-[family-name:var(--font-montserrat)]">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Description */}
      <div className="border-t border-b border-[#F0F0F0] py-6">
        <p className="text-[#6B6B6B] leading-relaxed font-[family-name:var(--font-montserrat)]">{product.longDescription}</p>
      </div>

      {/* Color Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-[#2D2D2D] uppercase tracking-wider font-[family-name:var(--font-montserrat)]">
            Color: {selectedColor}
          </label>
        </div>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              disabled={!color.inStock}
              className={`
                relative w-10 h-10 rounded-full border-2 transition-all
                ${selectedColor === color.name ? 'border-[#2D2D2D] ring-2 ring-[#2D2D2D] ring-offset-2' : 'border-[#F0F0F0]'}
                ${!color.inStock ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#6B6B6B]'}
              `}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
              title={color.name}
            >
              {!color.inStock && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-px h-full bg-[#2D2D2D] rotate-45" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-[#2D2D2D] uppercase tracking-wider font-[family-name:var(--font-montserrat)]">Size</label>
          <button
            onClick={() => setSizeGuideOpen(true)}
            className="text-sm text-[#2D2D2D] hover:underline font-[family-name:var(--font-montserrat)]"
          >
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {product.sizes.map((size) => (
            <button
              key={size.label}
              onClick={() => setSelectedSize(size.label)}
              disabled={!size.inStock}
              className={`
                py-3 border transition-all font-[family-name:var(--font-montserrat)]
                ${selectedSize === size.label ? 'border-[#2D2D2D] bg-[#2D2D2D] text-white' : 'border-[#F0F0F0] text-[#2D2D2D]'}
                ${!size.inStock ? 'opacity-30 cursor-not-allowed line-through' : 'hover:border-[#2D2D2D]'}
              `}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="text-sm font-medium text-[#2D2D2D] uppercase tracking-wider block mb-3 font-[family-name:var(--font-montserrat)]">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 border border-[#F0F0F0] hover:border-[#2D2D2D] transition-colors font-[family-name:var(--font-montserrat)]"
          >
            −
          </button>
          <span className="text-lg font-medium w-12 text-center font-[family-name:var(--font-montserrat)]">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 border border-[#F0F0F0] hover:border-[#2D2D2D] transition-colors font-[family-name:var(--font-montserrat)]"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="space-y-3">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!canAddToCart || isAdding}
          onClick={handleAddToCart}
        >
          {isAdding
            ? 'Added to Cart!'
            : !product.inStock
            ? 'Out of Stock'
            : !selectedSize
            ? 'Select a Size'
            : 'Add to Cart'}
        </Button>
        {!product.inStock && (
          <Badge variant="warning" className="w-full justify-center">
            Currently Unavailable
          </Badge>
        )}
      </div>

      {/* Product Details */}
      <div className="border-t border-[#F0F0F0] pt-6 space-y-3 text-sm font-[family-name:var(--font-montserrat)]">
        <div className="flex justify-between">
          <span className="text-[#6B6B6B]">Fabric</span>
          <span className="text-[#2D2D2D]">{product.fabric}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B6B6B]">Care Instructions</span>
          <span className="text-[#2D2D2D]">{product.careInstructions}</span>
        </div>
      </div>

      {/* Size Guide Modal */}
      <ProductSizeGuide
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
}
