'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'order_placed' | 'order_shipped' | 'order_delivered' | 'low_stock' | 'new_review' | 'new_user' | 'custom';
  channels: ('email' | 'sms' | 'push' | 'in_app')[];
  enabled: boolean;
  subject: string;
  content: string;
  variables: string[];
}

export interface NotificationLog {
  id: string;
  templateId: string;
  templateName: string;
  recipient: string;
  channel: 'email' | 'sms' | 'push' | 'in_app';
  status: 'sent' | 'failed' | 'pending';
  sentAt: string;
  error?: string;
}

const DEFAULT_TEMPLATES: NotificationTemplate[] = [
  {
    id: 'tpl_order_placed',
    name: 'Order Placed',
    type: 'order_placed',
    channels: ['email', 'sms'],
    enabled: true,
    subject: 'Order Confirmation - {{order_id}}',
    content: 'Hi {{customer_name}}, your order {{order_id}} has been received and is being processed. Total: {{order_total}}',
    variables: ['customer_name', 'order_id', 'order_total'],
  },
  {
    id: 'tpl_order_shipped',
    name: 'Order Shipped',
    type: 'order_shipped',
    channels: ['email', 'sms'],
    enabled: true,
    subject: 'Your Order Has Shipped - {{order_id}}',
    content: 'Hi {{customer_name}}, your order {{order_id}} has been shipped! Tracking: {{tracking_number}}',
    variables: ['customer_name', 'order_id', 'tracking_number'],
  },
  {
    id: 'tpl_order_delivered',
    name: 'Order Delivered',
    type: 'order_delivered',
    channels: ['email'],
    enabled: true,
    subject: 'Order Delivered - {{order_id}}',
    content: 'Hi {{customer_name}}, your order {{order_id}} has been delivered. Enjoy your purchase!',
    variables: ['customer_name', 'order_id'],
  },
  {
    id: 'tpl_low_stock',
    name: 'Low Stock Alert',
    type: 'low_stock',
    channels: ['in_app'],
    enabled: true,
    subject: 'Low Stock Alert - {{product_name}}',
    content: 'Product {{product_name}} is running low ({{stock_count}} remaining)',
    variables: ['product_name', 'stock_count'],
  },
  {
    id: 'tpl_new_review',
    name: 'New Review',
    type: 'new_review',
    channels: ['in_app'],
    enabled: true,
    subject: 'New Review on {{product_name}}',
    content: '{{customer_name}} left a {{rating}}-star review on {{product_name}}',
    variables: ['customer_name', 'product_name', 'rating'],
  },
];

interface NotificationsContextType {
  templates: NotificationTemplate[];
  logs: NotificationLog[];
  isLoaded: boolean;
  updateTemplate: (id: string, updates: Partial<NotificationTemplate>) => void;
  sendNotification: (templateId: string, recipient: string, channel: NotificationLog['channel'], variables: Record<string, string>) => void;
  getLogs: (limit?: number) => NotificationLog[];
  getTemplateByType: (type: NotificationTemplate['type']) => NotificationTemplate | undefined;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

const STORAGE_KEY_TEMPLATES = 'herteals_notification_templates';
const STORAGE_KEY_LOGS = 'herteals_notification_logs';

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [templates, setTemplates] = useState<NotificationTemplate[]>(DEFAULT_TEMPLATES);
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTemplates = localStorage.getItem(STORAGE_KEY_TEMPLATES);
      const storedLogs = localStorage.getItem(STORAGE_KEY_LOGS);

      if (storedTemplates) {
        try {
          setTemplates(JSON.parse(storedTemplates));
        } catch (error) {
          console.error('Failed to parse notification templates:', error);
        }
      }

      if (storedLogs) {
        try {
          setLogs(JSON.parse(storedLogs));
        } catch (error) {
          console.error('Failed to parse notification logs:', error);
        }
      }

      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_TEMPLATES, JSON.stringify(templates));
    }
  }, [templates, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
    }
  }, [logs, isLoaded]);

  const updateTemplate = (id: string, updates: Partial<NotificationTemplate>) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const sendNotification = (
    templateId: string,
    recipient: string,
    channel: NotificationLog['channel'],
    variables: Record<string, string>
  ) => {
    const template = templates.find(t => t.id === templateId);
    if (!template || !template.enabled) return;

    const newLog: NotificationLog = {
      id: `log_${Date.now()}`,
      templateId,
      templateName: template.name,
      recipient,
      channel,
      status: 'sent',
      sentAt: new Date().toISOString(),
    };

    setLogs(prev => [newLog, ...prev]);
  };

  const getLogs = (limit: number = 100) => {
    return logs.slice(0, limit);
  };

  const getTemplateByType = (type: NotificationTemplate['type']) => {
    return templates.find(t => t.type === type);
  };

  return (
    <NotificationsContext.Provider value={{ templates, logs, isLoaded, updateTemplate, sendNotification, getLogs, getTemplateByType }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error('useNotifications must be used within NotificationsProvider');
  return context;
}
