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
import { Badge } from "@/design-system/components/ui/badge";
import {
  Users,
  BookOpen,
  FileText,
  GraduationCap,
  ChevronRight,
  LayoutDashboard,
  Settings,
  Home,
} from "lucide-react";
import Link from "next/link";

interface Student {
  id: string;
  student_id: string;
  course_id: string;
  enrolled_at: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  course: {
    id: string;
    title: string;
    slug: string;
    subject: string;
    grade: string;
  };
  pendingSubmissions: number;
}

export default function TeacherDashboard() {
  const { user, profile } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadStudents();
    }
  }, [user]);

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/teacher/students");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data.students || []);
    } catch (err) {
      console.error("Error loading students:", err);
      setError(err instanceof Error ? err.message : "Failed to load students");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || (profile?.role !== "teacher" && profile?.role !== "admin")) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You need teacher or admin privileges to access this page.
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

  const stats = {
    totalStudents: students.length,
    totalPending: students.reduce((sum, s) => sum + s.pendingSubmissions, 0),
    activeCourses: new Set(students.map((s) => s.course.id)).size,
  };

  // Group students by course
  const studentsByCourse = students.reduce((acc, student) => {
    const courseId = student.course.id;
    if (!acc[courseId]) {
      acc[courseId] = {
        course: student.course,
        students: [],
      };
    }
    acc[courseId].students.push(student);
    return acc;
  }, {} as Record<string, { course: Student["course"]; students: Student[] }>);

  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: "/teacher/dashboard",
      isActive: true,
    },
    {
      id: "students",
      label: "My Students",
      icon: <Users className="w-5 h-5" />,
      href: "#",
      badge:
        stats.totalStudents > 0 ? stats.totalStudents.toString() : undefined,
    },
    {
      id: "pending",
      label: "Pending",
      icon: <FileText className="w-5 h-5" />,
      href: "#",
      badge: stats.totalPending > 0 ? stats.totalPending.toString() : undefined,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shrink-0 sticky top-0 h-screen">
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <Badge variant="secondary" className="mb-2 rounded-sm">
              Preppeo LMS
            </Badge>
            <h2 className="text-xl font-bold text-foreground">
              Teacher Dashboard
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {profile?.first_name} {profile?.last_name}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item) => (
              <Link key={item.id} href={item.href || "#"}>
                <div
                  className={`flex items-center justify-between px-4 py-3 rounded-sm cursor-pointer transition-colors ${
                    item.isActive
                      ? "bg-amber-50 text-amber-700 border-l-2 border-amber-400"
                      : "text-foreground hover:bg-amber-50/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-700 border-slate-200 rounded-sm"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            ))}
          </nav>

          {/* Footer Links */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <Link href="/">
              <div className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-amber-50/40 rounded-sm transition-colors cursor-pointer">
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </div>
            </Link>
            <Link href="/profile">
              <div className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-amber-50/40 rounded-sm transition-colors cursor-pointer">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </div>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-8 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Teacher Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your assigned students and their submissions
            </p>
          </div>

          {/* Compact Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="rounded-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-50 rounded-sm flex items-center justify-center">
                      <Users className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Students
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stats.totalStudents}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-sm flex items-center justify-center">
                      <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Pending Submissions
                      </p>
                      <p className="text-2xl font-bold text-indigo-600">
                        {stats.totalPending}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-sm flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Active Courses
                      </p>
                      <p className="text-2xl font-bold text-emerald-600">
                        {stats.activeCourses}
                      </p>
                    </div>
                  </div>
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

          {/* Students by Course */}
          {Object.keys(studentsByCourse).length === 0 ? (
            <Card className="p-12 text-center rounded-sm">
              <div className="max-w-md mx-auto">
                <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No students assigned
                </h3>
                <p className="text-muted-foreground">
                  You don&apos;t have any students assigned to you yet.
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {Object.values(studentsByCourse).map(({ course, students }) => (
                <Card key={course.id} className="rounded-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-amber-600" />
                          {course.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {course.subject} • Grade {course.grade}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="rounded-sm">
                        {students.length} student
                        {students.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {students.map((student) => (
                        <Link
                          key={student.id}
                          href={`/teacher/submissions/${student.student_id}/${student.course_id}`}
                        >
                          <div className="flex items-center justify-between p-4 border rounded-sm hover:bg-amber-50/40 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-amber-50 rounded-sm flex items-center justify-center">
                                <Users className="w-5 h-5 text-amber-600" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {student.user.first_name}{" "}
                                  {student.user.last_name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {student.user.email}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              {student.pendingSubmissions > 0 && (
                                <Badge
                                  variant="default"
                                  className="bg-indigo-100 text-indigo-800 border-indigo-200 rounded-sm hover:bg-indigo-200"
                                >
                                  {student.pendingSubmissions} pending
                                </Badge>
                              )}
                              <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
