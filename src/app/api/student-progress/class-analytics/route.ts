import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Get class-wide analytics (Admin only)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const courseId = searchParams.get("courseId");

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify admin access
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    // Get all students with their performance data
    let performanceQuery = supabase.from("student_performance_log").select(`
        student_id,
        is_correct,
        time_taken_seconds,
        difficulty_level,
        tags,
        created_at
      `);

    if (courseId) {
      performanceQuery = performanceQuery.eq("course_id", courseId);
    }

    const { data: allAttempts, error: attemptsError } = await performanceQuery;

    if (attemptsError) {
      console.error("Error fetching attempts:", attemptsError);
      return NextResponse.json(
        { error: "Failed to fetch class data" },
        { status: 500 }
      );
    }

    // Get tag mastery for all students
    let masteryQuery = supabase.from("student_tag_mastery").select("*");

    if (courseId) {
      masteryQuery = masteryQuery.eq("course_id", courseId);
    }

    const { data: allTagMastery, error: masteryError } = await masteryQuery;

    if (masteryError) {
      console.error("Error fetching tag mastery:", masteryError);
      return NextResponse.json(
        { error: "Failed to fetch tag mastery data" },
        { status: 500 }
      );
    }

    // Calculate class-wide metrics
    const uniqueStudents = new Set(allAttempts?.map((a) => a.student_id) || []);
    const totalStudents = uniqueStudents.size;
    const totalAttempts = allAttempts?.length || 0;
    const correctAttempts =
      allAttempts?.filter((a) => a.is_correct).length || 0;
    const classAccuracy =
      totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;
    const avgTime =
      allAttempts?.reduce((sum, a) => sum + a.time_taken_seconds, 0) /
        totalAttempts || 0;

    // Student performance ranking
    const studentStats = Array.from(uniqueStudents).map((studentId) => {
      const studentAttempts =
        allAttempts?.filter((a) => a.student_id === studentId) || [];
      const studentCorrect = studentAttempts.filter((a) => a.is_correct).length;
      const studentAccuracy =
        studentAttempts.length > 0
          ? (studentCorrect / studentAttempts.length) * 100
          : 0;
      const studentAvgTime =
        studentAttempts.reduce((sum, a) => sum + a.time_taken_seconds, 0) /
          studentAttempts.length || 0;

      const studentMastery =
        allTagMastery?.filter((m) => m.student_id === studentId) || [];
      const avgMasteryScore =
        studentMastery.length > 0
          ? studentMastery.reduce((sum, m) => sum + (m.mastery_score || 0), 0) /
            studentMastery.length
          : 0;

      return {
        studentId,
        totalAttempts: studentAttempts.length,
        accuracy: studentAccuracy,
        avgTimeSeconds: Math.round(studentAvgTime),
        avgMasteryScore: Math.round(avgMasteryScore),
        redTags: studentMastery.filter((m) => m.mastery_level === "red").length,
        yellowTags: studentMastery.filter((m) => m.mastery_level === "yellow")
          .length,
        greenTags: studentMastery.filter((m) => m.mastery_level === "green")
          .length,
      };
    });

    // Sort by mastery score
    studentStats.sort((a, b) => b.avgMasteryScore - a.avgMasteryScore);

    // Tag-level insights (across all students)
    const tagStats = new Map<
      string,
      {
        tagName: string;
        totalAttempts: number;
        correctAttempts: number;
        accuracy: number;
        avgTime: number;
        studentsAttempted: Set<string>;
        redCount: number;
        yellowCount: number;
        greenCount: number;
      }
    >();

    allAttempts?.forEach((attempt) => {
      attempt.tags?.forEach((tag: string) => {
        if (!tagStats.has(tag)) {
          tagStats.set(tag, {
            tagName: tag,
            totalAttempts: 0,
            correctAttempts: 0,
            accuracy: 0,
            avgTime: 0,
            studentsAttempted: new Set(),
            redCount: 0,
            yellowCount: 0,
            greenCount: 0,
          });
        }

        const stats = tagStats.get(tag)!;
        stats.totalAttempts++;
        if (attempt.is_correct) stats.correctAttempts++;
        stats.avgTime += attempt.time_taken_seconds;
        stats.studentsAttempted.add(attempt.student_id);
      });
    });

    // Calculate mastery level counts per tag
    allTagMastery?.forEach((mastery) => {
      if (tagStats.has(mastery.tag_name)) {
        const stats = tagStats.get(mastery.tag_name)!;
        if (mastery.mastery_level === "red") stats.redCount++;
        else if (mastery.mastery_level === "yellow") stats.yellowCount++;
        else if (mastery.mastery_level === "green") stats.greenCount++;
      }
    });

    // Convert to array and calculate final metrics
    const tagInsights = Array.from(tagStats.values()).map((stats) => ({
      tagName: stats.tagName,
      totalAttempts: stats.totalAttempts,
      accuracy:
        stats.totalAttempts > 0
          ? (stats.correctAttempts / stats.totalAttempts) * 100
          : 0,
      avgTimeSeconds: Math.round(stats.avgTime / stats.totalAttempts),
      studentsAttempted: stats.studentsAttempted.size,
      redCount: stats.redCount,
      yellowCount: stats.yellowCount,
      greenCount: stats.greenCount,
      difficultyLevel:
        stats.redCount > stats.greenCount
          ? "high"
          : stats.greenCount > stats.yellowCount
          ? "low"
          : "medium",
    }));

    // Sort by difficulty (most red -> most struggling)
    tagInsights.sort((a, b) => b.redCount - a.redCount);

    // Content effectiveness (which tags/questions are problematic)
    const strugglingTags = tagInsights
      .filter((t) => t.redCount > t.greenCount)
      .slice(0, 10);
    const masterTags = tagInsights
      .filter((t) => t.greenCount > t.redCount + t.yellowCount)
      .slice(0, 10);

    const classAnalytics = {
      overview: {
        totalStudents,
        totalAttempts,
        classAccuracy: Math.round(classAccuracy * 100) / 100,
        avgTimeSeconds: Math.round(avgTime),
      },
      studentRankings: studentStats.slice(0, 50), // Top 50 students
      tagInsights,
      strugglingTags,
      masterTags,
      masteryDistribution: {
        totalTags: tagInsights.length,
        redTags: tagInsights.filter(
          (t) => t.redCount > t.yellowCount + t.greenCount
        ).length,
        yellowTags: tagInsights.filter(
          (t) => t.yellowCount >= t.redCount && t.yellowCount >= t.greenCount
        ).length,
        greenTags: tagInsights.filter(
          (t) => t.greenCount > t.redCount + t.yellowCount
        ).length,
      },
    };

    return NextResponse.json({ classAnalytics });
  } catch (error) {
    console.error("Error in class-analytics GET API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
