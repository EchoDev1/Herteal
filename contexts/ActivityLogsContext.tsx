'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: 'product' | 'order' | 'user' | 'setting' | 'collection' | 'blog' | 'discount' | 'shipping' | 'tax' | 'return' | 'review' | 'other';
  entityId: string;
  entityName: string;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
}

interface ActivityLogsContextType {
  logs: ActivityLog[];
  isLoaded: boolean;
  addLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  getLogsByEntityType: (entityType: ActivityLog['entityType']) => ActivityLog[];
  getLogsByUser: (userId: string) => ActivityLog[];
  getLogsBySeverity: (severity: ActivityLog['severity']) => ActivityLog[];
}

const ActivityLogsContext = createContext<ActivityLogsContextType | undefined>(undefined);

const STORAGE_KEY = 'herteals_activity_logs';

export function ActivityLogsProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load logs from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLogs(parsed);
        } catch (error) {
          console.error('Failed to parse activity logs:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save logs to localStorage whenever they change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    }
  }, [logs, isLoaded]);

  const addLog = (logData: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const newLog: ActivityLog = {
      ...logData,
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const clearLogs = () => {
    if (confirm('Are you sure you want to clear all activity logs? This action cannot be undone.')) {
      setLogs([]);
    }
  };

  const getLogsByEntityType = (entityType: ActivityLog['entityType']) => {
    return logs.filter(log => log.entityType === entityType);
  };

  const getLogsByUser = (userId: string) => {
    return logs.filter(log => log.userId === userId);
  };

  const getLogsBySeverity = (severity: ActivityLog['severity']) => {
    return logs.filter(log => log.severity === severity);
  };

  const value: ActivityLogsContextType = {
    logs,
    isLoaded,
    addLog,
    clearLogs,
    getLogsByEntityType,
    getLogsByUser,
    getLogsBySeverity,
  };

  return (
    <ActivityLogsContext.Provider value={value}>
      {children}
    </ActivityLogsContext.Provider>
  );
}

export function useActivityLogs() {
  const context = useContext(ActivityLogsContext);
  if (context === undefined) {
    throw new Error('useActivityLogs must be used within an ActivityLogsProvider');
  }
  return context;
}
