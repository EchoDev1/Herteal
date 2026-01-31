'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface EmailSubscriber {
  id: string;
  email: string;
  name?: string;
  status: 'active' | 'unsubscribed';
  source: 'checkout' | 'footer' | 'popup' | 'manual';
  subscribedAt: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  recipients: 'all' | 'customers' | 'segment';
  status: 'draft' | 'scheduled' | 'sent';
  scheduledAt?: string;
  sentAt?: string;
  stats: {
    sent: number;
    opened: number;
    clicked: number;
  };
  createdAt: string;
}

interface EmailMarketingContextType {
  subscribers: EmailSubscriber[];
  campaigns: EmailCampaign[];
  isLoaded: boolean;
  addSubscriber: (subscriber: Omit<EmailSubscriber, 'id' | 'subscribedAt' | 'status'>) => void;
  updateSubscriber: (id: string, updates: Partial<EmailSubscriber>) => void;
  unsubscribe: (email: string) => void;
  addCampaign: (campaign: Omit<EmailCampaign, 'id' | 'createdAt' | 'stats' | 'status'>) => void;
  updateCampaign: (id: string, updates: Partial<EmailCampaign>) => void;
  deleteCampaign: (id: string) => void;
  sendCampaign: (id: string) => void;
  getActiveSubscribers: () => EmailSubscriber[];
}

const EmailMarketingContext = createContext<EmailMarketingContextType | undefined>(undefined);

const STORAGE_KEY_SUBSCRIBERS = 'herteals_email_subscribers';
const STORAGE_KEY_CAMPAIGNS = 'herteals_email_campaigns';

export function EmailMarketingProvider({ children }: { children: ReactNode }) {
  const [subscribers, setSubscribers] = useState<EmailSubscriber[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSubs = localStorage.getItem(STORAGE_KEY_SUBSCRIBERS);
      const storedCamps = localStorage.getItem(STORAGE_KEY_CAMPAIGNS);

      if (storedSubs) {
        try {
          setSubscribers(JSON.parse(storedSubs));
        } catch (error) {
          console.error('Failed to parse subscribers:', error);
        }
      }

      if (storedCamps) {
        try {
          setCampaigns(JSON.parse(storedCamps));
        } catch (error) {
          console.error('Failed to parse campaigns:', error);
        }
      }

      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_SUBSCRIBERS, JSON.stringify(subscribers));
    }
  }, [subscribers, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_CAMPAIGNS, JSON.stringify(campaigns));
    }
  }, [campaigns, isLoaded]);

  const addSubscriber = (subscriberData: Omit<EmailSubscriber, 'id' | 'subscribedAt' | 'status'>) => {
    const existing = subscribers.find(s => s.email === subscriberData.email);
    if (existing) {
      if (existing.status === 'unsubscribed') {
        setSubscribers(prev => prev.map(s =>
          s.email === subscriberData.email
            ? { ...s, status: 'active' as const, subscribedAt: new Date().toISOString() }
            : s
        ));
      }
      return;
    }

    const newSubscriber: EmailSubscriber = {
      ...subscriberData,
      id: `sub_${Date.now()}`,
      subscribedAt: new Date().toISOString(),
      status: 'active',
    };
    setSubscribers(prev => [newSubscriber, ...prev]);
  };

  const updateSubscriber = (id: string, updates: Partial<EmailSubscriber>) => {
    setSubscribers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const unsubscribe = (email: string) => {
    setSubscribers(prev => prev.map(s =>
      s.email === email ? { ...s, status: 'unsubscribed' as const } : s
    ));
  };

  const addCampaign = (campaignData: Omit<EmailCampaign, 'id' | 'createdAt' | 'stats' | 'status'>) => {
    const newCampaign: EmailCampaign = {
      ...campaignData,
      id: `campaign_${Date.now()}`,
      createdAt: new Date().toISOString(),
      stats: { sent: 0, opened: 0, clicked: 0 },
      status: campaignData.scheduledAt ? 'scheduled' : 'draft',
    };
    setCampaigns(prev => [newCampaign, ...prev]);
  };

  const updateCampaign = (id: string, updates: Partial<EmailCampaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCampaign = (id: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
    }
  };

  const sendCampaign = (id: string) => {
    const campaign = campaigns.find(c => c.id === id);
    if (!campaign) return;

    const activeCount = getActiveSubscribers().length;

    setCampaigns(prev => prev.map(c =>
      c.id === id
        ? {
            ...c,
            status: 'sent' as const,
            sentAt: new Date().toISOString(),
            stats: { ...c.stats, sent: activeCount }
          }
        : c
    ));

    alert(`Campaign sent to ${activeCount} subscribers!`);
  };

  const getActiveSubscribers = () => {
    return subscribers.filter(s => s.status === 'active');
  };

  return (
    <EmailMarketingContext.Provider value={{ subscribers, campaigns, isLoaded, addSubscriber, updateSubscriber, unsubscribe, addCampaign, updateCampaign, deleteCampaign, sendCampaign, getActiveSubscribers }}>
      {children}
    </EmailMarketingContext.Provider>
  );
}

export function useEmailMarketing() {
  const context = useContext(EmailMarketingContext);
  if (!context) throw new Error('useEmailMarketing must be used within EmailMarketingProvider');
  return context;
}
