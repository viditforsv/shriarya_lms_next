import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createSupabaseApiClient } from "@/lib/supabase/api-client";

// GET /api/courses/hierarchy-stats - Get 5-tier hierarchy statistics for all courses
export async function GET() {
  try {
    const supabase = await createClient();

    // Check if user is authenticated and is admin
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user profile to check role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Use service role key to bypass RLS
    const supabaseAdmin = createSupabaseApiClient();

    // Fetch all courses
    const { data: courses, error: coursesError } = await supabaseAdmin
      .from("courses")
      .select("id, title, slug, created_at")
      .order("created_at", { ascending: false });

    if (coursesError) {
      return NextResponse.json(
        { error: "Failed to fetch courses" },
        { status: 500 }
      );
    }

    const courseIds = (courses || []).map((c) => c.id);

    // Fetch all units for all courses
    const { data: allUnits } = await supabaseAdmin
      .from("courses_units")
      .select("id, course_id")
      .in("course_id", courseIds);

    // Fetch all chapters for all units
    const unitIds = allUnits?.map((u) => u.id) || [];
    const { data: allChapters } = unitIds.length
      ? await supabaseAdmin
          .from("courses_chapters")
          .select("id, unit_id")
          .in("unit_id", unitIds)
      : { data: null };

    // Fetch all topics for all chapters
    const chapterIds = allChapters?.map((c) => c.id) || [];
    const { data: allTopics } = chapterIds.length
      ? await supabaseAdmin
          .from("courses_topics")
          .select("id, chapter_id")
          .in("chapter_id", chapterIds)
      : { data: null };

    // Fetch all lessons for all courses
    const { data: allLessons } = await supabaseAdmin
      .from("courses_lessons")
      .select("id, course_id")
      .in("course_id", courseIds);

    // Fetch all lesson tags
    const lessonIds = allLessons?.map((l) => l.id) || [];
    const { data: allLessonTags } = lessonIds.length
      ? await supabaseAdmin
          .from("lesson_tags")
          .select("lesson_id, tag_name")
          .in("lesson_id", lessonIds)
      : { data: null };

    // Group data by course
    const unitsByCourse = new Map<string, number>();
    const chaptersByCourse = new Map<string, number>();
    const topicsByCourse = new Map<string, number>();
    const lessonsByCourse = new Map<string, number>();
    const tagsByCourse = new Map<string, Set<string>>();

    // Count units per course
    allUnits?.forEach((unit) => {
      unitsByCourse.set(
        unit.course_id,
        (unitsByCourse.get(unit.course_id) || 0) + 1
      );
    });

    // Count chapters per course (via units)
    allChapters?.forEach((chapter) => {
      const unit = allUnits?.find((u) => u.id === chapter.unit_id);
      if (unit) {
        chaptersByCourse.set(
          unit.course_id,
          (chaptersByCourse.get(unit.course_id) || 0) + 1
        );
      }
    });

    // Count topics per course (via chapters -> units)
    allTopics?.forEach((topic) => {
      const chapter = allChapters?.find((c) => c.id === topic.chapter_id);
      if (chapter) {
        const unit = allUnits?.find((u) => u.id === chapter.unit_id);
        if (unit) {
          topicsByCourse.set(
            unit.course_id,
            (topicsByCourse.get(unit.course_id) || 0) + 1
          );
        }
      }
    });

    // Count lessons per course
    allLessons?.forEach((lesson) => {
      lessonsByCourse.set(
        lesson.course_id,
        (lessonsByCourse.get(lesson.course_id) || 0) + 1
      );
    });

    // Count unique tags per course
    allLessonTags?.forEach((tag) => {
      const lesson = allLessons?.find((l) => l.id === tag.lesson_id);
      if (lesson) {
        if (!tagsByCourse.has(lesson.course_id)) {
          tagsByCourse.set(lesson.course_id, new Set());
        }
        tagsByCourse.get(lesson.course_id)?.add(tag.tag_name);
      }
    });

    // Build final response
    const coursesWithStats = (courses || []).map((course) => ({
      id: course.id,
      title: course.title,
      slug: course.slug,
      created_at: course.created_at,
      hierarchy: {
        units: unitsByCourse.get(course.id) || 0,
        chapters: chaptersByCourse.get(course.id) || 0,
        topics: topicsByCourse.get(course.id) || 0,
        lessons: lessonsByCourse.get(course.id) || 0,
        tags: tagsByCourse.get(course.id)?.size || 0,
      },
    }));

    return NextResponse.json({ courses: coursesWithStats });
  } catch (error) {
    console.error("Error fetching course hierarchy stats:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch statistics",
      },
      { status: 500 }
    );
  }
}
