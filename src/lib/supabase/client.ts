import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        storageKey: 'shriarya-lms-session',
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
        debug: process.env.NODE_ENV === 'development',
        // Enhanced session persistence settings
        storage: typeof window !== 'undefined' ? window.localStorage : undefined
      }
    }
  )
}
