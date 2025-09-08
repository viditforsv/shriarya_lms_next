import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Validation schemas
const ResourceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  kind: z.enum(['video', 'pdf', 'image', 'link', 'audio', 'zip']),
  url: z.string().min(1, 'URL is required'),
  mime: z.string().optional(),
  duration_sec: z.number().optional(),
  description: z.string().optional(),
  lesson_id: z.string().min(1, 'Lesson ID is required')
})

// Helper function to get authenticated user
async function getAuthenticatedUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    throw new Error('Authentication required')
  }
  
  return user
}

// Helper function to check if user is admin
async function checkAdminAccess() {
  const user = await getAuthenticatedUser()
  const supabase = await createClient()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (!profile || profile.role !== 'admin') {
    throw new Error('Admin access required')
  }
  
  return user
}

// GET /api/resources - Get resources for a lesson
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lessonId = searchParams.get('lesson_id')
    const lessonSlug = searchParams.get('lesson_slug')
    const courseSlug = searchParams.get('course_slug')
    
    const supabase = await createClient()
    
    let query = supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (lessonId) {
      query = query.eq('lesson_id', lessonId)
    } else if (lessonSlug && courseSlug) {
      // First get course by slug
      const { data: course } = await supabase
        .from('courses')
        .select('id')
        .eq('slug', courseSlug)
        .single()
      
      if (!course) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 })
      }
      
      // Then get lesson by slug and course_id
      const { data: lesson } = await supabase
        .from('lessons')
        .select('id')
        .eq('slug', lessonSlug)
        .eq('course_id', course.id)
        .single()
      
      if (!lesson) {
        return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
      }
      
      query = query.eq('lesson_id', lesson.id)
    } else {
      return NextResponse.json({ error: 'lesson_id or (lesson_slug + course_slug) is required' }, { status: 400 })
    }
    
    const { data: resources, error } = await query
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ resources })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}

// POST /api/resources - Create new resource
export async function POST(request: Request) {
  try {
    await checkAdminAccess()
    
    const body = await request.json()
    const validatedData = ResourceSchema.parse(body)
    
    const supabase = await createClient()
    
    // Check if lesson exists
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('id, course_id')
      .eq('id', validatedData.lesson_id)
      .single()
    
    if (lessonError || !lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }
    
    const { data: resource, error } = await supabase
      .from('resources')
      .insert(validatedData)
      .select()
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ resource }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 })
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create resource' },
      { status: 500 }
    )
  }
}

// PUT /api/resources - Update resource
export async function PUT(request: Request) {
  try {
    await checkAdminAccess()
    
    const body = await request.json()
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json({ error: 'Resource ID is required' }, { status: 400 })
    }
    
    const validatedData = ResourceSchema.partial().parse(updateData)
    
    const supabase = await createClient()
    
    const { data: resource, error } = await supabase
      .from('resources')
      .update(validatedData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ resource })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 })
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update resource' },
      { status: 500 }
    )
  }
}

// DELETE /api/resources - Delete resource
export async function DELETE(request: Request) {
  try {
    await checkAdminAccess()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Resource ID is required' }, { status: 400 })
    }
    
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id)
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ message: 'Resource deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete resource' },
      { status: 500 }
    )
  }
}
