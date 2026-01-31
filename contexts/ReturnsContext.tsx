'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ReturnRequest {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  reason: string;
  reasonDetails: string;
  images?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'item_received' | 'refunded';
  refundAmount: number;
  refundMethod: 'original' | 'store_credit';
  requestedAt: string;
  processedAt?: string;
  adminNotes?: string;
}

interface ReturnsContextType {
  returns: ReturnRequest[];
  isLoaded: boolean;
  addReturn: (returnData: Omit<ReturnRequest, 'id' | 'requestedAt' | 'status'>) => void;
  updateReturn: (id: string, updates: Partial<ReturnRequest>) => void;
  approveReturn: (id: string, adminNotes?: string) => void;
  rejectReturn: (id: string, adminNotes?: string) => void;
  markAsReceived: (id: string) => void;
  processRefund: (id: string) => void;
  getReturnsByStatus: (status: ReturnRequest['status']) => ReturnRequest[];
  getReturnsByCustomer: (customerId: string) => ReturnRequest[];
}

const ReturnsContext = createContext<ReturnsContextType | undefined>(undefined);

const STORAGE_KEY = 'herteals_returns';

export function ReturnsProvider({ children }: { children: ReactNode }) {
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setReturns(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse returns:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(returns));
    }
  }, [returns, isLoaded]);

  const addReturn = (returnData: Omit<ReturnRequest, 'id' | 'requestedAt' | 'status'>) => {
    const newReturn: ReturnRequest = {
      ...returnData,
      id: `return_${Date.now()}`,
      requestedAt: new Date().toISOString(),
      status: 'pending',
    };
    setReturns(prev => [newReturn, ...prev]);
  };

  const updateReturn = (id: string, updates: Partial<ReturnRequest>) => {
    setReturns(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const approveReturn = (id: string, adminNotes?: string) => {
    setReturns(prev => prev.map(r =>
      r.id === id
        ? {
            ...r,
            status: 'approved' as const,
            processedAt: new Date().toISOString(),
            adminNotes,
          }
        : r
    ));
  };

  const rejectReturn = (id: string, adminNotes?: string) => {
    setReturns(prev => prev.map(r =>
      r.id === id
        ? {
            ...r,
            status: 'rejected' as const,
            processedAt: new Date().toISOString(),
            adminNotes,
          }
        : r
    ));
  };

  const markAsReceived = (id: string) => {
    setReturns(prev => prev.map(r =>
      r.id === id
        ? { ...r, status: 'item_received' as const }
        : r
    ));
  };

  const processRefund = (id: string) => {
    setReturns(prev => prev.map(r =>
      r.id === id
        ? {
            ...r,
            status: 'refunded' as const,
            processedAt: new Date().toISOString(),
          }
        : r
    ));
  };

  const getReturnsByStatus = (status: ReturnRequest['status']) => {
    return returns.filter(r => r.status === status);
  };

  const getReturnsByCustomer = (customerId: string) => {
    return returns.filter(r => r.customerId === customerId);
  };

  return (
    <ReturnsContext.Provider value={{ returns, isLoaded, addReturn, updateReturn, approveReturn, rejectReturn, markAsReceived, processRefund, getReturnsByStatus, getReturnsByCustomer }}>
      {children}
    </ReturnsContext.Provider>
  );
}

export function useReturns() {
  const context = useContext(ReturnsContext);
  if (!context) throw new Error('useReturns must be used within ReturnsProvider');
  return context;
}
