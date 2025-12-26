"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { Badge } from "@/design-system/components/ui/badge";
import {
  BookOpen,
  FileText,
  TrendingUp,
  Award,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  totalCourses: number;
  pendingAssignments: number;
  recentActivity: number;
  masteryCounts: {
    red: number;
    yellow: number;
    green: number;
  };
  enrollments: Array<{
    id: string;
    enrolled_at: string;
    courses: {
      id: string;
      title: string;
      slug: string;
      thumbnail_url: string;
      curriculum: string;
      subject: string;
      grade: string;
    };
  }>;
  assignments: Array<{
    id: string;
    title: string;
    due_date: string;
    status: string;
    courses: {
      id: string;
      title: string;
      slug: string;
    };
  }>;
  recentProgress: Array<{
    id: string;
    created_at: string;
    is_correct: boolean;
    time_taken_seconds: number;
    question_bank: {
      question_text: string;
      total_marks: number;
    };
  }>;
}

export default function StudentDashboard() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    pendingAssignments: 0,
    recentActivity: 0,
    masteryCounts: { red: 0, yellow: 0, green: 0 },
    enrollments: [],
    assignments: [],
    recentProgress: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/student/dashboard");
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("Error loading dashboard:", err);
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || (profile?.role !== "student" && profile?.role !== "admin")) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You need student privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Student Dashboard", isActive: true },
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Student Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.first_name || "Student"}. Continue your
            learning journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    My Courses
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.totalCourses}
                  </p>
                </div>
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Pending Assignments
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.pendingAssignments}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Concepts Mastered
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.masteryCounts.green}
                  </p>
                </div>
                <Award className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Recent Activity
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.recentActivity}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-red-800">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Mastery Status */}
        {(stats.masteryCounts.red > 0 ||
          stats.masteryCounts.yellow > 0 ||
          stats.masteryCounts.green > 0) && (
          <Card className="mb-8 rounded-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Concept Mastery
              </CardTitle>
              <CardDescription>
                Your progress across different concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-sm">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Needs Practice
                    </p>
                    <p className="text-xl font-bold text-red-600">
                      {stats.masteryCounts.red}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-sm">
                  <Clock className="w-6 h-6 text-yellow-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Developing</p>
                    <p className="text-xl font-bold text-yellow-600">
                      {stats.masteryCounts.yellow}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-sm">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Mastered</p>
                    <p className="text-xl font-bold text-green-600">
                      {stats.masteryCounts.green}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrolled Courses */}
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                My Enrolled Courses
              </CardTitle>
              <CardDescription>Continue learning</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.enrollments.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    No courses enrolled yet
                  </p>
                  <Link href="/courses/discover">
                    <Button className="mt-4 rounded-sm">Browse Courses</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {stats.enrollments.slice(0, 3).map((enrollment) => (
                    <Link
                      key={enrollment.id}
                      href={`/courses/${enrollment.courses.slug}`}
                    >
                      <div className="flex items-center gap-3 p-3 border rounded-sm hover:bg-primary/10 transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-[#e27447]/10 rounded-sm flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {enrollment.courses.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {enrollment.courses.curriculum} • Grade{" "}
                            {enrollment.courses.grade}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                  {stats.enrollments.length > 3 && (
                    <Link href="/courses/enrolled">
                      <Button
                        variant="outline"
                        className="w-full mt-3 rounded-sm"
                      >
                        View All Courses
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pending Assignments */}
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Pending Assignments
              </CardTitle>
              <CardDescription>Submissions awaiting review</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.assignments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    No pending assignments
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {stats.assignments.slice(0, 3).map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-center justify-between p-3 border rounded-sm"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-50 rounded-sm flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {assignment.courses.title}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="rounded-sm">
                        {formatDate(assignment.due_date)}
                      </Badge>
                    </div>
                  ))}
                  {stats.assignments.length > 3 && (
                    <Link href="/student/graded-assignments">
                      <Button
                        variant="outline"
                        className="w-full mt-3 rounded-sm"
                      >
                        View All Assignments
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
