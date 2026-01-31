'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NIGERIAN_STATES } from './ShippingContext';

export interface TaxSettings {
  global: {
    enabled: boolean;
    defaultRate: number;
    taxLabel: string;
    pricesIncludeTax: boolean;
  };
  regional: {
    state: string;
    rate: number;
    enabled: boolean;
  }[];
  exemptProducts: string[];
  exemptCategories: string[];
}

const DEFAULT_TAX_SETTINGS: TaxSettings = {
  global: {
    enabled: true,
    defaultRate: 7.5, // Nigerian VAT
    taxLabel: 'VAT',
    pricesIncludeTax: false,
  },
  regional: NIGERIAN_STATES.map(state => ({
    state,
    rate: 7.5,
    enabled: true,
  })),
  exemptProducts: [],
  exemptCategories: [],
};

interface TaxContextType {
  settings: TaxSettings;
  isLoaded: boolean;
  updateGlobalSettings: (updates: Partial<TaxSettings['global']>) => void;
  updateRegionalRate: (state: string, rate: number, enabled: boolean) => void;
  toggleProductExemption: (productId: string) => void;
  toggleCategoryExemption: (category: string) => void;
  calculateTax: (amount: number, state?: string, productId?: string, category?: string) => number;
}

const TaxContext = createContext<TaxContextType | undefined>(undefined);

const STORAGE_KEY = 'herteals_tax_settings';

export function TaxProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<TaxSettings>(DEFAULT_TAX_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setSettings(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse tax settings:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  const updateGlobalSettings = (updates: Partial<TaxSettings['global']>) => {
    setSettings(prev => ({
      ...prev,
      global: { ...prev.global, ...updates },
    }));
  };

  const updateRegionalRate = (state: string, rate: number, enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      regional: prev.regional.map(r =>
        r.state === state ? { ...r, rate, enabled } : r
      ),
    }));
  };

  const toggleProductExemption = (productId: string) => {
    setSettings(prev => {
      const isExempt = prev.exemptProducts.includes(productId);
      return {
        ...prev,
        exemptProducts: isExempt
          ? prev.exemptProducts.filter(id => id !== productId)
          : [...prev.exemptProducts, productId],
      };
    });
  };

  const toggleCategoryExemption = (category: string) => {
    setSettings(prev => {
      const isExempt = prev.exemptCategories.includes(category);
      return {
        ...prev,
        exemptCategories: isExempt
          ? prev.exemptCategories.filter(c => c !== category)
          : [...prev.exemptCategories, category],
      };
    });
  };

  const calculateTax = (amount: number, state?: string, productId?: string, category?: string) => {
    if (!settings.global.enabled) return 0;
    if (productId && settings.exemptProducts.includes(productId)) return 0;
    if (category && settings.exemptCategories.includes(category)) return 0;

    let rate = settings.global.defaultRate;

    if (state) {
      const regional = settings.regional.find(r => r.state === state && r.enabled);
      if (regional) rate = regional.rate;
    }

    return (amount * rate) / 100;
  };

  return (
    <TaxContext.Provider value={{ settings, isLoaded, updateGlobalSettings, updateRegionalRate, toggleProductExemption, toggleCategoryExemption, calculateTax }}>
      {children}
    </TaxContext.Provider>
  );
}

export function useTax() {
  const context = useContext(TaxContext);
  if (!context) throw new Error('useTax must be used within TaxProvider');
  return context;
}
