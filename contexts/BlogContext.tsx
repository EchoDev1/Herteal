'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  authorId: string;
  status: 'draft' | 'published' | 'scheduled';
  publishDate: string;
  featured: boolean;
  views: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogContextType {
  posts: BlogPost[];
  isLoaded: boolean;
  addPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'slug'>) => void;
  updatePost: (id: string, updates: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPostBySlug: (slug: string) => BlogPost | undefined;
  getPublishedPosts: () => BlogPost[];
  getFeaturedPosts: () => BlogPost[];
  getPostsByCategory: (category: string) => BlogPost[];
  incrementViews: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const STORAGE_KEY = 'herteals_blog_posts';

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setPosts(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse blog posts:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }
  }, [posts, isLoaded]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const addPost = (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'slug'>) => {
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...postData,
      id: `post_${Date.now()}`,
      slug: generateSlug(postData.title),
      createdAt: now,
      updatedAt: now,
      views: 0,
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    setPosts(prev => prev.map(p =>
      p.id === id
        ? {
            ...p,
            ...updates,
            updatedAt: new Date().toISOString(),
            slug: updates.title ? generateSlug(updates.title) : p.slug
          }
        : p
    ));
  };

  const deletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const getPostBySlug = (slug: string) => {
    return posts.find(p => p.slug === slug);
  };

  const getPublishedPosts = () => {
    const now = new Date();
    return posts.filter(p =>
      p.status === 'published' ||
      (p.status === 'scheduled' && new Date(p.publishDate) <= now)
    );
  };

  const getFeaturedPosts = () => {
    return getPublishedPosts().filter(p => p.featured);
  };

  const getPostsByCategory = (category: string) => {
    return getPublishedPosts().filter(p => p.category === category);
  };

  const incrementViews = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, views: p.views + 1 } : p));
  };

  return (
    <BlogContext.Provider value={{ posts, isLoaded, addPost, updatePost, deletePost, getPostBySlug, getPublishedPosts, getFeaturedPosts, getPostsByCategory, incrementViews }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) throw new Error('useBlog must be used within BlogProvider');
  return context;
}
