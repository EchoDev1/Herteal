'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface MediaFile {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video';
  size: number;
  dimensions?: { width: number; height: number };
  uploadedAt: string;
  usedIn: {
    type: 'product' | 'collection' | 'blog' | 'page' | 'homepage';
    id: string;
    name: string;
  }[];
  tags: string[];
}

interface MediaContextType {
  mediaFiles: MediaFile[];
  isLoaded: boolean;
  addMedia: (media: Omit<MediaFile, 'id' | 'uploadedAt' | 'usedIn'>) => void;
  updateMedia: (id: string, updates: Partial<MediaFile>) => void;
  deleteMedia: (id: string) => void;
  bulkDelete: (ids: string[]) => void;
  getMediaById: (id: string) => MediaFile | undefined;
  getMediaByType: (type: 'image' | 'video') => MediaFile[];
  trackUsage: (mediaId: string, usage: MediaFile['usedIn'][0]) => void;
  removeUsage: (mediaId: string, usageType: string, usageId: string) => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

const STORAGE_KEY = 'herteals_media_library';

export function MediaProvider({ children }: { children: ReactNode }) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load media from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setMediaFiles(parsed);
        } catch (error) {
          console.error('Failed to parse media library:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save media to localStorage whenever they change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mediaFiles));
    }
  }, [mediaFiles, isLoaded]);

  const addMedia = (mediaData: Omit<MediaFile, 'id' | 'uploadedAt' | 'usedIn'>) => {
    const newMedia: MediaFile = {
      ...mediaData,
      id: `media_${Date.now()}`,
      uploadedAt: new Date().toISOString(),
      usedIn: [],
    };
    setMediaFiles(prev => [newMedia, ...prev]);
    return newMedia.id;
  };

  const updateMedia = (id: string, updates: Partial<MediaFile>) => {
    setMediaFiles(prev =>
      prev.map(media => (media.id === id ? { ...media, ...updates } : media))
    );
  };

  const deleteMedia = (id: string) => {
    const media = mediaFiles.find(m => m.id === id);
    if (media && media.usedIn.length > 0) {
      if (!confirm(`This media is used in ${media.usedIn.length} place(s). Are you sure you want to delete it?`)) {
        return;
      }
    }
    setMediaFiles(prev => prev.filter(media => media.id !== id));
  };

  const bulkDelete = (ids: string[]) => {
    const usedMedia = mediaFiles.filter(m => ids.includes(m.id) && m.usedIn.length > 0);
    if (usedMedia.length > 0) {
      if (!confirm(`${usedMedia.length} of the selected files are in use. Are you sure you want to delete them?`)) {
        return;
      }
    }
    setMediaFiles(prev => prev.filter(media => !ids.includes(media.id)));
  };

  const getMediaById = (id: string) => {
    return mediaFiles.find(media => media.id === id);
  };

  const getMediaByType = (type: 'image' | 'video') => {
    return mediaFiles.filter(media => media.type === type);
  };

  const trackUsage = (mediaId: string, usage: MediaFile['usedIn'][0]) => {
    setMediaFiles(prev =>
      prev.map(media => {
        if (media.id === mediaId) {
          // Check if this usage already exists
          const existingUsage = media.usedIn.find(
            u => u.type === usage.type && u.id === usage.id
          );
          if (!existingUsage) {
            return {
              ...media,
              usedIn: [...media.usedIn, usage],
            };
          }
        }
        return media;
      })
    );
  };

  const removeUsage = (mediaId: string, usageType: string, usageId: string) => {
    setMediaFiles(prev =>
      prev.map(media => {
        if (media.id === mediaId) {
          return {
            ...media,
            usedIn: media.usedIn.filter(u => !(u.type === usageType && u.id === usageId)),
          };
        }
        return media;
      })
    );
  };

  const value: MediaContextType = {
    mediaFiles,
    isLoaded,
    addMedia,
    updateMedia,
    deleteMedia,
    bulkDelete,
    getMediaById,
    getMediaByType,
    trackUsage,
    removeUsage,
  };

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}

export function useMedia() {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
}
