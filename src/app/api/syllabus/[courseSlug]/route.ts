import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/syllabus/[courseSlug] - Get syllabus structure for a course
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseSlug: string }> }
) {
  try {
    const { courseSlug } = await params;
    const supabase = await createClient();
    
    // Get course data
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('slug', courseSlug)
      .single();
    
    if (courseError) {
      return NextResponse.json({ error: courseError.message }, { status: 500 });
    }
    
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    
    // Get lessons for this course
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', course.id)
      .order('lesson_order');
    
    if (lessonsError) {
      return NextResponse.json({ error: lessonsError.message }, { status: 500 });
    }
    
    // Extract syllabus structure from template_data
    const templateData = course.template_data || {};
    const units = templateData.units || [];
    const chapters = templateData.chapters || [];
    const syllabusLessons = templateData.lessons || [];
    
    // Get user progress if authenticated
    let userProgress = null;
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Get user's lesson progress
      const { data: progress } = await supabase
        .from('user_progress')
        .select('lesson_id, completed_at')
        .eq('user_id', user.id);
      
      userProgress = progress || [];
    }
    
    // Calculate progress statistics
    const completedLessons = userProgress?.length || 0;
    const totalLessons = lessons?.length || 0;
    
    return NextResponse.json({
      course: {
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        curriculum: course.curriculum,
        subject: course.subject,
        grade: course.grade,
        level: course.level
      },
      syllabus: {
        units,
        chapters,
        lessons: syllabusLessons
      },
      progress: {
        completedLessons,
        totalLessons,
        percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
      },
      userProgress: userProgress || []
    });
    
  } catch (error) {
    console.error('Error fetching syllabus:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/syllabus/[courseSlug] - Update syllabus structure
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ courseSlug: string }> }
) {
  try {
    const { courseSlug } = await params;
    const body = await request.json();
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    // Check if user is admin or course instructor
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (profile?.role !== 'admin') {
      // Check if user is the course instructor
      const { data: course } = await supabase
        .from('courses')
        .select('instructor_id')
        .eq('slug', courseSlug)
        .single();
      
      if (course?.instructor_id !== user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }
    }
    
    // Update course template_data with new syllabus structure
    const { error: updateError } = await supabase
      .from('courses')
      .update({
        template_data: body.templateData
      })
      .eq('slug', courseSlug);
    
    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error updating syllabus:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
