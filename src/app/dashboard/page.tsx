"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  AdminOnly,
  StudentOnly,
  ContentManagerOnly,
} from "@/app/components-demo/ui/form-components/RoleGuard";
import { MyAssignments } from "@/components/MyAssignments";
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
  ArrowRight,
  HelpCircle,
  PlayCircle,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface EnrolledCourse {
  id: string;
  title: string;
  slug: string | null;
  price: number;
  thumbnail_url?: string;
  enrollment: {
    enrolled_at: string;
  };
  progress?: number;
  lastAccessed?: string;
}

interface DashboardStats {
  totalCourses: number;
  completedLessons: number;
  totalLessons: number;
  studyStreak: number;
}

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [recentCourses, setRecentCourses] = useState<EnrolledCourse[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    completedLessons: 0,
    totalLessons: 0,
    studyStreak: 0,
  });
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        setIsLoadingCourses(true);
        setIsLoadingStats(true);

        // Fetch all enrolled courses
        const { data: enrollments, error: enrollError } = await supabase
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

        if (enrollError) {
          console.error("Error fetching enrolled courses:", enrollError);
        } else {
          const courses =
            enrollments?.map((item) => ({
              ...item.courses,
              enrollment: {
                enrolled_at: item.enrolled_at,
              },
            })) || [];

          setEnrolledCourses(courses);

          // Get recently accessed courses (last 3)
          const { data: progressData } = await supabase
            .from("user_progress")
            .select("course_id, last_accessed_at")
            .eq("user_id", user.id)
            .order("last_accessed_at", { ascending: false })
            .limit(3);

          if (progressData && progressData.length > 0) {
            const recentCourseIds = progressData.map((p) => p.course_id);
            const recent = courses
              .filter((c) => recentCourseIds.includes(c.id))
              .map((c) => ({
                ...c,
                lastAccessed:
                  progressData.find((p) => p.course_id === c.id)
                    ?.last_accessed_at || "",
              }));
            setRecentCourses(recent);
          }

          // Calculate stats
          const { count: totalLessons } = await supabase
            .from("user_progress")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id);

          const { count: completedLessons } = await supabase
            .from("user_progress")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id)
            .eq("completed", true);

          setStats({
            totalCourses: courses.length,
            completedLessons: completedLessons || 0,
            totalLessons: totalLessons || 0,
            studyStreak: 0, // TODO: Calculate actual streak
          });
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoadingCourses(false);
        setIsLoadingStats(false);
      }
    };

    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const overallProgress =
    stats.totalLessons > 0
      ? Math.round((stats.completedLessons / stats.totalLessons) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffefd] to-[#feefea]">
      <div className="container mx-auto px-4 py-8">
        {/* Student Dashboard Content */}
        <StudentOnly>
          <>
            {/* Welcome Hero Section */}
            <div className="bg-gradient-to-r from-[#e27447] to-[#ff8c66] rounded-sm p-8 mb-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {profile?.first_name || "Student"}! 👋
                  </h1>
                  <p className="text-white/90 text-lg">
                    Ready to continue your learning journey?
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{stats.totalCourses}</div>
                    <div className="text-sm text-white/80">Active Courses</div>
                  </div>
                  <div className="h-12 w-px bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{stats.completedLessons}</div>
                    <div className="text-sm text-white/80">Lessons Completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="rounded-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Overall Progress
                      </p>
                      <p className="text-2xl font-bold">{overallProgress}%</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <Progress value={overallProgress} className="mt-3" />
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Active Courses
                      </p>
                      <p className="text-2xl font-bold">{stats.totalCourses}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-[#e27447]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Lessons Completed
                      </p>
                      <p className="text-2xl font-bold">
                        {stats.completedLessons}/{stats.totalLessons}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Study Streak
                      </p>
                      <p className="text-2xl font-bold">{stats.studyStreak} days</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Continue Learning Section */}
            {recentCourses.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Continue Learning</h2>
                  <Link href="/courses/enrolled">
                    <Button variant="ghost" className="rounded-sm">
                      View All <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recentCourses.map((course) => (
                    <Card key={course.id} className="rounded-sm overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-32 bg-gradient-to-br from-[#e27447] to-[#ff8c66] flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">
                          {course.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>
                            Last accessed{" "}
                            {course.lastAccessed
                              ? new Date(course.lastAccessed).toLocaleDateString()
                              : "recently"}
                          </span>
                        </div>
                        {course.progress !== undefined && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} />
                          </div>
                        )}
                        <Link href={`/courses/${course.slug || course.id}`}>
                          <Button className="w-full rounded-sm bg-[#e27447] hover:bg-[#d1653a]">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Courses Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">My Courses</h2>
                <Link href="/courses">
                  <Button variant="outline" className="rounded-sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse More Courses
                  </Button>
                </Link>
              </div>

              {isLoadingCourses ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading your courses...</p>
                </div>
              ) : enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <Card key={course.id} className="rounded-sm hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1 line-clamp-2">
                              {course.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant="outline"
                                className="text-xs rounded-sm"
                              >
                                {(course.price || 0) === 0 ? "Free" : "Paid"}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(
                                  course.enrollment.enrolled_at
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link href={`/courses/${course.slug || course.id}`}>
                          <Button className="w-full rounded-sm" variant="outline">
                            View Course
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="rounded-sm">
                  <CardContent className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      No courses enrolled yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Start your learning journey by enrolling in a course
                    </p>
                    <Link href="/courses">
                      <Button className="rounded-sm bg-[#e27447] hover:bg-[#d1653a]">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Browse Courses
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        </StudentOnly>

        {/* Content Manager Dashboard Content */}
        <ContentManagerOnly>
          <MyAssignments />
        </ContentManagerOnly>

        {/* Admin Dashboard Content */}
        <AdminOnly>
          <>
            <Card>
              <CardHeader>
                <CardTitle>Site Administration</CardTitle>
                <CardDescription>
                  Access all administrative functions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/site-administration">
                  <Button className="w-full">Site Administration</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage students and admins</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/users">
                  <Button className="w-full">Manage Users</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>Create and manage courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/dashboard/courses/manage">
                    <Button className="w-full">Manage Courses</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View platform analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/analytics">
                  <Button className="w-full">View Analytics</Button>
                </Link>
              </CardContent>
            </Card>
          </>
        </AdminOnly>

        {/* Common Dashboard Content */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/profile">
              <Button className="w-full">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sign Out</CardTitle>
            <CardDescription>Sign out of your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
