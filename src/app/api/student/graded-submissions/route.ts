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

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    // Fetch graded submissions for this student and course
    const { data: submissions, error: submissionsError } = await supabase
      .from("assignment_submissions")
      .select(
        `
        *,
        profiles:profiles(id, first_name, last_name)
      `
      )
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .eq("grading_status", "graded")
      .order("graded_at", { ascending: false });

    if (submissionsError) {
      console.error("Error fetching submissions:", submissionsError);
      return NextResponse.json(
        { error: "Failed to fetch graded submissions" },
        { status: 500 }
      );
    }

    interface SubmissionWithProfile {
      graded_file_path?: string | null;
      profiles?: { id: string; first_name: string; last_name: string } | { id: string; first_name: string; last_name: string }[] | null;
      [key: string]: unknown;
    }

    // Generate signed URLs for graded PDFs
    const submissionsWithUrls = await Promise.all(
      (submissions || []).map(async (submission: SubmissionWithProfile) => {
        let gradedDownloadUrl = null;

        if (submission.graded_file_path) {
          const { data: gradedUrlData } = await supabase.storage
            .from("course-assignments")
            .createSignedUrl(submission.graded_file_path, 3600);

          gradedDownloadUrl = gradedUrlData?.signedUrl || null;
        }

        return {
          ...submission,
          graded_download_url: gradedDownloadUrl,
          teacher: Array.isArray(submission.profiles)
            ? submission.profiles[0]
            : submission.profiles,
        };
      })
    );

    return NextResponse.json({
      submissions: submissionsWithUrls,
    });
  } catch (error) {
    console.error("Error in student graded submissions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
