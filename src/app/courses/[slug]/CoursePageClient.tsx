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
  Play,
  ChevronRight,
  ShoppingCart,
  Eye,
  CheckCircle,
  Users,
  Edit,
  Save,
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RenderedCourse, CourseTemplate } from "@/types/course-templates";
import { DynamicCourseRenderer } from "@/components/DynamicCourseRenderer";
import { createClient } from "@/lib/supabase/client";
import { IBDPCourseStructure } from "@/components/IBDPCourseStructure";
import { UnifiedCourseStructure } from "@/components/UnifiedCourseStructure";
import { useCart } from "@/contexts/CartContext";

// Unit interface
interface Unit {
  id: string;
  unit_name: string;
  unit_order: number;
}

// Chapter interface
interface Chapter {
  id: string;
  chapter_name: string;
  chapter_order: number;
  unit_id: string;
  unit?: Unit;
}

// Simplified LessonConfig interface
interface LessonConfig {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  type: string;
  isPreview: boolean;
  order: number;
  resources: unknown[];
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

// Extended RenderedCourse with template_data fields
interface ExtendedCourse extends RenderedCourse {
  template_data?: {
    units?: unknown[];
    tags?: string[];
    learningOutcomes?: string[];
    prerequisites?: string[];
    examBoard?: string;
    academicYear?: string;
    textbookName?: string;
    duration?: string;
  };
}

export function CoursePageClient({
  courseParams,
}: {
  courseParams: { slug: string };
}) {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const { addToCart, isInCart } = useCart();

  // State
  const [course, setCourse] = useState<ExtendedCourse | null>(null);
  const [template, setTemplate] = useState<CourseTemplate | null>(null);
  const [lessons, setLessons] = useState<LessonConfig[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [lastLesson, setLastLesson] = useState<{
    slug: string;
    lesson_order: number;
  } | null>(null);
  const [unitCount, setUnitCount] = useState<number>(0);
  const [chapterCount, setChapterCount] = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(
    new Set()
  );
  const [courseStats, setCourseStats] = useState<{
    totalStudents: number;
    activeStudents: number;
    recentEnrollments: number;
    participants: Array<{
      enrollmentId: string;
      enrolledAt: string;
      isActive: boolean;
      student: {
        id: string;
        email: string;
        first_name: string | null;
        last_name: string | null;
        role: string;
        created_at: string;
      } | null;
    }>;
  } | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // Inline editing state for admins
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    title?: string;
    description?: string;
    price?: number;
    thumbnail_url?: string;
  }>({});
  const [saving, setSaving] = useState(false);

  // Check if user is admin
  const isAdmin = profile?.role === "admin";

  // Debug: Log admin status (can be removed later)
  useEffect(() => {
    if (profile) {
      console.log("Profile role:", profile.role, "isAdmin:", isAdmin);
    }
  }, [profile, isAdmin]);

  // Check if this is an IBDP Mathematics course
  const isIBDPMathCourse = courseParams.slug?.includes("ibdp-mathematics");

  // Use unified template as default for all courses (except IBDP which has specialized template)
  const useUnifiedTemplate = !isIBDPMathCourse;

  // Save course field changes (admin only)
  const handleSaveField = async (field: string) => {
    if (!isAdmin || !course?.id) return;

    setSaving(true);
    try {
      const updateData: Record<string, unknown> = {
        id: course.id,
        [field]: editValues[field as keyof typeof editValues],
      };

      // Convert price string to number if needed
      if (field === "price" && editValues.price !== undefined) {
        updateData.price =
          typeof editValues.price === "string"
            ? parseFloat(editValues.price) || 0
            : editValues.price;
      }

      const response = await fetch("/api/courses", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update course");
      }

      const { course: updatedCourse } = await response.json();

      // Update local state
      setCourse((prev) => (prev ? { ...prev, ...updatedCourse } : null));

      // Reset editing state
      setEditingField(null);
      setEditValues({});

      // Optionally reload the page to reflect all changes
      window.location.reload();
    } catch (err) {
      console.error("Error saving field:", err);
      alert(
        err instanceof Error
          ? err.message
          : "Failed to save changes. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Start editing a field
  const handleStartEdit = (field: string) => {
    if (!isAdmin || !course) return;

    setEditingField(field);
    setEditValues({
      [field]:
        field === "price"
          ? course.price || 0
          : course[field as keyof ExtendedCourse] || "",
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValues({});
  };

  // Toggle unit expansion
  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(unitId)) {
        newSet.delete(unitId);
      } else {
        newSet.add(unitId);
      }
      return newSet;
    });
  };

  // Allow public access - skip auth check
  useEffect(() => {
    // Auth context is ready (user can be null for public access)
    if (user === undefined) return;
    setAuthChecked(true);
  }, [user]);

  // Load course data
  useEffect(() => {
    if (!authChecked) return;

    const loadCourse = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch course with template
        const response = await fetch(
          `/api/courses/${courseParams.slug}/with-template`
        );

        if (!response.ok) {
          setError("Course not found");
          return;
        }

        const data = await response.json();
        console.log("API Response:", data);
        console.log("Raw course data:", data.course);
        console.log("Rendered course:", data.rendered);

        // Use raw database course ID for all queries
        const courseId = data.course?.id || data.rendered?.id;
        console.log("Course ID for database queries:", courseId);
        console.log("Course slug from params:", courseParams.slug);

        setCourse(data.rendered);
        setTemplate(data.template);

        // Check enrollment status (only if user is logged in)
        const supabase = createClient();
        if (user && courseId) {
          const { data: enrollment } = await supabase
            .from("courses_enrollments")
            .select("*")
            .eq("student_id", user.id)
            .eq("course_id", courseId)
            .eq("is_active", true)
            .maybeSingle();

          if (enrollment) {
            setIsEnrolled(true);

            // Get last accessed lesson
            const { data: progressData } = await supabase
              .from("user_progress")
              .select("lesson_slug, lesson_order")
              .eq("user_id", user.id)
              .eq("course_id", courseId)
              .order("last_accessed_at", { ascending: false })
              .limit(1)
              .maybeSingle();

            if (progressData) {
              setLastLesson({
                slug: progressData.lesson_slug,
                lesson_order: progressData.lesson_order,
              });
            }

            // Get completion statistics
            const { data: allProgress } = await supabase
              .from("user_progress")
              .select("is_completed, lesson_id")
              .eq("user_id", user.id)
              .eq("course_id", courseId);

            if (allProgress) {
              const completed = allProgress.filter(
                (p) => p.is_completed
              ).length;
              setCompletedLessons(completed);

              // Track which lessons are completed
              const completedIds = new Set(
                allProgress
                  .filter((p) => p.is_completed)
                  .map((p) => p.lesson_id)
              );
              setCompletedLessonIds(completedIds);
            }
          }
        }

        // Fetch course structure (units, chapters, lessons)
        if (!courseId) {
          console.error("No course ID available for lessons query");
          setIsLoading(false);
          return;
        }

        // Fetch units for this course
        const { data: unitsData, error: unitsError } = await supabase
          .from("courses_units")
          .select("id, unit_name, unit_order")
          .eq("course_id", courseId)
          .order("unit_order");

        console.log("Units data:", unitsData);
        console.log("Units error:", unitsError);

        // Fetch chapters for this course (through units)
        const { data: chaptersData, error: chaptersError } = await supabase
          .from("courses_chapters")
          .select(
            `
            id,
            chapter_name,
            chapter_order,
            unit_id,
            unit:courses_units!inner(
              id,
              unit_name,
              unit_order,
              course_id
            )
          `
          )
          .eq("unit.course_id", courseId)
          .order("chapter_order");

        console.log("Chapters data:", chaptersData);
        console.log("Chapters error:", chaptersError);

        // Fetch lessons with unit/chapter structure
        const { data: lessonsData, error: lessonsError } = await supabase
          .from("courses_lessons")
          .select(
            `
            id,
            slug,
            title,
            content,
            lesson_order,
            is_preview,
            chapter_id,
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
          .eq("course_id", courseId)
          .order("lesson_order");

        console.log("Lessons query error:", lessonsError);
        console.log("Lessons data:", lessonsData);
        console.log("Lessons count:", lessonsData?.length || 0);

        // Process lessons if they exist
        if (!lessonsError && lessonsData) {
          // Log first lesson to see structure
          if (lessonsData.length > 0) {
            console.log("First lesson sample:", lessonsData[0]);
            console.log("First lesson chapter:", lessonsData[0].chapter);
          }

          const convertedLessons: LessonConfig[] = (
            lessonsData as Record<string, unknown>[]
          ).map((lesson) => ({
            id: lesson.id as string,
            slug: lesson.slug as string,
            title: lesson.title as string,
            description: (lesson.content || "") as string,
            duration: "45 minutes",
            type: "video",
            isPreview: Boolean(lesson.is_preview),
            order: lesson.lesson_order as number,
            resources: [],
            chapter: lesson.chapter as LessonConfig["chapter"],
          }));

          console.log("Converted lessons:", convertedLessons);
          console.log(
            "Lessons with chapters:",
            convertedLessons.filter((l) => l.chapter).length
          );
          setLessons(convertedLessons);

          // Calculate progress percentage after lessons are loaded
          if (user && courseId && convertedLessons.length > 0) {
            const { data: allProgress } = await supabase
              .from("user_progress")
              .select("is_completed, lesson_id")
              .eq("user_id", user.id)
              .eq("course_id", courseId);

            if (allProgress) {
              const completed = allProgress.filter(
                (p) => p.is_completed
              ).length;
              setCompletedLessons(completed);
              const percentage = Math.round(
                (completed / convertedLessons.length) * 100
              );
              setProgressPercentage(percentage);

              // Track which lessons are completed
              const completedIds = new Set(
                allProgress
                  .filter((p) => p.is_completed)
                  .map((p) => p.lesson_id)
              );
              setCompletedLessonIds(completedIds);
            }
          }
        }

        // Set unit and chapter counts from database data
        if (!unitsError && unitsData) {
          setUnits(unitsData as Unit[]);
          setUnitCount(unitsData.length);
        }
        if (!chaptersError && chaptersData) {
          // Transform chapters data to match our interface
          interface ChapterData {
            id: string;
            chapter_name: string;
            chapter_order: number;
            unit_id: string;
            unit?: Unit | Unit[];
          }

          const transformedChapters: Chapter[] = (chaptersData as ChapterData[]).map(
            (chapter) => ({
              id: chapter.id,
              chapter_name: chapter.chapter_name,
              chapter_order: chapter.chapter_order,
              unit_id: chapter.unit_id,
              unit: Array.isArray(chapter.unit)
                ? chapter.unit[0]
                : chapter.unit,
            })
          );
          setChapters(transformedChapters);
          setChapterCount(transformedChapters.length);
        }

        // Fetch last accessed lesson
        try {
          const lastLessonResponse = await fetch(
            `/api/user-progress/last-lesson?course_slug=${courseParams.slug}`
          );
          if (lastLessonResponse.ok) {
            const lastLessonData = await lastLessonResponse.json();
            setLastLesson(lastLessonData.lastLesson);
          }
        } catch (error) {
          console.error("Error fetching last lesson:", error);
        }

        // Fetch course stats if user is admin
        if (profile?.role === "admin" && courseId) {
          try {
            setLoadingStats(true);
            const statsResponse = await fetch(
              `/api/courses/${courseParams.slug}/stats`
            );
            if (statsResponse.ok) {
              const statsData = await statsResponse.json();
              setCourseStats(statsData);
            } else {
              console.error("Failed to fetch course stats");
            }
          } catch (error) {
            console.error("Error fetching course stats:", error);
          } finally {
            setLoadingStats(false);
          }
        }
      } catch (err) {
        console.error("Error loading course:", err);
        setError("Course not found");
      } finally {
        setIsLoading(false);
      }
    };

    loadCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseParams.slug, user?.id, authChecked, profile?.role]);

  const handleAddToCart = () => {
    if (!course) return;

    if (!user) {
      // Redirect to login with return URL
      const returnUrl = encodeURIComponent(`/courses/${courseParams.slug}`);
      router.push(`/auth?redirect=${returnUrl}`);
      return;
    }

    addToCart({
      courseId: course.id,
      courseSlug: course.slug,
      title: course.title,
      price: course.price || 0,
      thumbnail: course.thumbnail,
    });

    alert("✅ Added to cart!");
  };

  const handlePreviewCourse = () => {
    // Find the first lesson that has preview access
    const firstPreviewLesson = lessons.find((lesson) => lesson.isPreview);

    if (firstPreviewLesson) {
      // Navigate directly to the first preview lesson
      router.push(
        `/courses/${courseParams.slug}/lesson/${firstPreviewLesson.slug}`
      );
    } else {
      // If no preview lesson exists, show a message and expand content to show what's available
      alert("No preview lessons available for this course.");

      // Expand all units to show lessons
      const allUnitIds = units.map((_, index) => `unit-${index}`);
      setExpandedUnits(new Set(allUnitIds));

      // Scroll to content section
      const contentSection = document.querySelector('[value="content"]');
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: "smooth", block: "start" });
        // Click the content tab to show course structure
        const contentTab = contentSection as HTMLElement;
        contentTab.click();
      }
    }
  };

  const handleEnroll = async () => {
    console.log("handleEnroll called", {
      user: !!user,
      userId: user?.id,
      authLoading,
    });

    // Wait for auth to load
    if (authLoading) {
      console.log("Auth still loading, please wait...");
      return;
    }

    if (!user) {
      console.log("No user, redirecting to auth");
      // Redirect to login with return URL
      const returnUrl = encodeURIComponent(`/courses/${courseParams.slug}`);
      router.push(`/auth?redirect=${returnUrl}`);
      return;
    }

    if (!course?.id) {
      alert("Course information not available.");
      return;
    }

    console.log("Proceeding with enrollment", {
      courseId: course.id,
      price: course.price,
    });

    // Check if course is paid
    if ((course.price || 0) > 0) {
      // Paid course - redirect to payment page
      console.log("Paid course, redirecting to payment");
      router.push(`/courses/${courseParams.slug}/payment`);
      return;
    }

    // Free course - enroll directly
    try {
      console.log("🔍 DEBUG: Starting enrollment for course:", course.id);
      const supabase = createClient();
      const { error: enrollError } = await supabase
        .from("courses_enrollments")
        .insert({
          student_id: user.id,
          course_id: course.id,
          is_active: true,
        });

      if (enrollError) {
        console.error("Enrollment error:", enrollError);
        alert("Failed to enroll. Please try again.");
        return;
      }

      setIsEnrolled(true);

      // Redirect to first lesson
      const firstLesson = lessons[0];
      if (firstLesson) {
        router.push(`/courses/${courseParams.slug}/lesson/${firstLesson.slug}`);
      } else {
        alert("Successfully enrolled! You can now access all lessons.");
      }
    } catch (err) {
      console.error("Error enrolling:", err);
      alert("Failed to enroll. Please try again.");
    }
  };

  if (!authChecked || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "The course you are looking for does not exist."}
          </p>
          <Link href="/courses/discover">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {editingField === "title" ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={editValues.title || ""}
                      onChange={(e) =>
                        setEditValues({ ...editValues, title: e.target.value })
                      }
                      className="text-4xl font-bold text-foreground border-2 border-primary rounded-sm px-3 py-2 flex-1"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSaveField("title")}
                      disabled={saving}
                      className="rounded-sm bg-green-600 hover:bg-green-700"
                    >
                      {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleCancelEdit}
                      disabled={saving}
                      variant="outline"
                      className="rounded-sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 flex-1">
                    <h1 className="text-4xl font-bold text-foreground">
                      {course.title}
                    </h1>
                    {profile?.role === "admin" && (
                      <button
                        onClick={() => handleStartEdit("title")}
                        className="p-2 hover:bg-gray-100 rounded-sm transition-colors border border-gray-300 bg-white shadow-sm"
                        title="Edit title"
                      >
                        <Edit className="w-4 h-4 text-primary" />
                      </button>
                    )}
                  </div>
                )}
                {profile?.role === "admin" && (
                  <Badge className="bg-purple-600 text-white rounded-sm">
                    Admin Access
                  </Badge>
                )}
              </div>
              {editingField === "description" ? (
                <div className="mb-4">
                  <div className="flex items-start gap-2">
                    <textarea
                      value={editValues.description || ""}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          description: e.target.value,
                        })
                      }
                      className="text-xl text-muted-foreground border-2 border-primary rounded-sm px-3 py-2 flex-1 min-h-[100px]"
                      autoFocus
                    />
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveField("description")}
                        disabled={saving}
                        className="rounded-sm bg-green-600 hover:bg-green-700"
                      >
                        {saving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleCancelEdit}
                        disabled={saving}
                        variant="outline"
                        className="rounded-sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 relative">
                  <p className="text-xl text-muted-foreground">
                    {course.description || "No description available"}
                  </p>
                  {profile?.role === "admin" && (
                    <button
                      onClick={() => handleStartEdit("description")}
                      className="absolute top-0 right-0 p-2 hover:bg-gray-100 rounded-sm transition-colors border border-gray-300 bg-white shadow-sm"
                      title="Edit description"
                    >
                      <Edit className="w-4 h-4 text-primary" />
                    </button>
                  )}
                </div>
              )}
              <div className="flex items-center flex-wrap gap-2">
                {course.status === "draft" && (
                  <Badge
                    variant="outline"
                    className="border-blue-500 text-blue-700 bg-blue-50"
                  >
                    Upcoming
                  </Badge>
                )}
                {isEnrolled && (
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800"
                  >
                    Enrolled
                  </Badge>
                )}

                {course.curriculum && (
                  <Badge
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    {course.curriculum}
                  </Badge>
                )}
                {course.subject && (
                  <Badge
                    variant="outline"
                    className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors"
                  >
                    {course.subject}
                  </Badge>
                )}
                {course.grade && (
                  <Badge
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors"
                  >
                    {course.grade}
                  </Badge>
                )}
                {course.level && (
                  <Badge
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    {course.level}
                  </Badge>
                )}

                {(course.template_data?.tags || course.tags || [])
                  .filter((tag) => {
                    const lowerTag = tag.toLowerCase();
                    const unwantedTags = [
                      "board preparation",
                      "geometric constructions",
                      "algebra",
                      "geometry",
                      "statistics",
                      "probability",
                    ];

                    return !(
                      lowerTag === course.curriculum?.toLowerCase() ||
                      lowerTag === course.subject?.toLowerCase() ||
                      lowerTag === course.grade?.toLowerCase() ||
                      lowerTag === course.level?.toLowerCase() ||
                      unwantedTags.includes(lowerTag)
                    );
                  })
                  .map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>
            <div className="ml-6">
              {!isEnrolled ? (
                <div className="text-right space-y-3">
                  {(course.price || 0) > 0 || isAdmin ? (
                    editingField === "price" ? (
                      <div className="flex items-center justify-end gap-2 mb-2">
                        <span className="text-2xl font-bold text-primary">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={editValues.price || 0}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              price: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="text-2xl font-bold text-primary border-2 border-primary rounded-sm px-3 py-2 w-32 text-right"
                          autoFocus
                          min="0"
                          step="0.01"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleSaveField("price")}
                          disabled={saving}
                          className="rounded-sm bg-green-600 hover:bg-green-700"
                        >
                          {saving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleCancelEdit}
                          disabled={saving}
                          variant="outline"
                          className="rounded-sm"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-right mb-2 relative">
                        {(course.price || 0) > 0 && (
                          <div className="text-2xl font-bold text-primary">
                            ₹{course.price?.toLocaleString()}
                          </div>
                        )}
                        {profile?.role === "admin" && (
                          <button
                            onClick={() => handleStartEdit("price")}
                            className="absolute -top-1 -left-8 p-2 hover:bg-gray-100 rounded-sm transition-colors border border-gray-300 bg-white shadow-sm"
                            title="Edit price"
                          >
                            <Edit className="w-4 h-4 text-primary" />
                          </button>
                        )}
                      </div>
                    )
                  ) : null}
                  <div className="flex flex-col gap-2">
                    {/* Admin Access Button - Only for admins */}
                    {user && profile?.role === "admin" && (
                      <Button
                        onClick={() => {
                          // Find the first lesson and navigate to it
                          const firstLesson = lessons[0];
                          if (firstLesson) {
                            router.push(
                              `/courses/${courseParams.slug}/lesson/${firstLesson.slug}`
                            );
                          } else {
                            alert("No lessons available yet");
                          }
                        }}
                        className="rounded-sm bg-purple-600 hover:bg-purple-700 text-white font-medium"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Enter Course as Admin
                      </Button>
                    )}

                    {/* Preview Button - Only for logged-in, non-enrolled users */}
                    {user && !isEnrolled && profile?.role !== "admin" && (
                      <Button
                        onClick={handlePreviewCourse}
                        variant="outline"
                        className="rounded-sm border-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-medium"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Course Content
                      </Button>
                    )}

                    {/* Regular enrollment buttons - hide for admins */}
                    {profile?.role !== "admin" && (
                      <>
                        <Button
                          onClick={handleEnroll}
                          disabled={authLoading}
                          className="bg-primary hover:bg-primary/90 rounded-sm"
                        >
                          {authLoading
                            ? "Loading..."
                            : (course.price || 0) > 0
                            ? "Buy Now"
                            : "Enroll for Free"}
                        </Button>
                        {(course.price || 0) > 0 && (
                          <Button
                            onClick={handleAddToCart}
                            variant="outline"
                            disabled={isInCart(course.id) || authLoading}
                            className="rounded-sm"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {isInCart(course.id) ? "In Cart" : "Add to Cart"}
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  href={`/courses/${courseParams?.slug}/lesson/${
                    lastLesson
                      ? lastLesson.slug
                      : lessons[0]
                      ? lessons[0].slug
                      : "introduction"
                  }`}
                >
                  <Button className="bg-primary hover:bg-primary/90">
                    <Play className="w-4 h-4 mr-2" />
                    {isEnrolled ? "Continue Learning" : "Start Learning"}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList
                className={`grid w-full rounded-sm bg-primary/10 p-1 ${
                  isAdmin ? "grid-cols-3" : "grid-cols-2"
                }`}
              >
                <TabsTrigger
                  value="overview"
                  className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  Content
                </TabsTrigger>
                {isAdmin && (
                  <TabsTrigger
                    value="participants"
                    className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Participants
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                {template && course ? (
                  <DynamicCourseRenderer course={course} template={template} />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6">
                        {course?.description ||
                          "This course provides comprehensive learning materials and practical exercises."}
                      </p>

                      {/* Official CBSE Syllabus Link */}
                      {(courseParams.slug === "cbse-mathematics-class-9" ||
                        courseParams.slug === "cbse-mathematics-class-10") && (
                        <div className="mb-6 p-4 bg-primary/10 border border-primary rounded-sm">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <svg
                                className="w-6 h-6 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground mb-1">
                                Official CBSE Syllabus 2025-26
                              </h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                View the complete official CBSE Mathematics
                                syllabus document for detailed curriculum
                                information, learning objectives, and
                                examination guidelines.
                              </p>
                              <a
                                href="https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/Maths_Sec_2025-26.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-primary hover:text-[#d1653a] font-medium text-sm"
                              >
                                <span>Download Official Syllabus PDF</span>
                                <svg
                                  className="w-4 h-4 ml-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">
                            What you&apos;ll learn
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {(
                              course?.template_data?.learningOutcomes ||
                              course?.learningOutcomes ||
                              []
                            ).map((outcome, index) => (
                              <li key={index}>• {outcome}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">
                            Course includes
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                              • {lessons.length || course?.lessons} lessons
                            </li>
                            <li>
                              •{" "}
                              {course?.template_data?.duration ||
                                course?.duration ||
                                "Not specified"}{" "}
                              of content
                            </li>
                            <li>• Practice problems and assessments</li>
                            <li>• Certificate of completion</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="content" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    <CardDescription>{lessons.length} lessons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {useUnifiedTemplate ? (
                      <UnifiedCourseStructure
                        courseSlug={courseParams.slug}
                        showTopicNumbers={true}
                      />
                    ) : isIBDPMathCourse ? (
                      <IBDPCourseStructure courseSlug={courseParams.slug} />
                    ) : units.length > 0 ? (
                      <div className="space-y-2">
                        {units.map((unit, unitIndex) => {
                          const unitId = `unit-${unitIndex}`;
                          const isExpanded = expandedUnits.has(unitId);

                          // Get chapters for this unit
                          const unitChapters = chapters.filter(
                            (chapter) => chapter.unit_id === unit.id
                          );

                          // Get lessons for this unit (through chapters)
                          const unitLessons = lessons.filter((lesson) =>
                            unitChapters.some(
                              (chapter) => chapter.id === lesson.chapter?.id
                            )
                          );

                          return (
                            <div key={unitId} className="border rounded-sm">
                              {/* Unit Header */}
                              <div
                                className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                                onClick={() => toggleUnit(unitId)}
                              >
                                <div>
                                  <span className="font-semibold text-lg">
                                    {unitIndex + 1}. {unit.unit_name}
                                  </span>
                                  <span className="text-sm text-muted-foreground ml-2">
                                    ({unitChapters.length}{" "}
                                    {unitChapters.length === 1
                                      ? "chapter"
                                      : "chapters"}
                                    {unitLessons.length > 0 && (
                                      <span className="ml-1">
                                        • {unitLessons.length}{" "}
                                        {unitLessons.length === 1
                                          ? "lesson"
                                          : "lessons"}
                                      </span>
                                    )}
                                    )
                                  </span>
                                </div>
                                <ChevronRight
                                  className={`w-5 h-5 transition-transform ${
                                    isExpanded ? "rotate-90" : ""
                                  }`}
                                />
                              </div>

                              {/* Chapters List */}
                              {isExpanded && (
                                <div className="border-t">
                                  {unitChapters.map((chapter, chapterIndex) => {
                                    const chapterLessons = lessons.filter(
                                      (lesson) =>
                                        lesson.chapter?.id === chapter.id
                                    );

                                    return (
                                      <div
                                        key={`${unitId}-chapter-${chapterIndex}`}
                                        className="border-b last:border-b-0"
                                      >
                                        {/* Chapter Header */}
                                        <div className="p-3 pl-8 bg-gray-50">
                                          <div className="font-semibold text-gray-800">
                                            {chapter.chapter_name}
                                          </div>
                                          <div className="text-xs text-muted-foreground mt-0.5">
                                            {chapterLessons.length > 0 ? (
                                              <span>
                                                {chapterLessons.length}{" "}
                                                {chapterLessons.length === 1
                                                  ? "lesson"
                                                  : "lessons"}
                                              </span>
                                            ) : (
                                              <span className="text-orange-600">
                                                No lessons yet
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        {/* Lessons List */}
                                        {chapterLessons.length > 0 && (
                                          <div className="pl-12">
                                            {chapterLessons
                                              .sort((a, b) => a.order - b.order)
                                              .map((lesson) => {
                                                // For draft (upcoming) courses, only enrolled users can access
                                                const canAccess = course?.status === "draft"
                                                  ? isEnrolled
                                                  : (isEnrolled ||
                                                      lesson.isPreview ||
                                                      course?.price === 0);

                                                return (
                                                  <Link
                                                    key={lesson.id}
                                                    href={`/courses/${courseParams.slug}/lesson/${lesson.slug}`}
                                                    className={`flex items-center justify-between p-3 border-b last:border-b-0 transition-colors ${
                                                      canAccess
                                                        ? "hover:bg-gray-50 cursor-pointer"
                                                        : "opacity-60 cursor-not-allowed"
                                                    }`}
                                                    onClick={(e) => {
                                                      if (!canAccess) {
                                                        e.preventDefault();
                                                      }
                                                    }}
                                                  >
                                                    <div className="flex items-center space-x-3 flex-1">
                                                      <div
                                                        className={`flex items-center justify-center w-6 h-6 rounded-full ${
                                                          completedLessonIds.has(
                                                            lesson.id
                                                          )
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-primary/10 text-primary"
                                                        } text-xs font-medium flex-shrink-0`}
                                                      >
                                                        {completedLessonIds.has(
                                                          lesson.id
                                                        ) ? (
                                                          <CheckCircle className="w-4 h-4" />
                                                        ) : (
                                                          lesson.order
                                                        )}
                                                      </div>
                                                      <div className="flex-1">
                                                        <h4
                                                          className={`text-sm font-medium transition-colors ${
                                                            completedLessonIds.has(
                                                              lesson.id
                                                            )
                                                              ? "text-gray-500 line-through"
                                                              : "text-gray-700 group-hover:text-primary"
                                                          }`}
                                                        >
                                                          {lesson.title}
                                                        </h4>
                                                        <div className="flex items-center space-x-2 mt-0.5">
                                                          <span className="text-xs text-muted-foreground">
                                                            {lesson.duration}
                                                          </span>
                                                          {lesson.isPreview && (
                                                            <Badge
                                                              variant="secondary"
                                                              className="text-xs bg-blue-100 text-blue-700"
                                                            >
                                                              Preview
                                                            </Badge>
                                                          )}
                                                          {completedLessonIds.has(
                                                            lesson.id
                                                          ) && (
                                                            <Badge
                                                              variant="secondary"
                                                              className="text-xs bg-green-100 text-green-700"
                                                            >
                                                              Completed
                                                            </Badge>
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                      <Play className="h-3.5 w-3.5 text-muted-foreground" />
                                                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                  </Link>
                                                );
                                              })}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>
                          No course structure available yet. Please use the
                          admin panel to set up units and chapters.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {isAdmin && (
                <TabsContent value="participants" className="mt-6">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Course Statistics</CardTitle>
                        <CardDescription>
                          Enrollment and student participation data
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {loadingStats ? (
                          <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                            <p className="mt-4 text-sm text-muted-foreground">
                              Loading statistics...
                            </p>
                          </div>
                        ) : courseStats ? (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-primary/10 border-primary/20">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-semibold">
                                  Total Students
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-3xl font-bold text-primary">
                                  {courseStats.totalStudents}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  All enrollments
                                </p>
                              </CardContent>
                            </Card>

                            <Card className="bg-primary/10 border-primary/20">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-semibold">
                                  Active Students
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-3xl font-bold text-primary">
                                  {courseStats.activeStudents}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Currently enrolled
                                </p>
                              </CardContent>
                            </Card>

                            <Card className="bg-primary/10 border-primary/20">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-semibold">
                                  Recent Enrollments
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-3xl font-bold text-primary">
                                  {courseStats.recentEnrollments}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Last 30 days
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>No statistics available</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Participants List */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Enrolled Students</CardTitle>
                        <CardDescription>
                          {courseStats?.participants?.length || 0} active
                          students enrolled in this course
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {loadingStats ? (
                          <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                            <p className="mt-4 text-sm text-muted-foreground">
                              Loading participants...
                            </p>
                          </div>
                        ) : courseStats?.participants &&
                          courseStats.participants.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b bg-muted/50">
                                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Student Name
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Email
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Role
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Enrolled Date
                                  </th>
                                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {courseStats.participants.map((participant) => (
                                  <tr
                                    key={participant.enrollmentId}
                                    className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                                    onClick={() => {
                                      if (participant.student?.id) {
                                        router.push(
                                          `/admin/student-progress/${course?.id}/${participant.student.id}`
                                        );
                                      }
                                    }}
                                  >
                                    <td className="px-4 py-3">
                                      <div className="font-medium text-sm">
                                        {participant.student?.first_name || ""}{" "}
                                        {participant.student?.last_name || ""}
                                        {!participant.student?.first_name &&
                                          !participant.student?.last_name && (
                                            <span className="text-muted-foreground italic">
                                              No name
                                            </span>
                                          )}
                                      </div>
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className="text-sm text-muted-foreground">
                                        {participant.student?.email || "N/A"}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3">
                                      <Badge
                                        variant="outline"
                                        className="rounded-sm capitalize"
                                      >
                                        {participant.student?.role || "student"}
                                      </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className="text-sm">
                                        {participant.enrolledAt
                                          ? new Date(
                                              participant.enrolledAt
                                            ).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "short",
                                              day: "numeric",
                                            })
                                          : "N/A"}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          variant={
                                            participant.isActive
                                              ? "default"
                                              : "secondary"
                                          }
                                          className="rounded-sm"
                                        >
                                          {participant.isActive
                                            ? "Active"
                                            : "Inactive"}
                                        </Badge>
                                        {participant.student?.id && (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            className="rounded-sm text-xs"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (participant.student?.id) {
                                                router.push(
                                                  `/admin/student-progress/${course?.id}/${participant.student.id}`
                                                );
                                              }
                                            }}
                                          >
                                            View Progress
                                          </Button>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="font-medium mb-2">
                              No students enrolled yet
                            </p>
                            <p className="text-sm">
                              Students will appear here once they enroll in this
                              course.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Course Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Units</span>
                  <span className="font-medium">
                    {unitCount || course.template_data?.units?.length || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Chapters</span>
                  <span className="font-medium">{chapterCount || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lessons</span>
                  <span className="font-medium">
                    {lessons.length || course.lessons}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">
                    {course.template_data?.duration ||
                      course.duration ||
                      "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-medium">
                    {course.grade || course.level}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Curriculum</span>
                  <span className="font-medium">{course.curriculum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exam Board</span>
                  <span className="font-medium">
                    {course.template_data?.examBoard || course.curriculum}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Academic Year</span>
                  <span className="font-medium">
                    {course.template_data?.academicYear || "2025-26"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Textbook</span>
                  <span className="font-medium">
                    {course.template_data?.textbookName || "Standard Textbook"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Unit Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Unit Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {lessons.length > 0 ? (
                    (() => {
                      // Group lessons by unit to calculate chapters per unit
                      const unitChapterMap = lessons.reduce(
                        (
                          acc: Record<
                            string,
                            { chapters: Set<string>; order: number }
                          >,
                          lesson
                        ) => {
                          const unitName = lesson.chapter?.unit?.unit_name;
                          const unitOrder =
                            lesson.chapter?.unit?.unit_order || 999;
                          const chapterName = lesson.chapter?.chapter_name;

                          if (unitName && chapterName) {
                            if (!acc[unitName]) {
                              acc[unitName] = {
                                chapters: new Set(),
                                order: unitOrder,
                              };
                            }
                            acc[unitName].chapters.add(chapterName);
                          }
                          return acc;
                        },
                        {}
                      );

                      // Sort units by order
                      const sortedUnits = Object.entries(unitChapterMap).sort(
                        ([, a], [, b]) => a.order - b.order
                      );

                      return sortedUnits.length > 0 ? (
                        sortedUnits.map(([unitName, data], index) => {
                          const chapterCount = data.chapters.size;
                          return (
                            <div key={index} className="flex justify-between">
                              <span className="text-muted-foreground">
                                {index + 1}. {unitName}
                              </span>
                              <span className="font-medium">
                                {chapterCount}{" "}
                                {chapterCount === 1 ? "chapter" : "chapters"}
                              </span>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-muted-foreground text-center py-4">
                          No units available
                        </div>
                      );
                    })()
                  ) : (
                    <div className="text-muted-foreground text-center py-4">
                      Loading units...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Progress (if enrolled) */}
            {isEnrolled && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          {progressPercentage}%
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {completedLessons} of {lessons.length || course.lessons}{" "}
                      lessons completed
                    </div>
                    {progressPercentage === 100 && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-sm">
                        <div className="flex items-center space-x-2 text-green-800">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-sm font-semibold">
                            Course Completed! 🎉
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
