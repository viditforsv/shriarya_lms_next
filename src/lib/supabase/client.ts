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
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        // Longer session duration (30 days)
        sessionRefreshMargin: 60, // Refresh 60 seconds before expiry
        // Enable secure cookie storage
        cookieOptions: {
          name: 'shriarya-auth-token',
          lifetime: 30 * 24 * 60 * 60, // 30 days in seconds
          domain: process.env.NODE_ENV === 'production' ? '.shrividhya.in' : undefined,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production'
        }
      }
    }
  )
}
