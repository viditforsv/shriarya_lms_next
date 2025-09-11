"use client";

import { useState, useEffect, useCallback } from "react";
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
import { CompletionDot } from "@/app/components-demo/ui/template-status";
import { CollapsibleSidebar } from "@/app/components-demo/ui/layout-components/collapsible-sidebar";
import { useAuth } from "@/contexts/AuthContext";

interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  is_free: boolean;
  created_at: string;
  template_data?: Record<string, unknown>;
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
}

interface UserProgress {
  id: string;
  completion_percentage: number;
  time_spent_minutes: number;
  last_accessed_at: string;
  completed_at: string | null;
  is_completed: boolean;
}

export default function DynamicLessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const { user } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "video" | "notes" | "keypoints" | "quiz"
  >("video");
  const [resolvedParams, setResolvedParams] = useState<{
    slug: string;
    lessonSlug: string;
  } | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [practiceAnswers, setPracticeAnswers] = useState<
    Record<string, string>
  >({});
  const [lessonStartTime, setLessonStartTime] = useState<Date | null>(null);

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

        // Fetch complete course content using RPC function
        console.log("Fetching course content for:", resolvedParams.slug);
        const courseContentResponse = await fetch(
          `/api/course-content?course_slug=${resolvedParams.slug}`
        );
        console.log(
          "Course content API response status:",
          courseContentResponse.status
        );

        if (courseContentResponse.ok) {
          const courseContentData = await courseContentResponse.json();
          console.log("Course content data received:", courseContentData);

          // Use the clean data structure from RPC function
          const lessons: Lesson[] = courseContentData.lessons || [];
          console.log(
            "Lessons from RPC:",
            lessons.map((l) => ({ slug: l.slug, title: l.title }))
          );
          setAllLessons(lessons);

          // Find the specific lesson from the loaded lessons
          const currentLesson = lessons.find(
            (l) => l.slug === resolvedParams.lessonSlug
          );
          console.log("Looking for lesson slug:", resolvedParams.lessonSlug);
          console.log("Found lesson:", currentLesson);

          if (!currentLesson) {
            // Debug information
            console.error("Lesson not found:", {
              requestedLessonSlug: resolvedParams.lessonSlug,
              courseSlug: resolvedParams.slug,
              availableLessons: lessons.map((l: Lesson) => l.slug),
            });
            throw new Error(
              `Lesson "${resolvedParams.lessonSlug}" not found in course "${resolvedParams.slug}"`
            );
          }

          setLesson(currentLesson);
          console.log("Current lesson data:", currentLesson);

          // Use course data from RPC response
          if (courseContentData.course) {
            const courseData: Course = {
              id: courseContentData.course.id,
              title: courseContentData.course.title,
              description: courseContentData.course.description,
              slug: courseContentData.course.slug,
              is_free: courseContentData.course.is_free || false,
              created_at: courseContentData.course.created_at,
              template_data: courseContentData.course.template_data,
              profiles: {
                first_name: "System",
                last_name: "Admin",
              },
            };
            setCourse(courseData);
            setIsEnrolled(courseData.is_free || false);
          }
        } else {
          const errorText = await courseContentResponse.text();
          console.error("Failed to fetch course content:", errorText);
          throw new Error("Failed to fetch course content from database");
        }
      } catch (err) {
        console.error("Error loading lesson:", err);
        console.error("Error details:", {
          message: err instanceof Error ? err.message : "Unknown error",
          stack: err instanceof Error ? err.stack : undefined,
          params: resolvedParams,
        });
        setError(err instanceof Error ? err.message : "Lesson not found");
      } finally {
        console.log("Setting loading to false");
        setIsLoading(false);
      }
    };

    loadLesson();
  }, [resolvedParams]);

  // Create initial progress entry for new users
  const createInitialProgress = useCallback(async () => {
    if (!lesson || !user) return;

    try {
      console.log("Creating initial progress for lesson:", lesson.id);
      console.log("Lesson data:", { id: lesson.id, course_id: lesson.course_id, title: lesson.title });
      console.log("User data:", { id: user.id, email: user.email });
      
      const requestBody = {
        lesson_id: lesson.id,
        course_id: lesson.course_id,
        completion_percentage: 0,
        time_spent_minutes: 0,
        is_completed: false,
      };
      
      console.log("Request body:", requestBody);
      
      const response = await fetch("/api/user-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const data = await response.json();
        setUserProgress(data.progress);
        console.log("Created initial progress:", data.progress);
      } else {
        const errorText = await response.text();
        console.error("Failed to create initial progress:", response.status);
        console.error("Error response body:", errorText);
      }
    } catch (error) {
      console.error("Error creating initial progress:", error);
    }
  }, [lesson, user]);

  // Track lesson interactions and update progress
  const updateProgress = useCallback(async (completionPercentage: number, timeSpentMinutes?: number) => {
    if (!lesson || !user) return;

    try {
      const response = await fetch("/api/user-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lesson_id: lesson.id,
          course_id: lesson.course_id,
          completion_percentage: completionPercentage,
          time_spent_minutes: timeSpentMinutes || 0,
          is_completed: completionPercentage >= 100,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserProgress(data.progress);
        console.log("Progress updated:", data.progress);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  }, [lesson, user]);

  // Fetch user progress when lesson and user are available
  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!lesson || !user) return;

      try {
        console.log("Fetching user progress for lesson:", lesson.id);
        const response = await fetch(
          `/api/user-progress?lessonId=${lesson.id}&courseId=${lesson.course_id}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("User progress data:", data);
          
          if (data.progress && data.progress.length > 0) {
            // User has existing progress
            setUserProgress(data.progress[0]);
            console.log("Found existing progress:", data.progress[0]);
          } else {
            // No existing progress - create initial progress entry
            console.log("No existing progress found, creating initial entry");
            await createInitialProgress();
          }
        } else {
          console.error("Failed to fetch user progress:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };

    fetchUserProgress();
  }, [lesson, user, createInitialProgress]);

  // Track lesson start time
  useEffect(() => {
    if (lesson && user) {
      setLessonStartTime(new Date());
    }
  }, [lesson, user]);

  // Auto-update progress based on time spent
  useEffect(() => {
    if (!lessonStartTime || !userProgress) return;

    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - lessonStartTime.getTime()) / 60000); // minutes
      
      // Update progress every 2 minutes if user is actively viewing
      if (timeSpent > 0 && timeSpent % 2 === 0) {
        const currentProgress = userProgress.completion_percentage;
        const timeBasedProgress = Math.min(95, Math.floor(timeSpent * 2)); // Max 95% from time
        
        if (timeBasedProgress > currentProgress) {
          updateProgress(timeBasedProgress, timeSpent);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [lessonStartTime, userProgress, updateProgress]);

  const hasAccess = () => {
    return lesson?.is_preview || isEnrolled || course?.is_free;
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
    await updateProgress(100);
    alert("🎉 Lesson marked as complete!");
  };

  // Track tab changes as progress
  const handleTabChange = (value: string) => {
    setActiveTab(value as "video" | "notes" | "keypoints" | "quiz");
    
    // Update progress based on tab interaction
    let progressPercentage = 0;
    switch (value) {
      case "video":
        progressPercentage = 25;
        break;
      case "notes":
        progressPercentage = 50;
        break;
      case "keypoints":
        progressPercentage = 75;
        break;
      case "quiz":
        progressPercentage = 90;
        break;
    }
    
    // Only update if it's higher than current progress
    if (userProgress && progressPercentage > userProgress.completion_percentage) {
      updateProgress(progressPercentage);
    }
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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    );
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
        <div className="text-center">
          <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Lesson Locked</h1>
          <p className="text-muted-foreground mb-6">
            Please enroll in this course to access this lesson.
          </p>
          <Link href={`/courses/${resolvedParams?.slug}`}>
            <Button>Back to Course</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with completion indicator */}
      <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-b border-[#e27447] py-6 relative">
        <CompletionDot isCompleted={userProgress?.is_completed || false} />
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
              <TabsList className="grid w-full grid-cols-4 rounded-lg bg-white border border-gray-200 p-1 shadow-sm">
                <TabsTrigger
                  value="video"
                  className="rounded-md data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 hover:text-gray-700 font-semibold transition-all duration-300 text-base py-3 px-4 data-[state=inactive]:text-gray-600"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Video
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="rounded-md data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 hover:text-gray-700 font-semibold transition-all duration-300 text-base py-3 px-4 data-[state=inactive]:text-gray-600"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Notes
                </TabsTrigger>
                <TabsTrigger
                  value="keypoints"
                  className="rounded-md data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 hover:text-gray-700 font-semibold transition-all duration-300 text-base py-3 px-4 data-[state=inactive]:text-gray-600"
                >
                  <Bookmark className="w-5 h-5 mr-2" />
                  Key Points
                </TabsTrigger>
                <TabsTrigger
                  value="quiz"
                  className="rounded-md data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 hover:text-gray-700 font-semibold transition-all duration-300 text-base py-3 px-4 data-[state=inactive]:text-gray-600"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Quiz
                </TabsTrigger>
              </TabsList>

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
                        disabled={userProgress?.is_completed}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {userProgress?.is_completed
                          ? "Completed"
                          : "Mark as Complete"}
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
