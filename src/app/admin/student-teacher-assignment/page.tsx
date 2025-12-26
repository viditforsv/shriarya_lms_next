"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/design-system/components/ui/button";
import { Card, CardContent } from "@/design-system/components/ui/card";
import { Badge } from "@/design-system/components/ui/badge";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { Input } from "@/design-system/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/components/select";
import {
  Users,
  Search,
  GraduationCap,
  BookOpen,
  RefreshCw,
} from "lucide-react";

interface Teacher {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
}

interface Student {
  id: string;
  student_id: string;
  course_id: string;
  enrolled_at: string;
  is_active: boolean;
  assigned_teacher_id?: string;
  course: {
    id: string;
    title: string;
    slug: string;
  };
  user: {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    role: string;
  };
}

export default function StudentTeacherAssignmentPage() {
  const { user: currentUser, profile } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser && profile?.role === "admin") {
      loadData();
    }
  }, [currentUser, profile]);

  useEffect(() => {
    filterStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeacher, selectedCourse, searchTerm, students]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const supabase = createClient();

      // Load teachers (users with teacher or admin role)
      const { data: teachersData, error: teachersError } = await supabase
        .from("profiles")
        .select("*")
        .in("role", ["teacher", "admin"])
        .order("first_name");

      if (teachersError) throw teachersError;
      setTeachers(teachersData || []);

      // Load all enrollments with student and course info
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from("courses_enrollments")
        .select(
          `
            id,
            student_id,
            course_id,
            enrolled_at,
            is_active,
            assigned_teacher_id,
            enrollment_type,
            user:student_id (id, email, first_name, last_name, role),
            course:course_id (id, title, slug)
          `
        )
        .eq("is_active", true)
        .eq("enrollment_type", "student")
        .order("enrolled_at", { ascending: false });

      if (enrollmentsError) throw enrollmentsError;

      const transformedEnrollments = (enrollmentsData || []).map(
        (e: {
          id: string;
          student_id: string;
          course_id: string;
          enrolled_at: string;
          is_active: boolean;
          assigned_teacher_id?: string;
          enrollment_type: string;
          user: Array<{
            id: string;
            email: string;
            first_name: string | null;
            last_name: string | null;
            role: string;
          }>;
          course: Array<{
            id: string;
            title: string;
            slug: string;
          }>;
        }) => ({
          ...e,
          user: Array.isArray(e.user) ? e.user[0] : e.user,
          course: Array.isArray(e.course) ? e.course[0] : e.course,
        })
      );

      setStudents(transformedEnrollments);
      setFilteredStudents(transformedEnrollments);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const loadStudentsData = async () => {
    try {
      const supabase = createClient();

      // Load only enrollments
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from("courses_enrollments")
        .select(
          `
            id,
            student_id,
            course_id,
            enrolled_at,
            is_active,
            assigned_teacher_id,
            enrollment_type,
            user:student_id (id, email, first_name, last_name, role),
            course:course_id (id, title, slug)
          `
        )
        .eq("is_active", true)
        .eq("enrollment_type", "student")
        .order("enrolled_at", { ascending: false });

      if (enrollmentsError) throw enrollmentsError;

      const transformedEnrollments = (enrollmentsData || []).map(
        (e: {
          id: string;
          student_id: string;
          course_id: string;
          enrolled_at: string;
          is_active: boolean;
          assigned_teacher_id?: string;
          enrollment_type: string;
          user: Array<{
            id: string;
            email: string;
            first_name: string | null;
            last_name: string | null;
            role: string;
          }>;
          course: Array<{
            id: string;
            title: string;
            slug: string;
          }>;
        }) => ({
          ...e,
          user: Array.isArray(e.user) ? e.user[0] : e.user,
          course: Array.isArray(e.course) ? e.course[0] : e.course,
        })
      );

      setStudents(transformedEnrollments);
    } catch (err) {
      console.error("Error loading students:", err);
    }
  };

  const filterStudents = () => {
    let filtered = students;

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (student) =>
          student.user.first_name?.toLowerCase().includes(searchLower) ||
          student.user.last_name?.toLowerCase().includes(searchLower) ||
          student.user.email?.toLowerCase().includes(searchLower) ||
          student.course.title?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by teacher
    if (selectedTeacher !== "all") {
      filtered = filtered.filter(
        (student) => student.assigned_teacher_id === selectedTeacher
      );
    }

    // Filter by course
    if (selectedCourse !== "all") {
      filtered = filtered.filter(
        (student) => student.course_id === selectedCourse
      );
    }

    setFilteredStudents(filtered);
  };

  const handleAssignTeacher = async (
    enrollmentId: string,
    teacherId: string
  ) => {
    if (!teacherId) {
      return;
    }

    try {
      const response = await fetch("/api/admin/enrollments/assign-teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enrollmentId, teacherId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to assign teacher");
      }

      setSuccess("Teacher assigned successfully!");
      setTimeout(() => setSuccess(null), 3000);

      // Refresh only students data (keeping teachers list)
      await loadStudentsData();
    } catch (err) {
      console.error("Error assigning teacher:", err);
      setError(err instanceof Error ? err.message : "Failed to assign teacher");
    }
  };

  // Get unique courses for filter
  const uniqueCourses = Array.from(
    new Set(students.map((s) => s.course_id))
  ).map((id) => {
    const student = students.find((s) => s.course_id === id);
    return {
      id,
      title: student?.course.title || "Unknown Course",
    };
  });

  if (!currentUser || profile?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You need admin privileges to access this page.
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
          <p className="text-muted-foreground">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Admin", href: "/admin/site-administration" },
              { label: "Student-Teacher Assignment", isActive: true },
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
                Student-Teacher Assignment
              </h1>
              <p className="text-muted-foreground">
                Assign teachers to students for personalized instruction and
                grading
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => loadData()}
              className="rounded-sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6 rounded-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by student name, email, or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-sm"
                />
              </div>

              {/* Teacher Filter */}
              <Select
                value={selectedTeacher}
                onValueChange={setSelectedTeacher}
              >
                <SelectTrigger className="rounded-sm">
                  <SelectValue placeholder="Filter by teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teachers</SelectItem>
                  {teachers.map((teacher) => {
                    const displayName =
                      teacher.first_name || teacher.last_name
                        ? `${teacher.first_name || ""} ${
                            teacher.last_name || ""
                          }`.trim()
                        : teacher.email || "Unknown User";
                    return (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {displayName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {/* Course Filter */}
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="rounded-sm">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {uniqueCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-red-800">
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm text-green-800">
            {success}
          </div>
        )}

        {/* Students Table */}
        {filteredStudents.length === 0 ? (
          <Card className="p-12 text-center rounded-sm">
            <div className="max-w-md mx-auto">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No students found</h3>
              <p className="text-muted-foreground">
                {searchTerm ||
                selectedTeacher !== "all" ||
                selectedCourse !== "all"
                  ? "Try adjusting your filters"
                  : "No enrolled students yet"}
              </p>
            </div>
          </Card>
        ) : (
          <Card className="rounded-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Student
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Course
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Assigned Teacher
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => {
                    const currentTeacher = teachers.find(
                      (t) => t.id === student.assigned_teacher_id
                    );

                    return (
                      <tr
                        key={student.id}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              {student.user.first_name || student.user.last_name
                                ? `${student.user.first_name || ""} ${
                                    student.user.last_name || ""
                                  }`.trim()
                                : student.user.email || "Unknown Student"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-muted-foreground">
                            {student.user.email}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                              {student.course.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {currentTeacher ? (
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-sm">
                              {currentTeacher.first_name ||
                              currentTeacher.last_name
                                ? `${currentTeacher.first_name || ""} ${
                                    currentTeacher.last_name || ""
                                  }`.trim()
                                : currentTeacher.email || "Unknown User"}
                            </Badge>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              No teacher assigned
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Select
                            value={student.assigned_teacher_id || ""}
                            onValueChange={(teacherId) =>
                              handleAssignTeacher(student.id, teacherId)
                            }
                          >
                            <SelectTrigger className="w-[200px] rounded-sm">
                              <SelectValue placeholder="Assign teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              {teachers.map((teacher) => {
                                const displayName =
                                  teacher.first_name || teacher.last_name
                                    ? `${teacher.first_name || ""} ${
                                        teacher.last_name || ""
                                      }`.trim()
                                    : teacher.email || "Unknown User";
                                return (
                                  <SelectItem
                                    key={teacher.id}
                                    value={teacher.id}
                                  >
                                    {displayName}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
