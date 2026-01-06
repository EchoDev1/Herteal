'use client';

import { useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Amara Okonkwo',
    role: 'CEO, Lagos Business Hub',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&q=80',
    quote: 'Herteals has transformed my professional wardrobe. The attention to detail and luxurious fabrics are unmatched.',
  },
  {
    id: 2,
    name: 'Chidinma Adeyemi',
    role: 'Fashion Entrepreneur',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80',
    quote: 'As a Nigerian woman who values both style and quality, Herteals delivers every time. Their tailoring is impeccable.',
  },
  {
    id: 3,
    name: 'Ngozi Eze',
    role: 'Corporate Executive',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&q=80',
    quote: 'The perfect blend of contemporary style and timeless sophistication. Herteals understands the modern Nigerian woman.',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-[#F9F9F9]">
      <div className="container mx-auto px-4">
        {/* Section Header - Minimal */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-4">
            Client Stories
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto font-[family-name:var(--font-montserrat)]">
            Hear from the women who trust Herteals
          </p>
        </div>

        {/* Testimonials Grid - Clean Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 text-center"
              >
                {/* Image */}
                <div className="mb-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover rounded-full"
                      sizes="80px"
                    />
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-[#2D2D2D] text-sm leading-relaxed mb-6 font-[family-name:var(--font-montserrat)]">
                  "{testimonial.quote}"
                </blockquote>

                {/* Name and Role */}
                <div>
                  <p className="text-sm font-semibold text-[#2D2D2D] mb-1">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[#6B6B6B] uppercase tracking-wider">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
