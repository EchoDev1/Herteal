'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '../product/ProductCard';
import Button from '../ui/Button';

export default function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
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

        {/* Carousel - House of CB Style */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {featuredProducts.map((product) => (
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
