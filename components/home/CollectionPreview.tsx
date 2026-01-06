'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button';

const collections = [
  {
    name: 'Dresses',
    href: '/shop/dresses',
    description: 'From cocktail to evening wear, discover elegant silhouettes that celebrate your sophistication.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop&q=80',
  },
  {
    name: 'Suits',
    href: '/shop/suits',
    description: 'Power dressing redefined. Tailored pieces that command attention in the boardroom and beyond.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1200&fit=crop&q=80',
  },
  {
    name: 'Blouses',
    href: '/shop/blouses',
    description: 'Refined essentials crafted with meticulous attention to detail and timeless style.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1200&fit=crop&q=80',
  },
];

export default function CollectionPreview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-4">
            Shop By Category
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            From boardroom to evening events, discover pieces that celebrate sophistication
          </p>
        </div>

        {/* Alternating Image-Text Blocks */}
        <div className="space-y-16 md:space-y-24">
          {collections.map((collection, index) => (
            <div
              key={collection.name}
              className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div
                className={`relative h-[500px] md:h-[600px] ${
                  index % 2 === 1 ? 'md:order-2' : ''
                }`}
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div
                className={`space-y-6 ${index % 2 === 1 ? 'md:order-1' : ''}`}
              >
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#8B0000]">
                  Collection
                </span>
                <h3 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D]">
                  {collection.name}
                </h3>
                <p className="text-lg text-[#6B6B6B] leading-relaxed">
                  {collection.description}
                </p>
                <div className="pt-4">
                  <Button href={collection.href} variant="primary" size="lg">
                    Shop {collection.name}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
