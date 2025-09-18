import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: "pkce",
        // Match client configuration for perfect sync
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        // Use same storage key as client
        storageKey: "shriarya-lms-session",
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // Match client cookie configuration exactly
              const enhancedOptions = {
                ...options,
                maxAge: options?.maxAge || 30 * 24 * 60 * 60, // 30 days
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax" as const,
                httpOnly: true,
                domain:
                  process.env.NODE_ENV === "production"
                    ? ".shrividhya.in"
                    : undefined,
              };
              cookieStore.set(name, value, enhancedOptions);
            });
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

// Alternative client for API routes that might have cookie issues
export async function createApiClient() {
  const cookieStore = await cookies();

  // Get all cookies and convert to the format Supabase expects
  const allCookies = cookieStore.getAll();
  // const cookieString = allCookies
  //   .map(cookie => `${cookie.name}=${cookie.value}`)
  //   .join('; ')

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: "pkce",
      },
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
