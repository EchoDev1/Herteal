import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured with valid values
export const isSupabaseConfigured = () => {
  // Check if values exist and are not placeholder values
  const hasValidUrl = supabaseUrl &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your-project-url') &&
    supabaseUrl.includes('supabase.co');

  const hasValidKey = supabaseAnonKey &&
    supabaseAnonKey.length > 20 &&
    !supabaseAnonKey.includes('your-anon-key');

  return Boolean(hasValidUrl && hasValidKey);
};

// Only create client if configuration exists
let supabaseInstance: SupabaseClient | null = null;

// Deprecated: Use getSupabase() instead
export const supabase = null as any;

// Safe getter for Supabase client
export const getSupabase = () => {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured. Please configure your Supabase credentials in .env.local');
    return null;
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        detectSessionInUrl: typeof window !== 'undefined',
        flowType: 'pkce',
      },
    });
  }

  return supabaseInstance;
};
