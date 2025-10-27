"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Progress } from "@/app/components-demo/ui/ui-components/progress";
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Play,
  TrendingUp,
  CheckCircle2,
  Award,
  Target,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

interface EnrolledCourse {
  id: string;
  title: string;
  description: string | null;
  slug: string | null;
  price: number;
  created_at: string;
  enrollment: {
    id: string;
    enrolled_at: string;
    is_active: boolean;
  };
  // Progress data
  totalLessons?: number;
  completedLessons?: number;
  progressPercentage?: number;
  totalTimeSpent?: number;
}

interface OverallStats {
  totalCourses: number;
  totalLessonsCompleted: number;
  totalTimeSpent: number;
  studyStreak: number;
  averageProgress: number;
}

export default function EnrolledCoursesPage() {
  const { user, profile } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [overallStats, setOverallStats] = useState<OverallStats>({
    totalCourses: 0,
    totalLessonsCompleted: 0,
    totalTimeSpent: 0,
    studyStreak: 0,
    averageProgress: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the supabase client to prevent recreation on every render
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("courses_enrollments")
          .select(
            `
            *,
            courses (*)
          `
          )
          .eq("student_id", user.id)
          .eq("is_active", true)
          .order("enrolled_at", { ascending: false });

        if (error) {
          throw error;
        }

        // Transform the data and fetch progress for each course
        const coursesWithProgress = await Promise.all(
          (data || []).map(async (item) => {
            const course = item.courses;

            // Get lesson count for this course
            const { count: totalLessons } = await supabase
              .from("courses_lessons")
              .select("*", { count: "exact", head: true })
              .eq("course_id", course.id);

            // Get completed lessons count
            const { count: completedLessons } = await supabase
              .from("user_progress")
              .select("*", { count: "exact", head: true })
              .eq("user_id", user.id)
              .eq("course_id", course.id)
              .eq("completed", true);

            // Get real time spent from user_progress table
            const { data: progressData } = await supabase
              .from("user_progress")
              .select("time_spent_minutes")
              .eq("user_id", user.id)
              .eq("course_id", course.id);

            const timeSpent =
              progressData?.reduce(
                (sum, progress) => sum + (progress.time_spent_minutes || 0),
                0
              ) || 0;

            const progressPercentage = totalLessons
              ? Math.round(((completedLessons || 0) / totalLessons) * 100)
              : 0;

            return {
              ...course,
              enrollment: {
                id: item.id,
                enrolled_at: item.enrolled_at,
                is_active: item.is_active,
              },
              totalLessons: totalLessons || 0,
              completedLessons: completedLessons || 0,
              progressPercentage,
              totalTimeSpent: timeSpent,
            };
          })
        );

        setEnrolledCourses(coursesWithProgress);

        // Calculate overall stats
        const totalLessonsCompleted = coursesWithProgress.reduce(
          (sum, course) => sum + (course.completedLessons || 0),
          0
        );
        const totalTimeSpent = coursesWithProgress.reduce(
          (sum, course) => sum + (course.totalTimeSpent || 0),
          0
        );
        const averageProgress =
          coursesWithProgress.length > 0
            ? Math.round(
                coursesWithProgress.reduce(
                  (sum, course) => sum + (course.progressPercentage || 0),
                  0
                ) / coursesWithProgress.length
              )
            : 0;

        // Calculate study streak from user activity
        const studyStreak = await calculateStudyStreak(user.id, supabase);

        setOverallStats({
          totalCourses: coursesWithProgress.length,
          totalLessonsCompleted,
          totalTimeSpent,
          studyStreak,
          averageProgress,
        });
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
        setError("Failed to load enrolled courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user?.id, supabase]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Calculate study streak from user activity
  const calculateStudyStreak = async (userId: string, supabase: any) => {
    try {
      // Get all last_accessed_at dates from user_progress
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("last_accessed_at")
        .eq("user_id", userId)
        .order("last_accessed_at", { ascending: false });

      if (!progressData || progressData.length === 0) return 0;

      // Get unique dates (convert to date strings to group by day)
      const uniqueDates = new Set(
        progressData.map((item: any) =>
          new Date(item.last_accessed_at).toDateString()
        )
      );

      const sortedDates = Array.from(uniqueDates)
        .map((dateStr) => new Date(dateStr as string))
        .sort((a, b) => b.getTime() - a.getTime());

      // Calculate consecutive days from today backwards
      let streak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < sortedDates.length; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        checkDate.setHours(0, 0, 0, 0);

        const hasActivity = sortedDates.some((date) => {
          const activityDate = new Date(date);
          activityDate.setHours(0, 0, 0, 0);
          return activityDate.getTime() === checkDate.getTime();
        });

        if (hasActivity) {
          streak++;
        } else {
          break;
        }
      }

      return streak;
    } catch (error) {
      console.error("Error calculating study streak:", error);
      return 0;
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Please log in to view your courses
          </h1>
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffefd] to-[#feefea]">
      <div className="container mx-auto px-4 py-8">
        {/* Overall Stats */}
        {!isLoading && !error && enrolledCourses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Courses Enrolled
                    </p>
                    <p className="text-2xl font-bold">
                      {overallStats.totalCourses}
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Lessons Completed
                    </p>
                    <p className="text-2xl font-bold">
                      {overallStats.totalLessonsCompleted}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Time Spent</p>
                    <p className="text-2xl font-bold">
                      {formatTime(overallStats.totalTimeSpent)}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Study Streak
                    </p>
                    <p className="text-2xl font-bold">
                      {overallStats.studyStreak} days
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your courses...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        )}

        {!isLoading && !error && enrolledCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              No courses enrolled yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Start your learning journey by enrolling in a course
            </p>
            <Link href="/courses/discover">
              <Button>
                Browse Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {!isLoading && !error && enrolledCourses.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description || "No description available"}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={course.price === 0 ? "secondary" : "default"}
                    >
                      {course.price === 0 ? "Free" : `₹${course.price}`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Section */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          {course.progressPercentage || 0}%
                        </span>
                      </div>
                      <Progress
                        value={course.progressPercentage || 0}
                        className="h-2"
                      />
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <span>{course.completedLessons || 0} completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {(course.totalLessons || 0) -
                            (course.completedLessons || 0)}{" "}
                          remaining
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{formatTime(course.totalTimeSpent || 0)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>
                          Enrolled {formatDate(course.enrollment.enrolled_at)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        href={`/courses/${course.slug || course.id}`}
                        className="flex-1"
                      >
                        <Button
                          className="w-full rounded-sm bg-[#e27447] hover:bg-[#d1653a]"
                          size="sm"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-sm"
                      >
                        <BarChart3 className="w-4 h-4" />
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
