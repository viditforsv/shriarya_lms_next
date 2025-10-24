import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Get tag mastery data for a student
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const studentId = searchParams.get("studentId");
    const courseId = searchParams.get("courseId");
    const tagName = searchParams.get("tagName");
    const masteryLevel = searchParams.get("masteryLevel"); // red, yellow, green

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin or requesting own data
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const targetUserId =
      profile?.role === "admin" && studentId ? studentId : user.id;

    // Build query
    let query = supabase
      .from("student_tag_mastery")
      .select("*")
      .eq("student_id", targetUserId)
      .order("mastery_score", { ascending: false });

    if (courseId) {
      query = query.eq("course_id", courseId);
    }
    if (tagName) {
      query = query.eq("tag_name", tagName);
    }
    if (masteryLevel) {
      query = query.eq("mastery_level", masteryLevel);
    }

    const { data: tagMastery, error } = await query;

    if (error) {
      console.error("Error fetching tag mastery:", error);
      return NextResponse.json(
        { error: "Failed to fetch tag mastery" },
        { status: 500 }
      );
    }

    return NextResponse.json({ tagMastery });
  } catch (error) {
    console.error("Error in tag-mastery GET API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
