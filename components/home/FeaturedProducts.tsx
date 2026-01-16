'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useProducts } from '@/contexts/ProductsContext';
import Link from 'next/link';
import Button from '../ui/Button';

export default function FeaturedProducts() {
  const { getProductsByCollection, getLatestProducts } = useProducts();

  // Get products from "Ready To Wear Collection" or latest products as fallback
  const collectionProducts = getProductsByCollection('Ready To Wear Collection');
  const latestProducts = getLatestProducts(8);

  // Use collection products if available, otherwise use latest products
  const displayProducts = collectionProducts.length > 0 ? collectionProducts : latestProducts;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-[#FAF9F7]">
      <div className="container mx-auto px-4">
        {/* Header - Minimal */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-2">
              Ready To Wear Collection
            </h2>
            <p className="text-[#6B6B6B] text-lg">
              Curated pieces for the modern woman
            </p>
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="p-3 rounded-full border border-[#F0F0F0] hover:border-[#2C5530] hover:bg-[#2C5530] hover:text-white transition-all"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-3 rounded-full border border-[#F0F0F0] hover:border-[#2C5530] hover:bg-[#2C5530] hover:text-white transition-all"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_23%] min-w-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button href="/shop" variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}

// Custom ProductCard for store products with video support
function ProductCard({ product }: { product: ReturnType<typeof useProducts>['products'][0] }) {
  const hasVideo = product.video && product.video.trim() !== '';
  const hasImage = product.images && product.images.length > 0;
  const displayImage = hasImage ? product.images[0] : null;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[2/3] bg-gray-100 overflow-hidden mb-4">
        {/* Image or Video Thumbnail */}
        {displayImage ? (
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : hasVideo ? (
          <video
            src={product.video}
            className="w-full h-full object-cover"
            muted
            playsInline
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
            No Image
          </div>
        )}

        {/* Video indicator */}
        {hasVideo && (
          <div className="absolute top-3 right-3 p-2 bg-black/60 rounded-full">
            <Play className="w-4 h-4 text-white" />
          </div>
        )}

        {/* Sale badge */}
        {product.onSale && product.salePrice && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-[#8B0000] text-white text-xs font-semibold">
            SALE
          </div>
        )}

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 py-2 bg-white text-[#2D2D2D] text-sm font-medium">
            View Product
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="text-sm font-medium text-[#2D2D2D] mb-1 group-hover:text-[#2C5530] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-2">
          {product.onSale && product.salePrice ? (
            <>
              <span className="text-sm font-semibold text-[#8B0000]">
                ₦{product.salePrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₦{product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold text-[#2D2D2D]">
              ₦{product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
