import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/courses/enrolled'

  console.log('OAuth Callback - Code:', code ? 'Present' : 'Missing')
  console.log('OAuth Callback - Next:', next)
  console.log('OAuth Callback - Origin:', origin)
  console.log('OAuth Callback - All params:', Object.fromEntries(searchParams))

  if (code) {
    const supabase = await createClient()
    
    // Use the full URL for PKCE support
    const { error } = await supabase.auth.exchangeCodeForSession({
      code,
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || origin}/auth/callback`
    })
    
    console.log('OAuth Exchange - Error:', error)
    
    if (!error) {
      // Use environment variable for production, fallback to origin for development
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin
      console.log('OAuth Success - Redirecting to:', `${baseUrl}${next}`)
      return NextResponse.redirect(`${baseUrl}${next}`)
    }
  }

  // Return the user to an error page with instructions
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin
  console.log('OAuth Error - Redirecting to:', `${baseUrl}/auth?error=Could not authenticate user`)
  return NextResponse.redirect(`${baseUrl}/auth?error=Could not authenticate user`)
}
