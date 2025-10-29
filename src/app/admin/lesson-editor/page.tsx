"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Breadcrumb } from "@/app/components-demo/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components-demo/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components-demo/ui/tabs";
import {
  ArrowLeft,
  Search,
  Edit,
  Plus,
  BookOpen,
  FileText,
  Calculator,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  lesson_order: number;
  topic_number?: string;
  lesson_code?: string;
  chapter?: {
    id: string;
    chapter_name: string;
    chapter_order: number;
    unit?: {
      id: string;
      unit_name: string;
      unit_order: number;
    };
  };
}

interface Course {
  id: string;
  title: string;
  slug: string;
}

export default function AdminLessonEditorPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLessons, setTotalLessons] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  // Check admin access
  useEffect(() => {
    if (profile && profile.role !== "admin") {
      router.push("/dashboard");
    }
  }, [profile, router]);

  // Load courses
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (response.ok) {
          const data = await response.json();
          setCourses(data.courses || []);
        }
      } catch (error) {
        console.error("Error loading courses:", error);
        setError("Failed to load courses");
      }
    };

    loadCourses();
  }, []);

  // Load lessons when course is selected (initial load with pagination)
  useEffect(() => {
    if (selectedCourse) {
      loadLessons(selectedCourse, 1, "");
    } else {
      setLessons([]);
      setFilteredLessons([]);
      setCurrentPage(1);
      setTotalPages(1);
      setTotalLessons(0);
      setHasSearched(false);
    }
  }, [selectedCourse]);

  // Handle search with debouncing
  useEffect(() => {
    if (!selectedCourse) return;

    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        setHasSearched(true);
        loadLessons(selectedCourse, 1, searchQuery.trim());
      } else if (hasSearched) {
        // If user clears search, reload first page
        setHasSearched(false);
        loadLessons(selectedCourse, 1, "");
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCourse, hasSearched]);

  const loadLessons = async (
    courseSlug: string,
    page: number = 1,
    search: string = ""
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        course_slug: courseSlug,
        page: page.toString(),
        limit: "20", // Show 20 lessons per page
      });

      if (search) {
        params.append("search", search);
      }

      const response = await fetch(`/api/lessons?${params}`);
      if (response.ok) {
        const data = await response.json();
        setLessons(data.lessons || []);
        setFilteredLessons(data.lessons || []);
        setCurrentPage(data.pagination?.currentPage || 1);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalLessons(data.pagination?.total || 0);
      } else {
        setError("Failed to load lessons");
      }
    } catch (error) {
      console.error("Error loading lessons:", error);
      setError("Failed to load lessons");
    } finally {
      setIsLoading(false);
    }
  };

  if (profile?.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You need admin privileges to access this page.
          </p>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Admin", href: "/admin/site-administration" },
            { label: "Lesson Editor", isActive: true },
          ]}
        />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold">Lesson Content Editor</h1>
            <p className="text-muted-foreground">
              Manage lesson content, concepts, and formulas
            </p>
          </div>
        </div>

        {/* Course Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Course
            </label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="rounded-sm">
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.slug}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCourse && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Search Lessons
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by title, topic, or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 rounded-sm"
                />
              </div>
            </div>
          )}

          {selectedCourse && (
            <div className="flex items-end gap-2">
              <Button
                onClick={() =>
                  loadLessons(selectedCourse, currentPage, searchQuery)
                }
                variant="outline"
                className="rounded-sm"
              >
                Refresh
              </Button>
              {totalLessons > 0 && (
                <div className="text-sm text-muted-foreground">
                  {totalLessons} lessons total
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {!selectedCourse ? (
        <Card className="rounded-sm">
          <CardContent className="py-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Select a Course
            </h3>
            <p className="text-muted-foreground">
              Choose a course from the dropdown above to view and edit its
              lessons.
            </p>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <Card className="rounded-sm">
          <CardContent className="py-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading lessons...</p>
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="rounded-sm">
          <CardContent className="py-12 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => loadLessons(selectedCourse)}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : filteredLessons.length === 0 ? (
        <Card className="rounded-sm">
          <CardContent className="py-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Lessons Found
            </h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "No lessons match your search criteria."
                : "This course doesn't have any lessons yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="rounded-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="rounded-sm">
                        Lesson {lesson.lesson_order}
                      </Badge>
                      {lesson.topic_number && (
                        <Badge variant="outline" className="rounded-sm">
                          {lesson.topic_number}
                        </Badge>
                      )}
                      {lesson.lesson_code && (
                        <Badge variant="outline" className="rounded-sm">
                          {lesson.lesson_code}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2">
                      {lesson.title}
                    </CardTitle>
                    <CardDescription>
                      {lesson.chapter?.unit?.unit_name} →{" "}
                      {lesson.chapter?.chapter_name}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/lesson-editor/${lesson.id}`}>
                      <Button size="sm" className="rounded-sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Content
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Metadata fields removed to reduce noise */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {selectedCourse && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            onClick={() =>
              loadLessons(selectedCourse, currentPage - 1, searchQuery)
            }
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="rounded-sm"
          >
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <Button
            onClick={() =>
              loadLessons(selectedCourse, currentPage + 1, searchQuery)
            }
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="rounded-sm"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
