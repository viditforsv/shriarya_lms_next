"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design-system/components/tabs";
import {
  BookOpen,
  Play,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Clock,
  Lock,
  Unlock,
  Bookmark,
  MessageCircle,
  Eye,
  Upload,
  Loader2,
} from "lucide-react";
import { VideoResource } from "@/design-system/components/youtube-video";
import { CollapsibleSidebar } from "@/design-system/components/layout-components/collapsible-sidebar";
import { LessonPageSkeleton } from "@/components/skeletons";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { IBDPMathLessonPage } from "@/components/IBDPMathTemplate";
import { UnifiedLessonPage } from "@/components/UnifiedLessonPage";
import { renderMixedContent } from "@/components/MathRenderer";
import { QuizPlayer } from "@/components/QuizPlayer";
import { useScreenshotPrevention } from "@/hooks/useScreenshotPrevention";

// Function to load questions for a lesson (client-side)
function useQuestionsForLesson(lessonId: string) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch(`/api/lessons/${lessonId}/questions`);
        if (response.ok) {
          const data = await response.json();
          setQuestions(data.questions || []);
        }
      } catch (error) {
        console.error("Error loading questions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      loadQuestions();
    }
  }, [lessonId]);

  return { questions, loading };
}

interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  price: number;
  created_at: string;
  template_data?: Record<string, unknown>;
  template_id?: string;
  status?: string;
  profiles?: {
    first_name: string;
    last_name: string;
  };
}

interface Lesson {
  id: string;
  title: string;
  slug: string;
  content?: string;
  lesson_order: number;
  is_preview: boolean;
  created_at: string;
  course_id: string;
  video_url?: string;
  video_thumbnail_url?: string;
  topic_badge?: string;
  topic_number?: string;
  pdf_url?: string;
  solution_url?: string;
  quiz_id?: string;
  chapter_id?: string;
  concept_title?: string;
  concept_content?: string;
  formula_title?: string;
  formula_content?: string;
  chapter?: {
    id: string;
    chapter_name: string;
    chapter_order: number;
    unit?: {
      id: string;
      unit_name: string;
      unit_order: number;
    };
  };
}

export default function DynamicLessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "video" | "notes" | "quiz" | "assignment" | "solution" | "keypoints"
  >("video");
  const [resolvedParams, setResolvedParams] = useState<{
    slug: string;
    lessonSlug: string;
  } | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<
    Record<string, string>
  >({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(
    new Set()
  );
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [submissionError, setSubmissionError] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Load questions for the lesson
  const { questions } = useQuestionsForLesson(
    lesson?.id || ""
  );

  // Screenshot prevention for PDF viewer
  const pdfContainerRef = useScreenshotPrevention(!!lesson?.pdf_url && activeTab === "assignment");

  // Resolve params
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  // Authentication check - redirect if not logged in
  useEffect(() => {
    // Wait for auth context to initialize and finish loading
    if (loading) return;

    if (!user) {
      // User is not logged in, redirect to auth page
      const redirectUrl = encodeURIComponent(
        `/courses/${resolvedParams?.slug}/lesson/${resolvedParams?.lessonSlug}`
      );
      router.push(`/auth?redirect=${redirectUrl}`);
      return;
    }

    setAuthChecked(true);
  }, [user, loading, router, resolvedParams]);

  useEffect(() => {
    if (!resolvedParams || !authChecked) return;

    const loadLesson = async () => {
      try {
        console.log("Starting to load lesson with params:", resolvedParams);
        setIsLoading(true);
        setError(null);

        const supabase = createClient();

        // 1. Get course by slug
        const { data: courseData, error: courseError } = await supabase
          .from("courses")
          .select("*")
          .eq("slug", resolvedParams.slug)
          .single();

        if (courseError || !courseData) {
          throw new Error("Course not found");
        }

        const course: Course = {
          id: courseData.id,
          title: courseData.title,
          description: courseData.description,
          slug: courseData.slug,
          price: courseData.price || 0,
          created_at: courseData.created_at,
          template_data: courseData.template_data || {},
          template_id: courseData.template_id,
          status: courseData.status,
          profiles: {
            first_name: "System",
            last_name: "Admin",
          },
        };
        setCourse(course);

        // 2. Check enrollment status
        let enrollmentStatus = false;
        if (user) {
          const { data: enrollmentData } = await supabase
            .from("courses_enrollments")
            .select("*")
            .eq("student_id", user.id)
            .eq("course_id", course.id)
            .eq("is_active", true)
            .maybeSingle();

          enrollmentStatus = !!enrollmentData;
          setIsEnrolled(enrollmentStatus);
        } else {
          setIsEnrolled(false);
        }

        // 3. Check if course is draft (upcoming) - prevent lesson access unless enrolled
        if (courseData.status === "draft" && profile?.role !== "admin") {
          if (!enrollmentStatus) {
            throw new Error("This course is upcoming. Please enroll to access lessons when the course is published.");
          }
        }

        // 3. Set default tab based on template
        const isPDFTemplate =
          course.template_id === "addffa2b-d88c-484e-9637-1f7fbe42e29c";
        if (isPDFTemplate) {
          setActiveTab("assignment");
        }

        // 4. Fetch all lessons with unit/chapter structure
        const { data: rawLessonsData, error: lessonsError } = await supabase
          .from("courses_lessons")
          .select(
            `
            id,
            title,
            slug,
            lesson_order,
            is_preview,
            video_thumbnail_url,
            topic_number,
            topic_badge,
            chapter_id,
            chapter:courses_chapters(
              id,
              chapter_name,
              chapter_order,
              unit:courses_units(
                id,
                unit_name,
                unit_order
              )
            )
          `
          )
          .eq("course_id", course.id)
          .order("lesson_order");
        
        // Type assertion for lessonsData - Supabase returns a more specific type
        let lessonsData: Lesson[] | null = rawLessonsData as unknown as Lesson[] | null;

        // Fallback: If nested query doesn't return chapter data, fetch separately
        if (!lessonsError && lessonsData && lessonsData.length > 0) {
          const lessonsWithChapterIds = lessonsData.filter((l) => l.chapter_id);
          const chapterIds = [
            ...new Set(
              lessonsWithChapterIds.map((l) => l.chapter_id).filter(Boolean)
            ),
          ];

          // Check if chapter data is missing and we have chapter_ids
          const needsManualJoin =
            chapterIds.length > 0 &&
            (!lessonsData[0]?.chapter || lessonsData[0]?.chapter === null);

          if (needsManualJoin) {
            console.log(
              "⚠️ Nested query didn't return chapter data, fetching separately...",
              { chapterIds }
            );

            // Fetch chapters separately with their units
            const { data: chaptersData } = await supabase
              .from("courses_chapters")
              .select(
                `
                id,
                chapter_name,
                chapter_order,
                unit_id,
                unit:courses_units(
                  id,
                  unit_name,
                  unit_order
                )
              `
              )
              .in("id", chapterIds);

            // Manually attach chapter data to lessons
            if (chaptersData) {
              const chaptersMap = new Map(
                chaptersData.map((c) => {
                  // Normalize unit data (Supabase might return it as array or single object)
                  const unitData = Array.isArray(c.unit) ? c.unit[0] : c.unit;
                  return [
                    c.id,
                    {
                      id: c.id,
                      chapter_name: c.chapter_name,
                      chapter_order: c.chapter_order,
                      unit: unitData
                        ? {
                            id: unitData.id,
                            unit_name: unitData.unit_name,
                            unit_order: unitData.unit_order,
                          }
                        : undefined,
                    },
                  ];
                })
              );
              lessonsData = lessonsData.map((lesson) => ({
                ...lesson,
                chapter: lesson.chapter_id
                  ? chaptersMap.get(lesson.chapter_id) || null
                  : null,
              })) as unknown as Lesson[];
              console.log("✅ Manually joined chapter/unit data to lessons", {
                chaptersMapSize: chaptersMap.size,
              });
            }
          }
        }

        if (lessonsError) {
          console.error("❌ Error fetching lessons:", lessonsError);
        } else {
          const lessonsArray = (lessonsData as unknown as Lesson[]) || [];
          console.log("📚 Fetched lessons for sidebar:", {
            count: lessonsArray.length,
            sampleLesson: lessonsArray[0]
              ? {
                  title: lessonsArray[0].title,
                  chapter_id: lessonsArray[0].chapter_id,
                  chapter: lessonsArray[0].chapter,
                  hasChapter: !!lessonsArray[0].chapter,
                  hasUnit: !!lessonsArray[0].chapter?.unit,
                }
              : "No lessons",
          });
          setAllLessons(lessonsArray);
        }

        // 5. Fetch current lesson content
        const { data: lessonData, error: lessonError } = await supabase
          .from("courses_lessons")
          .select(
            `
            id,
            title,
            slug,
            lesson_order,
            is_preview,
            content,
            topic_badge,
            video_url,
            video_thumbnail_url,
            pdf_url,
            solution_url,
            quiz_id,
            topic_number,
            topic_id,
            concept_title,
            concept_content,
            formula_title,
            formula_content,
            chapter_id,
            course_id,
            chapter:courses_chapters(
              id,
              chapter_name,
              chapter_order,
              unit:courses_units(
                id,
                unit_name,
                unit_order
              )
            )
          `
          )
          .eq("slug", resolvedParams.lessonSlug)
          .eq("course_id", course.id)
          .single();

        if (lessonError || !lessonData) {
          throw new Error("Lesson not found");
        }

        setLesson(lessonData as unknown as Lesson);
        console.log("Lesson loaded:", lessonData.title);
        console.log("Lesson content:", lessonData.content);
        console.log("Lesson topic_badge:", lessonData.topic_badge);

        // 6. Check if lesson is already completed and fetch all completed lessons
        if (user) {
          // Check current lesson completion status
          const { data: progressData } = await supabase
            .from("user_progress")
            .select("is_completed")
            .eq("user_id", user.id)
            .eq("lesson_id", lessonData.id)
            .maybeSingle();

          if (progressData?.is_completed) {
            setIsCompleted(true);
          }

          // Fetch all completed lessons for this course
          const { data: completedLessonsData } = await supabase
            .from("user_progress")
            .select("lesson_id")
            .eq("user_id", user.id)
            .eq("course_id", course.id)
            .eq("is_completed", true);

          if (completedLessonsData) {
            const completedIds = new Set(
              completedLessonsData.map((p) => p.lesson_id)
            );
            setCompletedLessonIds(completedIds);
          }
        }
      } catch (err) {
        console.error("Error loading lesson:", err);
        setError(err instanceof Error ? err.message : "Lesson not found");
      } finally {
        setIsLoading(false);
      }
    };

    loadLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams?.slug, resolvedParams?.lessonSlug, user?.id, authChecked]);

  const hasAccess = () => {
    // Admin has access to everything
    if (profile?.role === "admin") {
      return true;
    }

    // If course is draft (upcoming), only enrolled users can access
    if (course?.status === "draft") {
      return isEnrolled;
    }

    const isFree = course?.price === 0;
    return lesson?.is_preview || isEnrolled || isFree;
  };

  const getNextLesson = () => {
    if (!lesson || !allLessons.length) return;

    const currentIndex = allLessons.findIndex((l) => l.slug === lesson.slug);
    const nextLesson = allLessons[currentIndex + 1];

    if (nextLesson) {
      window.location.href = `/courses/${resolvedParams?.slug}/lesson/${nextLesson.slug}`;
    }
  };

  const getPreviousLesson = () => {
    if (!lesson || !allLessons.length) return;

    const currentIndex = allLessons.findIndex((l) => l.slug === lesson.slug);
    const prevLesson = allLessons[currentIndex - 1];

    if (prevLesson) {
      window.location.href = `/courses/${resolvedParams?.slug}/lesson/${prevLesson.slug}`;
    }
  };

  const handleMarkComplete = async () => {
    if (!user || !lesson || !course) return;

    setIsMarkingComplete(true);
    const newCompletionStatus = !isCompleted;

    try {
      const supabase = createClient();

      // Check if progress record exists
      const { data: existingProgress } = await supabase
        .from("user_progress")
        .select("id")
        .eq("user_id", user.id)
        .eq("lesson_id", lesson.id)
        .maybeSingle();

      let progressError;

      if (existingProgress) {
        // Update existing record - toggle completion status
        const updateData: Record<string, unknown> = {
          completion_percentage: newCompletionStatus ? 100 : 0,
          is_completed: newCompletionStatus,
          last_accessed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        if (newCompletionStatus) {
          updateData.completed_at = new Date().toISOString();
        } else {
          updateData.completed_at = null;
        }

        const { error } = await supabase
          .from("user_progress")
          .update(updateData)
          .eq("id", existingProgress.id);
        progressError = error;
      } else {
        // Insert new record only if marking as complete
        if (newCompletionStatus) {
          const { error } = await supabase.from("user_progress").insert({
            user_id: user.id,
            course_id: course.id,
            lesson_id: lesson.id,
            lesson_slug: lesson.slug,
            lesson_order: lesson.lesson_order,
            completion_percentage: 100,
            is_completed: true,
            completed_at: new Date().toISOString(),
            last_accessed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
          progressError = error;
        }
      }

      if (progressError) {
        console.error("Error toggling lesson completion:", progressError);
        showNotification(
          "Error",
          `Failed to ${
            newCompletionStatus ? "mark" : "unmark"
          } lesson. Please try again.`,
          "error"
        );
        return;
      }

      setIsCompleted(newCompletionStatus);

      // Update completed lessons set
      if (newCompletionStatus) {
        setCompletedLessonIds((prev) => new Set(prev).add(lesson.id));
        showNotification(
          "Lesson Completed! 🎉",
          `Great job completing "${lesson.title}"! Keep up the good work.`,
          "success"
        );
      } else {
        setCompletedLessonIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(lesson.id);
          return newSet;
        });
        showNotification(
          "Lesson Unmarked",
          `"${lesson.title}" has been marked as incomplete.`,
          "success"
        );
      }
    } catch (error) {
      console.error("Error in handleMarkComplete:", error);
      showNotification(
        "Error",
        "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setIsMarkingComplete(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !lesson || !course || !user) return;

    // Reset states
    setSubmissionError("");
    setSubmissionStatus("idle");

    // Validation
    if (file.type !== "application/pdf") {
      setSubmissionError("Please upload a PDF file only.");
      setSubmissionStatus("error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSubmissionError("File size must be less than 5MB.");
      setSubmissionStatus("error");
      return;
    }

    setUploadedFile(file);
    setSubmissionStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("assignmentId", lesson.id);
      formData.append("courseSlug", course.slug);

      const response = await fetch("/api/assignments/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      await response.json();
      setSubmissionStatus("success");
      setUploadedFile(null);

      showNotification(
        "Assignment Submitted! ✅",
        "Your assignment has been submitted successfully. Your teacher will review it soon.",
        "success"
      );
    } catch (error) {
      console.error("Upload error:", error);
      setSubmissionStatus("error");
      setSubmissionError(
        error instanceof Error ? error.message : "Upload failed"
      );
    }
  };

  const showNotification = (
    title: string,
    message: string,
    type: "success" | "error"
  ) => {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 z-50 max-w-md w-full bg-white border-2 ${
      type === "success" ? "border-green-500" : "border-red-500"
    } rounded-sm shadow-lg p-4 animate-slide-in`;

    notification.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          ${
            type === "success"
              ? '<svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
              : '<svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
          }
        </div>
        <div class="flex-1">
          <h3 class="text-sm font-semibold text-gray-900">${title}</h3>
          <p class="text-sm text-gray-600 mt-1">${message}</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="flex-shrink-0 text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  };

  // Track tab changes as progress
  const handleTabChange = (value: string) => {
    setActiveTab(
      value as
        | "video"
        | "notes"
        | "keypoints"
        | "quiz"
        | "assignment"
        | "solution"
    );
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    alert(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks");
  };

  const handlePracticeAnswerChange = (questionId: string, answer: string) => {
    setPracticeAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitPractice = () => {
    const answeredQuestions = Object.keys(practiceAnswers).length;
    alert(`📝 Submitted ${answeredQuestions} practice answers!`);
  };

  // Removed unused calculateProgress function

  // Mock practice questions
  const practiceQuestions = [
    {
      id: "1",
      question: "What is the main topic covered in this lesson?",
      type: "multiple_choice",
      options: ["Algebra", "Geometry", "Trigonometry", "Statistics"],
      correct: 0,
    },
    {
      id: "2",
      question: "Explain the key concept you learned in this lesson.",
      type: "text",
      placeholder: "Type your explanation here...",
    },
    {
      id: "3",
      question: "What was the most challenging part of this lesson?",
      type: "text",
      placeholder: "Describe the challenging aspects...",
    },
  ];

  // Show loading while checking authentication
  if (!authChecked || isLoading) {
    return <LessonPageSkeleton />;
  }

  if (error || !lesson || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "The lesson you are looking for does not exist."}
          </p>
          <div className="space-y-3">
            <Link href={`/courses/${resolvedParams?.slug}`}>
              <Button className="rounded-sm">Back to Course</Button>
            </Link>
            <div className="text-sm text-muted-foreground">
              <p>If you believe this is an error, please check:</p>
              <ul className="text-left mt-2 space-y-1">
                <li>• The lesson URL is correct</li>
                <li>• The course exists and is published</li>
                <li>• You have access to this course</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasAccess()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 mb-4">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-3">Lesson Locked 🔒</h1>
            <p className="text-muted-foreground text-lg mb-2">
              This lesson is part of the premium course content.
            </p>
            <p className="text-sm text-muted-foreground">
              Enroll in{" "}
              <span className="font-semibold text-foreground">
                {course.title}
              </span>{" "}
              to access this and all other lessons.
            </p>
          </div>

          {/* Course Info Card */}
          <div className="bg-white border-2 border-gray-200 rounded-sm p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Full course access with all lessons
                </p>
              </div>
              {course.price && course.price > 0 && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    ₹{course.price.toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            {/* Benefits */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                <span>365 days access to all course content</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                <span>Downloadable resources and assignments</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                <span>Certificate of completion</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href={`/courses/${resolvedParams?.slug}`} className="block">
                <Button className="w-full bg-primary hover:bg-[#d1653a] rounded-sm text-base py-6">
                  {course.price && course.price > 0
                    ? "Enroll Now"
                    : "Enroll for Free"}
                </Button>
              </Link>
              <Link href={`/courses/${resolvedParams?.slug}`} className="block">
                <Button variant="outline" className="w-full rounded-sm">
                  View Course Details
                </Button>
              </Link>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center">
            <Link
              href={`/courses/${resolvedParams?.slug}`}
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Check if this is an IBDP Mathematics course - use specialized template
  const isIBDPMathCourse = resolvedParams?.slug?.includes("ibdp-mathematics");

  // Use unified template as default for all courses (except IBDP which has specialized template)
  const useUnifiedTemplate = !isIBDPMathCourse;

  if (useUnifiedTemplate && lesson && course) {
    // Use unified lesson page - Default template for all courses
    return (
      <div className="min-h-screen bg-background">
        {/* Header - Matching CBSE Class 9 */}
        <div className="bg-gradient-to-br from-white to-gray-50 border-b border-primary py-4 md:py-6 relative">
          <div className="px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-4">
                <Link
                  href={`/courses/${resolvedParams?.slug}`}
                  className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm md:text-base"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Back to Course</span>
                  <span className="sm:hidden">Back</span>
                </Link>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBookmarkToggle}
                  className="rounded-sm flex-1 sm:flex-none"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      isBookmarked ? "fill-current mr-2" : "sm:mr-2"
                    }`}
                  />
                  <span className="hidden sm:inline">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-0 py-4 md:py-8">
          {/* Course Breadcrumb - Matching CBSE Class 9 */}
          <div className="mb-4 md:mb-6 px-4 md:px-6">
            <nav className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground overflow-x-auto pb-2">
              <Link href="/courses/discover" className="hover:text-foreground whitespace-nowrap">
                Courses
              </Link>
              <span>/</span>
              <Link
                href={`/courses/${resolvedParams?.slug}`}
                className="hover:text-foreground whitespace-nowrap truncate max-w-[150px] md:max-w-none"
              >
                {course.title}
              </Link>
              <span>/</span>
              <span className="text-foreground whitespace-nowrap truncate max-w-[150px] md:max-w-none">{lesson.title}</span>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Left Sidebar - Using CollapsibleSidebar like CBSE Class 9 */}
            <CollapsibleSidebar
              currentLessonSlug={lesson.slug}
              courseSlug={resolvedParams?.slug || ""}
              lessons={allLessons}
              isEnrolled={isEnrolled}
              completedLessonIds={completedLessonIds}
              courseId={course?.id}
            />

            {/* Main Content - Matching CBSE Class 9 layout */}
            <div className="flex-1 px-4 md:px-6">
              <UnifiedLessonPage
                lesson={{
                  id: lesson.id,
                  title: lesson.title,
                  slug: lesson.slug,
                  topic_number: lesson.topic_number,
                  lesson_order: lesson.lesson_order,
                  is_preview: lesson.is_preview,
                  video_url: lesson.video_url,
                  video_thumbnail_url: lesson.video_thumbnail_url,
                  topic_badge: lesson.topic_badge,
                  pdf_url: lesson.pdf_url,
                  solution_url: lesson.solution_url,
                  quiz_id: lesson.quiz_id,
                  content: lesson.content,
                  concept_title: lesson.concept_title,
                  concept_content: lesson.concept_content,
                  formula_title: lesson.formula_title,
                  formula_content: lesson.formula_content,
                  chapter: lesson.chapter,
                }}
                courseSlug={resolvedParams?.slug || ""}
                showTopicNumber={true}
                onMarkComplete={handleMarkComplete}
                onFileUpload={handleFileUpload}
                isCompleted={isCompleted}
                isMarkingComplete={isMarkingComplete}
                uploadedFile={uploadedFile}
                submissionStatus={submissionStatus}
                submissionError={submissionError}
                allLessons={allLessons.map((l) => ({
                  id: l.id,
                  title: l.title,
                  slug: l.slug,
                  lesson_order: l.lesson_order,
                }))}
                onNavigateLesson={(direction) => {
                  if (direction === "next") {
                    getNextLesson();
                  } else {
                    getPreviousLesson();
                  }
                }}
                isAdmin={profile?.role === "admin"}
                onLessonUpdate={(updatedLesson) => {
                  // Update local state if needed
                  if (updatedLesson) {
                    setLesson((prev) =>
                      prev ? { ...prev, ...updatedLesson } : null
                    );
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isIBDPMathCourse && lesson && course) {
    // Transform lessons data to IBDP template format
    interface IBDPUnit {
      id: string;
      unit_name: string;
      unit_order: number;
      chapters: IBDPChapter[];
    }

    interface IBDPChapter {
      id: string;
      chapter_name: string;
      chapter_order: number;
      unit_id: string;
      lessons: IBDPLesson[];
    }

    interface IBDPLesson {
      id: string;
      title: string;
      slug: string;
      lesson_order: number;
      chapter_id: string;
    }

    const units = allLessons.reduce((acc: IBDPUnit[], l) => {
      if (!l.chapter?.unit) return acc;

      const unitId = l.chapter.unit.id;
      let unit = acc.find((u: IBDPUnit) => u.id === unitId);

      if (!unit) {
        unit = {
          id: unitId,
          unit_name: l.chapter.unit.unit_name,
          unit_order: l.chapter.unit.unit_order,
          chapters: [],
        };
        acc.push(unit);
      }

      const chapterId = l.chapter.id;
      let chapter = unit.chapters.find((c: IBDPChapter) => c.id === chapterId);

      if (!chapter) {
        chapter = {
          id: chapterId,
          chapter_name: l.chapter.chapter_name,
          chapter_order: l.chapter.chapter_order,
          unit_id: unitId,
          lessons: [],
        };
        unit.chapters.push(chapter);
      }

      chapter.lessons.push({
        id: l.id,
        title: l.title,
        slug: l.slug,
        lesson_order: l.lesson_order,
        chapter_id: chapterId,
      });

      return acc;
    }, []);

    // Sort units and chapters
    units.sort((a: IBDPUnit, b: IBDPUnit) => a.unit_order - b.unit_order);
    units.forEach((unit: IBDPUnit) => {
      unit.chapters.sort(
        (a: IBDPChapter, b: IBDPChapter) => a.chapter_order - b.chapter_order
      );
      unit.chapters.forEach((chapter: IBDPChapter) => {
        chapter.lessons.sort(
          (a: IBDPLesson, b: IBDPLesson) => a.lesson_order - b.lesson_order
        );
      });
    });

    // Define course-specific links based on course slug
    const getCourseLinks = (slug: string) => {
      switch (slug) {
        case "ibdp-mathematics-aa-hl":
          return {
            subjectGuide:
              "https://shrividhyaclasses.b-cdn.net/misc_files/ibdp/aahl/Mathematics%20-%20Analysis%20and%20Approaches%20Subject%20Guide.pdf",
            formulaBooklet:
              "https://shrividhyaclasses.b-cdn.net/misc_files/ibdp/aahl/Math%20AA%20HL%20formula%20booklet.pdf",
          };
        case "ibdp-mathematics-aa-sl":
          return {
            subjectGuide:
              "https://shrividhyaclasses.b-cdn.net/misc_files/ibdp/aasl/Mathematics%20-%20Analysis%20and%20Approaches%20Subject%20Guide.pdf",
            formulaBooklet:
              "https://shrividhyaclasses.b-cdn.net/misc_files/ibdp/aasl/Math%20AA%20SL%20formula%20booklet.pdf",
          };
        case "ibdp-mathematics-ai-hl":
          return {
            subjectGuide:
              "https://shrividhyaclasses.b-cdn.net/misc_files/ibdp/aihl/Mathematics%20-%20Applications%20and%20Interpretation%20Subject%20Guide.pdf",
            formulaBooklet:
              "https://shrividhyaclasses.b-cdn.net/misc_files/ibdp/aihl/Math%20AI%20HL%20formula%20booklet.pdf",
          };
        case "ibdp-mathematics-ai-sl":
          return {
            subjectGuide:
              "https://shrividhyaclasses.b-cdn.net/misc_files/ibdp/aisl/Mathematics%20-%20Applications%20and%20Interpretation%20Subject%20Guide.pdf",
            formulaBooklet:
              "https://shrividhyaclasses.b-cdn.net/misc_files/ibdp/aisl/Math%20AI%20SL%20formula%20booklet.pdf",
          };
        default:
          return {};
      }
    };

    return (
      <IBDPMathLessonPage
        courseSlug={resolvedParams?.slug || ""}
        currentLessonSlug={resolvedParams?.lessonSlug || ""}
        units={units}
        currentLesson={{
          id: lesson.id,
          title: lesson.title,
          slug: lesson.slug,
          lesson_order: lesson.lesson_order,
          chapter_id: lesson.chapter_id || "",
        }}
        questions={questions}
        unitName={lesson.chapter?.unit?.unit_name || "Unit"}
        chapterName={lesson.chapter?.chapter_name || "Chapter"}
        courseLinks={getCourseLinks(resolvedParams?.slug || "")}
        onProgressUpdate={(lessonId, progress) => {
          console.log(`Lesson ${lessonId} progress: ${progress}%`);
          // TODO: Save progress to database
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-white to-gray-50 border-b border-primary py-4 md:py-6 relative">
        <div className="px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-4">
              <Link
                href={`/courses/${resolvedParams?.slug}`}
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm md:text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Back to Course</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmarkToggle}
                className="rounded-sm flex-1 sm:flex-none"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    isBookmarked ? "fill-current mr-2" : "sm:mr-2"
                  }`}
                />
                <span className="hidden sm:inline">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-0 py-4 md:py-8">
        {/* Course Breadcrumb */}
        <div className="mb-4 md:mb-6 px-4 md:px-6">
          <nav className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground overflow-x-auto pb-2">
            <Link href="/courses/discover" className="hover:text-foreground whitespace-nowrap">
              Courses
            </Link>
            <span>/</span>
            <Link
              href={`/courses/${resolvedParams?.slug}`}
              className="hover:text-foreground whitespace-nowrap truncate max-w-[150px] md:max-w-none"
            >
              {course.title}
            </Link>
            <span>/</span>
            <span className="text-foreground whitespace-nowrap truncate max-w-[150px] md:max-w-none">{lesson.title}</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Sidebar - Course Navigation */}
          <CollapsibleSidebar
            currentLessonSlug={lesson.slug}
            courseSlug={resolvedParams?.slug || ""}
            lessons={allLessons}
            isEnrolled={isEnrolled}
            completedLessonIds={completedLessonIds}
            courseId={course?.id}
          />

          {/* Main Content */}
          <div className="flex-1 px-4 md:px-6">
            {/* Lesson Header */}
            <div className="bg-white rounded-sm border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
              <div className="flex flex-col md:flex-row items-start justify-between mb-4 gap-3">
                <div className="w-full md:w-auto">
                  <Badge className="bg-primary text-white mb-2 rounded-sm text-xs md:text-sm">
                    Lesson {lesson.lesson_order}
                  </Badge>
                  <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
                    {lesson.title}
                  </h1>
                </div>
                <div className="flex items-center space-x-3 md:space-x-4 w-full md:w-auto justify-between md:justify-start">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm md:text-base text-muted-foreground">
                      30 min
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {lesson.is_preview ? (
                      <>
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span className="text-sm md:text-base text-blue-600">Preview</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 text-green-600" />
                        <span className="text-sm md:text-base text-green-600">
                          Unlocked
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              {course?.template_id ===
              "addffa2b-d88c-484e-9637-1f7fbe42e29c" ? (
                // PDF template - Assignment and Solution tabs
                <TabsList className="grid w-full grid-cols-2 rounded-sm bg-gray-100 p-1 shadow-sm border border-gray-200">
                  <TabsTrigger
                    value="assignment"
                    className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-200 data-[state=inactive]:text-gray-600"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Assignment
                  </TabsTrigger>
                  <TabsTrigger
                    value="solution"
                    className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-200 data-[state=inactive]:text-gray-600"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Solution
                  </TabsTrigger>
                </TabsList>
              ) : (
                // Default template - Multiple tabs
                <TabsList className="grid w-full grid-cols-3 rounded-sm bg-gray-100 p-1 shadow-sm border border-gray-200">
                  <TabsTrigger
                    value="video"
                    className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-200 data-[state=inactive]:text-gray-600 text-xs md:text-sm"
                  >
                    <Play className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">Video</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-200 data-[state=inactive]:text-gray-600 text-xs md:text-sm"
                  >
                    <FileText className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">Notes</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="quiz"
                    className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-200 data-[state=inactive]:text-gray-600 text-xs md:text-sm"
                  >
                    <BookOpen className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">Quiz</span>
                  </TabsTrigger>
                </TabsList>
              )}

              {/* Video Tab */}
              <TabsContent value="video" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Play className="w-5 h-5 text-primary" />
                      <span>Video Lesson</span>
                    </CardTitle>
                    <CardDescription>
                      Watch the complete lesson video with explanations and
                      examples
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Main Video */}
                    {lesson.video_url ? (
                      <div className="mb-6">
                        <VideoResource
                          resource={{
                            id: lesson.id,
                            type: "video",
                            url: lesson.video_url,
                            title: lesson.title,
                            description: "",
                            duration: 0, // Will be updated when available
                            isYouTube:
                              lesson.video_url.includes("youtube.com") ||
                              lesson.video_url.includes("youtu.be"),
                          }}
                          className="mb-4"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm flex items-center justify-center relative overflow-hidden">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary/90 transition-colors cursor-pointer">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {lesson.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            Video content will be available soon
                          </p>
                          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>30 min</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <FileText className="w-4 h-4" />
                              <span>HD Quality</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Video Controls */}
                    <div className="mt-4 flex items-center justify-end">
                      <Button
                        className={`rounded-sm ${
                          isCompleted
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-primary hover:bg-primary/90"
                        }`}
                        onClick={handleMarkComplete}
                        disabled={isMarkingComplete}
                      >
                        {isMarkingComplete ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : isCompleted ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Incomplete
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Complete
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <span>Lesson Notes</span>
                    </CardTitle>
                    <CardDescription>
                      Comprehensive notes and key concepts from this lesson
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    {/* Lesson Content */}
                    {lesson.content ? (
                      <div className="prose prose-sm max-w-none leading-relaxed">
                        {renderMixedContent(lesson.content)}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Lesson notes will be available soon</p>
                      </div>
                    )}

                    {/* Additional Resources */}
                    {lesson.pdf_url && (
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          Additional Resources
                        </h3>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="w-full justify-start rounded-sm"
                            onClick={() =>
                              window.open(lesson.pdf_url, "_blank")
                            }
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Lesson Notes (PDF)
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Quiz Tab */}
              <TabsContent value="quiz" className="mt-6">
                {lesson.quiz_id ? (
                  <QuizPlayer quizId={lesson.quiz_id} />
                ) : (
                  <Card className="rounded-sm">
                    <CardContent className="p-8">
                      <div className="text-center py-8 text-muted-foreground">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No quiz available for this lesson yet</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Practice Tab */}
              <TabsContent value="practice" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span>Practice Exercises</span>
                    </CardTitle>
                    <CardDescription>
                      Test your understanding with these practice questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {practiceQuestions.map((question, index) => (
                      <div
                        key={question.id}
                        className="border border-gray-200 rounded-sm p-4"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-primary text-white rounded-sm flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-3">
                              {question.question}
                            </h4>

                            {question.type === "multiple_choice" ? (
                              <div className="space-y-2">
                                {question.options?.map(
                                  (option, optionIndex) => (
                                    <label
                                      key={optionIndex}
                                      className="flex items-center space-x-2 cursor-pointer"
                                    >
                                      <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        className="text-primary focus:ring-primary"
                                        onChange={() =>
                                          handlePracticeAnswerChange(
                                            question.id,
                                            option
                                          )
                                        }
                                      />
                                      <span className="text-muted-foreground">
                                        {option}
                                      </span>
                                    </label>
                                  )
                                )}
                              </div>
                            ) : (
                              <textarea
                                placeholder={question.placeholder}
                                className="w-full p-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                                rows={4}
                                onChange={(e) =>
                                  handlePracticeAnswerChange(
                                    question.id,
                                    e.target.value
                                  )
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <Button variant="outline" className="rounded-sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Ask a Question
                      </Button>
                      <Button
                        className="bg-primary hover:bg-primary/90 rounded-sm"
                        onClick={handleSubmitPractice}
                      >
                        Submit Answers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Assignment Tab - For PDF-based courses */}
              <TabsContent value="assignment" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <span>Assignment</span>
                    </CardTitle>
                    <CardDescription>
                      Complete this assignment to test your understanding
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {lesson.pdf_url ? (
                      <div className="space-y-4">
                        {/* Assignment PDF Embedder - Try direct embedding first */}
                        <div 
                          ref={pdfContainerRef}
                          className="w-full h-[500px] md:h-[800px] border-2 border-gray-200 rounded-sm overflow-hidden bg-gray-50"
                        >
                          <iframe
                            src={lesson.pdf_url}
                            className="w-full h-full"
                            title={`${lesson.title} - Assignment`}
                            allow="autoplay; fullscreen"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                          />
                        </div>

                        {/* Upload Section */}
                        <div className="border-t pt-4 mt-4">
                          <h3 className="text-lg font-semibold mb-3">
                            Submit Your Work
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label
                                htmlFor="assignment-file"
                                className="block text-sm font-medium mb-2"
                              >
                                Upload your completed assignment (PDF only, max
                                5MB)
                              </label>
                              <div className="flex items-center gap-3">
                                <input
                                  id="assignment-file"
                                  type="file"
                                  accept=".pdf"
                                  onChange={handleFileUpload}
                                  className="hidden"
                                />
                                <label
                                  htmlFor="assignment-file"
                                  className="flex items-center gap-2 px-4 py-2 border rounded-sm cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                  <Upload className="w-4 h-4" />
                                  Choose PDF File
                                </label>
                                {uploadedFile && (
                                  <span className="text-sm text-muted-foreground">
                                    Selected: {uploadedFile.name}
                                  </span>
                                )}
                              </div>
                              {submissionError && (
                                <p className="text-sm text-red-600 mt-2">
                                  {submissionError}
                                </p>
                              )}
                              {submissionStatus === "success" && (
                                <p className="text-sm text-green-600 mt-2">
                                  Assignment submitted successfully! Your
                                  teacher will review it.
                                </p>
                              )}
                              {submissionStatus === "uploading" && (
                                <p className="text-sm text-blue-600 mt-2">
                                  Uploading...
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Assignment Actions */}
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            className="rounded-sm"
                            onClick={() =>
                              window.open(lesson.pdf_url, "_blank")
                            }
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Open in New Tab
                          </Button>
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              className="rounded-sm"
                              onClick={() => handleTabChange("solution")}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              View Solution
                            </Button>
                            <Button
                              className={`rounded-sm ${
                                isCompleted
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-primary hover:bg-primary/90"
                              }`}
                              onClick={handleMarkComplete}
                              disabled={isMarkingComplete}
                            >
                              {isMarkingComplete ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Saving...
                                </>
                              ) : isCompleted ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Incomplete
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Complete
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg mb-2">Assignment not available</p>
                        <p className="text-sm">
                          The assignment for this lesson will be available soon
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Solution Tab - For PDF-based courses */}
              <TabsContent value="solution" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Solution</span>
                    </CardTitle>
                    <CardDescription>
                      Check your answers with the complete solution
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {lesson.solution_url ? (
                      <div className="space-y-4">
                        {/* Solution PDF Embedder - Try direct embedding first */}
                        <div className="w-full h-[500px] md:h-[800px] border-2 border-green-100 rounded-sm overflow-hidden bg-gray-50">
                          <iframe
                            src={lesson.solution_url}
                            className="w-full h-full"
                            title={`${lesson.title} - Solution`}
                            allow="autoplay; fullscreen"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                          />
                        </div>

                        {/* Solution Actions */}
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            className="rounded-sm"
                            onClick={() =>
                              window.open(lesson.solution_url, "_blank")
                            }
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Open in New Tab
                          </Button>
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              className="rounded-sm"
                              onClick={() => handleTabChange("assignment")}
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Back to Assignment
                            </Button>
                            <Button
                              className={`rounded-sm ${
                                isCompleted
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-primary hover:bg-primary/90"
                              }`}
                              onClick={handleMarkComplete}
                              disabled={isMarkingComplete}
                            >
                              {isMarkingComplete ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Saving...
                                </>
                              ) : isCompleted ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Incomplete
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Complete
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg mb-2">Solution not available</p>
                        <p className="text-sm">
                          The solution for this lesson will be available soon
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-6 md:mt-8 gap-3">
              <Button
                variant="outline"
                className="rounded-sm w-full sm:w-auto"
                onClick={getPreviousLesson}
                disabled={
                  !allLessons.find(
                    (l) => l.lesson_order === lesson.lesson_order - 1
                  )
                }
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Lesson
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 rounded-sm w-full sm:w-auto"
                onClick={getNextLesson}
                disabled={
                  !allLessons.find(
                    (l) => l.lesson_order === lesson.lesson_order + 1
                  )
                }
              >
                Next Lesson
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
