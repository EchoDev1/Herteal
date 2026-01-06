'use client';

import { useEffect, useState } from 'react';

export default function LuxuryLoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Hide loading screen after 2.5 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-800 ${
        fadeOut ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-900 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-green-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-400/20 via-green-400/20 to-amber-400/20 rounded-full blur-3xl animate-spin" style={{animationDuration: '15s'}}></div>
        </div>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle, #fbbf24 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <div className="mb-12 animate-slideDown">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-amber-400 via-green-400 to-amber-400 opacity-50 animate-pulse"></div>

            {/* Logo */}
            <h1 className="relative text-6xl md:text-8xl font-light tracking-wider drop-shadow-2xl">
              <span className="bg-gradient-to-br from-white via-amber-100 to-amber-50 bg-clip-text text-transparent font-serif italic font-bold animate-shimmer">
                Her
              </span>
              <span className="text-green-300 font-bold drop-shadow-lg animate-shimmer" style={{animationDelay: '0.2s'}}>
                teals
              </span>
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-green-100 text-lg md:text-xl mb-12 tracking-widest uppercase animate-slideUp delay-200 font-light">
          Nigerian Luxury Fashion
        </p>

        {/* Loading Animation */}
        <div className="w-80 animate-scaleIn delay-400">
          {/* Progress Bar */}
          <div className="relative h-2 bg-green-950/50 rounded-full overflow-hidden backdrop-blur-sm mb-4">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 via-amber-400 to-green-400 rounded-full transition-all duration-300 animate-gradientShift"
              style={{ width: `${Math.min(progress, 100)}%`, backgroundSize: '200% 100%' }}
            ></div>
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>

          {/* Loading Text */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-200 font-light tracking-wide">Loading Excellence...</span>
            <span className="text-amber-300 font-semibold">{Math.round(Math.min(progress, 100))}%</span>
          </div>
        </div>

        {/* Rotating Circle Animation */}
        <div className="mt-12 relative w-24 h-24 animate-scaleIn delay-600">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-amber-400/30 rounded-full"></div>
          {/* Spinning Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-amber-400 border-r-green-400 rounded-full animate-spin"></div>
          {/* Inner Glow */}
          <div className="absolute inset-2 bg-gradient-to-br from-amber-400/20 to-green-400/20 rounded-full blur-lg"></div>
          {/* Center Dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Quality Badge */}
        <div className="mt-12 flex items-center gap-3 text-green-100 animate-slideInBottom delay-800">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-amber-400 fill-current animate-scaleIn"
                style={{animationDelay: `${1 + i * 0.1}s`}}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-light tracking-wider">Premium Quality Guaranteed</span>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"></div>
    </div>
  );
}
