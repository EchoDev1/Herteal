'use client';

import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideInLeft' | 'slideInRight' | 'scaleIn';
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  animation = 'fadeIn',
  threshold = 0.1,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });

  const animationClasses = {
    fadeIn: 'opacity-0 animate-fadeIn',
    slideUp: 'opacity-0 translate-y-10 transition-all duration-700',
    slideDown: 'opacity-0 -translate-y-10 transition-all duration-700',
    slideInLeft: 'opacity-0 -translate-x-10 transition-all duration-700',
    slideInRight: 'opacity-0 translate-x-10 transition-all duration-700',
    scaleIn: 'opacity-0 scale-95 transition-all duration-700',
  };

  const visibleClasses = {
    fadeIn: '',
    slideUp: 'opacity-100 translate-y-0',
    slideDown: 'opacity-100 translate-y-0',
    slideInLeft: 'opacity-100 translate-x-0',
    slideInRight: 'opacity-100 translate-x-0',
    scaleIn: 'opacity-100 scale-100',
  };

  return (
    <div
      ref={ref}
      className={`${!isVisible ? animationClasses[animation] : visibleClasses[animation]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
