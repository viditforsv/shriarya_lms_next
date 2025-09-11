"use client";

import { useState, useEffect } from "react";
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
import {
  getCourseBySlug,
  getLessonsByCourseSlugSync,
  LessonConfig,
} from "@/lib/course-config";
import { RenderedCourse, CourseTemplate } from "@/types/course-templates";
import { DynamicCourseRenderer } from "@/components/DynamicCourseRenderer";
import { Chapter } from "@/lib/cbse-syllabus";
import { CBSE_CLASS_10_MATHEMATICS_SYLLABUS } from "@/lib/cbse-syllabus";

export function CoursePageClient({
  courseParams,
}: {
  courseParams: { slug: string };
}) {
  // const { user } = useAuth()
  const user = null;

  // Simple function to get units for CBSE course
  const getUnitsForCourse = () => {
    if (courseParams.slug === "cbse-mathematics-class-10") {
      return CBSE_CLASS_10_MATHEMATICS_SYLLABUS;
    }
    return [];
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

  // Handle chapter click - navigate to first lesson of that chapter
  const handleChapterClick = (chapter: Chapter) => {
    if (!chapter.subsections || chapter.subsections.length === 0) {
      console.log("No subsections found for chapter:", chapter.title);
      return;
    }

    // Find the first subsection (lesson) for this chapter
    const firstSubsection = chapter.subsections[0];

    // For CBSE course, we need to map the subsection slug to a lesson slug
    if (courseParams.slug === "cbse-mathematics-class-10") {
      // Import the mapping to find the corresponding lesson
      const mapping: Record<string, string> = {
        "fundamental-theorem-arithmetic": "fundamental-theorem-arithmetic",
        "proofs-irrationality": "real-numbers-properties",
        "properties-real-numbers": "real-numbers-properties",
        "zeros-polynomial": "polynomial-zeroes",
        "relationship-zeros-coefficients": "polynomial-zeroes",
        "graphical-method": "graphical-method",
        "algebraic-solution": "algebraic-methods",
        "euclid-division-lemma": "euclid-division-lemma",
        "standard-form": "quadratic-intro",
        "factorization-quadratic-formula": "quadratic-formula",
        "nature-roots-discriminant": "quadratic-practice",
        "nth-term": "ap-intro",
        "sum-n-terms": "ap-formulas",
        "word-problems": "ap-practice",
        "applications-problems": "ap-practice",
        "similarity-criteria": "triangles-intro",
        "basic-proportionality": "similarity-triangles",
        "basic-proportionality-theorem": "similarity-triangles",
        applications: "triangles-practice",
        "concepts-coordinate-geometry": "coordinate-intro",
        "distance-formula": "distance-formula",
        "section-formula": "coordinate-practice",
        "area-triangle": "coordinate-practice",
        "introduction-trigonometry": "trigonometry-intro",
        "trigonometric-ratios": "trigonometric-ratios",
        "values-30-45-60": "trigonometric-ratios",
        "relationships-ratios": "trigonometry-practice",
        "complementary-angles": "trigonometry-practice",
        "proof-application-sin2-cos2": "trigonometry-practice",
        "angles-elevation-depression": "trig-applications",
        "trig-applications": "trig-applications",
        "tangent-circle": "circles-intro",
        tangents: "circles-intro",
        "properties-tangents": "circle-theorems",
        "tangent-properties": "circle-theorems",
        "applications-circles": "circles-practice",
        "areas-related-circles": "mensuration-intro",
        "surface-areas-volumes": "mensuration-practice",
        "mean-median-mode": "statistics-intro",
        "probability-basics": "probability-intro",
      };

      const lessonSlug = mapping[firstSubsection.slug] || firstSubsection.slug;

      // Navigate to the lesson
      window.location.href = `/courses/${courseParams.slug}/lesson/${lessonSlug}`;
    } else {
      // For other courses, use the subsection slug directly
      window.location.href = `/courses/${courseParams.slug}/lesson/${firstSubsection.slug}`;
    }
  };
  const [course, setCourse] = useState<RenderedCourse | null>(null);
  const [template, setTemplate] = useState<CourseTemplate | null>(null);
  const [lessons, setLessons] = useState<LessonConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Try to fetch course with template first
        console.log("Fetching course:", courseParams.slug);
        const response = await fetch(
          `/api/courses/${courseParams.slug}/with-template`
        );
        console.log("Response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Course data received:", data);
          setCourse(data.rendered);
          setTemplate(data.template);

          // Fetch complete course content using RPC function
          try {
            const courseContentResponse = await fetch(
              `/api/course-content?course_slug=${courseParams.slug}`
            );
            if (courseContentResponse.ok) {
              const courseContentData = await courseContentResponse.json();
              setCourse(courseContentData.course);
              setTemplate(courseContentData.course.template_data || {});

              // Convert lessons to LessonConfig format
              const convertedLessons = courseContentData.lessons.map(
                (lesson: Record<string, unknown>) => ({
                  id: lesson.id,
                  slug: lesson.slug,
                  title: lesson.title,
                  description: lesson.content_html || lesson.content || "",
                  duration: "45 minutes", // Default duration
                  type: "video",
                  isPreview: lesson.is_preview || false,
                  order: lesson.lesson_order,
                  resources: [], // Will be populated from video_url, pdf_url etc.
                })
              );
              setLessons(convertedLessons);
            } else {
              // Fallback to old system if API fails
              const lessonsData = getLessonsByCourseSlugSync(courseParams.slug);
              setLessons(lessonsData);
            }
          } catch (error) {
            console.error("Error fetching course content:", error);
            // Fallback to old system
            const lessonsData = getLessonsByCourseSlugSync(courseParams.slug);
            setLessons(lessonsData);
          }

          // For free courses, user is automatically "enrolled"
          setIsEnrolled(data.rendered.isFree || false);
        } else {
          // Fallback to old system
          const courseData = getCourseBySlug(courseParams.slug);
          if (!courseData) {
            throw new Error("Course not found");
          }

          setCourse(courseData as RenderedCourse);
          setTemplate(null);

          // Fetch lessons for this course from database
          try {
            const lessonsResponse = await fetch(
              `/api/lessons?course_slug=${courseParams.slug}`
            );
            if (lessonsResponse.ok) {
              const lessonsData = await lessonsResponse.json();
              // Convert database lessons to LessonConfig format
              const convertedLessons = lessonsData.lessons.map(
                (lesson: Record<string, unknown>) => ({
                  id: lesson.id,
                  slug: lesson.slug,
                  title: lesson.title,
                  description: lesson.content_html || lesson.content || "",
                  duration: "45 minutes", // Default duration
                  type: "video",
                  isPreview: lesson.is_preview || false,
                  order: lesson.lesson_order,
                  resources: lesson.resources || [],
                })
              );
              setLessons(convertedLessons);
            } else {
              // Fallback to old system if API fails
              const lessonsData = getLessonsByCourseSlugSync(courseParams.slug);
              setLessons(lessonsData);
            }
          } catch (error) {
            console.error("Error fetching lessons:", error);
            // Fallback to old system
            const lessonsData = getLessonsByCourseSlugSync(courseParams.slug);
            setLessons(lessonsData);
          }

          // For free courses, user is automatically "enrolled"
          setIsEnrolled(courseData.isFree || false);
        }
      } catch (err) {
        console.error("Error loading course:", err);
        console.error("Error details:", err);
        setError("Course not found");
      } finally {
        console.log("Setting isLoading to false");
        setIsLoading(false);
      }
    };

    console.log("Calling loadCourse with courseParams:", courseParams);
    loadCourse();
  }, [courseParams.slug, courseParams]);

  const handleEnroll = async () => {
    if (!user) {
      alert("Please log in to enroll in this course.");
      return;
    }

    try {
      // For now, simulate enrollment
      // In a real app, this would call the enrollment API
      setIsEnrolled(true);
      alert("Successfully enrolled! You can now access all lessons.");
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
          <p className="text-sm text-gray-500 mt-2">
            Debug: courseParams = {JSON.stringify(courseParams)}
          </p>
          <p className="text-sm text-gray-500">
            Debug: isLoading = {isLoading.toString()}
          </p>
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
                <Badge variant={course.isFree ? "secondary" : "default"}>
                  {course.isFree ? "Free" : `$${course.price || 0}`}
                </Badge>
                {isEnrolled && (
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800"
                  >
                    Enrolled
                  </Badge>
                )}

                {/* Smart Badge Display - Avoid Duplicates */}
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

                {/* Additional Tags - Only show tags that aren't already displayed above */}
                {course.tags &&
                  course.tags
                    .filter((tag) => {
                      // Filter out tags that are already shown as individual badges
                      const lowerTag = tag.toLowerCase();
                      return !(
                        lowerTag === course.curriculum?.toLowerCase() ||
                        lowerTag === course.subject?.toLowerCase() ||
                        lowerTag === course.grade?.toLowerCase() ||
                        lowerTag === course.level?.toLowerCase()
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
              {!isEnrolled && !course.isFree ? (
                <Button
                  onClick={handleEnroll}
                  className="bg-[#e27447] hover:bg-[#d1653a]"
                >
                  Enroll Now
                </Button>
              ) : (
                <Link
                  href={`/courses/${courseParams?.slug}/lesson/${
                    lessons[0]?.slug || "introduction"
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
            <Tabs defaultValue="overview" className="w-full">
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

                      {/* Complete CBSE Syllabus */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-4 text-[#1e293b]">
                          Complete CBSE Class 10 Mathematics Syllabus
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-3">
                            <div className="border-l-4 border-[#e27447] pl-3">
                              <h5 className="font-medium text-[#1e293b]">
                                Unit I: Number Systems
                              </h5>
                              <p className="text-muted-foreground">
                                Real Numbers (Fundamental Theorem of Arithmetic,
                                proofs of irrationality for √2, √3, √5)
                              </p>
                            </div>
                            <div className="border-l-4 border-[#e27447] pl-3">
                              <h5 className="font-medium text-[#1e293b]">
                                Unit II: Algebra
                              </h5>
                              <p className="text-muted-foreground">
                                Polynomials, Pair of Linear Equations, Quadratic
                                Equations, Arithmetic Progressions
                              </p>
                            </div>
                            <div className="border-l-4 border-[#e27447] pl-3">
                              <h5 className="font-medium text-[#1e293b]">
                                Unit III: Coordinate Geometry
                              </h5>
                              <p className="text-muted-foreground">
                                Distance Formula and Section (Internal Division)
                                Formula
                              </p>
                            </div>
                            <div className="border-l-4 border-[#e27447] pl-3">
                              <h5 className="font-medium text-[#1e293b]">
                                Unit IV: Geometry
                              </h5>
                              <p className="text-muted-foreground">
                                Triangles (similarity), Circles (tangent
                                properties)
                              </p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="border-l-4 border-[#e27447] pl-3">
                              <h5 className="font-medium text-[#1e293b]">
                                Unit V: Trigonometry
                              </h5>
                              <p className="text-muted-foreground">
                                Trigonometric ratios, Identities, Heights and
                                Distances
                              </p>
                            </div>
                            <div className="border-l-4 border-[#e27447] pl-3">
                              <h5 className="font-medium text-[#1e293b]">
                                Unit VI: Mensuration
                              </h5>
                              <p className="text-muted-foreground">
                                Areas Related to Circles, Surface Areas and
                                Volumes
                              </p>
                            </div>
                            <div className="border-l-4 border-[#e27447] pl-3">
                              <h5 className="font-medium text-[#1e293b]">
                                Unit VII: Statistics & Probability
                              </h5>
                              <p className="text-muted-foreground">
                                Mean, Median, Mode of grouped data, Probability
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">
                            What you&apos;ll learn
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {course?.learningOutcomes?.map((outcome, index) => (
                              <li key={index}>• {outcome}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">
                            Course includes
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• {course?.lessons} lessons</li>
                            <li>• {course?.duration} of content</li>
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
                    <CardDescription>
                      {course.lessons} lessons •{" "}
                      {course.isFree ? "Free" : `$${course.price || 0}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {/* Display units with chapters in accordion */}
                      {getUnitsForCourse().map((unit, index) => {
                        const isExpanded = expandedUnits.has(unit.id);
                        return (
                          <div key={unit.id} className="border rounded-sm">
                            {/* Unit Header */}
                            <div
                              className="flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer"
                              onClick={() => toggleUnit(unit.id)}
                            >
                              <div className="w-10 h-10 bg-[#e27447] text-white rounded-sm flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium text-lg">
                                    {unit.title}
                                  </h4>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {unit.chapters?.length || 0} chapters
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <ChevronRight
                                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                                    isExpanded ? "rotate-90" : ""
                                  }`}
                                />
                              </div>
                            </div>

                            {/* Chapters (Expanded Content) */}
                            {isExpanded && unit.chapters && (
                              <div className="border-t bg-gray-50/50">
                                <div className="p-4 space-y-2">
                                  {unit.chapters.map(
                                    (chapter, chapterIndex) => (
                                      <div
                                        key={chapter.id}
                                        className="flex items-center space-x-3 p-3 rounded-sm bg-white border hover:bg-gray-50 cursor-pointer"
                                        onClick={() =>
                                          handleChapterClick(chapter)
                                        }
                                      >
                                        <div className="w-8 h-8 bg-gray-200 text-gray-700 rounded-sm flex items-center justify-center text-xs font-medium">
                                          {chapterIndex + 1}
                                        </div>
                                        <div className="flex-1">
                                          <h5 className="font-medium text-gray-800">
                                            {chapter.title}
                                          </h5>
                                          <p className="text-xs text-gray-500">
                                            {chapter.subsections?.length || 0}{" "}
                                            topics
                                          </p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
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
                  <span className="text-muted-foreground">Total Chapters</span>
                  <span className="font-medium">7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lessons</span>
                  <span className="font-medium">{course.lessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{course.duration}</span>
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
                  <span className="font-medium">CBSE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Academic Year</span>
                  <span className="font-medium">2025-26</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Textbook</span>
                  <span className="font-medium">NCERT</span>
                </div>
              </CardContent>
            </Card>

            {/* Chapter Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Chapter Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      1. Number Systems
                    </span>
                    <span className="font-medium">Real Numbers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">2. Algebra</span>
                    <span className="font-medium">
                      Polynomials, Linear & Quadratic
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      3. Coordinate Geometry
                    </span>
                    <span className="font-medium">
                      Distance & Section Formula
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">4. Geometry</span>
                    <span className="font-medium">Triangles & Circles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      5. Trigonometry
                    </span>
                    <span className="font-medium">Ratios & Identities</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      6. Mensuration
                    </span>
                    <span className="font-medium">Areas & Volumes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      7. Statistics & Probability
                    </span>
                    <span className="font-medium">Data Analysis</span>
                  </div>
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
