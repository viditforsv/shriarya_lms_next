import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/courses/enrolled'

  console.log('Auth callback - Origin:', origin)
  console.log('Auth callback - Code:', code ? 'present' : 'missing')
  console.log('Auth callback - Next:', next)

  if (code) {
    const supabase = await createClient()
    
    try {
      // Use the proper PKCE flow for code exchange
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth callback - Exchange error:', error)
        // Return the user to an error page with instructions
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin
        return NextResponse.redirect(`${baseUrl}/auth?error=Could not authenticate user`)
      }
      
      console.log('Auth callback - Success, redirecting to:', next)
      // Use environment variable for production, fallback to origin for development
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin
      return NextResponse.redirect(`${baseUrl}${next}`)
      
    } catch (error) {
      console.error('Auth callback - Unexpected error:', error)
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin
      return NextResponse.redirect(`${baseUrl}/auth?error=Authentication failed`)
    }
  }

  // Return the user to an error page with instructions
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin
  console.log('Auth callback - No code, redirecting to:', `${baseUrl}/auth?error=No authentication code received`)
  return NextResponse.redirect(`${baseUrl}/auth?error=No authentication code received`)
}
