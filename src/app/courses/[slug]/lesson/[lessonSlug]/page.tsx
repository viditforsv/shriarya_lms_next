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
  solution_url?: string;
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
  const router = useRouter();
  const { user, profile } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "video" | "notes" | "keypoints" | "quiz" | "assignment" | "solution"
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

  // Authentication check - redirect if not logged in
  useEffect(() => {
    // Wait for auth context to initialize
    if (user === undefined) return;
    
    if (!user) {
      // User is not logged in, redirect to login
      router.push(`/login?redirect=/courses/${resolvedParams?.slug}/lesson/${resolvedParams?.lessonSlug}`);
      return;
    }
    
    setAuthChecked(true);
  }, [user, router, resolvedParams]);

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
          setActiveTab("assignment");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams?.slug, resolvedParams?.lessonSlug, user?.id, authChecked]);

  const hasAccess = () => {
    // Admin has access to everything
    if (profile?.role === "admin") {
      return true;
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
    alert("🎉 Lesson completed!");
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
              <Lock className="w-10 h-10 text-[#e27447]" />
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
          <div className="bg-white border-2 border-[#feefea] rounded-sm p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Full course access with all lessons
                </p>
              </div>
              {course.price && course.price > 0 && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#e27447]">
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
                <Button className="w-full bg-[#e27447] hover:bg-[#d1653a] rounded-sm text-base py-6">
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-b border-[#e27447] py-6 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href={`/courses/${resolvedParams?.slug}`}
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmarkToggle}
                className="rounded-sm"
              >
                <Bookmark
                  className={`w-4 h-4 mr-2 ${
                    isBookmarked ? "fill-current" : ""
                  }`}
                />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-0 py-8">
        {/* Course Breadcrumb */}
        <div className="mb-6 px-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/courses" className="hover:text-foreground">
              Courses
            </Link>
            <span>/</span>
            <Link
              href={`/courses/${resolvedParams?.slug}`}
              className="hover:text-foreground"
            >
              {course.title}
            </Link>
            <span>/</span>
            <span className="text-foreground">{lesson.title}</span>
          </nav>
        </div>

        <div className="flex">
          {/* Left Sidebar - Course Navigation */}
          <CollapsibleSidebar
            currentLessonSlug={lesson.slug}
            courseSlug={resolvedParams?.slug || ""}
            lessons={allLessons}
          />

          {/* Main Content */}
          <div className="flex-1 px-4">
            {/* Lesson Header */}
            <div className="bg-white rounded-sm border border-[#feefea] p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-[#e27447] text-white mb-2 rounded-sm">
                    Lesson {lesson.lesson_order}
                  </Badge>
                  <h1 className="text-4xl font-bold text-[#1e293b] mb-2">
                    {lesson.title}
                  </h1>
                  <p className="text-muted-foreground text-xl">
                    Learn important concepts and practice problems
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-base text-muted-foreground">
                      30 min
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {lesson.is_preview ? (
                      <>
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span className="text-base text-blue-600">Preview</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 text-green-600" />
                        <span className="text-base text-green-600">
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
                <TabsList className="grid w-full grid-cols-2 rounded-sm bg-white p-1 shadow-sm">
                  <TabsTrigger
                    value="assignment"
                    className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Assignment
                  </TabsTrigger>
                  <TabsTrigger
                    value="solution"
                    className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Solution
                  </TabsTrigger>
                </TabsList>
              ) : (
                // Default template - Multiple tabs
                <TabsList className="grid w-full grid-cols-4 rounded-sm bg-white p-1 shadow-sm">
                  <TabsTrigger
                    value="video"
                    className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Notes
                  </TabsTrigger>
                  <TabsTrigger
                    value="keypoints"
                    className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Key Points
                  </TabsTrigger>
                  <TabsTrigger
                    value="quiz"
                    className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Quiz
                  </TabsTrigger>
                </TabsList>
              )}

              {/* Video Tab */}
              <TabsContent value="video" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Play className="w-5 h-5 text-[#e27447]" />
                      <span>Video Lesson</span>
                    </CardTitle>
                    <CardDescription>
                      Watch the complete lesson video with explanations and
                      examples
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
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
                          <div className="w-20 h-20 bg-[#e27447] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#e27447]/90 transition-colors cursor-pointer">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#1e293b] mb-2">
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

              {/* Assignment Tab - For PDF-based courses */}
              <TabsContent value="assignment" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-[#e27447]" />
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
                        <div className="w-full h-[800px] border-2 border-[#feefea] rounded-sm overflow-hidden bg-gray-50">
                          <iframe
                            src={lesson.pdf_url}
                            className="w-full h-full"
                            title={`${lesson.title} - Assignment`}
                            allow="autoplay; fullscreen"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                          />
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
                              className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
                              onClick={handleMarkComplete}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark as Complete
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
                        <div className="w-full h-[800px] border-2 border-green-100 rounded-sm overflow-hidden bg-gray-50">
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
                              className="bg-green-600 hover:bg-green-700 rounded-sm"
                              onClick={handleMarkComplete}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark as Complete
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
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                className="rounded-sm"
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
                className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
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
