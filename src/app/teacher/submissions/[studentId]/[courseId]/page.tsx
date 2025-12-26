"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/design-system/components/ui/button";
import { Card, CardContent } from "@/design-system/components/ui/card";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { Badge } from "@/design-system/components/ui/badge";
import {} from "@/design-system/components/dialog";
import { FileText, Download, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { UploadGradedModal } from "@/components/teacher/UploadGradedModal";

interface Submission {
  id: string;
  assignment_id: string;
  file_name: string;
  file_url: string;
  submitted_at: string;
  grading_status: string;
  marks_obtained?: number;
  max_marks?: number;
  teacher_comments?: string;
  graded_file_url?: string;
  download_url?: string;
  graded_download_url?: string;
}

interface StudentInfo {
  first_name: string;
  last_name: string;
  email: string;
}

export default function StudentSubmissionsPage({
  params,
}: {
  params: Promise<{ studentId: string; courseId: string }>;
}) {
  const { user, profile } = useAuth();
  const [resolvedParams, setResolvedParams] = useState<{
    studentId: string;
    courseId: string;
  } | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const loadSubmissions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `/api/teacher/submissions?studentId=${resolvedParams?.studentId}&courseId=${resolvedParams?.courseId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch submissions");
      }

      const data = await response.json();
      setSubmissions(data.submissions || []);

      // Fetch student info for display
      if (data.student_info) {
        setStudentInfo(data.student_info);
      }
    } catch (err) {
      console.error("Error loading submissions:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load submissions"
      );
    } finally {
      setIsLoading(false);
    }
  }, [resolvedParams?.studentId, resolvedParams?.courseId]);

  useEffect(() => {
    if (resolvedParams && user) {
      loadSubmissions();
    }
  }, [resolvedParams, user, loadSubmissions]);

  // Sanitize filename for display (remove UUIDs and timestamps)
  const sanitizeFileName = (fileName: string) => {
    // Remove UUIDs and timestamps, keep meaningful parts
    return fileName
      .replace(
        /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi,
        ""
      )
      .replace(/\d{13}/g, "") // Remove timestamps
      .replace(/[_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const handleDownload = async (submission: Submission) => {
    if (submission.download_url) {
      window.open(submission.download_url, "_blank");
    }
  };

  const handleUploadClick = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsUploadDialogOpen(true);
  };

  const handleUploadSuccess = () => {
    setIsUploadDialogOpen(false);
    loadSubmissions(); // Refresh submissions
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return <Badge className="bg-green-600 rounded-sm">Graded</Badge>;
      case "returned":
        return <Badge className="bg-blue-600 rounded-sm">Returned</Badge>;
      default:
        return (
          <Badge variant="secondary" className="rounded-sm">
            Pending
          </Badge>
        );
    }
  };

  if (!user || (profile?.role !== "teacher" && profile?.role !== "admin")) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You need teacher or admin privileges to access this page.
          </p>
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
              { label: "Teacher Dashboard", href: "/teacher/dashboard" },
              { label: "Submissions", isActive: true },
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/teacher/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {studentInfo
                ? `${studentInfo.first_name} ${studentInfo.last_name}'s`
                : "Student"}{" "}
              Submissions
            </h1>
            <p className="text-muted-foreground">
              Review and grade assignment submissions
              {studentInfo && ` - ${studentInfo.email}`}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
                  <p className="text-muted-foreground">
                    Loading submissions...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Alert */}
        {error && !isLoading && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-red-800">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Submissions Table */}
        {!isLoading && submissions.length === 0 && (
          <Card className="p-12 text-center rounded-sm">
            <div className="max-w-md mx-auto">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No submissions found
              </h3>
              <p className="text-muted-foreground">
                This student hasn&apos;t submitted any assignments yet.
              </p>
            </div>
          </Card>
        )}

        {!isLoading && submissions.length > 0 && (
          <Card className="rounded-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Assignment
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Submitted
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Marks
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span
                            className="text-sm"
                            title={submission.file_name}
                          >
                            {sanitizeFileName(submission.file_name)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-muted-foreground">
                          {new Date(
                            submission.submitted_at
                          ).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(submission.grading_status)}
                      </td>
                      <td className="px-4 py-3">
                        {submission.marks_obtained !== null &&
                        submission.max_marks !== null ? (
                          <span className="text-sm font-medium">
                            {submission.marks_obtained}/{submission.max_marks}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(submission)}
                            className="rounded-sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          {submission.grading_status === "pending" && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleUploadClick(submission)}
                              className="rounded-sm"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Graded
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Upload Graded Modal */}
        {selectedSubmission && (
          <UploadGradedModal
            submission={selectedSubmission}
            isOpen={isUploadDialogOpen}
            onClose={() => setIsUploadDialogOpen(false)}
            onSuccess={handleUploadSuccess}
          />
        )}
      </div>
    </div>
  );
}
