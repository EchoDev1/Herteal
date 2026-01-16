'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';

export default function EditorialSection() {
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

        {/* 2-Column Layout - House of CB Style */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          {/* Left: Image */}
          <div className="relative h-[500px] md:h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80"
              alt="Featured African Luxury Fashion"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#8B0000]">
              Ready To Wear Collection
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

        {/* 3-Column Feature Cards - Minimal */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Timeless Classics */}
          <div className="group relative h-80 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80"
              alt="Timeless Classics"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
            <div className="absolute inset-0 flex items-end p-6">
              <div className="text-white">
                <h4 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2">
                  Timeless Classics
                </h4>
                <p className="text-sm text-white/90">
                  Elegant silhouettes for every occasion
                </p>
              </div>
            </div>
          </div>

          {/* Bold Statements */}
          <div className="group relative h-80 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
              alt="Bold Statements"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
            <div className="absolute inset-0 flex items-end p-6">
              <div className="text-white">
                <h4 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2">
                  Bold Statements
                </h4>
                <p className="text-sm text-white/90">
                  For the confident, modern woman
                </p>
              </div>
            </div>
          </div>

          {/* Refined Details */}
          <div className="group relative h-80 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80"
              alt="Refined Details"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
            <div className="absolute inset-0 flex items-end p-6">
              <div className="text-white">
                <h4 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2">
                  Refined Details
                </h4>
                <p className="text-sm text-white/90">
                  Intricate craftsmanship in every stitch
                </p>
              </div>
            </div>
          </div>
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
