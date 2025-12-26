import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  getSupabaseUrl,
  getSupabaseAnonKey,
  validateSupabaseConfig,
} from "./env";

export async function createClient() {
  const cookieStore = await cookies();
  validateSupabaseConfig();

  return createServerClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      auth: {
        flowType: "pkce",
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "preppeo-lms-session",
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, {
                ...options,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
              });
            });
          } catch {
            // Ignored for Server Components
          }
        },
      },
    }
  );
}

// Alternative client for API routes that might have cookie issues
export async function createApiClient() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  validateSupabaseConfig();

  return createServerClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      auth: { flowType: "pkce" },
      cookies: {
        getAll() {
          return allCookies;
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore errors in API routes
          }
        },
      },
    }
  );
}
