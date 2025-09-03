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

    // Create a simple course without the trigger
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

    // Try to insert without the trigger first
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert(courseData)
      .select()
      .single()

    if (courseError) {
      console.error('API - Error creating course:', courseError)
      
      // Try to get more details about the error
      if (courseError.code) {
        console.error('API - Error code:', courseError.code)
      }
      if (courseError.details) {
        console.error('API - Error details:', courseError.details)
      }
      if (courseError.hint) {
        console.error('API - Error hint:', courseError.hint)
      }
      
      return NextResponse.json({ 
        error: 'Failed to create course', 
        details: courseError.message,
        code: courseError.code,
        hint: courseError.hint
      }, { status: 500 })
    }

    console.log('API - Course created successfully:', course)

    // Manually create default lessons if the trigger isn't working
    const defaultLessons = [
      {
        title: 'Introduction',
        course_id: course.id,
        content: 'Welcome to your new course! This is the introduction lesson.',
        lesson_order: 1,
        slug: 'introduction',
        is_preview: true
      },
      {
        title: 'Getting Started',
        course_id: course.id,
        content: 'This lesson will help you understand the basics.',
        lesson_order: 2,
        slug: 'getting-started',
        is_preview: false
      },
      {
        title: 'First Practice Session',
        course_id: course.id,
        content: 'Complete this practice session to reinforce your learning.',
        lesson_order: 3,
        slug: 'first-practice',
        is_preview: false
      }
    ]

    console.log('API - Creating default lessons...')
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .insert(defaultLessons)
      .select()

    if (lessonsError) {
      console.error('API - Error creating lessons:', lessonsError)
      // Don't fail the course creation, just log the error
    } else {
      console.log('API - Default lessons created:', lessons?.length)
    }

    return NextResponse.json({ 
      course,
      lessons: lessons || [],
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
