import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { canAccessRoute, getRedirectPath } from '@/lib/access-control'
import { UserRole } from '@/types/auth'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value)
            res.cookies.set(name, value, options)
          })
        },
      },
    }
  )
  
  const { pathname } = req.nextUrl

  // Get session
  const { data: { session } } = await supabase.auth.getSession()

  // Check if user can access this route
  const isAuthenticated = !!session
  let userRole: UserRole | undefined
  
  if (session?.user) {
    // Try cache first (session metadata)
    userRole = session.user.user_metadata?.role as UserRole
    
    // Fallback to DB if missing from cache
    if (!userRole) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
        userRole = profile?.role as UserRole
        
        // Cache the role in session metadata for future requests
        if (userRole) {
          await supabase.auth.updateUser({
            data: { role: userRole }
          })
        }
      } catch (error) {
        console.error('Error fetching user role:', error)
      }
    }
  }
  
  const canAccess = canAccessRoute(pathname, userRole, isAuthenticated)
  
  if (!canAccess) {
    const redirectPath = getRedirectPath(pathname, userRole, isAuthenticated)
    if (redirectPath) {
      const redirectUrl = new URL(redirectPath, req.url)
      if (redirectPath === '/auth') {
        redirectUrl.searchParams.set('redirectTo', pathname)
      }
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
