import { createBrowserClient } from "@supabase/ssr";
import {
  getSupabaseUrl,
  getSupabaseAnonKey,
  validateSupabaseConfig,
} from "./env";

export function createClient() {
  validateSupabaseConfig();
  return createBrowserClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      auth: {
        persistSession: true,
        storageKey: "preppeo-lms-session", // keep consistent
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
        headers: { "X-Client-Info": "preppeo-lms-nextjs" },
      },
    }
  );
}
