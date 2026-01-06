'use client';

import { useState } from 'react';
import Button from '../ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);
    setEmail('');

    // Reset after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t border-[#F0F0F0]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Marketing Copy */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D]">
              Join Our Exclusive Circle
            </h2>
            <p className="text-lg text-[#6B6B6B] leading-relaxed">
              Be the first to discover new collections, receive styling tips, and enjoy exclusive offers crafted for the sophisticated woman.
            </p>

            {/* Benefits List */}
            <ul className="space-y-3 pt-4">
              <li className="flex items-center gap-3 text-[#2D2D2D]">
                <span className="w-1.5 h-1.5 bg-[#2C5530] rounded-full"></span>
                <span>Early access to new collections</span>
              </li>
              <li className="flex items-center gap-3 text-[#2D2D2D]">
                <span className="w-1.5 h-1.5 bg-[#2C5530] rounded-full"></span>
                <span>Exclusive subscriber-only offers</span>
              </li>
              <li className="flex items-center gap-3 text-[#2D2D2D]">
                <span className="w-1.5 h-1.5 bg-[#2C5530] rounded-full"></span>
                <span>Weekly style inspiration</span>
              </li>
            </ul>
          </div>

          {/* Right: Form */}
          <div className="bg-[#F9F9F9] p-8 md:p-10 border border-[#F0F0F0]">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#2D2D2D] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border border-[#F0F0F0] focus:border-[#2C5530] focus:outline-none transition-colors"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </Button>

                <p className="text-xs text-[#6B6B6B] text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C8D5B9] rounded-full mb-4">
                  <svg className="w-8 h-8 text-[#2C5530]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#2D2D2D] mb-2">
                  Welcome to Herteal!
                </h3>
                <p className="text-[#6B6B6B]">
                  Check your inbox for a special welcome offer.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
