'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  full_name: string;
  phone?: string;
  location?: string;
  role: 'customer' | 'admin';
  status: 'active' | 'inactive';
  total_orders: number;
  total_spent: number;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
  isAdmin: boolean;
  isSupabaseEnabled: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isSupabaseEnabled = isSupabaseConfigured();

  useEffect(() => {
    const supabase = getSupabase();

    if (!supabase || !isSupabaseEnabled) {
      setLoading(false);
      return;
    }

    // Supabase authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [isSupabaseEnabled]);

  const fetchUserProfile = async (userId: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setProfile(data as UserProfile);
    }

    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabase();

    if (!supabase || !isSupabaseEnabled) {
      return { error: { message: 'Authentication service not configured. Please contact support.' } };
    }

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && data.user) {
      // Fetch user profile to verify role
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError || !profileData) {
        await supabase.auth.signOut();
        return { error: { message: 'User profile not found' } };
      }

      setProfile(profileData as UserProfile);
    }

    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const supabase = getSupabase();

    if (!supabase || !isSupabaseEnabled) {
      return { error: { message: 'Authentication service not configured. Please contact support.' } };
    }

    // Sign up user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) {
      return { error };
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert([
        {
          id: data.user.id,
          full_name: fullName,
          role: 'customer',
          status: 'active',
          total_orders: 0,
          total_spent: 0,
        },
      ]);

    if (profileError) {
      return { error: profileError };
    }

    return { error: null };
  };

  const signOut = async () => {
    const supabase = getSupabase();

    if (!supabase || !isSupabaseEnabled) {
      setUser(null);
      setProfile(null);
      router.push('/admin');
      return;
    }

    // Logout
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    router.push('/admin');
  };

  const resetPassword = async (email: string) => {
    const supabase = getSupabase();

    if (!supabase) {
      return { error: { message: 'Database connection failed' } };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/reset-password`,
    });
  };

  const updatePassword = async (newPassword: string) => {
    const supabase = getSupabase();

    if (!supabase) {
      return { error: { message: 'Database connection failed' } };
    }

    return await supabase.auth.updateUser({
      password: newPassword,
    });
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    isAdmin: profile?.role === 'admin',
    isSupabaseEnabled,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
