"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components-demo/ui/tabs";
import { Users, BookOpen, Plus, Trash2, Search } from "lucide-react";

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
  is_free: boolean;
  price: number;
  status: string;
}

interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  is_active: boolean;
  enrolled_at: string;
  user?: User;
  course?: Course;
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

  useEffect(() => {
    // Only load data if user is admin
    if (currentUser && profile?.role === "admin") {
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [currentUser, profile]);

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

      console.log("Loading data...");

      // Load users
      console.log("Loading users...");
      const { data: usersData, error: usersError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (usersError) {
        console.error("Users error:", usersError);
        throw usersError;
      }
      console.log("Users loaded:", usersData?.length || 0);
      setUsers(usersData || []);

      // Load courses
      console.log("Loading courses...");
      const { data: coursesData, error: coursesError } = await supabase
        .from("courses")
        .select("id, title, slug, is_free, price, status")
        .order("title");

      if (coursesError) {
        console.error("Courses error:", coursesError);
        throw coursesError;
      }
      console.log("Courses loaded:", coursesData?.length || 0);
      setCourses(coursesData || []);

      // Load enrollments with user and course details
      console.log("Loading enrollments...");

      // First try simple query
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from("courses_enrollments")
        .select("*")
        .order("enrolled_at", { ascending: false });

      if (enrollmentsError) {
        console.error("Enrollments error:", enrollmentsError);
        throw enrollmentsError;
      }
      console.log("Enrollments loaded:", enrollmentsData?.length || 0);
      setEnrollments(enrollmentsData || []);

      console.log("Data loading completed successfully");
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
      loadData(); // Refresh data

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error enrolling user:", err);
      setError(err instanceof Error ? err.message : "Failed to enroll user");
    }
  };

  const handleUnenrollUser = async (enrollmentId: string) => {
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

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const searchLower = searchTerm.toLowerCase();
    const userName = `${enrollment.user?.first_name || ""} ${
      enrollment.user?.last_name || ""
    }`.toLowerCase();
    const userEmail = enrollment.user?.email?.toLowerCase() || "";
    const courseTitle = enrollment.course?.title?.toLowerCase() || "";

    return (
      userName.includes(searchLower) ||
      userEmail.includes(searchLower) ||
      courseTitle.includes(searchLower)
    );
  });

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            User Enrollment Management
          </h1>
          <p className="text-muted-foreground">
            Manage user enrollments and course access
          </p>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              <strong>Error:</strong> {error}
              <br />
              <small className="text-red-600">
                Check the browser console for more details.
              </small>
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="enrollments" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="enrollments">All Enrollments</TabsTrigger>
            <TabsTrigger value="enroll">Enroll User</TabsTrigger>
          </TabsList>

          <TabsContent value="enrollments" className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search enrollments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-sm"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {filteredEnrollments.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No enrollments found
                    </h3>
                    <p className="text-muted-foreground">
                      {searchTerm
                        ? "Try adjusting your search terms"
                        : "No users are enrolled in any courses yet"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredEnrollments.map((enrollment) => (
                  <Card key={enrollment.id} className="rounded-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-semibold">
                                {enrollment.user?.first_name}{" "}
                                {enrollment.user?.last_name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {enrollment.user?.email}
                              </p>
                            </div>
                            <div className="text-muted-foreground">→</div>
                            <div>
                              <h3 className="font-semibold">
                                {enrollment.course?.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {enrollment.course?.slug}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                enrollment.is_active ? "default" : "secondary"
                              }
                            >
                              {enrollment.is_active ? "Active" : "Inactive"}
                            </Badge>
                            <Badge variant="outline">
                              {enrollment.course?.is_free
                                ? "Free"
                                : `₹${enrollment.course?.price}`}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Enrolled:{" "}
                              {new Date(
                                enrollment.enrolled_at
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {enrollment.is_active && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUnenrollUser(enrollment.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-sm"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Unenroll
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="enroll" className="space-y-6">
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Enroll User in Course
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                {course.is_free ? "Free" : `₹${course.price}`} •{" "}
                                {course.status}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleEnrollUser}
                  disabled={!selectedUserId || !selectedCourseId}
                  className="w-full rounded-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Enroll User
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#e27447]">
                      {users.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Users
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#e27447]">
                      {courses.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Courses
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#e27447]">
                      {enrollments.filter((e) => e.is_active).length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Enrollments
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
