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
import { BookOpen, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface EnrolledCourse {
  id: string;
  title: string;
  slug: string | null;
  price: number;
  enrollment: {
    enrolled_at: string;
  };
}

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) return;

      try {
        setIsLoadingCourses(true);
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
          .order("enrolled_at", { ascending: false })
          .limit(3);

        if (error) {
          console.error("Error fetching enrolled courses:", error);
          return;
        }

        const courses =
          data?.map((item) => ({
            ...item.courses,
            enrollment: {
              enrolled_at: item.enrolled_at,
            },
          })) || [];

        setEnrolledCourses(courses);
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
      } finally {
        setIsLoadingCourses(false);
      }
    };

    fetchEnrolledCourses();
  }, [user, supabase]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {profile?.full_name || user?.email}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Student Dashboard Content */}
        <StudentOnly>
          <>
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>View your enrolled courses</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingCourses ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#e27447] mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Loading...</p>
                  </div>
                ) : enrolledCourses.length > 0 ? (
                  <div className="space-y-3">
                    {enrolledCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-sm"
                      >
                        <div className="flex items-center space-x-3">
                          <BookOpen className="w-5 h-5 text-[#e27447]" />
                          <div>
                            <p className="font-medium text-sm">
                              {course.title}
                            </p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {(course.price || 0) === 0 ? "Free" : "Paid"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Enrolled{" "}
                                {new Date(
                                  course.enrollment.enrolled_at
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link href={`/courses/${course.slug || course.id}`}>
                          <Button variant="outline" size="sm">
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    ))}
                    <Link href="/courses/enrolled">
                      <Button className="w-full mt-3">View All Courses</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      No courses enrolled yet
                    </p>
                    <Link href="/courses">
                      <Button size="sm">Browse Courses</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
                <CardDescription>Track your learning progress</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/progress">
                  <Button className="w-full">View Progress</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Question Bank</CardTitle>
                <CardDescription>
                  Browse and manage IBDP Mathematics questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-3">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    233 Questions Available
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Access past year questions, practice problems, and create
                  custom assessments.
                </p>
                <Link href="/question-bank">
                  <Button className="w-full">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Browse Question Bank
                  </Button>
                </Link>
              </CardContent>
            </Card>
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
