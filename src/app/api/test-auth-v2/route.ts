import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Create a direct Supabase client without SSR
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    console.log('Test API - Auth header:', authHeader)

    if (!authHeader) {
      return NextResponse.json({ 
        error: 'No authorization header',
        message: 'Please include Authorization header with Bearer token'
      }, { status: 401 })
    }

    // Extract the token from the header
    const token = authHeader.replace('Bearer ', '')
    
    // Set the session manually
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    console.log('Test API - Auth check:', { 
      user: user?.id, 
      email: user?.email,
      error: authError 
    })
    
    if (authError) {
      return NextResponse.json({ 
        error: 'Authentication error', 
        details: authError.message 
      }, { status: 401 })
    }
    
    if (!user) {
      return NextResponse.json({ 
        error: 'User not authenticated',
        message: 'No user found with provided token'
      }, { status: 401 })
    }

    // Test profile access
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email
      },
      profile: profile,
      profileError: profileError
    })

  } catch (error) {
    console.error('Test API - Error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
