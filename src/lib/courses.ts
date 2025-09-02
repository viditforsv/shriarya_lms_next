import { createClient } from '@/lib/supabase/client'

export interface Course {
  id: string
  title: string
  description: string | null
  is_free: boolean
  price: number | null
  created_at: string
  updated_at: string
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  status: 'pending' | 'active' | 'cancelled'
  payment_id: string | null
  created_at: string
  updated_at: string
}

export interface CourseWithEnrollment extends Course {
  enrollment?: Enrollment
}

export interface Lesson {
  id: string
  title: string
  course_id: string
  content: string | null
  lesson_order: number
  created_at: string
  is_preview: boolean
  slug: string | null
}

export interface Resource {
  id: string
  lesson_id: string
  kind: 'video' | 'pdf' | 'image' | 'link' | 'audio' | 'zip'
  url: string
  mime: string | null
  duration_sec: number | null
  created_at: string
}

export interface LessonWithResources extends Lesson {
  resources?: Resource[]
}

export interface Course {
  id: string
  title: string
  description: string | null
  is_free: boolean
  price: number | null
  created_at: string
  updated_at: string
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  status: 'pending' | 'active' | 'cancelled'
  payment_id: string | null
  created_at: string
  updated_at: string
}

export interface CourseWithEnrollment extends Course {
  enrollment?: Enrollment
}

// Get all courses (public)
export async function getCourses(): Promise<Course[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching courses:', error)
    throw error
  }

  return data || []
}

// Get free courses only
export async function getFreeCourses(): Promise<Course[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_free', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching free courses:', error)
    throw error
  }

  return data || []
}

// Get course by ID
export async function getCourseById(id: string): Promise<Course | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching course:', error)
    return null
  }

  return data
}

// Get user's enrolled courses
export async function getUserEnrollments(): Promise<CourseWithEnrollment[]> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      courses (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching user enrollments:', error)
    throw error
  }

  return data?.map(item => ({
    ...item.courses,
    enrollment: {
      id: item.id,
      user_id: item.user_id,
      course_id: item.course_id,
      status: item.status,
      payment_id: item.payment_id,
      created_at: item.created_at,
      updated_at: item.updated_at
    }
  })) || []
}

// Check if user is enrolled in a course
export async function isUserEnrolled(courseId: string): Promise<boolean> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return false
  }

  const { data, error } = await supabase
    .from('enrollments')
    .select('id')
    .eq('student_id', user.id)
    .eq('course_id', courseId)
    .eq('is_active', true)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking enrollment:', error)
  }

  return !!data
}

// Enroll user in a course
export async function enrollInCourse(courseId: string): Promise<Enrollment> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  // Check if already enrolled
  const isEnrolled = await isUserEnrolled(courseId)
  if (isEnrolled) {
    throw new Error('Already enrolled in this course')
  }

  // Get course details
  const course = await getCourseById(courseId)
  if (!course) {
    throw new Error('Course not found')
  }

  // For free courses, enroll immediately
  if (course.is_free) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        student_id: user.id,
        course_id: courseId,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      console.error('Error enrolling in free course:', error)
      throw error
    }

    return data
  } else {
    // For paid courses, create pending enrollment
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        student_id: user.id,
        course_id: courseId,
        is_active: false
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating pending enrollment:', error)
      throw error
    }

    return data
  }
}

// Cancel enrollment
export async function cancelEnrollment(courseId: string): Promise<void> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { error } = await supabase
    .from('enrollments')
    .update({ status: 'cancelled' })
    .eq('user_id', user.id)
    .eq('course_id', courseId)

  if (error) {
    console.error('Error cancelling enrollment:', error)
    throw error
  }
}

// Update enrollment status (for payment webhooks)
export async function updateEnrollmentStatus(
  enrollmentId: string, 
  status: 'pending' | 'active' | 'cancelled',
  paymentId?: string
): Promise<void> {
  const supabase = createClient()
  
  const updateData: { status: 'pending' | 'active' | 'cancelled'; payment_id?: string } = { status }
  if (paymentId) {
    updateData.payment_id = paymentId
  }

  const { error } = await supabase
    .from('enrollments')
    .update(updateData)
    .eq('id', enrollmentId)

  if (error) {
    console.error('Error updating enrollment status:', error)
    throw error
  }
}

// Get enrollment by payment ID (for webhooks)
export async function getEnrollmentByPaymentId(paymentId: string): Promise<Enrollment | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('enrollments')
    .select('*')
    .eq('payment_id', paymentId)
    .single()

  if (error) {
    console.error('Error fetching enrollment by payment ID:', error)
    return null
  }

  return data
}

// Create course (admin only)
export async function createCourse(courseData: Omit<Course, 'id' | 'created_at' | 'updated_at'>): Promise<Course> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    throw new Error('Insufficient permissions')
  }

  const { data, error } = await supabase
    .from('courses')
    .insert(courseData)
    .select()
    .single()

  if (error) {
    console.error('Error creating course:', error)
    throw error
  }

  return data
}

// Update course (admin only)
export async function updateCourse(
  courseId: string, 
  courseData: Partial<Omit<Course, 'id' | 'created_at' | 'updated_at'>>
): Promise<Course> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    throw new Error('Insufficient permissions')
  }

  const { data, error } = await supabase
    .from('courses')
    .update(courseData)
    .eq('id', courseId)
    .select()
    .single()

  if (error) {
    console.error('Error updating course:', error)
    throw error
  }

  return data
}

// Delete course (admin only)
export async function deleteCourse(courseId: string): Promise<void> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    throw new Error('Insufficient permissions')
  }

  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', courseId)

  if (error) {
    console.error('Error deleting course:', error)
    throw error
  }
}

// Get lessons for a course
export async function getLessonsByCourseId(courseId: string): Promise<Lesson[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('lesson_order', { ascending: true })

  if (error) {
    console.error('Error fetching lessons:', error)
    throw error
  }

  return data || []
}

// Get lesson with resources
export async function getLessonWithResources(lessonId: string): Promise<LessonWithResources | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('lessons')
    .select(`
      *,
      resources (*)
    `)
    .eq('id', lessonId)
    .single()

  if (error) {
    console.error('Error fetching lesson with resources:', error)
    return null
  }

  return data
}

// Get course by slug
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching course by slug:', error)
    return null
  }

  return data
}
