import { createApiClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createApiClient()
    
    // Test authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
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
        message: 'No user found in session'
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
