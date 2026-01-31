'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minimumOrderValue?: number;
  maxUsage?: number;
  currentUsage: number;
  validFrom: string;
  validUntil: string;
  applicableProducts?: string[];
  applicableCategories?: string[];
  status: 'active' | 'expired' | 'scheduled';
  createdAt: string;
}

interface DiscountsContextType {
  coupons: Coupon[];
  isLoaded: boolean;
  addCoupon: (coupon: Omit<Coupon, 'id' | 'createdAt' | 'currentUsage' | 'status'>) => void;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  validateCoupon: (code: string, orderValue: number) => { valid: boolean; reason?: string };
  incrementUsage: (code: string) => void;
  getActiveCoupons: () => Coupon[];
}

const DiscountsContext = createContext<DiscountsContextType | undefined>(undefined);

const STORAGE_KEY = 'herteals_coupons';

export function DiscountsProvider({ children }: { children: ReactNode }) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setCoupons(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse coupons:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      // Update coupon statuses before saving
      const now = new Date();
      const updated = coupons.map(coupon => {
        const validFrom = new Date(coupon.validFrom);
        const validUntil = new Date(coupon.validUntil);

        let status: Coupon['status'] = 'active';
        if (now < validFrom) status = 'scheduled';
        else if (now > validUntil) status = 'expired';
        else if (coupon.maxUsage && coupon.currentUsage >= coupon.maxUsage) status = 'expired';

        return { ...coupon, status };
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  }, [coupons, isLoaded]);

  const addCoupon = (couponData: Omit<Coupon, 'id' | 'createdAt' | 'currentUsage' | 'status'>) => {
    const now = new Date();
    const validFrom = new Date(couponData.validFrom);
    let status: Coupon['status'] = now < validFrom ? 'scheduled' : 'active';

    const newCoupon: Coupon = {
      ...couponData,
      id: `coupon_${Date.now()}`,
      createdAt: new Date().toISOString(),
      currentUsage: 0,
      status,
    };
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCoupon = (id: string) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(prev => prev.filter(c => c.id !== id));
    }
  };

  const validateCoupon = (code: string, orderValue: number) => {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());

    if (!coupon) return { valid: false, reason: 'Coupon not found' };
    if (coupon.status !== 'active') return { valid: false, reason: 'Coupon is not active' };
    if (coupon.minimumOrderValue && orderValue < coupon.minimumOrderValue) {
      return { valid: false, reason: `Minimum order value is ₦${coupon.minimumOrderValue}` };
    }
    if (coupon.maxUsage && coupon.currentUsage >= coupon.maxUsage) {
      return { valid: false, reason: 'Coupon usage limit reached' };
    }

    return { valid: true };
  };

  const incrementUsage = (code: string) => {
    setCoupons(prev => prev.map(c =>
      c.code.toUpperCase() === code.toUpperCase()
        ? { ...c, currentUsage: c.currentUsage + 1 }
        : c
    ));
  };

  const getActiveCoupons = () => {
    return coupons.filter(c => c.status === 'active');
  };

  return (
    <DiscountsContext.Provider value={{ coupons, isLoaded, addCoupon, updateCoupon, deleteCoupon, validateCoupon, incrementUsage, getActiveCoupons }}>
      {children}
    </DiscountsContext.Provider>
  );
}

export function useDiscounts() {
  const context = useContext(DiscountsContext);
  if (!context) throw new Error('useDiscounts must be used within DiscountsProvider');
  return context;
}
