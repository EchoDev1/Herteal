'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SEOSettings {
  global: {
    siteTitle: string;
    siteDescription: string;
    keywords: string[];
    ogImage: string;
    twitterHandle?: string;
  };
  pages: {
    [path: string]: {
      title: string;
      description: string;
      keywords: string[];
      ogImage?: string;
      noindex?: boolean;
    };
  };
  analytics: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
  };
  redirects: {
    from: string;
    to: string;
    type: 301 | 302;
  }[];
}

const DEFAULT_SEO: SEOSettings = {
  global: {
    siteTitle: 'Herteals - Fashion Excellence',
    siteDescription: 'Discover premium fashion collections crafted with elegance and style',
    keywords: ['fashion', 'clothing', 'dresses', 'nigeria', 'herteals'],
    ogImage: '',
    twitterHandle: '@herteals',
  },
  pages: {},
  analytics: {},
  redirects: [],
};

interface SEOContextType {
  settings: SEOSettings;
  isLoaded: boolean;
  updateGlobal: (updates: Partial<SEOSettings['global']>) => void;
  setPageSEO: (path: string, seo: SEOSettings['pages'][string]) => void;
  removePageSEO: (path: string) => void;
  updateAnalytics: (updates: Partial<SEOSettings['analytics']>) => void;
  addRedirect: (from: string, to: string, type: 301 | 302) => void;
  removeRedirect: (from: string) => void;
  getPageSEO: (path: string) => SEOSettings['pages'][string] | undefined;
}

const SEOContext = createContext<SEOContextType | undefined>(undefined);

const STORAGE_KEY = 'herteals_seo_settings';

export function SEOProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SEOSettings>(DEFAULT_SEO);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setSettings(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse SEO settings:', error);
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

  const updateGlobal = (updates: Partial<SEOSettings['global']>) => {
    setSettings(prev => ({
      ...prev,
      global: { ...prev.global, ...updates },
    }));
  };

  const setPageSEO = (path: string, seo: SEOSettings['pages'][string]) => {
    setSettings(prev => ({
      ...prev,
      pages: { ...prev.pages, [path]: seo },
    }));
  };

  const removePageSEO = (path: string) => {
    setSettings(prev => {
      const { [path]: removed, ...rest } = prev.pages;
      return { ...prev, pages: rest };
    });
  };

  const updateAnalytics = (updates: Partial<SEOSettings['analytics']>) => {
    setSettings(prev => ({
      ...prev,
      analytics: { ...prev.analytics, ...updates },
    }));
  };

  const addRedirect = (from: string, to: string, type: 301 | 302) => {
    setSettings(prev => ({
      ...prev,
      redirects: [...prev.redirects.filter(r => r.from !== from), { from, to, type }],
    }));
  };

  const removeRedirect = (from: string) => {
    setSettings(prev => ({
      ...prev,
      redirects: prev.redirects.filter(r => r.from !== from),
    }));
  };

  const getPageSEO = (path: string) => {
    return settings.pages[path];
  };

  return (
    <SEOContext.Provider value={{ settings, isLoaded, updateGlobal, setPageSEO, removePageSEO, updateAnalytics, addRedirect, removeRedirect, getPageSEO }}>
      {children}
    </SEOContext.Provider>
  );
}

export function useSEO() {
  const context = useContext(SEOContext);
  if (!context) throw new Error('useSEO must be used within SEOProvider');
  return context;
}
