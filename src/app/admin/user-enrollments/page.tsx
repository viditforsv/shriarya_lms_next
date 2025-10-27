"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Breadcrumb } from "@/app/components-demo/ui/breadcrumb";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import { Label } from "@/app/components-demo/ui/ui-components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components-demo/ui/select";
import {
  Alert,
  AlertDescription,
} from "@/app/components-demo/ui/ui-components/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components-demo/ui/dialog";
import {
  Users,
  BookOpen,
  Plus,
  Trash2,
  Search,
  UserPlus,
  TrendingUp,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface User {
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
  price: number;
  status: string;
}

interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  is_active: boolean;
  enrolled_at: string;
  assigned_teacher_id?: string;
  user?: User;
  course?: Course;
  assigned_teacher?: User;
}

export default function UserEnrollmentsPage() {
  const { user: currentUser, profile } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    // Only load data if user is admin
    if (currentUser && profile?.role === "admin") {
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [currentUser, profile]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // Check if user is admin - moved after hooks
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

  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Load users
      const { data: usersData, error: usersError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (usersError) throw usersError;
      setUsers(usersData || []);

      // Load courses
      const { data: coursesData, error: coursesError } = await supabase
        .from("courses")
        .select("id, title, slug, price, status")
        .order("title");

      if (coursesError) throw coursesError;
      setCourses(coursesData || []);

      // Load enrollments
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from("courses_enrollments")
        .select(
          `
          *,
          user:student_id (id, email, first_name, last_name, role, created_at),
          course:course_id (id, title, slug, price, status),
          assigned_teacher:assigned_teacher_id (id, email, first_name, last_name, role, created_at)
        `
        )
        .order("enrolled_at", { ascending: false });

      if (enrollmentsError) throw enrollmentsError;

      // Transform the data to match our interface
      const transformedEnrollments = (enrollmentsData || []).map((e: any) => ({
        ...e,
        user: Array.isArray(e.user) ? e.user[0] : e.user,
        course: Array.isArray(e.course) ? e.course[0] : e.course,
        assigned_teacher: Array.isArray(e.assigned_teacher)
          ? e.assigned_teacher[0]
          : e.assigned_teacher,
      }));

      setEnrollments(transformedEnrollments);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnrollUser = async () => {
    if (!selectedUserId || !selectedCourseId) {
      setError("Please select both a user and a course");
      return;
    }

    try {
      const supabase = createClient();

      // Check if enrollment already exists
      const { data: existingEnrollment } = await supabase
        .from("courses_enrollments")
        .select("id")
        .eq("student_id", selectedUserId)
        .eq("course_id", selectedCourseId)
        .single();

      if (existingEnrollment) {
        setError("User is already enrolled in this course");
        return;
      }

      // Create enrollment
      const { error } = await supabase.from("courses_enrollments").insert({
        student_id: selectedUserId,
        course_id: selectedCourseId,
        is_active: true,
      });

      if (error) throw error;

      setSuccess("User enrolled successfully!");
      setSelectedUserId("");
      setSelectedCourseId("");
      setIsDialogOpen(false);
      loadData(); // Refresh data

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error enrolling user:", err);
      setError(err instanceof Error ? err.message : "Failed to enroll user");
    }
  };

  const handleUnenrollUser = async (enrollmentId: string) => {
    if (!confirm("Are you sure you want to unenroll this user?")) return;

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("courses_enrollments")
        .update({ is_active: false })
        .eq("id", enrollmentId);

      if (error) throw error;

      setSuccess("User unenrolled successfully!");
      loadData(); // Refresh data

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error unenrolling user:", err);
      setError(err instanceof Error ? err.message : "Failed to unenroll user");
    }
  };

  const handleAssignTeacher = async (
    enrollmentId: string,
    teacherId: string
  ) => {
    // Don't assign if teacherId is empty
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
      loadData(); // Refresh data
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error assigning teacher:", err);
      setError(err instanceof Error ? err.message : "Failed to assign teacher");
    }
  };

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const searchLower = searchTerm.toLowerCase();
    const userName = `${enrollment.user?.first_name || ""} ${
      enrollment.user?.last_name || ""
    }`.toLowerCase();
    const userEmail = enrollment.user?.email?.toLowerCase() || "";
    const courseTitle = enrollment.course?.title?.toLowerCase() || "";

    const matchesSearch =
      userName.includes(searchLower) ||
      userEmail.includes(searchLower) ||
      courseTitle.includes(searchLower);

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && enrollment.is_active) ||
      (filterStatus === "inactive" && !enrollment.is_active);

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: enrollments.length,
    active: enrollments.filter((e) => e.is_active).length,
    inactive: enrollments.filter((e) => !e.is_active).length,
    thisMonth: enrollments.filter(
      (e) =>
        new Date(e.enrolled_at).getMonth() === new Date().getMonth() &&
        new Date(e.enrolled_at).getFullYear() === new Date().getFullYear()
    ).length,
  };

  // Pagination
  const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEnrollments = filteredEnrollments.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading enrollment data...</p>
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
              { label: "User Enrollments", isActive: true },
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
                Enrollment Management
              </h1>
              <p className="text-muted-foreground">
                Manage user enrollments and course access
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#e27447] hover:bg-[#d1653a] rounded-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Enroll User
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-sm">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <UserPlus className="w-5 h-5 mr-2 text-[#e27447]" />
                    Enroll User in Course
                  </DialogTitle>
                  <DialogDescription>
                    Select a user and course to create a new enrollment
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-select">Select User</Label>
                    <Select
                      value={selectedUserId}
                      onValueChange={setSelectedUserId}
                    >
                      <SelectTrigger className="rounded-sm">
                        <SelectValue placeholder="Choose a user..." />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            <div className="flex flex-col">
                              <span>
                                {user.first_name} {user.last_name}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {user.email}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course-select">Select Course</Label>
                    <Select
                      value={selectedCourseId}
                      onValueChange={setSelectedCourseId}
                    >
                      <SelectTrigger className="rounded-sm">
                        <SelectValue placeholder="Choose a course..." />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            <div className="flex flex-col">
                              <span>{course.title}</span>
                              <span className="text-sm text-muted-foreground">
                                {(course.price || 0) === 0
                                  ? "Free"
                                  : `₹${course.price}`}{" "}
                                • {course.status}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="rounded-sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleEnrollUser}
                    disabled={!selectedUserId || !selectedCourseId}
                    className="bg-[#e27447] hover:bg-[#d1653a] rounded-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Enroll User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="rounded-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Total Enrollments
                    </p>
                    <p className="text-2xl font-bold text-[#1e293b]">
                      {stats.total}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-[#e27447]" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Active Enrollments
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {stats.active}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Inactive Enrollments
                    </p>
                    <p className="text-2xl font-bold text-gray-600">
                      {stats.inactive}
                    </p>
                  </div>
                  <XCircle className="w-8 h-8 text-gray-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      This Month
                    </p>
                    <p className="text-2xl font-bold text-[#e27447]">
                      {stats.thisMonth}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-[#e27447]" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50 rounded-sm">
            <AlertDescription className="text-red-800">
              <strong>Error:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50 rounded-sm">
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by user name, email, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-sm"
            />
          </div>
          <Select
            value={filterStatus}
            onValueChange={(value: "all" | "active" | "inactive") =>
              setFilterStatus(value)
            }
          >
            <SelectTrigger className="w-[180px] rounded-sm">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Enrollments</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Enrollments Table */}
        {filteredEnrollments.length === 0 ? (
          <Card className="p-12 text-center rounded-sm">
            <div className="max-w-md mx-auto">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No enrollments found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filters"
                  : "Start by enrolling users in courses"}
              </p>
              {!searchTerm && filterStatus === "all" && (
                <Button
                  className="bg-[#e27447] hover:bg-[#d1653a] rounded-sm"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Enroll First User
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <Card className="rounded-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Course
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Enrolled
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Assigned Teacher
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEnrollments.map((enrollment) => (
                      <tr
                        key={enrollment.id}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-sm">
                              {enrollment.user?.first_name}{" "}
                              {enrollment.user?.last_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {enrollment.user?.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-sm">
                              {enrollment.course?.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {enrollment.course?.slug}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={
                              enrollment.is_active ? "default" : "secondary"
                            }
                            className="rounded-sm"
                          >
                            {enrollment.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm">
                            {(enrollment.course?.price || 0) === 0
                              ? "Free"
                              : `₹${enrollment.course?.price}`}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-muted-foreground">
                            {new Date(
                              enrollment.enrolled_at
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Select
                              value={enrollment.assigned_teacher_id || ""}
                              onValueChange={(teacherId) =>
                                handleAssignTeacher(enrollment.id, teacherId)
                              }
                            >
                              <SelectTrigger className="w-[200px] rounded-sm">
                                <SelectValue placeholder="Select teacher" />
                              </SelectTrigger>
                              <SelectContent>
                                {users
                                  .filter(
                                    (u) =>
                                      u.role === "teacher" || u.role === "admin"
                                  )
                                  .map((teacher) => (
                                    <SelectItem
                                      key={teacher.id}
                                      value={teacher.id}
                                    >
                                      {teacher.first_name} {teacher.last_name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {enrollment.is_active && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUnenrollUser(enrollment.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredEnrollments.length)} of{" "}
                  {filteredEnrollments.length} enrollments
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-sm"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        // Show first page, last page, current page, and pages around current
                        return (
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(page - currentPage) <= 1
                        );
                      })
                      .map((page, index, array) => {
                        // Add ellipsis
                        const prevPage = array[index - 1];
                        const showEllipsis = prevPage && page - prevPage > 1;

                        return (
                          <div key={page} className="flex items-center gap-1">
                            {showEllipsis && (
                              <span className="px-2 text-muted-foreground">
                                ...
                              </span>
                            )}
                            <Button
                              variant={
                                currentPage === page ? "primary" : "outline"
                              }
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className="rounded-sm min-w-10"
                            >
                              {page}
                            </Button>
                          </div>
                        );
                      })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
