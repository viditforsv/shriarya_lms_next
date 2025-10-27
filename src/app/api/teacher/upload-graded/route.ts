import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
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

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const submissionId = formData.get("submissionId") as string;
    const marksObtained = formData.get("marksObtained") as string;
    const maxMarks = formData.get("maxMarks") as string;
    const comments = formData.get("comments") as string;

    if (!file || !submissionId) {
      return NextResponse.json(
        { error: "Missing file or submissionId" },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Get the submission
    const { data: submission, error: submissionError } = await supabase
      .from("assignment_submissions")
      .select("*, courses:courses(id)")
      .eq("id", submissionId)
      .single();

    if (submissionError || !submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    const course = Array.isArray(submission.courses)
      ? submission.courses[0]
      : submission.courses;

    // Verify teacher is assigned to this student
    const { data: enrollment } = await supabase
      .from("courses_enrollments")
      .select("assigned_teacher_id")
      .eq("student_id", submission.user_id)
      .eq("course_id", submission.course_id)
      .eq("enrollment_type", "student")
      .single();

    if (!enrollment || enrollment.assigned_teacher_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Verify teacher has access to the course
    const { data: teacherAccess } = await supabase
      .from("courses_enrollments")
      .select("id")
      .eq("student_id", user.id)
      .eq("course_id", submission.course_id)
      .eq("enrollment_type", "teacher")
      .eq("is_active", true)
      .maybeSingle();

    if (!teacherAccess) {
      return NextResponse.json(
        { error: "Teacher does not have access to this course" },
        { status: 403 }
      );
    }

    // Get student name for filename
    const { data: studentProfile } = await supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("id", submission.user_id)
      .single();

    const studentName = studentProfile
      ? `${studentProfile.first_name}_${studentProfile.last_name}`
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9_]/g, "")
      : "student";

    // Create unique filename for graded PDF with student name
    const timestamp = Date.now();
    const safeAssignmentId = submission.assignment_id.substring(0, 20); // Limit length
    const fileName = `${safeAssignmentId}_${studentName}_${timestamp}_graded.pdf`;
    const filePath = `assignments/${course.slug}/graded/${fileName}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("course-assignments")
      .upload(filePath, file, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("course-assignments")
      .getPublicUrl(filePath);

    // Update submission with graded information
    const { error: updateError } = await supabase
      .from("assignment_submissions")
      .update({
        graded_file_path: filePath,
        graded_file_url: urlData.publicUrl,
        marks_obtained: marksObtained ? parseFloat(marksObtained) : null,
        max_marks: maxMarks ? parseFloat(maxMarks) : null,
        graded_at: new Date().toISOString(),
        graded_by: user.id,
        teacher_comments: comments || null,
        grading_status: "graded",
        status: "graded",
      })
      .eq("id", submissionId);

    if (updateError) {
      console.error("Update error:", updateError);
      // Try to clean up uploaded file
      await supabase.storage.from("course-assignments").remove([filePath]);
      return NextResponse.json(
        { error: "Failed to update submission" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Graded PDF uploaded successfully",
    });
  } catch (error) {
    console.error("Error in upload-graded:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
