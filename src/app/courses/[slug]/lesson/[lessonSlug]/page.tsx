"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components-demo/ui/tabs";
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
} from "lucide-react";
import { VideoResource } from "@/app/components-demo/ui/youtube-video";
import { CollapsibleSidebar } from "@/app/components-demo/ui/layout-components/collapsible-sidebar";
import { LessonPageSkeleton } from "@/components/skeletons";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  price: number;
  created_at: string;
  template_data?: Record<string, unknown>;
  template_id?: string;
  profiles?: {
    first_name: string;
    last_name: string;
  };
}

interface Lesson {
  id: string;
  title: string;
  slug: string;
  content_html?: string;
  content?: string;
  lesson_order: number;
  is_preview: boolean;
  created_at: string;
  course_id: string;
  key_points?: string[];
  video_url?: string;
  video_thumbnail?: string;
  pdf_url?: string;
  quiz_id?: string;
  chapter_id?: string;
  chapter?: {
    id: string;
    chapter_name: string;
    chapter_order: number;
    unit: {
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
  const { user, profile } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "video" | "notes" | "keypoints" | "quiz" | "pdf"
  >("video");
  const [resolvedParams, setResolvedParams] = useState<{
    slug: string;
    lessonSlug: string;
  } | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<
    Record<string, string>
  >({});

  // Resolve params
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

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
          profiles: {
            first_name: "System",
            last_name: "Admin",
          },
        };
        setCourse(course);

        // 2. Check enrollment status
        if (user) {
          const { data: enrollmentData } = await supabase
            .from("courses_enrollments")
            .select("*")
            .eq("student_id", user.id)
            .eq("course_id", course.id)
            .eq("is_active", true)
            .maybeSingle();

          setIsEnrolled(!!enrollmentData);
        } else {
          setIsEnrolled(false);
        }

        // 3. Set default tab based on template
        const isPDFTemplate =
          course.template_id === "addffa2b-d88c-484e-9637-1f7fbe42e29c";
        if (isPDFTemplate) {
          setActiveTab("pdf");
        }

        // 4. Fetch all lessons with unit/chapter structure
        const { data: lessonsData, error: lessonsError } = await supabase
          .from("courses_lessons")
          .select(
            `
            id,
            title,
            slug,
            lesson_order,
            is_preview,
            video_thumbnail,
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

        if (lessonsError) {
          console.error("Error fetching lessons:", lessonsError);
        } else {
          setAllLessons((lessonsData as unknown as Lesson[]) || []);
        }

        // 5. Fetch current lesson content
        const { data: lessonData, error: lessonError } = await supabase
          .from("courses_lessons")
          .select(
            `
            *,
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
      } catch (err) {
        console.error("Error loading lesson:", err);
        setError(err instanceof Error ? err.message : "Lesson not found");
      } finally {
        setIsLoading(false);
      }
    };

    loadLesson();
  }, [resolvedParams, user]);

  // Set active tab based on template when course loads
  useEffect(() => {
    if (course?.template_id) {
      const isPDFTemplate =
        course.template_id === "addffa2b-d88c-484e-9637-1f7fbe42e29c";
      console.log("Course loaded, checking template:", {
        template_id: course.template_id,
        isPDFTemplate,
        currentActiveTab: activeTab,
      });
      if (isPDFTemplate && activeTab !== "pdf") {
        setActiveTab("pdf");
        console.log("Updated active tab to PDF");
      }
    }
  }, [course?.template_id, activeTab]);

  const hasAccess = () => {
    // Admin has access to everything
    if (profile?.role === "admin") {
      return true;
    }

    const isFree = course?.price === 0;
    return lesson?.is_preview || isEnrolled || isFree;
  };

  const canAccessLesson = (lesson: Lesson) => {
    // Admin has access to everything
    if (profile?.role === "admin") {
      return true;
    }

    const isFree = course?.price === 0;
    return lesson.is_preview || isEnrolled || isFree;
  };

  const getNextLesson = () => {
    if (!lesson || !allLessons.length) return;

    const currentIndex = allLessons.findIndex((l) => l.slug === lesson.slug);
    const nextLesson = allLessons[currentIndex + 1];

    if (nextLesson && canAccessLesson(nextLesson)) {
      window.location.href = `/courses/${resolvedParams?.slug}/lesson/${nextLesson.slug}`;
    } else if (nextLesson) {
      // Next lesson is locked, show message
      alert("Please enroll in the course to access the next lesson.");
    }
  };

  const getPreviousLesson = () => {
    if (!lesson || !allLessons.length) return;

    const currentIndex = allLessons.findIndex((l) => l.slug === lesson.slug);
    const prevLesson = allLessons[currentIndex - 1];

    if (prevLesson && canAccessLesson(prevLesson)) {
      window.location.href = `/courses/${resolvedParams?.slug}/lesson/${prevLesson.slug}`;
    } else if (prevLesson) {
      // Previous lesson is locked, show message
      alert("Please enroll in the course to access the previous lesson.");
    }
  };

  const handleMarkComplete = async () => {
    alert("🎉 Lesson completed!");
  };

  // Track tab changes as progress
  const handleTabChange = (value: string) => {
    setActiveTab(value as "video" | "notes" | "keypoints" | "quiz");
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

  if (isLoading) {
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Lesson Locked</h1>
          <p className="text-muted-foreground mb-6">
            Please enroll in this course to access this lesson.
          </p>

          {/* Course Price Display */}
          {course && (course.price || 0) > 0 && (
            <div className="text-xl font-bold text-[#e27447] mb-6">
              ₹{course.price?.toLocaleString()}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/courses/${resolvedParams?.slug}`}>
              <Button variant="outline" className="rounded-sm w-full sm:w-auto">
                Back to Course
              </Button>
            </Link>
            {course && (course.price || 0) > 0 ? (
              <Link href={`/courses/${resolvedParams?.slug}/payment`}>
                <Button className="bg-[#e27447] hover:bg-[#d1653a] rounded-sm w-full sm:w-auto">
                  Buy Now - ₹{course.price?.toLocaleString()}
                </Button>
              </Link>
            ) : (
              <Link href={`/courses/${resolvedParams?.slug}`}>
                <Button className="bg-[#e27447] hover:bg-[#d1653a] rounded-sm w-full sm:w-auto">
                  Enroll for Free
                </Button>
              </Link>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Unlock all lessons and start your learning journey!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-b border-[#e27447] py-4 sm:py-6 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                href={`/courses/${resolvedParams?.slug}`}
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">Back to Course</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmarkToggle}
                className="rounded-sm text-xs sm:text-sm"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 ${
                    isBookmarked ? "fill-current" : ""
                  }`}
                />
                <span className="hidden sm:inline">
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </span>
                <span className="sm:hidden">{isBookmarked ? "✓" : "☆"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-0 py-4 sm:py-6 lg:py-8">
        {/* Course Breadcrumb */}
        <div className="mb-4 sm:mb-6 px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-muted-foreground">
            <Link href="/courses" className="hover:text-foreground">
              Courses
            </Link>
            <span>/</span>
            <Link
              href={`/courses/${resolvedParams?.slug}`}
              className="hover:text-foreground truncate max-w-[120px] sm:max-w-none"
            >
              {course.title}
            </Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[150px] sm:max-w-none">
              {lesson.title}
            </span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Sidebar - Course Navigation */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 order-2 lg:order-1">
            <CollapsibleSidebar
              currentLessonSlug={lesson.slug}
              courseSlug={resolvedParams?.slug || ""}
              lessons={allLessons}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 px-4 sm:px-6 lg:px-8 order-1 lg:order-2">
            {/* Lesson Header */}
            <div className="bg-white rounded-sm border border-[#feefea] p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                <div className="flex-1">
                  <Badge className="bg-[#e27447] text-white mb-2 rounded-sm text-xs sm:text-sm">
                    Lesson {lesson.lesson_order}
                  </Badge>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e293b] mb-2">
                    {lesson.title}
                  </h1>
                  <p className="text-muted-foreground text-base sm:text-lg lg:text-xl">
                    Learn important concepts and practice problems
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                    <span className="text-sm sm:text-base text-muted-foreground">
                      30 min
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {lesson.is_preview ? (
                      <>
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                        <span className="text-sm sm:text-base text-blue-600">
                          Preview
                        </span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                        <span className="text-sm sm:text-base text-green-600">
                          Unlocked
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview Lesson Notice */}
              {lesson.is_preview && !isEnrolled && (course?.price || 0) > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-sm p-3 sm:p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base font-semibold text-blue-900 mb-1">
                        You're viewing a preview lesson
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-800 mb-3">
                        This is a free preview of the course content. Enroll now
                        to access all lessons and unlock your learning journey!
                      </p>
                      <Link href={`/courses/${resolvedParams?.slug}`}>
                        <Button
                          size="sm"
                          className="bg-[#e27447] hover:bg-[#d1653a] text-white rounded-sm"
                        >
                          Enroll Now - ₹{course.price?.toLocaleString()}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              {(() => {
                const isPDFTemplate =
                  course?.template_id ===
                  "addffa2b-d88c-484e-9637-1f7fbe42e29c";
                console.log("Rendering TabsList:", {
                  courseTemplateId: course?.template_id,
                  isPDFTemplate,
                  activeTab,
                });
                return isPDFTemplate;
              })() ? (
                // PDF-only template - Single tab
                <TabsList className="grid w-full grid-cols-1 rounded-sm bg-white p-1 shadow-sm">
                  <TabsTrigger
                    value="pdf"
                    className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium text-sm sm:text-base"
                  >
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    PDF Assignment
                  </TabsTrigger>
                </TabsList>
              ) : (
                // Default template - Multiple tabs
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 rounded-sm bg-white p-1 shadow-sm">
                  <TabsTrigger
                    value="video"
                    className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium text-xs sm:text-sm"
                  >
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Video</span>
                    <span className="sm:hidden">📹</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium text-xs sm:text-sm"
                  >
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Notes</span>
                    <span className="sm:hidden">📝</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="keypoints"
                    className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium text-xs sm:text-sm"
                  >
                    <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Key Points</span>
                    <span className="sm:hidden">🔑</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="quiz"
                    className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium text-xs sm:text-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Quiz</span>
                    <span className="sm:hidden">❓</span>
                  </TabsTrigger>
                </TabsList>
              )}

              {/* Video Tab */}
              <TabsContent value="video" className="mt-4 sm:mt-6">
                <Card className="rounded-sm">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-[#e27447]" />
                      <span>Video Lesson</span>
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Watch the complete lesson video with explanations and
                      examples
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
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
                        <div className="text-center p-4 sm:p-6">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#e27447] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 hover:bg-[#e27447]/90 transition-colors cursor-pointer">
                            <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-0.5 sm:ml-1" />
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-[#1e293b] mb-2">
                            {lesson.title}
                          </h3>
                          <p className="text-muted-foreground mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                            Video content will be available soon
                          </p>
                          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              <span>30 min</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              <span>HD Quality</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Video Controls */}
                    <div className="mt-4 flex items-center justify-end">
                      <Button
                        className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
                        onClick={handleMarkComplete}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Complete
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
                      <FileText className="w-5 h-5 text-[#e27447]" />
                      <span>Lesson Notes</span>
                    </CardTitle>
                    <CardDescription>
                      Comprehensive notes and key concepts from this lesson
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Lesson Content */}
                    {lesson.content_html ? (
                      <div className="prose prose-sm max-w-none leading-relaxed">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: lesson.content_html,
                          }}
                        />
                      </div>
                    ) : lesson.content ? (
                      <div className="prose prose-sm max-w-none leading-relaxed">
                        <div
                          dangerouslySetInnerHTML={{ __html: lesson.content }}
                        />
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
                        <h3 className="text-lg font-semibold text-[#1e293b] mb-3">
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

              {/* Key Points Tab */}
              <TabsContent value="keypoints" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bookmark className="w-5 h-5 text-[#e27447]" />
                      <span>Key Points</span>
                    </CardTitle>
                    <CardDescription>
                      Important concepts and takeaways from this lesson
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {lesson.key_points && lesson.key_points.length > 0 ? (
                        <div className="prose prose-sm max-w-none">
                          <h4 className="text-lg font-semibold text-[#1e293b] mb-3">
                            🔑 Key Points:
                          </h4>
                          <ul className="space-y-2">
                            {lesson.key_points.map((point, index) => (
                              <li
                                key={index}
                                className="flex items-start space-x-2"
                              >
                                <span className="text-[#e27447] font-bold">
                                  •
                                </span>
                                <span className="text-muted-foreground">
                                  {point}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Key points will be available soon</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Quiz Tab */}
              <TabsContent value="quiz" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-[#e27447]" />
                      <span>Lesson Quiz</span>
                    </CardTitle>
                    <CardDescription>
                      Test your understanding with these quiz questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {lesson.quiz_id ? (
                        <div className="prose prose-sm max-w-none">
                          <h4 className="text-lg font-semibold text-[#1e293b] mb-3">
                            ❓ Lesson Quiz:
                          </h4>
                          <p className="text-muted-foreground mb-4">
                            Quiz ID: {lesson.quiz_id}
                          </p>
                          <p className="text-muted-foreground">
                            Quiz questions will be loaded from the quizzes table
                            using this ID.
                          </p>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Quiz questions will be available soon</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Practice Tab */}
              <TabsContent value="practice" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-[#e27447]" />
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
                        className="border border-[#feefea] rounded-sm p-4"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-[#e27447] text-white rounded-sm flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#1e293b] mb-3">
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
                                        className="text-[#e27447] focus:ring-[#e27447]"
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
                                className="w-full p-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] resize-none"
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

                    <div className="flex items-center justify-between pt-4 border-t border-[#feefea]">
                      <Button variant="outline" className="rounded-sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Ask a Question
                      </Button>
                      <Button
                        className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
                        onClick={handleSubmitPractice}
                      >
                        Submit Answers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* PDF Tab - For PDF-based courses */}
              <TabsContent value="pdf" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-[#e27447]" />
                      <span>PDF Assignment</span>
                    </CardTitle>
                    <CardDescription>
                      View and complete the assignment PDF
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {lesson.pdf_url ? (
                      <div className="space-y-4">
                        {/* Adobe PDF Embedder via iframe */}
                        <div className="w-full h-[800px] border border-[#feefea] rounded-sm overflow-hidden">
                          <iframe
                            src={lesson.pdf_url}
                            className="w-full h-full"
                            title={`${lesson.title} - PDF Assignment`}
                            allow="autoplay"
                          />
                        </div>

                        {/* PDF Actions */}
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
                          <Button
                            className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
                            onClick={handleMarkComplete}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Complete
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg mb-2">
                          PDF assignment not available
                        </p>
                        <p className="text-sm">
                          The PDF for this lesson will be available soon
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-8 gap-4">
              <Button
                variant="outline"
                className="rounded-sm w-full sm:w-auto order-2 sm:order-1"
                onClick={getPreviousLesson}
                disabled={
                  !allLessons.find(
                    (l) => l.lesson_order === lesson.lesson_order - 1
                  ) ||
                  !canAccessLesson(
                    allLessons.find(
                      (l) => l.lesson_order === lesson.lesson_order - 1
                    )!
                  )
                }
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                <span className="text-sm sm:text-base">Previous Lesson</span>
              </Button>
              <Button
                className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm w-full sm:w-auto order-1 sm:order-2"
                onClick={getNextLesson}
                disabled={
                  !allLessons.find(
                    (l) => l.lesson_order === lesson.lesson_order + 1
                  ) ||
                  !canAccessLesson(
                    allLessons.find(
                      (l) => l.lesson_order === lesson.lesson_order + 1
                    )!
                  )
                }
              >
                <span className="text-sm sm:text-base">Next Lesson</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
