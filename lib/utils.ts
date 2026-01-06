import { type ClassValue, clsx } from 'clsx';

// Utility for merging Tailwind class names
// Note: Will work after installing clsx, but provides fallback
export function cn(...inputs: ClassValue[]) {
  try {
    return clsx(inputs);
  } catch {
    return inputs.filter(Boolean).join(' ');
  }
}

// Format price in Nigerian Naira (NGN)
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Generate unique ID
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
