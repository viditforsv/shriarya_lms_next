"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { Badge } from "@/design-system/components/ui/badge";
import {
  FileText,
  Download,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface GradedSubmission {
  id: string;
  assignment_id: string;
  file_name: string;
  submitted_at: string;
  graded_at: string;
  marks_obtained: number;
  max_marks: number;
  teacher_comments: string;
  graded_download_url?: string;
}

export default function GradedAssignmentsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { user } = useAuth();
  const [resolvedParams, setResolvedParams] = useState<{
    courseId: string;
  } | null>(null);
  interface Course {
    id: string;
    title: string;
    slug: string;
  }

  const [submissions, setSubmissions] = useState<GradedSubmission[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const supabase = createClient();

      // Load course details
      const { data: courseData } = await supabase
        .from("courses")
        .select("id, title, slug")
        .eq("id", resolvedParams?.courseId)
        .single();

      if (courseData) {
        setCourse(courseData);
      }

      // Load graded submissions
      const response = await fetch(
        `/api/student/graded-submissions?courseId=${resolvedParams?.courseId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch graded submissions");
      }

      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [resolvedParams?.courseId]);

  useEffect(() => {
    if (resolvedParams && user) {
      loadData();
    }
  }, [resolvedParams, user, loadData]);

  const handleDownload = async (submission: GradedSubmission) => {
    if (submission.graded_download_url) {
      window.open(submission.graded_download_url, "_blank");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            Please log in to view your graded assignments.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading graded assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "My Courses", href: "/courses/enrolled" },
              { label: "Graded Assignments", isActive: true },
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Graded Assignments
          </h1>
          {course && <p className="text-muted-foreground">{course.title}</p>}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-red-800">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Graded Submissions */}
        {submissions.length === 0 ? (
          <Card className="p-12 text-center rounded-sm">
            <div className="max-w-md mx-auto">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No graded assignments yet
              </h3>
              <p className="text-muted-foreground">
                Your graded assignments will appear here once they are reviewed
                by your teacher.
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card
                key={submission.id}
                className="rounded-sm "
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {submission.file_name}
                        </CardTitle>
                        <CardDescription>
                          Submitted on{" "}
                          {new Date(
                            submission.submitted_at
                          ).toLocaleDateString()}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-600 rounded-sm">Graded</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Marks */}
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Marks Obtained
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {submission.marks_obtained} / {submission.max_marks}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Graded On
                        </p>
                        <p className="text-sm font-medium">
                          {new Date(submission.graded_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Teacher Comments */}
                    {submission.teacher_comments && (
                      <div className="p-4 bg-primary/10 border-l-4 border-[#e27447] rounded-sm">
                        <p className="text-sm font-medium mb-2">
                          Teacher Comments:
                        </p>
                        <p className="text-sm">{submission.teacher_comments}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t">
                      <Button
                        variant="primary"
                        onClick={() => handleDownload(submission)}
                        className="bg-[#e27447] hover:bg-[#d1653a] rounded-sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Graded PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
