import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Validation schemas
const CourseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  is_free: z.boolean().default(false),
  slug: z.string().min(1, 'Slug is required'),
  curriculum: z.enum(['CBSE', 'ICSE', 'IBDP', 'IGCSE']).optional(),
  subject: z.string().optional(),
  grade: z.string().optional(),
  level: z.string().optional(),
  price: z.number().optional(),
  status: z.enum(['published', 'draft', 'archived']).default('draft'),
  duration: z.string().optional(),
  lessons: z.number().default(0),
  thumbnail: z.string().optional(),
  features: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  learningOutcomes: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([])
})

const LessonSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  content: z.string().optional(),
  lesson_order: z.number().min(1, 'Lesson order is required'),
  slug: z.string().min(1, 'Slug is required'),
  is_preview: z.boolean().default(false),
  duration: z.string().optional(),
  type: z.enum(['video', 'document', 'quiz', 'assignment', 'practice']).default('video')
})

const ResourceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  kind: z.enum(['video', 'pdf', 'image', 'link', 'audio', 'zip']),
  url: z.string().min(1, 'URL is required'),
  mime: z.string().optional(),
  duration_sec: z.number().optional(),
  description: z.string().optional()
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

// COURSE ENDPOINTS

// GET /api/courses - Get all courses
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const curriculum = searchParams.get('curriculum')
    const isFree = searchParams.get('is_free')
    
    let query = supabase
      .from('courses')
      .select(`
        *,
        profiles:instructor_id (
          id,
          first_name,
          last_name,
          email
        )
      `)
      .order('created_at', { ascending: false })
    
    if (status) {
      query = query.eq('status', status)
    }
    
    if (curriculum) {
      query = query.eq('curriculum', curriculum)
    }
    
    if (isFree !== null) {
      query = query.eq('is_free', isFree === 'true')
    }
    
    const { data: courses, error } = await query
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ courses })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

// POST /api/courses - Create new course
export async function POST(request: Request) {
  try {
    await checkAdminAccess()
    
    const body = await request.json()
    const validatedData = CourseSchema.parse(body)
    
    const supabase = await createClient()
    const user = await getAuthenticatedUser()
    
    const { data: course, error } = await supabase
      .from('courses')
      .insert({
        ...validatedData,
        instructor_id: user.id
      })
      .select(`
        *,
        profiles:instructor_id (
          id,
          first_name,
          last_name,
          email
        )
      `)
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ course }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create course' },
      { status: 500 }
    )
  }
}

// PUT /api/courses - Update course
export async function PUT(request: Request) {
  try {
    await checkAdminAccess()
    
    const body = await request.json()
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }
    
    const validatedData = CourseSchema.partial().parse(updateData)
    
    const supabase = await createClient()
    
    const { data: course, error } = await supabase
      .from('courses')
      .update({
        ...validatedData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        profiles:instructor_id (
          id,
          first_name,
          last_name,
          email
        )
      `)
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ course })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update course' },
      { status: 500 }
    )
  }
}

// DELETE /api/courses - Delete course
export async function DELETE(request: Request) {
  try {
    await checkAdminAccess()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }
    
    const supabase = await createClient()
    
    // First delete all lessons and resources
    const { error: lessonsError } = await supabase
      .from('lessons')
      .delete()
      .eq('course_id', id)
    
    if (lessonsError) {
      return NextResponse.json({ error: lessonsError.message }, { status: 500 })
    }
    
    // Then delete the course
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id)
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete course' },
      { status: 500 }
    )
  }
}