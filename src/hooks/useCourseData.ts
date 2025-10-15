import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
// import { getCourseBySlug, getLessonsByCourseId, Lesson } from "@/lib/courses"; // TODO: Update this import
import { useCourseAccess } from "@/hooks/useCourseAccess";

interface Lesson {
  id: string;
  title: string;
  content: string | null;
  is_preview: boolean;
  slug: string | null;
}

interface CourseData {
  id: string;
  title: string;
  description: string | null;
  price: number;
  slug: string | null;
  created_at: string;
  updated_at: string;
}

interface CourseContentSection {
  id: string;
  title: string;
  lectures: number;
  duration: string;
  lessons: Array<{
    id: string;
    title: string;
    duration: string;
    type: "video" | "document" | "question" | "practice";
    hasPreview: boolean;
    isLocked: boolean;
    isCompleted: boolean;
    slug: string | null;
  }>;
}

export function useCourseData(courseSlug: string) {
  const { user } = useAuth();
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [courseContent, setCourseContent] = useState<CourseContentSection[]>(
    []
  );
  const [courseProgress, setCourseProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isEnrolled, isFree, canPreview } = useCourseAccess(
    courseData?.id || ""
  );

  const extractSectionFromTitle = (title: string): string => {
    // CBSE Class 10 Mathematics chapter organization
    const titleLower = title.toLowerCase();

    if (
      titleLower.includes("real numbers") ||
      titleLower.includes("euclid") ||
      titleLower.includes("irrational")
    ) {
      return "Chapter 1: Real Numbers";
    } else if (titleLower.includes("polynomial")) {
      return "Chapter 2: Polynomials";
    } else if (titleLower.includes("linear equation")) {
      return "Chapter 3: Pair of Linear Equations";
    } else if (titleLower.includes("quadratic")) {
      return "Chapter 4: Quadratic Equations";
    } else if (
      titleLower.includes("arithmetic progression") ||
      titleLower.includes("ap")
    ) {
      return "Chapter 5: Arithmetic Progressions";
    } else if (titleLower.includes("triangle")) {
      return "Chapter 6: Triangles";
    } else if (titleLower.includes("coordinate")) {
      return "Chapter 7: Coordinate Geometry";
    } else if (
      titleLower.includes("trigonometry") &&
      !titleLower.includes("application")
    ) {
      return "Chapter 8: Introduction to Trigonometry";
    } else if (
      titleLower.includes("application") &&
      titleLower.includes("trigonometry")
    ) {
      return "Chapter 9: Applications of Trigonometry";
    } else if (titleLower.includes("circle") && !titleLower.includes("area")) {
      return "Chapter 10: Circles";
    } else if (titleLower.includes("construction")) {
      return "Chapter 11: Constructions";
    } else if (titleLower.includes("area") && titleLower.includes("circle")) {
      return "Chapter 12: Areas Related to Circles";
    } else if (
      titleLower.includes("surface area") ||
      titleLower.includes("volume")
    ) {
      return "Chapter 13: Surface Areas and Volumes";
    } else if (titleLower.includes("statistics")) {
      return "Chapter 14: Statistics";
    } else if (titleLower.includes("probability")) {
      return "Chapter 15: Probability";
    } else if (
      titleLower.includes("mock test") ||
      titleLower.includes("assessment")
    ) {
      return "Assessments";
    } else {
      return "Additional Topics";
    }
  };

  const determineLessonType = (
    title: string,
    content: string | null
  ): "video" | "document" | "question" | "practice" => {
    const titleLower = title.toLowerCase();
    const contentLower = content?.toLowerCase() || "";

    if (
      titleLower.includes("practice") ||
      titleLower.includes("problem") ||
      titleLower.includes("exercise")
    ) {
      return "practice";
    } else if (
      titleLower.includes("question") ||
      titleLower.includes("quiz") ||
      titleLower.includes("test")
    ) {
      return "question";
    } else if (
      contentLower.includes("video") ||
      titleLower.includes("video") ||
      titleLower.includes("lecture")
    ) {
      return "video";
    } else {
      return "document";
    }
  };

  const organizeLessonsIntoSections = useCallback(
    (lessons: Lesson[], isEnrolled: boolean): CourseContentSection[] => {
      // Group lessons by topic/chapter (you can customize this logic)
      const sections: Record<string, CourseContentSection> = {};

      lessons.forEach((lesson) => {
        // Extract section from lesson title or use a default grouping
        const sectionTitle = extractSectionFromTitle(lesson.title);

        if (!sections[sectionTitle]) {
          sections[sectionTitle] = {
            id: sectionTitle.toLowerCase().replace(/\s+/g, "-"),
            title: sectionTitle,
            lectures: 0,
            duration: "0 hours",
            lessons: [],
          };
        }

        // Determine lesson type based on content or title
        const lessonType = determineLessonType(lesson.title, lesson.content);

        sections[sectionTitle].lessons.push({
          id: lesson.id,
          title: lesson.title,
          duration: "45:00", // Default duration, you can store this in the database
          type: lessonType,
          hasPreview: lesson.is_preview,
          isLocked: !isEnrolled && !lesson.is_preview,
          isCompleted: false, // This should come from actual progress tracking
          slug: lesson.slug,
        });

        sections[sectionTitle].lectures++;
      });

      // Calculate total duration for each section
      Object.values(sections).forEach((section) => {
        const totalMinutes = section.lessons.length * 45; // Assuming 45 minutes per lesson
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        section.duration = `${hours} hours${
          minutes > 0 ? ` ${minutes} minutes` : ""
        }`;
      });

      return Object.values(sections);
    },
    []
  );

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // TODO: Implement actual course and lesson fetching
        // const course = await getCourseBySlug(courseSlug);
        // if (!course) {
        //   setError("Course not found");
        //   return;
        // }
        // setCourseData(course);
        // const courseLessons = await getLessonsByCourseId(course.id);
        // setLessons(courseLessons);

        setError("This hook needs to be updated");
        return;

        // Organize lessons into sections (you can customize this logic)
        // const sections = organizeLessonsIntoSections(courseLessons, isEnrolled);
        // setCourseContent(sections);

        // Simulate progress (replace with actual progress tracking)
        if (user) {
          setCourseProgress(35); // This should come from actual progress tracking
        }
      } catch (err) {
        console.error("Error loading course data:", err);
        setError("Failed to load course data");
      } finally {
        setIsLoading(false);
      }
    };

    if (courseSlug) {
      loadCourseData();
    }
  }, [courseSlug, user, isEnrolled, organizeLessonsIntoSections]);

  return {
    courseData,
    lessons,
    courseContent,
    courseProgress,
    isLoading,
    error,
    isEnrolled,
    isFree,
    canPreview,
  };
}
