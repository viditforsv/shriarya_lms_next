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
import {
  getCourseBySlug,
  getLessonsByCourseSlugSync,
  LessonConfig,
} from "@/lib/course-config";
import { RenderedCourse, CourseTemplate } from "@/types/course-templates";
import { DynamicCourseRenderer } from "@/components/DynamicCourseRenderer";
import { IBDPCourseStructure } from "@/components/IBDPCourseStructure";
import { Chapter } from "@/lib/cbse-syllabus";

// Extended RenderedCourse with template_data fields
interface ExtendedCourse extends RenderedCourse {
  template_data?: {
    units?: any[];
    tags?: string[];
    learningOutcomes?: string[];
    prerequisites?: string[];
    examBoard?: string;
    academicYear?: string;
    textbookName?: string;
  };
}
import {
  CBSE_CLASS_10_MATHEMATICS_SYLLABUS,
  CBSE_CLASS_9_MATHEMATICS_SYLLABUS,
} from "@/lib/cbse-syllabus";
import { syllabus as ibdpSyllabus } from "@/lib/courses/ibdp-mathematics-aa-hl/syllabus";
import { createClient } from "@/lib/supabase/client";

export function CoursePageClient({
  courseParams,
}: {
  courseParams: { slug: string };
}) {
  const { user } = useAuth();

  // Check if this is an IBDP course
  const isIBDPCourse = courseParams.slug === "ibdp-mathematics-aa-hl";

  // Simple function to get units for courses
  const getUnitsForCourse = () => {
    if (courseParams.slug === "cbse-mathematics-class-10") {
      return CBSE_CLASS_10_MATHEMATICS_SYLLABUS;
    }
    if (courseParams.slug === "cbse-mathematics-class-9") {
      return CBSE_CLASS_9_MATHEMATICS_SYLLABUS;
    }
    if (isIBDPCourse) {
      return ibdpSyllabus;
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

    // For CBSE course, find the actual lesson from database based on lesson order
    if (courseParams.slug === "cbse-mathematics-class-10") {
      // Map subsection to lesson order based on CBSE syllabus structure
      const subsectionToOrderMap: Record<string, number> = {
        // Unit 1: Number Systems - Real Numbers
        "introduction-to-real-numbers": 1,
        "fundamental-theorem-arithmetic": 2,
        "proofs-irrationality": 3,
        "advanced-irrationality-proofs": 4,
        "real-numbers-practice-problems": 5,

        // Unit 2: Algebra - Polynomials
        "introduction-to-polynomials": 7,
        "zeros-of-a-polynomial": 8,
        "relationship-between-zeros-and-coefficients": 9,
        "graphical-and-algebraic-methods": 10,
        "polynomials-practice-problems": 11,

        // Unit 2: Algebra - Pair of Linear Equations
        "introduction-to-pair-of-linear-equations": 12,
        "graphical-method-and-consistency": 13,
        "algebraic-conditions-for-number-of-solutions": 14,
        "solution-by-substitution-method": 15,
        "solution-by-elimination-method": 16,
        "simple-situational-problems": 17,
        "linear-equations-practice-problems": 18,

        // Unit 2: Algebra - Quadratic Equations
        "introduction-to-quadratic-equations": 19,
        "standard-form-of-quadratic-equation": 20,
        "solution-by-factorization-method": 21,
        "quadratic-formula": 22,
        "discriminant-and-nature-of-roots": 23,
        "situational-problems-based-on-quadratic-equations": 24,
        "quadratic-equations-practice-problems": 25,

        // Unit 2: Algebra - Arithmetic Progressions
        "introduction-to-arithmetic-progressions": 26,
        "motivation-for-studying-arithmetic-progression": 27,
        "derivation-of-nth-term-of-ap": 28,
        "derivation-of-sum-of-first-n-terms-of-ap": 29,
        "application-of-ap-in-daily-life-problems": 30,
        "ap-practice-problems": 31,

        // Unit 3: Coordinate Geometry
        "introduction-to-coordinate-geometry": 32,
        "review-of-concepts-of-coordinate-geometry": 33,
        "distance-formula": 34,
        "section-formula-internal-division": 35,
        "applications-of-distance-and-section-formulas": 36,
        "coordinate-geometry-practice-problems": 37,

        // Unit 4: Geometry - Triangles
        "introduction-to-similar-triangles": 38,
        "definitions-examples-and-counter-examples": 39,
        "basic-proportionality-theorem-proof": 40,
        "converse-of-basic-proportionality-theorem": 41,
        "aaa-similarity-criterion": 42,
        "sss-similarity-criterion": 43,
        "sas-similarity-criterion": 44,
        "applications-of-similarity-criteria": 45,
        "triangles-practice-problems": 46,

        // Unit 4: Geometry - Circles
        "introduction-to-circles": 47,
        "tangent-to-a-circle-at-point-of-contact": 48,
        "tangent-perpendicular-to-radius-theorem-proof": 49,
        "equal-tangents-from-external-point-theorem-proof": 50,
        "applications-of-tangent-properties": 51,
        "circles-practice-problems": 52,

        // Unit 5: Trigonometry - Introduction to Trigonometry
        "trigonometric-ratios": 54,
        "values-30-45-60": 57,
        "relationships-ratios": 58,
        "trigonometric-ratios-practice": 59,

        // Unit 5: Trigonometry - Trigonometric Identities
        "proof-application-sin2-cos2": 61,
        "trigonometric-identities-practice": 64,

        // Unit 5: Trigonometry - Heights and Distances
        "angles-elevation-depression": 66,

        // Unit 6: Mensuration - Areas Related to Circles
        "areas-sectors-segments": 73,
        "perimeter-circumference": 75,

        // Unit 6: Mensuration - Surface Areas and Volumes
        "combinations-cubes-cuboids": 78,
        "combinations-spheres-hemispheres": 79,
        "combinations-cylinders-cones": 80,

        // Unit 7: Statistics & Probability - Statistics
        "mean-median-mode": 83,

        // Unit 7: Statistics & Probability - Probability
        "classical-definition": 91,
        "simple-problems": 92,
      };

      const lessonOrder = subsectionToOrderMap[firstSubsection.slug];

      if (lessonOrder && lessons.length > 0) {
        // Find the lesson with matching order
        const targetLesson = lessons.find(
          (lesson) => lesson.order === lessonOrder
        );

        if (targetLesson) {
          // Navigate to the actual lesson from database using its slug directly
          window.location.href = `/courses/${courseParams.slug}/lesson/${targetLesson.slug}`;
          return;
        }
      }

      // Fallback: try to find lesson by slug
      const fallbackLesson = lessons.find(
        (lesson) =>
          lesson.slug === firstSubsection.slug ||
          lesson.title
            .toLowerCase()
            .includes(firstSubsection.title.toLowerCase())
      );

      if (fallbackLesson) {
        // Navigate using the lesson slug directly
        window.location.href = `/courses/${courseParams.slug}/lesson/${fallbackLesson.slug}`;
        return;
      }

      console.error(
        "Could not find lesson for subsection:",
        firstSubsection.slug
      );
      alert("Lesson not found. Please try again.");
    } else if (courseParams.slug === "cbse-mathematics-class-9") {
      // For CBSE Class 9, match by chapter name to lesson title
      // The syllabus chapters map to actual lessons in database
      const chapterNameToLessonMap: Record<string, string> = {
        "real-numbers": "cbse9-number-systems",
        "polynomials-intro": "cbse9-polynomials",
        "cartesian-system": "cbse9-coordinate-geometry",
        "linear-equations-intro": "cbse9-linear-equations-in-two-variables",
        "euclid-definitions": "cbse9-introduction-to-euclids-geometry",
        "lines-angles-basic": "cbse9-lines-and-angles",
        "triangles-congruence": "cbse9-triangles",
        "quadrilaterals-properties": "cbse9-quadrilaterals",
        "areas-basic": "cbse9-areas-parallelograms-triangles",
        "circles-basic": "cbse9-circles",
        "basic-constructions": "cbse9-constructions",
        "heron-formula-area": "cbse9-herons-formula",
        "surface-areas-volumes-basic": "cbse9-surface-areas-and-volumes",
        "statistics-basic": "cbse9-statistics",
        "probability-basic": "cbse9-probability",
      };

      const targetSlug = chapterNameToLessonMap[chapter.slug];

      if (targetSlug) {
        const targetLesson = lessons.find(
          (lesson) => lesson.slug === targetSlug
        );
        if (targetLesson) {
          window.location.href = `/courses/${courseParams.slug}/lesson/${targetLesson.slug}`;
          return;
        }
      }

      // Fallback: try to find by title matching
      const fallbackLesson = lessons.find((lesson) =>
        lesson.title
          .toLowerCase()
          .includes(chapter.title.toLowerCase().split(" ")[0])
      );

      if (fallbackLesson) {
        window.location.href = `/courses/${courseParams.slug}/lesson/${fallbackLesson.slug}`;
        return;
      }

      console.error("Could not find lesson for chapter:", chapter.slug);
      alert("Lesson not found. Please try again.");
    } else if (isIBDPCourse) {
      // Map IBDP subsection to lesson order based on IBDP syllabus structure
      const ibdpSubsectionToOrderMap: Record<string, number> = {
        // Number and Algebra - Sequences and Series
        "arithmetic-sequences": 1,
        "geometric-sequences": 2,
        "infinite-series": 3,

        // Number and Algebra - Binomial Theorem
        "binomial-expansion": 4,
        "binomial-coefficients": 5,

        // Number and Algebra - Complex Numbers
        "complex-arithmetic": 6,
        "polar-form": 7,
        "complex-roots": 8,

        // Functions - Function Concepts
        "domain-range": 9,
        "composite-functions": 10,
        "inverse-functions": 11,

        // Functions - Polynomial Functions
        "polynomial-properties": 12,
        "factor-theorem": 13,

        // Functions - Exponential and Logarithmic Functions
        "exponential-functions": 14,
        "logarithmic-functions": 15,
        "exponential-models": 16,

        // Geometry and Trigonometry - Trigonometric Functions
        "unit-circle": 17,
        "trigonometric-identities": 18,
        "trigonometric-equations": 19,

        // Geometry and Trigonometry - Vectors
        "vector-operations": 20,
        "scalar-product": 21,
        "vector-product": 22,

        // Statistics and Probability - Descriptive Statistics
        "measures-central-tendency": 23,
        "measures-dispersion": 24,
        "normal-distribution": 25,

        // Statistics and Probability - Probability
        "conditional-probability": 26,
        "bayes-theorem": 27,
        "discrete-random-variables": 28,

        // Calculus - Limits and Continuity
        "limit-concepts": 29,
        continuity: 30,

        // Calculus - Differentiation
        "derivative-rules": 31,
        "chain-rule": 32,
        "implicit-differentiation": 33,
        "applications-derivatives": 34,

        // Calculus - Integration
        "integration-techniques": 35,
        "integration-by-parts": 36,
        "applications-integration": 37,
      };

      const lessonOrder = ibdpSubsectionToOrderMap[firstSubsection.slug];

      if (lessonOrder && lessons.length > 0) {
        // Find the lesson with matching order
        const targetLesson = lessons.find(
          (lesson) => lesson.order === lessonOrder
        );

        if (targetLesson) {
          // Navigate to the actual lesson from database using its slug directly
          window.location.href = `/courses/${courseParams.slug}/lesson/${targetLesson.slug}`;
          return;
        }
      }

      // Fallback: try to find lesson by slug
      const fallbackLesson = lessons.find(
        (lesson) =>
          lesson.slug === firstSubsection.slug ||
          lesson.title
            .toLowerCase()
            .includes(firstSubsection.title.toLowerCase())
      );

      if (fallbackLesson) {
        // Navigate using the lesson slug directly
        window.location.href = `/courses/${courseParams.slug}/lesson/${fallbackLesson.slug}`;
        return;
      }

      console.error(
        "Could not find lesson for subsection:",
        firstSubsection.slug
      );
      alert("Lesson not found. Please try again.");
    } else {
      // For other courses, use the subsection slug directly (already prefixed)
      window.location.href = `/courses/${courseParams.slug}/lesson/${firstSubsection.slug}`;
    }
  };
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

        if (!response.ok) {
          console.error(
            "API response not OK:",
            response.status,
            response.statusText
          );
        }

        if (response.ok) {
          const data = await response.json();
          console.log("Course data received:", data);
          setCourse(data.rendered);
          setTemplate(data.template);

          // Check enrollment status if user is logged in
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

              // Also check last accessed lesson
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

          // Fetch lessons using the working lessons API
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

          // Don't override enrollment status - keep the database check result
          // Free courses still need proper enrollment detection

          // Fetch last accessed lesson for continue learning
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
            // Continue without last lesson data
          }
        } else {
          // Fallback to old system
          console.log(
            "API failed, trying fallback system for:",
            courseParams.slug
          );
          const courseData = getCourseBySlug(courseParams.slug);
          if (!courseData) {
            console.error(
              "Course not found in both API and fallback system:",
              courseParams.slug
            );
            setError(
              `Course "${courseParams.slug}" not found. Please check the URL or contact support.`
            );
            return;
          }

          // For IBDP courses, add default template data
          if (isIBDPCourse) {
            const ibdpCourseData = {
              ...courseData,
              template_data: {
                curriculum: "IBDP",
                subject: "Mathematics",
                grade: "Higher Level",
                level: "Analysis & Approaches HL",
                duration: "250 hours",
                lessons: 45,
                features: [
                  "Complete IBDP AA HL syllabus coverage",
                  "Exam-focused preparation",
                  "Step-by-step problem solving",
                  "Practice tests and mock exams",
                  "Internal Assessment support",
                ],
                prerequisites: [
                  "Strong foundation in IGCSE/GCSE Mathematics",
                  "Basic understanding of algebra and geometry",
                ],
                learningOutcomes: [
                  "Master all IBDP AA HL Mathematics concepts",
                  "Solve complex problems with confidence",
                  "Excel in IBDP examinations",
                  "Develop strong mathematical reasoning",
                ],
                tags: [
                  "IBDP",
                  "Mathematics",
                  "Analysis & Approaches",
                  "HL",
                  "International",
                  "University Prep",
                ],
              },
            };
            setCourse(ibdpCourseData as unknown as RenderedCourse);
          } else {
            setCourse(courseData as unknown as RenderedCourse);
          }
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

          // Don't override enrollment status - keep the database check result
          // Free courses still need proper enrollment detection

          // Fetch last accessed lesson for continue learning
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
            // Continue without last lesson data
          }
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
  }, [courseParams.slug, courseParams, isIBDPCourse]);

  const handleEnroll = async () => {
    if (!user) {
      alert("Please log in to enroll in this course.");
      return;
    }

    if (!course?.id) {
      alert("Course information not available.");
      return;
    }

    try {
      const supabase = createClient();

      // Create enrollment
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
                {(course.template_data?.tags || course.tags || [])
                  .filter((tag) => {
                    // Filter out tags that are already shown as individual badges
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
                    <CardDescription>{course.lessons} lessons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isIBDPCourse ? (
                      <IBDPCourseStructure courseSlug={courseParams.slug} />
                    ) : courseParams.slug === "cbse-mathematics-class-9" ||
                      courseParams.slug === "cbse-mathematics-class-10" ? (
                      // Use database-driven structure for CBSE courses
                      <div className="space-y-2">
                        {(() => {
                          // Group lessons by unit and chapter from database
                          const groupedLessons = lessons.reduce(
                            (acc, lesson: any) => {
                              const unitName = lesson.unit_name || "Other";
                              const chapterName =
                                lesson.chapter_name || "Miscellaneous";

                              if (!acc[unitName]) acc[unitName] = {};
                              if (!acc[unitName][chapterName])
                                acc[unitName][chapterName] = [];
                              acc[unitName][chapterName].push(lesson);
                              return acc;
                            },
                            {} as Record<string, Record<string, any[]>>
                          );

                          return Object.entries(groupedLessons).map(
                            ([unitName, chapters], unitIndex) => {
                              const unitId = `unit-${unitIndex}`;
                              const isExpanded = expandedUnits.has(unitId);
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
                                        ({Object.keys(chapters).length}{" "}
                                        {Object.keys(chapters).length === 1
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
                                      {Object.entries(chapters).map(
                                        (
                                          [chapterName, chapterLessons],
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
                                              {chapterLessons.length}{" "}
                                              {chapterLessons.length === 1
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
                    {course.template_data?.units?.length ||
                      getUnitsForCourse().length}
                  </span>
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

            {/* Chapter Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Unit Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {getUnitsForCourse().length > 0 ? (
                    getUnitsForCourse().map((unit, index) => {
                      // Calculate number of lessons/chapters for each unit
                      const chapterCount = unit.chapters?.length || 0;
                      const lessonCount =
                        unit.chapters?.reduce(
                          (sum: number, ch: any) =>
                            sum + (ch.subsections?.length || 0),
                          0
                        ) || 0;

                      return (
                        <div
                          key={unit.id || index}
                          className="flex justify-between"
                        >
                          <span className="text-muted-foreground">
                            {index + 1}. {unit.title}
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
