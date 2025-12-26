"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import { Progress } from "@/design-system/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design-system/components/tabs";
import {
  ArrowLeft,
  User,
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp,
  Target,
  BarChart3,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Student {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  created_at: string;
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  curriculum: string;
  subject: string;
  grade: string;
}

interface Lesson {
  id: string;
  slug: string;
  title: string;
  lesson_order: number;
  is_preview: boolean;
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

interface ProgressData {
  lesson_id: string;
  lesson_slug: string;
  lesson_title: string;
  is_completed: boolean;
  last_accessed_at: string;
  time_spent: number;
  completion_percentage: number;
  attempts: number;
  chapter?: {
    id: string;
    chapter_name: string;
    unit: {
      id: string;
      unit_name: string;
    };
  };
}

interface StudentProgressStats {
  totalLessons: number;
  completedLessons: number;
  inProgressLessons: number;
  notStartedLessons: number;
  overallProgress: number;
  totalTimeSpent: number;
  averageTimePerLesson: number;
  lastActivity: string;
  enrollmentDate: string;
  streakDays: number;
}

export function StudentProgressPageClient({
  params,
}: {
  params: { courseId: string; studentId: string };
}) {
  const { profile } = useAuth();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [stats, setStats] = useState<StudentProgressStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is admin
  const isAdmin = profile?.role === "admin";

  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin");
      return;
    }

    const loadStudentProgress = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const supabase = createClient();

        // Fetch student data
        const { data: studentData, error: studentError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", params.studentId)
          .single();

        if (studentError || !studentData) {
          setError("Student not found");
          return;
        }

        setStudent(studentData);

        // Fetch course data
        const { data: courseData, error: courseError } = await supabase
          .from("courses")
          .select("id, title, slug, description, curriculum, subject, grade")
          .eq("id", params.courseId)
          .single();

        if (courseError || !courseData) {
          setError("Course not found");
          return;
        }

        setCourse(courseData);

        // Fetch lessons with chapter structure
        const { data: lessonsData, error: lessonsError } = await supabase
          .from("courses_lessons")
          .select(
            `
            id,
            slug,
            title,
            lesson_order,
            is_preview,
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
          .eq("course_id", params.courseId)
          .order("lesson_order");

        if (lessonsError) {
          console.error("Error fetching lessons:", lessonsError);
        } else {
          const formattedLessons: Lesson[] = (lessonsData || []).map(
            (lesson: {
              id: string;
              slug: string;
              title: string;
              lesson_order: number;
              is_preview: boolean;
              chapter: Array<{
                id: string;
                chapter_name: string;
                chapter_order: number;
                unit: Array<{
                  id: string;
                  unit_name: string;
                  unit_order: number;
                }>;
              }> | null;
            }) => {
              const chapterObj = Array.isArray(lesson.chapter)
                ? lesson.chapter[0]
                : lesson.chapter;
              return {
                id: lesson.id,
                slug: lesson.slug,
                title: lesson.title,
                lesson_order: lesson.lesson_order,
                is_preview: lesson.is_preview,
                chapter: chapterObj
                  ? {
                      id: chapterObj.id,
                      chapter_name: chapterObj.chapter_name,
                      chapter_order: chapterObj.chapter_order,
                      unit: Array.isArray(chapterObj.unit)
                        ? chapterObj.unit[0]
                        : chapterObj.unit,
                    }
                  : undefined,
              };
            }
          );
          setLessons(formattedLessons);
        }

        // Debug: Check if user_progress table exists and has data
        console.log(
          "Fetching progress for student:",
          params.studentId,
          "course:",
          params.courseId
        );

        // First, let's check if there's any data in user_progress table
        const { data: debugData, error: debugError } = await supabase
          .from("user_progress")
          .select("lesson_id, user_id, course_id")
          .eq("user_id", params.studentId)
          .limit(5);

        console.log("Debug query result:", debugData, "Error:", debugError);

        // Fetch student progress data
        const { data: progressData, error: progressError } = await supabase
          .from("user_progress")
          .select(
            `
            lesson_id,
            is_completed,
            last_accessed_at,
            time_spent,
            completion_percentage,
            attempts,
            lesson:courses_lessons(
              slug,
              title,
              chapter:courses_chapters(
                id,
                chapter_name,
                unit:courses_units(
                  id,
                  unit_name
                )
              )
            )
          `
          )
          .eq("user_id", params.studentId)
          .eq("course_id", params.courseId);

        if (progressError) {
          console.error("Error fetching progress:", progressError);
          console.error(
            "Progress error details:",
            JSON.stringify(progressError, null, 2)
          );

          // Fallback: Try a simpler query without joins
          console.log("Trying fallback query...");
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("user_progress")
            .select(
              "lesson_id, is_completed, last_accessed_at, time_spent, completion_percentage, attempts"
            )
            .eq("user_id", params.studentId)
            .eq("course_id", params.courseId);

          if (fallbackError) {
            console.error("Fallback query also failed:", fallbackError);
            setProgressData([]);
          } else {
            console.log("Fallback data received:", fallbackData);
            // Create basic progress data without lesson details
            const basicProgress: ProgressData[] = (fallbackData || []).map(
              (item: {
                lesson_id: string;
                is_completed: boolean;
                last_accessed_at: string;
                time_spent: number;
                completion_percentage: number;
                attempts: number;
              }) => ({
                lesson_id: item.lesson_id,
                lesson_slug: "",
                lesson_title: "Lesson " + item.lesson_id,
                is_completed: item.is_completed,
                last_accessed_at: item.last_accessed_at,
                time_spent: item.time_spent || 0,
                completion_percentage: item.completion_percentage || 0,
                attempts: item.attempts || 0,
                chapter: undefined,
              })
            );
            setProgressData(basicProgress);
          }
        } else {
          console.log("Progress data received:", progressData);
          const formattedProgress: ProgressData[] = (progressData || [])
            .filter(
              (
                item: unknown
              ): item is {
                lesson_id: string;
                is_completed: boolean;
                last_accessed_at: string;
                time_spent: number;
                completion_percentage: number;
                attempts: number;
                lesson: Lesson | Lesson[];
              } => {
                if (
                  typeof item === "object" &&
                  item !== null &&
                  "lesson" in item &&
                  item.lesson
                ) {
                  const lesson = Array.isArray(item.lesson)
                    ? item.lesson[0]
                    : item.lesson;
                  return lesson && typeof lesson.id === "string";
                }
                return false;
              }
            )
            .map((item) => {
              const lesson = Array.isArray(item.lesson)
                ? item.lesson[0]
                : item.lesson;
              return {
                lesson_id: item.lesson_id,
                lesson_slug: lesson?.slug || "",
                lesson_title: lesson?.title || "Unknown Lesson",
                is_completed: item.is_completed,
                last_accessed_at: item.last_accessed_at,
                time_spent: item.time_spent || 0,
                completion_percentage: item.completion_percentage || 0,
                attempts: item.attempts || 0,
                chapter: lesson?.chapter
                  ? (() => {
                      const chapter = Array.isArray(lesson.chapter)
                        ? lesson.chapter[0]
                        : lesson.chapter;
                      return {
                        id: chapter.id,
                        chapter_name: chapter.chapter_name,
                        unit: Array.isArray(chapter.unit)
                          ? chapter.unit[0]
                          : chapter.unit,
                      };
                    })()
                  : undefined,
              };
            });
          setProgressData(formattedProgress);

          // Calculate statistics
          const totalLessons = lessonsData?.length || 0;
          const completedLessons =
            formattedProgress?.filter((p: ProgressData) => p.is_completed)
              .length || 0;
          const inProgressLessons =
            formattedProgress?.filter(
              (p: ProgressData) =>
                !p.is_completed && p.completion_percentage > 0
            ).length || 0;
          const notStartedLessons =
            totalLessons - completedLessons - inProgressLessons;
          const overallProgress =
            totalLessons > 0
              ? Math.round((completedLessons / totalLessons) * 100)
              : 0;
          const totalTimeSpent =
            formattedProgress?.reduce(
              (sum: number, p: ProgressData) => sum + (p.time_spent || 0),
              0
            ) || 0;
          const averageTimePerLesson =
            completedLessons > 0
              ? Math.round(totalTimeSpent / completedLessons)
              : 0;
          const lastActivity =
            formattedProgress?.length > 0
              ? Math.max(
                  ...formattedProgress.map((p: ProgressData) =>
                    new Date(p.last_accessed_at).getTime()
                  )
                )
              : 0;

          // Get enrollment date
          const { data: enrollmentData } = await supabase
            .from("courses_enrollments")
            .select("enrolled_at")
            .eq("student_id", params.studentId)
            .eq("course_id", params.courseId)
            .single();

          setStats({
            totalLessons,
            completedLessons,
            inProgressLessons,
            notStartedLessons,
            overallProgress,
            totalTimeSpent,
            averageTimePerLesson,
            lastActivity:
              lastActivity > 0
                ? new Date(lastActivity).toLocaleDateString()
                : "Never",
            enrollmentDate: enrollmentData?.enrolled_at
              ? new Date(enrollmentData.enrolled_at).toLocaleDateString()
              : "Unknown",
            streakDays: 0, // TODO: Calculate streak
          });
        }
      } catch (err) {
        console.error("Error loading student progress:", err);
        setError("Failed to load student progress");
      } finally {
        setIsLoading(false);
      }
    };

    loadStudentProgress();
  }, [params.courseId, params.studentId, isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading student progress...</p>
        </div>
      </div>
    );
  }

  if (error || !student || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-muted-foreground mb-6">
            {error || "Student or course not found"}
          </p>
          <Link href="/admin">
            <Button>Back to Admin</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href={`/courses/${course.slug}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#1e293b]">
                Student Progress Tracking
              </h1>
              <p className="text-muted-foreground">
                {course.title} - {student.first_name} {student.last_name}
              </p>
            </div>
          </div>
        </div>

        {/* Student Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Personal Details</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Name:</strong> {student.first_name}{" "}
                  {student.last_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Email:</strong> {student.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Role:</strong> {student.role}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Course Details</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Course:</strong> {course.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Curriculum:</strong> {course.curriculum}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Subject:</strong> {course.subject}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Enrollment</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Enrolled:</strong> {stats?.enrollmentDate}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Last Activity:</strong> {stats?.lastActivity}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Streak:</strong> {stats?.streakDays} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#e27447]" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#e27447] mb-2">
                  {stats.overallProgress}%
                </div>
                <Progress value={stats.overallProgress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  {stats.completedLessons} of {stats.totalLessons} lessons
                  completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Time Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {Math.round(stats.totalTimeSpent / 60)}m
                </div>
                <p className="text-sm text-muted-foreground">
                  Average: {stats.averageTimePerLesson}m per lesson
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {stats.completedLessons}
                </div>
                <p className="text-sm text-muted-foreground">
                  {stats.inProgressLessons} in progress
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-500 mb-2">
                  {stats.notStartedLessons}
                </div>
                <p className="text-sm text-muted-foreground">Not started yet</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Detailed Progress Tabs */}
        <Tabs defaultValue="lessons" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-lg bg-gray-100 p-1">
            <TabsTrigger
              value="lessons"
              className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Lesson Progress
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
            >
              <FileText className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Lesson Progress Details</CardTitle>
                <CardDescription>
                  Detailed progress for each lesson in the course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessons.map((lesson) => {
                    const progress = progressData.find(
                      (p) => p.lesson_id === lesson.id
                    );
                    const isCompleted = progress?.is_completed || false;
                    const completionPercentage =
                      progress?.completion_percentage || 0;
                    const timeSpent = progress?.time_spent || 0;
                    const attempts = progress?.attempts || 0;

                    return (
                      <div
                        key={lesson.id}
                        className="border rounded-sm p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                                isCompleted
                                  ? "bg-green-100 text-green-700"
                                  : completionPercentage > 0
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                lesson.lesson_order
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold">{lesson.title}</h4>
                              {lesson.chapter && (
                                <p className="text-sm text-muted-foreground">
                                  {lesson.chapter.unit.unit_name} →{" "}
                                  {lesson.chapter.chapter_name}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {completionPercentage}% Complete
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {timeSpent > 0
                                  ? `${Math.round(timeSpent / 60)}m spent`
                                  : "Not started"}
                              </div>
                            </div>
                            <Badge
                              variant={
                                isCompleted
                                  ? "default"
                                  : completionPercentage > 0
                                  ? "secondary"
                                  : "outline"
                              }
                              className={
                                isCompleted
                                  ? "bg-green-100 text-green-700"
                                  : completionPercentage > 0
                                  ? "bg-yellow-100 text-yellow-700"
                                  : ""
                              }
                            >
                              {isCompleted
                                ? "Completed"
                                : completionPercentage > 0
                                ? "In Progress"
                                : "Not Started"}
                            </Badge>
                          </div>
                        </div>
                        {completionPercentage > 0 && (
                          <Progress
                            value={completionPercentage}
                            className="h-2"
                          />
                        )}
                        {attempts > 0 && (
                          <p className="text-xs text-muted-foreground mt-2">
                            {attempts} attempt{attempts !== 1 ? "s" : ""}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Analytics</CardTitle>
                <CardDescription>
                  Detailed analytics and insights about student performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Analytics coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Reports</CardTitle>
                <CardDescription>
                  Generate and download detailed progress reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Reports coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
