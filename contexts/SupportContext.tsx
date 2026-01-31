'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SupportTicket {
  id: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  category: 'product' | 'order' | 'technical' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo?: string;
  messages: {
    id: string;
    from: 'customer' | 'admin';
    message: string;
    attachments?: string[];
    timestamp: string;
    adminName?: string;
  }[];
  internalNotes?: {
    note: string;
    adminName: string;
    timestamp: string;
  }[];
  createdAt: string;
  updatedAt: string;
  firstResponseAt?: string;
  resolvedAt?: string;
}

interface SupportContextType {
  tickets: SupportTicket[];
  isLoaded: boolean;
  addTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'messages' | 'status'>) => void;
  updateTicket: (id: string, updates: Partial<SupportTicket>) => void;
  addMessage: (ticketId: string, message: Omit<SupportTicket['messages'][0], 'id' | 'timestamp'>) => void;
  addInternalNote: (ticketId: string, note: string, adminName: string) => void;
  assignTicket: (ticketId: string, adminId: string) => void;
  changeStatus: (ticketId: string, status: SupportTicket['status']) => void;
  getTicketsByStatus: (status: SupportTicket['status']) => SupportTicket[];
  getAssignedTickets: (adminId: string) => SupportTicket[];
}

const SupportContext = createContext<SupportContextType | undefined>(undefined);

const STORAGE_KEY = 'herteals_support_tickets';

export function SupportProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setTickets(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse support tickets:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    }
  }, [tickets, isLoaded]);

  const addTicket = (ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'messages' | 'status'>) => {
    const now = new Date().toISOString();
    const newTicket: SupportTicket = {
      ...ticketData,
      id: `ticket_${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      messages: [],
      status: 'open',
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const updateTicket = (id: string, updates: Partial<SupportTicket>) => {
    setTickets(prev => prev.map(t =>
      t.id === id
        ? { ...t, ...updates, updatedAt: new Date().toISOString() }
        : t
    ));
  };

  const addMessage = (ticketId: string, messageData: Omit<SupportTicket['messages'][0], 'id' | 'timestamp'>) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const newMessage = {
          ...messageData,
          id: `msg_${Date.now()}`,
          timestamp: new Date().toISOString(),
        };

        const firstResponseAt = messageData.from === 'admin' && !t.firstResponseAt
          ? new Date().toISOString()
          : t.firstResponseAt;

        return {
          ...t,
          messages: [...t.messages, newMessage],
          firstResponseAt,
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    }));
  };

  const addInternalNote = (ticketId: string, note: string, adminName: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const newNote = {
          note,
          adminName,
          timestamp: new Date().toISOString(),
        };
        return {
          ...t,
          internalNotes: [...(t.internalNotes || []), newNote],
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    }));
  };

  const assignTicket = (ticketId: string, adminId: string) => {
    setTickets(prev => prev.map(t =>
      t.id === ticketId
        ? {
            ...t,
            assignedTo: adminId,
            status: t.status === 'open' ? 'in_progress' as const : t.status,
            updatedAt: new Date().toISOString(),
          }
        : t
    ));
  };

  const changeStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const resolvedAt = status === 'resolved' && !t.resolvedAt
          ? new Date().toISOString()
          : t.resolvedAt;

        return {
          ...t,
          status,
          resolvedAt,
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    }));
  };

  const getTicketsByStatus = (status: SupportTicket['status']) => {
    return tickets.filter(t => t.status === status);
  };

  const getAssignedTickets = (adminId: string) => {
    return tickets.filter(t => t.assignedTo === adminId);
  };

  return (
    <SupportContext.Provider value={{ tickets, isLoaded, addTicket, updateTicket, addMessage, addInternalNote, assignTicket, changeStatus, getTicketsByStatus, getAssignedTickets }}>
      {children}
    </SupportContext.Provider>
  );
}

export function useSupport() {
  const context = useContext(SupportContext);
  if (!context) throw new Error('useSupport must be used within SupportProvider');
  return context;
}
