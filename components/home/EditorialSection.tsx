'use client';

import { Play } from 'lucide-react';
import Link from 'next/link';
import { useProducts } from '@/contexts/ProductsContext';
import Button from '../ui/Button';

export default function EditorialSection() {
  const { getProductsByCollection, getLatestProducts } = useProducts();

  // Get products from "The Art Of Herteals" collection
  const artProducts = getProductsByCollection('The Art Of Herteals');
  const latestProducts = getLatestProducts(4);

  // Use collection products if available, otherwise use latest
  const displayProducts = artProducts.length > 0 ? artProducts : latestProducts;

  // Get featured product (first one with image)
  const featuredProduct = displayProducts.find(p => p.images && p.images.length > 0);

  // Get 3 products for the grid (excluding featured)
  const gridProducts = displayProducts
    .filter(p => p.id !== featuredProduct?.id)
    .slice(0, 3);

  // Fallback images if no products
  const fallbackImages = [
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
  ];

  const gridItems = [
    { title: 'Timeless Classics', subtitle: 'Elegant silhouettes for every occasion' },
    { title: 'Bold Statements', subtitle: 'For the confident, modern woman' },
    { title: 'Refined Details', subtitle: 'Intricate craftsmanship in every stitch' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header - Minimal */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-4">
            The Art Of Herteals
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto font-[family-name:var(--font-montserrat)]">
            A curated selection of our finest pieces, celebrating the intersection of tradition and contemporary style
          </p>
        </div>

        {/* 2-Column Layout - Featured Product */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          {/* Left: Image/Video */}
          <div className="relative h-[500px] md:h-[600px] overflow-hidden group">
            {featuredProduct ? (
              <Link href={`/product/${featuredProduct.slug}`}>
                {featuredProduct.images && featuredProduct.images.length > 0 ? (
                  <img
                    src={featuredProduct.images[0]}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : featuredProduct.video ? (
                  <video
                    src={featuredProduct.video}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    loop
                    autoPlay
                  />
                ) : (
                  <img
                    src={fallbackImages[0]}
                    alt="Featured African Luxury Fashion"
                    className="w-full h-full object-cover"
                  />
                )}
                {featuredProduct.video && (
                  <div className="absolute top-4 right-4 p-3 bg-black/60 rounded-full">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                )}
              </Link>
            ) : (
              <img
                src={fallbackImages[0]}
                alt="Featured African Luxury Fashion"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#8B0000]">
              {featuredProduct?.collection || 'Ready To Wear Collection'}
            </span>
            <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D]">
              Redefining Modern African Luxury
            </h3>
            <p className="text-lg text-[#6B6B6B] leading-relaxed">
              Where traditional craftsmanship meets contemporary design. Each piece tells a story of heritage and innovation.
            </p>

            {/* Features List - Minimal */}
            <ul className="space-y-3 pt-4">
              <li className="flex items-center gap-3 text-[#2D2D2D]">
                <span className="w-1.5 h-1.5 bg-[#2C5530] rounded-full"></span>
                <span>Premium Imported Fabrics</span>
              </li>
              <li className="flex items-center gap-3 text-[#2D2D2D]">
                <span className="w-1.5 h-1.5 bg-[#2C5530] rounded-full"></span>
                <span>Made to Measure</span>
              </li>
              <li className="flex items-center gap-3 text-[#2D2D2D]">
                <span className="w-1.5 h-1.5 bg-[#2C5530] rounded-full"></span>
                <span>Expert Craftsmanship</span>
              </li>
            </ul>

            <div className="pt-6">
              <Button href="/shop" variant="primary" size="lg">
                Discover More
              </Button>
            </div>
          </div>
        </div>

        {/* 3-Column Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {gridItems.map((item, index) => {
            const product = gridProducts[index];
            const hasVideo = product?.video && product.video.trim() !== '';
            const hasImage = product?.images && product.images.length > 0;
            const imageUrl = hasImage ? product.images[0] : fallbackImages[index + 1];

            return (
              <Link
                key={index}
                href={product ? `/product/${product.slug}` : '/shop'}
                className="group relative h-80 overflow-hidden block"
              >
                {hasImage ? (
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : hasVideo ? (
                  <video
                    src={product.video}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    muted
                    playsInline
                    loop
                  />
                ) : (
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {hasVideo && (
                  <div className="absolute top-3 right-3 p-2 bg-black/60 rounded-full">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="text-white">
                    <h4 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2">
                      {product?.name || item.title}
                    </h4>
                    <p className="text-sm text-white/90">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <Button href="/shop" variant="outline" size="lg">
            Explore Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
}
