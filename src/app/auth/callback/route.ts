import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Use environment variable for production, fallback to origin for development
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin
      return NextResponse.redirect(`${baseUrl}${next}`)
    }
  }

  // Return the user to an error page with instructions
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin
  return NextResponse.redirect(`${baseUrl}/auth?error=Could not authenticate user`)
}
