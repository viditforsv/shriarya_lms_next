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
    console.log('API - Auth header:', authHeader)

    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 })
    }

    // Extract the token from the header
    const token = authHeader.replace('Bearer ', '')
    
    // Set the session manually
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    console.log('API - Auth check:', { user: user?.id, error: authError })
    
    if (authError) {
      console.error('API - Auth error:', authError)
      return NextResponse.json({ error: 'Authentication error', details: authError.message }, { status: 401 })
    }
    
    if (!user) {
      console.error('API - No user found')
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }

    console.log('API - User authenticated:', user.id, user.email)

    // Fetch courses for this user
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .eq('instructor_id', user.id)
      .order('created_at', { ascending: false })

    if (coursesError) {
      console.error('API - Error fetching courses:', coursesError)
      return NextResponse.json({ 
        error: 'Failed to fetch courses', 
        details: coursesError.message,
        code: coursesError.code
      }, { status: 500 })
    }

    console.log('API - Courses fetched:', courses?.length || 0)

    return NextResponse.json({ 
      courses: courses || [],
      message: 'Courses fetched successfully'
    })

  } catch (error) {
    console.error('API - Fetch courses error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
