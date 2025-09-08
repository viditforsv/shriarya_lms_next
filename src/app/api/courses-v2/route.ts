import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET - Get all courses with basic info
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published') === 'true'
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')

    const query = supabase
      .from('courses')
      .select(`
        id,
        title,
        description,
        slug,
        is_free,
        created_at,
        profiles!courses_instructor_id_fkey (
          first_name,
          last_name
        )
      `)
      .order('created_at', { ascending: false })

    // Note: is_published, category, difficulty_level columns don't exist yet
    // if (published) {
    //   query = query.eq('is_published', true)
    // }

    // if (category) {
    //   query = query.eq('category', category)
    // }

    // if (difficulty) {
    //   query = query.eq('difficulty_level', difficulty)
    // }

    const { data: courses, error } = await query

    if (error) {
      console.error('Error fetching courses:', error)
      return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
    }

    return NextResponse.json({ courses })
  } catch (error) {
    console.error('Error in courses API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create a new course
export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const {
      title,
      description,
      slug,
      category,
      difficulty_level,
      estimated_duration_hours,
      thumbnail_url,
      is_free = false,
      is_published = false
    } = body

    // Validate required fields
    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })
    }

    // Check if slug already exists
    const { data: existingCourse } = await supabase
      .from('courses')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existingCourse) {
      return NextResponse.json({ error: 'Course slug already exists' }, { status: 400 })
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile to check if they're an instructor/admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can create courses' }, { status: 403 })
    }

    // Create course
    const { data: course, error } = await supabase
      .from('courses')
      .insert({
        title,
        description,
        slug,
        category,
        difficulty_level,
        estimated_duration_hours,
        thumbnail_url,
        is_free,
        is_published,
        instructor_id: user.id,
        published_at: is_published ? new Date().toISOString() : null
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating course:', error)
      return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
    }

    return NextResponse.json({ course }, { status: 201 })
  } catch (error) {
    console.error('Error in courses POST API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update a course
export async function PUT(request: Request) {
  try {
    const supabase = createClient()
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user can update this course
    const { data: course } = await supabase
      .from('courses')
      .select('instructor_id')
      .eq('id', id)
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
      return NextResponse.json({ error: 'Unauthorized to update this course' }, { status: 403 })
    }

    // Update course
    const { data: updatedCourse, error } = await supabase
      .from('courses')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating course:', error)
      return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
    }

    return NextResponse.json({ course: updatedCourse })
  } catch (error) {
    console.error('Error in courses PUT API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete a course
export async function DELETE(request: Request) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user can delete this course
    const { data: course } = await supabase
      .from('courses')
      .select('instructor_id')
      .eq('id', id)
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
      return NextResponse.json({ error: 'Unauthorized to delete this course' }, { status: 403 })
    }

    // Delete course (cascade will handle related records)
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting course:', error)
      return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error('Error in courses DELETE API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}