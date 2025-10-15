"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components-demo/ui/tabs";
import { Play, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RenderedCourse, CourseTemplate } from "@/types/course-templates";
import { DynamicCourseRenderer } from "@/components/DynamicCourseRenderer";
import { IBDPCourseStructure } from "@/components/IBDPCourseStructure";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

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
  const { user } = useAuth();
  const router = useRouter();
  const { addToCart, isInCart } = useCart();

  // State
  const [course, setCourse] = useState<ExtendedCourse | null>(null);
  const [template, setTemplate] = useState<CourseTemplate | null>(null);
  const [lessons, setLessons] = useState<LessonConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [lastLesson, setLastLesson] = useState<{
    slug: string;
    lesson_order: number;
  } | null>(null);
  const [unitCount, setUnitCount] = useState<number>(0);
  const [chapterCount, setChapterCount] = useState<number>(0);

  // Check if this is an IBDP course
  const isIBDPCourse = courseParams.slug === "ibdp-mathematics-aa-hl";

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

  // Load course data
  useEffect(() => {
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
        setCourse(data.rendered);
        setTemplate(data.template);

        // Check enrollment status
        if (user && data.rendered?.id) {
          const supabase = createClient();
          const { data: enrollment } = await supabase
            .from("courses_enrollments")
            .select("*")
            .eq("student_id", user.id)
            .eq("course_id", data.rendered.id)
            .eq("is_active", true)
            .maybeSingle();

          if (enrollment) {
            setIsEnrolled(true);

            // Get last accessed lesson
            const { data: progressData } = await supabase
              .from("user_progress")
              .select("lesson_slug, lesson_order")
              .eq("user_id", user.id)
              .eq("course_id", data.rendered.id)
              .order("last_accessed_at", { ascending: false })
              .limit(1)
              .maybeSingle();

            if (progressData) {
              setLastLesson({
                slug: progressData.lesson_slug,
                lesson_order: progressData.lesson_order,
              });
            }
          }
        }

        // Fetch lessons with unit/chapter structure
        const supabase = createClient();
        const { data: lessonsData, error: lessonsError } = await supabase
          .from("courses_lessons")
          .select(
            `
            id,
            slug,
            title,
            content_html,
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
          .eq("course_id", data.rendered.id)
          .order("lesson_order");

        if (!lessonsError && lessonsData) {
          const convertedLessons: LessonConfig[] = (
            lessonsData as Record<string, unknown>[]
          ).map((lesson) => ({
            id: lesson.id as string,
            slug: lesson.slug as string,
            title: lesson.title as string,
            description: (lesson.content_html ||
              lesson.content ||
              "") as string,
            duration: "45 minutes",
            type: "video",
            isPreview: Boolean(lesson.is_preview),
            order: lesson.lesson_order as number,
            resources: [],
            chapter: lesson.chapter as LessonConfig["chapter"],
          }));
          setLessons(convertedLessons);

          // Calculate unique units and chapters
          const uniqueUnits = new Set(
            convertedLessons
              .map((l) => l.chapter?.unit?.unit_name)
              .filter(Boolean)
          );
          const uniqueChapters = new Set(
            convertedLessons.map((l) => l.chapter?.chapter_name).filter(Boolean)
          );
          setUnitCount(uniqueUnits.size);
          setChapterCount(uniqueChapters.size);
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
      } catch (err) {
        console.error("Error loading course:", err);
        setError("Course not found");
      } finally {
        setIsLoading(false);
      }
    };

    loadCourse();
  }, [courseParams.slug, user]);

  const handleAddToCart = () => {
    if (!course) return;

    addToCart({
      courseId: course.id,
      courseSlug: course.slug,
      title: course.title,
      price: course.price || 0,
      thumbnail: course.thumbnail,
    });

    alert("✅ Added to cart!");
  };

  const handleEnroll = async () => {
    if (!user) {
      // Redirect to login with return URL
      const returnUrl = encodeURIComponent(`/courses/${courseParams.slug}`);
      router.push(`/auth?redirect=${returnUrl}`);
      return;
    }

    if (!course?.id) {
      alert("Course information not available.");
      return;
    }

    // Check if course is paid
    if ((course.price || 0) > 0) {
      // Paid course - redirect to payment page
      router.push(`/courses/${courseParams.slug}/payment`);
      return;
    }

    // Free course - enroll directly
    try {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
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
          <Link href="/courses">
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
              <h1 className="text-4xl font-bold text-[#1e293b] mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                {course.description || "No description available"}
              </p>
              <div className="flex items-center flex-wrap gap-2">
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
                      className="border-[#e27447] text-[#e27447] hover:bg-[#e27447] hover:text-white transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>
            <div className="ml-6">
              {!isEnrolled ? (
                <div className="text-right space-y-3">
                  {(course.price || 0) > 0 && (
                    <div className="text-2xl font-bold text-[#e27447] mb-2">
                      ₹{course.price?.toLocaleString()}
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={handleEnroll}
                      className="bg-[#e27447] hover:bg-[#d1653a] rounded-sm"
                    >
                      {(course.price || 0) > 0 ? "Buy Now" : "Enroll for Free"}
                    </Button>
                    {(course.price || 0) > 0 && (
                      <Button
                        onClick={handleAddToCart}
                        variant="outline"
                        disabled={isInCart(course.id)}
                        className="rounded-sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {isInCart(course.id) ? "In Cart" : "Add to Cart"}
                      </Button>
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
                  <Button className="bg-[#e27447] hover:bg-[#d1653a]">
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
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-sm bg-[#feefea] p-1">
                <TabsTrigger
                  value="overview"
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  Content
                </TabsTrigger>
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
                        <div className="mb-6 p-4 bg-[#feefea] border border-[#e27447] rounded-sm">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <svg
                                className="w-6 h-6 text-[#e27447]"
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
                              <h4 className="font-semibold text-[#1e293b] mb-1">
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
                                className="inline-flex items-center text-[#e27447] hover:text-[#d1653a] font-medium text-sm"
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
                    {isIBDPCourse ? (
                      <IBDPCourseStructure courseSlug={courseParams.slug} />
                    ) : lessons.length > 0 ? (
                      <div className="space-y-2">
                        {(() => {
                          // Group lessons by unit and chapter from database
                          const groupedLessons = lessons.reduce(
                            (acc, lesson) => {
                              const unitName =
                                lesson.chapter?.unit?.unit_name ||
                                "Uncategorized";
                              const chapterName =
                                lesson.chapter?.chapter_name || "Other";
                              const unitOrder =
                                lesson.chapter?.unit?.unit_order || 999;
                              const chapterOrder =
                                lesson.chapter?.chapter_order || 999;

                              if (!acc[unitName]) {
                                acc[unitName] = {
                                  order: unitOrder,
                                  chapters: {},
                                };
                              }
                              if (!acc[unitName].chapters[chapterName]) {
                                acc[unitName].chapters[chapterName] = {
                                  order: chapterOrder,
                                  lessons: [],
                                };
                              }
                              acc[unitName].chapters[chapterName].lessons.push(
                                lesson
                              );
                              return acc;
                            },
                            {} as Record<
                              string,
                              {
                                order: number;
                                chapters: Record<
                                  string,
                                  { order: number; lessons: LessonConfig[] }
                                >;
                              }
                            >
                          );

                          // Sort units by order
                          const sortedUnits = Object.entries(
                            groupedLessons
                          ).sort(([, a], [, b]) => a.order - b.order);

                          return sortedUnits.map(
                            ([unitName, unitData], unitIndex) => {
                              const unitId = `unit-${unitIndex}`;
                              const isExpanded = expandedUnits.has(unitId);

                              // Sort chapters by order
                              const sortedChapters = Object.entries(
                                unitData.chapters
                              ).sort(([, a], [, b]) => a.order - b.order);

                              return (
                                <div key={unitId} className="border rounded-sm">
                                  {/* Unit Header */}
                                  <div
                                    className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                                    onClick={() => toggleUnit(unitId)}
                                  >
                                    <div>
                                      <span className="font-semibold text-lg">
                                        {unitIndex + 1}. {unitName}
                                      </span>
                                      <span className="text-sm text-muted-foreground ml-2">
                                        ({sortedChapters.length}{" "}
                                        {sortedChapters.length === 1
                                          ? "chapter"
                                          : "chapters"}
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
                                      {sortedChapters.map(
                                        (
                                          [chapterName, chapterData],
                                          chapterIndex
                                        ) => (
                                          <div
                                            key={`${unitId}-chapter-${chapterIndex}`}
                                            className="p-3 pl-8 hover:bg-gray-50 border-b last:border-b-0"
                                          >
                                            <div className="font-medium text-gray-700">
                                              {chapterName}
                                            </div>
                                            <div className="text-sm text-muted-foreground mt-1">
                                              {chapterData.lessons.length}{" "}
                                              {chapterData.lessons.length === 1
                                                ? "lesson"
                                                : "lessons"}
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          );
                        })()}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>
                          No lessons available yet. Please use the admin panel
                          to set up units and chapters.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
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
                        <span className="font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.ceil(course.lessons * 0.25)} of {course.lessons}{" "}
                      lessons completed
                    </div>
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
