'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Review {
  id: string;
  productId: string;
  productName: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  comment: string;
  images?: string[];
  status: 'pending' | 'approved' | 'rejected';
  helpful: number;
  adminReply?: string;
  featured: boolean;
  createdAt: string;
  verifiedPurchase: boolean;
}

interface ReviewsContextType {
  reviews: Review[];
  isLoaded: boolean;
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'helpful' | 'status' | 'featured'>) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  bulkApprove: (ids: string[]) => void;
  bulkReject: (ids: string[]) => void;
  addReply: (id: string, reply: string) => void;
  getReviewsByProduct: (productId: string) => Review[];
  getAverageRating: (productId: string) => number;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

const STORAGE_KEY = 'herteals_reviews';

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setReviews(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse reviews:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    }
  }, [reviews, isLoaded]);

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt' | 'helpful' | 'status' | 'featured'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `review_${Date.now()}`,
      createdAt: new Date().toISOString(),
      helpful: 0,
      status: 'pending',
      featured: false,
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const updateReview = (id: string, updates: Partial<Review>) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteReview = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  const approveReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
  };

  const rejectReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
  };

  const bulkApprove = (ids: string[]) => {
    setReviews(prev => prev.map(r => ids.includes(r.id) ? { ...r, status: 'approved' as const } : r));
  };

  const bulkReject = (ids: string[]) => {
    setReviews(prev => prev.map(r => ids.includes(r.id) ? { ...r, status: 'rejected' as const } : r));
  };

  const addReply = (id: string, reply: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, adminReply: reply } : r));
  };

  const getReviewsByProduct = (productId: string) => {
    return reviews.filter(r => r.productId === productId && r.status === 'approved');
  };

  const getAverageRating = (productId: string) => {
    const productReviews = getReviewsByProduct(productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / productReviews.length;
  };

  return (
    <ReviewsContext.Provider value={{ reviews, isLoaded, addReview, updateReview, deleteReview, approveReview, rejectReview, bulkApprove, bulkReject, addReply, getReviewsByProduct, getAverageRating }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) throw new Error('useReviews must be used within ReviewsProvider');
  return context;
}
