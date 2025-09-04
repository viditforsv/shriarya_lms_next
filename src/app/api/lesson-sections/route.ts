import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// GET: Fetch lesson sections
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lessonId = searchParams.get('lessonId')
    
    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID required' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: sections, error } = await supabase
      .from('lesson_sections')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('section_order')

    if (error) throw error

    return NextResponse.json({ 
      success: true, 
      sections: sections || [] 
    })

  } catch (error) {
    console.error('Error fetching lesson sections:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch lesson sections' 
    }, { status: 500 })
  }
}

// POST: Create new lesson section
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { lessonId, sectionType, content, sectionOrder } = body

    if (!lessonId || !sectionType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify user has permission to edit this lesson
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('course_id')
      .eq('id', lessonId)
      .single()

    if (lessonError) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('instructor_id')
      .eq('id', lesson.course_id)
      .single()

    if (courseError || course.instructor_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Get the next section order if not provided
    let order = sectionOrder
    if (!order) {
      const { data: lastSection } = await supabase
        .from('lesson_sections')
        .select('section_order')
        .eq('lesson_id', lessonId)
        .order('section_order', { ascending: false })
        .limit(1)
        .single()

      order = lastSection ? lastSection.section_order + 1 : 1
    }

    const { data: section, error: insertError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lessonId,
        section_type: sectionType,
        content: content || getDefaultContent(sectionType),
        section_order: order
      })
      .select()
      .single()

    if (insertError) throw insertError

    return NextResponse.json({ 
      success: true, 
      section 
    })

  } catch (error) {
    console.error('Error creating lesson section:', error)
    return NextResponse.json({ 
      error: 'Failed to create lesson section' 
    }, { status: 500 })
  }
}

// PUT: Update lesson section
export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { sectionId, content, sectionOrder } = body

    if (!sectionId) {
      return NextResponse.json({ error: 'Section ID required' }, { status: 400 })
    }

    // Verify user has permission to edit this section
    const { data: section, error: sectionError } = await supabase
      .from('lesson_sections')
      .select(`
        *,
        lessons!inner(course_id),
        courses!inner(instructor_id)
      `)
      .eq('id', sectionId)
      .single()

    if (sectionError) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 })
    }

    if (section.courses.instructor_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const updateData: any = {}
    if (content !== undefined) updateData.content = content
    if (sectionOrder !== undefined) updateData.section_order = sectionOrder
    updateData.updated_at = new Date().toISOString()

    const { data: updatedSection, error: updateError } = await supabase
      .from('lesson_sections')
      .update(updateData)
      .eq('id', sectionId)
      .select()
      .single()

    if (updateError) throw updateError

    return NextResponse.json({ 
      success: true, 
      section: updatedSection 
    })

  } catch (error) {
    console.error('Error updating lesson section:', error)
    return NextResponse.json({ 
      error: 'Failed to update lesson section' 
    }, { status: 500 })
  }
}

// DELETE: Delete lesson section
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const sectionId = searchParams.get('sectionId')

    if (!sectionId) {
      return NextResponse.json({ error: 'Section ID required' }, { status: 400 })
    }

    // Verify user has permission to delete this section
    const { data: section, error: sectionError } = await supabase
      .from('lesson_sections')
      .select(`
        *,
        lessons!inner(course_id),
        courses!inner(instructor_id)
      `)
      .eq('id', sectionId)
      .single()

    if (sectionError) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 })
    }

    if (section.courses.instructor_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { error: deleteError } = await supabase
      .from('lesson_sections')
      .delete()
      .eq('id', sectionId)

    if (deleteError) throw deleteError

    return NextResponse.json({ 
      success: true, 
      message: 'Section deleted successfully' 
    })

  } catch (error) {
    console.error('Error deleting lesson section:', error)
    return NextResponse.json({ 
      error: 'Failed to delete lesson section' 
    }, { status: 500 })
  }
}

function getDefaultContent(sectionType: string): any {
  switch (sectionType) {
    case 'text':
      return {
        html: '<p>Enter your lesson content here...</p>',
        text: 'Enter your lesson content here...'
      }
    case 'video':
      return {
        url: '',
        title: '',
        description: '',
        duration: 0
      }
    case 'quiz':
      return {
        title: 'Quiz',
        questions: [],
        timeLimit: 0,
        passingScore: 70
      }
    case 'practice':
      return {
        title: 'Practice Exercise',
        instructions: '',
        problems: []
      }
    case 'download':
      return {
        url: '',
        title: '',
        description: '',
        fileType: ''
      }
    default:
      return {}
  }
}
