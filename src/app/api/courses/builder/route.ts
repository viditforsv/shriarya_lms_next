import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { CourseTemplate, createCourseFromTemplate, generateCourseSlug, validateCourseStructure, ResourceTemplate } from '@/lib/course-templates'

interface LessonData {
  course_id: string
  title: string
  description: string
  lesson_order: number
  type: string
  duration: string
  is_preview: boolean
  slug: string
  objectives?: string[]
  resources?: ResourceTemplate[]
  created_at: string
  updated_at: string
}

export async function POST(request: Request) {
  try {
    // Create a direct Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 })
    }

    // Extract the token from the header
    const token = authHeader.replace('Bearer ', '')
    
    // Set the session manually
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication error' }, { status: 401 })
    }

    // Get user profile to check if they're an instructor/admin
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // For now, allow any authenticated user to create courses
    // You can uncomment the admin check later
    /*
    if (profileError || !['admin', 'instructor'].includes(profile?.role)) {
      return NextResponse.json({ error: 'Instructor access required' }, { status: 403 })
    }
    */

    // Parse request body
    const body = await request.json()
    const { templateId, customizations } = body

    if (!templateId) {
      return NextResponse.json({ error: 'Template ID is required' }, { status: 400 })
    }

    // Create course from template
    const courseTemplate = createCourseFromTemplate(templateId, customizations)
    
    // Validate course structure
    const validation = validateCourseStructure(courseTemplate)
    if (!validation.isValid) {
      return NextResponse.json({ 
        error: 'Invalid course structure', 
        details: validation.errors 
      }, { status: 400 })
    }

    // Generate unique slug
    const baseSlug = generateCourseSlug(courseTemplate.name)
    let courseSlug = baseSlug
    let counter = 1

    // Ensure slug is unique
    while (true) {
      const { data: existingCourse } = await supabase
        .from('courses')
        .select('id')
        .eq('slug', courseSlug)
        .single()

      if (!existingCourse) break
      
      courseSlug = `${baseSlug}-${counter}`
      counter++
    }

    // Prepare course data for database
    const courseData = {
      title: courseTemplate.name,
      description: courseTemplate.description,
      slug: courseSlug,
      curriculum: courseTemplate.curriculum,
      subject: courseTemplate.subject,
      grade: courseTemplate.grade,
      level: courseTemplate.level,
      is_free: courseTemplate.defaultSettings.isFree,
      price: courseTemplate.defaultSettings.price || 0,
      status: 'draft',
      instructor_id: user.id,
      estimated_duration: courseTemplate.estimatedDuration,
      lesson_count: courseTemplate.lessonCount,
      prerequisites: courseTemplate.prerequisites,
      learning_outcomes: courseTemplate.learningOutcomes,
      assessment_types: courseTemplate.assessmentTypes,
      resource_types: courseTemplate.resourceTypes,
      settings: courseTemplate.defaultSettings,
      structure: courseTemplate.structure,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Insert course into database
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert(courseData)
      .select()
      .single()

    if (courseError) {
      console.error('Error creating course:', courseError)
      return NextResponse.json({ 
        error: 'Failed to create course', 
        details: courseError.message 
      }, { status: 500 })
    }

    // Create lessons from template structure
    const lessonsToCreate: LessonData[] = []
    courseTemplate.structure.sections.forEach((section) => {
      section.lessons.forEach((lesson) => {
        lessonsToCreate.push({
          course_id: course.id,
          title: lesson.title,
          description: lesson.description,
          lesson_order: lesson.order,
          slug: generateCourseSlug(lesson.title),
          is_preview: lesson.isPreview,
          type: lesson.type,
          duration: lesson.duration,
          objectives: lesson.objectives,
          resources: lesson.resources,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      })
    })

    // Insert lessons
    if (lessonsToCreate.length > 0) {
      const { error: lessonsError } = await supabase
        .from('lessons')
        .insert(lessonsToCreate)

      if (lessonsError) {
        console.error('Error creating lessons:', lessonsError)
        // Don't fail the entire operation, just log the error
      }
    }

    // Create assessments from template
    const assessmentsToCreate = courseTemplate.structure.assessments.map((assessment) => ({
      course_id: course.id,
      title: assessment.title,
      description: assessment.description,
      type: assessment.type,
      weight: assessment.weight,
      duration: assessment.duration,
      questions: assessment.questions,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    if (assessmentsToCreate.length > 0) {
      const { error: assessmentsError } = await supabase
        .from('assessments')
        .insert(assessmentsToCreate)

      if (assessmentsError) {
        console.error('Error creating assessments:', assessmentsError)
        // Don't fail the entire operation, just log the error
      }
    }

    return NextResponse.json({ 
      course,
      message: 'Course created successfully from template',
      template: courseTemplate
    })

  } catch (error) {
    console.error('Course creation error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    // Create a direct Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 })
    }

    // Extract the token from the header
    const token = authHeader.replace('Bearer ', '')
    
    // Set the session manually
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication error' }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { courseId, courseData } = body

    if (!courseId || !courseData) {
      return NextResponse.json({ error: 'Course ID and data are required' }, { status: 400 })
    }

    // Check if user owns the course or is admin
    const { data: existingCourse, error: fetchError } = await supabase
      .from('courses')
      .select('instructor_id')
      .eq('id', courseId)
      .single()

    if (fetchError || !existingCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    if (existingCourse.instructor_id !== user.id) {
      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
      }
    }

    // Update course
    const { data: updatedCourse, error: updateError } = await supabase
      .from('courses')
      .update({
        ...courseData,
        updated_at: new Date().toISOString()
      })
      .eq('id', courseId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating course:', updateError)
      return NextResponse.json({ 
        error: 'Failed to update course', 
        details: updateError.message 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      course: updatedCourse,
      message: 'Course updated successfully'
    })

  } catch (error) {
    console.error('Course update error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    // Create a direct Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 })
    }

    // Extract the token from the header
    const token = authHeader.replace('Bearer ', '')
    
    // Set the session manually
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication error' }, { status: 401 })
    }

    // Get user's courses
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select(`
        *,
        lessons (*),
        assessments (*)
      `)
      .eq('instructor_id', user.id)
      .order('created_at', { ascending: false })

    if (coursesError) {
      console.error('Error fetching courses:', coursesError)
      return NextResponse.json({ 
        error: 'Failed to fetch courses', 
        details: coursesError.message 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      courses: courses || [],
      message: 'Courses fetched successfully'
    })

  } catch (error) {
    console.error('Course fetch error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
