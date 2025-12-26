import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is teacher or admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "teacher" && profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    const courseId = searchParams.get("courseId");

    if (!studentId || !courseId) {
      return NextResponse.json(
        { error: "Missing studentId or courseId" },
        { status: 400 }
      );
    }

    // Verify teacher is assigned to this student
    const { data: enrollment } = await supabase
      .from("courses_enrollments")
      .select("assigned_teacher_id")
      .eq("student_id", studentId)
      .eq("course_id", courseId)
      .eq("enrollment_type", "student")
      .single();

    if (!enrollment || enrollment.assigned_teacher_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Verify teacher has access to the course (enrolled as teacher)
    const { data: teacherAccess } = await supabase
      .from("courses_enrollments")
      .select("id")
      .eq("student_id", user.id)
      .eq("course_id", courseId)
      .eq("enrollment_type", "teacher")
      .eq("is_active", true)
      .maybeSingle();

    if (!teacherAccess) {
      return NextResponse.json(
        { error: "Teacher does not have access to this course" },
        { status: 403 }
      );
    }

    // Fetch student info for display (exclude sensitive data)
    const { data: studentData } = await supabase
      .from("profiles")
      .select("first_name, last_name, email")
      .eq("id", studentId)
      .single();

    // Fetch all submissions for this student and course
    const { data: submissions, error: submissionsError } = await supabase
      .from("assignment_submissions")
      .select("*")
      .eq("user_id", studentId)
      .eq("course_id", courseId)
      .order("submitted_at", { ascending: false });

    if (submissionsError) {
      console.error("Error fetching submissions:", submissionsError);
      return NextResponse.json(
        { error: "Failed to fetch submissions" },
        { status: 500 }
      );
    }

    interface Submission {
      file_path?: string | null;
      graded_file_path?: string | null;
      [key: string]: unknown;
    }

    // Generate signed URLs for each submission file
    const submissionsWithUrls = await Promise.all(
      (submissions || []).map(async (submission: Submission) => {
        let downloadUrl = null;
        let gradedDownloadUrl = null;

        if (submission.file_path) {
          const { data: urlData, error: urlError } = await supabase.storage
            .from("course-assignments")
            .createSignedUrl(submission.file_path, 3600);

          if (!urlError && urlData) {
            downloadUrl = urlData.signedUrl;
          } else {
            console.error("Error creating signed URL:", urlError);
          }
        }

        if (submission.graded_file_path) {
          const { data: gradedUrlData, error: gradedUrlError } =
            await supabase.storage
              .from("course-assignments")
              .createSignedUrl(submission.graded_file_path, 3600);

          if (!gradedUrlError && gradedUrlData) {
            gradedDownloadUrl = gradedUrlData.signedUrl;
          } else {
            console.error("Error creating graded signed URL:", gradedUrlError);
          }
        }

        return {
          ...submission,
          download_url: downloadUrl,
          graded_download_url: gradedDownloadUrl,
        };
      })
    );

    return NextResponse.json({
      submissions: submissionsWithUrls,
      student_info: studentData || null,
    });
  } catch (error) {
    console.error("Error in teacher submissions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
