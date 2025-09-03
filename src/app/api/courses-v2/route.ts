import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
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

    // Get user profile to check if they're an instructor
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    console.log('API - Profile data:', profile, 'Profile error:', profileError)

    // For now, allow any authenticated user to create courses
    // You can uncomment the admin check later
    /*
    if (profileError || profile?.role !== 'admin') {
      console.error('API - Profile error:', profileError, 'Role:', profile?.role)
      return NextResponse.json({ error: 'Instructor access required' }, { status: 403 })
    }
    */

    // Create a new course with draft status
    const courseData = {
      title: 'Untitled Course',
      description: 'Course description will be added here.',
      is_free: true,
      price: 0,
      status: 'draft',
      instructor_id: user.id,
      slug: `course-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    console.log('API - Creating course with data:', courseData)

    // First, check if the courses table has the required columns
    const { data: tableInfo, error: tableError } = await supabase
      .from('courses')
      .select('*')
      .limit(1)

    if (tableError) {
      console.error('API - Table error:', tableError)
      return NextResponse.json({ 
        error: 'Database schema issue', 
        details: tableError.message 
      }, { status: 500 })
    }

    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert(courseData)
      .select()
      .single()

    if (courseError) {
      console.error('API - Error creating course:', courseError)
      
      // Check if it's a schema issue
      if (courseError.message.includes('column') || courseError.message.includes('does not exist')) {
        return NextResponse.json({ 
          error: 'Database schema not applied', 
          details: 'Please run the database schema script first',
          code: 'SCHEMA_ERROR'
        }, { status: 500 })
      }
      
      return NextResponse.json({ 
        error: 'Failed to create course', 
        details: courseError.message 
      }, { status: 500 })
    }

    console.log('API - Course created successfully:', course)

    return NextResponse.json({ 
      course,
      message: 'Course created successfully'
    })

  } catch (error) {
    console.error('API - Course creation error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
