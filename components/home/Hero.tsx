'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-luxury.jpg"
          alt="Luxury African Fashion"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay for sophistication */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
      </div>

      {/* Content - Centered & Elegant */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl space-y-8">
          {/* Brand Logo - Styled */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-playfair)] font-bold">
              <span className="inline-block bg-[#7A916C] text-white px-3 py-1">HER</span>
              <span className="text-white">TEALS</span>
            </h1>

            {/* Subtitle with decorative line */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-white/60"></div>
              <p className="text-sm md:text-base text-white/95 font-[family-name:var(--font-montserrat)] uppercase tracking-[0.3em] font-light">
                Luxury Redefined
              </p>
              <div className="h-px w-12 bg-white/60"></div>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-[family-name:var(--font-playfair)] font-light italic leading-relaxed">
            Where Luxury Tailoring Meets Contemporary Elegance
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-10 py-4 bg-[#7A916C] text-white font-[family-name:var(--font-montserrat)] text-sm uppercase tracking-widest font-semibold hover:bg-[#6A816C] transition-all duration-300 shadow-xl"
            >
              Shop Collection
            </Link>
            <Link
              href="/shop?filter=new-in"
              className="inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-[family-name:var(--font-montserrat)] text-sm uppercase tracking-widest font-semibold hover:bg-white/20 transition-all duration-300"
            >
              New Arrivals
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-8 animate-bounce" aria-hidden="true">
            <svg
              className="w-6 h-6 mx-auto text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#7A916C] to-transparent"></div>
    </section>
  );
}
