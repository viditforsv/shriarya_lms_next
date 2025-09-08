import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET - Get lessons for a course
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const courseSlug = searchParams.get('courseSlug')
    const published = searchParams.get('published') === 'true'

    if (!courseId && !courseSlug) {
      return NextResponse.json({ error: 'Course ID or slug is required' }, { status: 400 })
    }

    let query = supabase
      .from('lessons')
      .select(`
        id,
        title,
        slug,
        content,
        lesson_order,
        is_preview,
        created_at,
        course_id,
        resources (
          id,
          url,
          kind,
          mime,
          duration_sec
        )
      `)
      .order('lesson_order', { ascending: true })

    // Note: is_published column doesn't exist yet
    // if (published) {
    //   query = query.eq('is_published', true)
    // }

    if (courseId) {
      query = query.eq('course_id', courseId)
    } else if (courseSlug) {
      // First get course ID from slug
      const { data: course } = await supabase
        .from('courses')
        .select('id')
        .eq('slug', courseSlug)
        .single()

      if (!course) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 })
      }

      query = query.eq('course_id', course.id)
    }

    const { data: lessons, error } = await query

    if (error) {
      console.error('Error fetching lessons:', error)
      return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 })
    }

    return NextResponse.json({ lessons })
  } catch (error) {
    console.error('Error in lessons API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create a new lesson
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const {
      title,
      slug,
      content,
      lesson_order,
      is_preview = false,
      course_id
    } = body

    // Validate required fields
    if (!title || !slug || !course_id || lesson_order === undefined) {
      return NextResponse.json({ error: 'Title, slug, course_id, and lesson_order are required' }, { status: 400 })
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user can create lessons for this course
    const { data: course } = await supabase
      .from('courses')
      .select('instructor_id')
      .eq('id', course_id)
      .single()

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Get user profile to check permissions
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || (profile.role !== 'admin' && course.instructor_id !== user.id)) {
      return NextResponse.json({ error: 'Unauthorized to create lessons for this course' }, { status: 403 })
    }

    // Create lesson
    const { data: lesson, error } = await supabase
      .from('lessons')
      .insert({
        title,
        slug,
        content,
        lesson_order,
        is_preview,
        course_id
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating lesson:', error)
      return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 })
    }

    return NextResponse.json({ lesson }, { status: 201 })
  } catch (error) {
    console.error('Error in lessons POST API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update a lesson
export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 })
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user can update this lesson
    const { data: lesson } = await supabase
      .from('lessons')
      .select(`
        course_id,
        courses!lessons_course_id_fkey (
          instructor_id
        )
      `)
      .eq('id', id)
      .single()

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    // Get user profile to check permissions
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || (profile.role !== 'admin' && lesson.courses[0]?.instructor_id !== user.id)) {
      return NextResponse.json({ error: 'Unauthorized to update this lesson' }, { status: 403 })
    }

    // Update lesson
    const { data: updatedLesson, error } = await supabase
      .from('lessons')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating lesson:', error)
      return NextResponse.json({ error: 'Failed to update lesson' }, { status: 500 })
    }

    return NextResponse.json({ lesson: updatedLesson })
  } catch (error) {
    console.error('Error in lessons PUT API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete a lesson
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 })
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user can delete this lesson
    const { data: lesson } = await supabase
      .from('lessons')
      .select(`
        course_id,
        courses!lessons_course_id_fkey (
          instructor_id
        )
      `)
      .eq('id', id)
      .single()

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    // Get user profile to check permissions
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || (profile.role !== 'admin' && lesson.courses[0]?.instructor_id !== user.id)) {
      return NextResponse.json({ error: 'Unauthorized to delete this lesson' }, { status: 403 })
    }

    // Delete lesson (cascade will handle related records)
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting lesson:', error)
      return NextResponse.json({ error: 'Failed to delete lesson' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Lesson deleted successfully' })
  } catch (error) {
    console.error('Error in lessons DELETE API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}