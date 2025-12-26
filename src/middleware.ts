import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { canAccessRoute, getRedirectPath } from "@/lib/access-control";
import { UserRole } from "@/types/auth";
import {
  getSupabaseUrl,
  getSupabaseAnonKey,
  validateSupabaseConfig,
} from "@/lib/supabase/env";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  // Skip static assets and public routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/public/") ||
    pathname === "/favicon.ico"
  ) {
    return res;
  }

  validateSupabaseConfig();
  const supabase = createServerClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      auth: {
        flowType: "pkce",
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, {
              ...options,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
            });
          });
        },
      },
    }
  );

  // Get user (more secure than getSession)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthenticated = !!user;
  let userRole: UserRole | undefined = user?.user_metadata?.role;

  if (!userRole && user) {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      userRole = profile?.role as UserRole;
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  }

  const canAccess = canAccessRoute(pathname, userRole, isAuthenticated);

  if (!canAccess) {
    const redirectPath = getRedirectPath(pathname, userRole, isAuthenticated);
    if (redirectPath) {
      const redirectUrl = new URL(redirectPath, req.url);
      if (redirectPath === "/auth") {
        redirectUrl.searchParams.set("redirect", pathname);
      }
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
