import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        storageKey: "shriarya-lms-session", // keep consistent
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
        debug: process.env.NODE_ENV === "development",
        // Let Supabase handle storage automatically
      },
      realtime: {
        params: { eventsPerSecond: 2 },
      },
      global: {
        headers: { "X-Client-Info": "shriarya-lms-nextjs" },
      },
    }
  );
}
