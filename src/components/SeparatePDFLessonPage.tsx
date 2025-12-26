"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Badge } from "@/design-system/components/ui/badge";
import { Progress } from "@/design-system/components/ui/progress";
import {
  Alert,
  AlertDescription,
} from "@/design-system/components/ui/alert";
import {
  Download,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  Star,
  ArrowLeft,
  ArrowRight,
  Eye,
  BookOpen,
  Home,
  Menu,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { PDFAssignmentSidebar } from "@/components/PDFAssignmentSidebar";
import { createClient } from "@/lib/supabase/client";
import { useScreenshotPrevention } from "@/hooks/useScreenshotPrevention";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/design-system/components/sheet";

interface PDFAssignment {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  dueDate: string;
  maxMarks: number;
  instructions: string;
  isCompleted?: boolean;
  submittedAt?: string;
  submittedFile?: string;
}

interface SeparatePDFLessonPageProps {
  courseSlug: string;
  assignmentId: string;
  assignments: PDFAssignment[];
}

export function SeparatePDFLessonPage({
  courseSlug,
  assignmentId,
  assignments,
}: SeparatePDFLessonPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [currentAssignment, setCurrentAssignment] =
    useState<PDFAssignment | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Screenshot prevention for PDF viewer
  const pdfContainerRef = useScreenshotPrevention(showPDFViewer && !!currentAssignment?.pdfUrl);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [authChecked, setAuthChecked] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Authentication check - redirect if not logged in
  useEffect(() => {
    // Wait for auth context to initialize
    if (user === undefined) return;

    if (!user) {
      // User is not logged in, redirect to auth page
      const redirectUrl = encodeURIComponent(
        `/courses/${courseSlug}/pdf-assignment/${assignmentId}`
      );
      router.push(`/auth?redirect=${redirectUrl}`);
      return;
    }

    setAuthChecked(true);
  }, [user, router, courseSlug, assignmentId]);

  // Check enrollment status
  useEffect(() => {
    if (!authChecked || !user) return;

    const checkEnrollment = async () => {
      const supabase = createClient();

      // Get course ID from slug
      const { data: course } = await supabase
        .from("courses")
        .select("id")
        .eq("slug", courseSlug)
        .single();

      if (course) {
        const { data: enrollment } = await supabase
          .from("courses_enrollments")
          .select("*")
          .eq("student_id", user.id)
          .eq("course_id", course.id)
          .eq("is_active", true)
          .maybeSingle();

        setIsEnrolled(!!enrollment);
      }
    };

    checkEnrollment();
  }, [authChecked, user, courseSlug]);

  // Find current assignment
  useEffect(() => {
    if (!authChecked) return;

    const assignment = assignments.find((a) => a.id === assignmentId);
    if (assignment) {
      setCurrentAssignment(assignment);
      setCurrentIndex(assignments.findIndex((a) => a.id === assignmentId));
    }
  }, [assignmentId, assignments, authChecked]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setErrorMessage("");
    setSubmissionStatus("idle");

    // Validation
    if (file.type !== "application/pdf") {
      setErrorMessage("Please upload a PDF file only.");
      setSubmissionStatus("error");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File size must be less than 10MB.");
      setSubmissionStatus("error");
      return;
    }

    setUploadedFile(file);
    setIsUploading(true);
    setSubmissionStatus("uploading");
    setUploadProgress(0);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("assignmentId", assignmentId);
      formData.append("courseSlug", courseSlug);

      // Simulate upload progress (replace with actual API call)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to API
      const response = await fetch("/api/assignments/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      await response.json();

      setUploadProgress(100);
      setIsUploading(false);
      setIsCompleted(true);
      setSubmissionStatus("success");

      // TODO: Update assignment status in database
      // await updateAssignmentStatus(assignmentId, 'completed', file.name);
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMessage("Upload failed. Please try again.");
      setSubmissionStatus("error");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const downloadPDF = () => {
    if (!currentAssignment) return;
    const link = document.createElement("a");
    link.href = currentAssignment.pdfUrl;
    link.download = `${currentAssignment.title}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navigateToAssignment = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < assignments.length) {
      const targetAssignment = assignments[newIndex];
      window.location.href = `/courses/${courseSlug}/pdf-assignment/${targetAssignment.id}`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!currentAssignment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Assignment Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The requested assignment could not be found.
          </p>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Show loading while checking authentication
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild className="lg:hidden fixed top-4 left-4 z-50">
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <PDFAssignmentSidebar
            currentAssignmentId={assignmentId}
            courseSlug={courseSlug}
            assignments={assignments}
            courseTitle="CBSE Mathematics Class 9"
            overallProgress={Math.round(
              (assignments.filter((a) => a.isCompleted).length /
                assignments.length) *
                100
            )}
            isEnrolled={isEnrolled}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <PDFAssignmentSidebar
        currentAssignmentId={assignmentId}
        courseSlug={courseSlug}
        assignments={assignments}
        courseTitle="CBSE Mathematics Class 9"
        overallProgress={Math.round(
          (assignments.filter((a) => a.isCompleted).length /
            assignments.length) *
            100
        )}
        isEnrolled={isEnrolled}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    (window.location.href = `/courses/${courseSlug}`)
                  }
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Course
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">
                    {currentAssignment.title}
                  </h1>
                  <p className="text-muted-foreground">
                    PDF Assignment {currentIndex + 1} of {assignments.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="w-4 h-4" />
                </Button>
                <Badge variant={isCompleted ? "default" : "secondary"}>
                  {isCompleted ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </>
                  )}
                </Badge>
                <Badge variant="outline">
                  <Star className="w-3 h-3 mr-1" />
                  {currentAssignment.maxMarks} marks
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div
            className={`grid gap-8 ${
              sidebarOpen ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {/* Main Content */}
            <div className={`${sidebarOpen ? "lg:col-span-2" : ""} space-y-6`}>
              {/* Assignment Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Assignment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {currentAssignment.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Due Date:</span>
                      <p className="text-muted-foreground">
                        {formatDate(currentAssignment.dueDate)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Maximum Marks:</span>
                      <p className="text-muted-foreground">
                        {currentAssignment.maxMarks}
                      </p>
                    </div>
                  </div>

                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Instructions:</strong>{" "}
                      {currentAssignment.instructions}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* PDF Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Assignment PDF
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4">
                    <Button onClick={downloadPDF} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowPDFViewer(!showPDFViewer)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {showPDFViewer ? "Hide" : "View"} PDF
                    </Button>
                  </div>

                  {showPDFViewer && (
                    <div 
                      ref={pdfContainerRef}
                      className="border rounded-lg p-4"
                    >
                      <iframe
                        src={currentAssignment.pdfUrl}
                        width="100%"
                        height="600"
                        className="rounded"
                        title={currentAssignment.title}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Solution Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Your Solution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isCompleted ? (
                    <>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="solution-upload"
                          disabled={isUploading}
                        />
                        <label
                          htmlFor="solution-upload"
                          className="cursor-pointer"
                        >
                          <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-lg font-medium mb-2">
                            {isUploading
                              ? "Uploading..."
                              : "Click to upload your solution"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            PDF files only, max 10MB
                          </p>
                        </label>
                      </div>

                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Uploading...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="w-full" />
                        </div>
                      )}

                      {submissionStatus === "error" && errorMessage && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            <strong>Upload Error:</strong> {errorMessage}
                          </AlertDescription>
                        </Alert>
                      )}
                    </>
                  ) : (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Solution uploaded successfully!</strong> Your
                        assignment has been submitted.
                        {uploadedFile && (
                          <div className="mt-2 text-sm">
                            <p>File: {uploadedFile.name}</p>
                            <p>
                              Size:{" "}
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Navigation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => navigateToAssignment("prev")}
                      disabled={currentIndex === 0}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => navigateToAssignment("next")}
                      disabled={currentIndex === assignments.length - 1}
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
