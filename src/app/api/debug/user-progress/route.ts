import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const courseId = searchParams.get("course_id");

    const supabase = await createClient();

    // Check if user_progress table exists and has any data
    const { data: allData, error: allError } = await supabase
      .from("user_progress")
      .select("*")
      .limit(10);

    console.log("All user_progress data:", allData);
    console.log("All user_progress error:", allError);

    // Check specific user data if provided
    let userData = null;
    let userError = null;
    if (userId) {
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .limit(10);
      
      userData = data;
      userError = error;
      console.log("User-specific data:", userData);
      console.log("User-specific error:", userError);
    }

    // Check course-specific data if provided
    let courseData = null;
    let courseError = null;
    if (courseId) {
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("course_id", courseId)
        .limit(10);
      
      courseData = data;
      courseError = error;
      console.log("Course-specific data:", courseData);
      console.log("Course-specific error:", courseError);
    }

    return NextResponse.json({
      allData,
      allError,
      userData,
      userError,
      courseData,
      courseError,
      message: "Debug data retrieved"
    });

  } catch (error) {
    console.error("Debug API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch debug data" },
      { status: 500 }
    );
  }
}
