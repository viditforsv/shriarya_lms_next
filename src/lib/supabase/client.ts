import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // Use Supabase's built-in session management
        persistSession: true,
        storageKey: "shriarya-lms-session",
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
        debug: process.env.NODE_ENV === "development",
        // Leverage Supabase's built-in storage
        storage:
          typeof window !== "undefined" ? window.localStorage : undefined,
        // Use Supabase's built-in retry logic
        refreshTokenRetryAttempts: 2,
        refreshTokenRetryDelay: 1000,
        // Enable Supabase's built-in session recovery
        recovery: true,
      },
      // Use Supabase's built-in realtime optimizations
      realtime: {
        params: {
          eventsPerSecond: 2,
        },
      },
      // Enable Supabase's built-in global configuration
      global: {
        headers: {
          "X-Client-Info": "shriarya-lms-nextjs",
        },
      },
    }
  );
}
