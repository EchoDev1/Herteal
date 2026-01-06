'use client';

import { useState } from 'react';

interface AddToCartButtonProps {
  onAddToCart?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function AddToCartButton({
  onAddToCart,
  className = '',
  disabled = false,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = async () => {
    if (disabled || isAdding) return;

    setIsAdding(true);

    // Trigger the callback
    if (onAddToCart) {
      await onAddToCart();
    }

    // Simulate add to cart animation
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 800);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isAdding}
      className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white rounded-lg font-semibold text-lg shadow-2xl hover:shadow-amber-500/40 hover:from-amber-600 hover:via-green-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${className}`}
    >
      {/* Rotating background effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-amber-400 via-green-500 to-amber-400 transition-transform duration-700 ${
          isAdding ? 'rotate-180 scale-150' : 'rotate-0 scale-0'
        }`}
      ></div>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-3">
        {/* Cart Icon with rotation */}
        <svg
          className={`w-6 h-6 transition-all duration-700 ${
            isAdding ? 'rotate-[360deg] scale-110' : 'rotate-0 scale-100'
          } ${isAdded ? 'text-amber-200' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isAdded ? (
            // Checkmark when added
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          ) : (
            // Shopping cart icon
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </>
          )}
        </svg>

        {/* Text with transition */}
        <span
          className={`transition-all duration-300 ${
            isAdding ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          } ${isAdded ? 'text-white font-bold' : ''}`}
        >
          {isAdded ? 'Added to Cart!' : 'Add to Cart'}
        </span>
      </span>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>

      {/* Success particles */}
      {isAdded && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-amber-300 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.1s' }}></div>
        </>
      )}
    </button>
  );
}
