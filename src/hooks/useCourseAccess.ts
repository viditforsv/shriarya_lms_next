import { useAuth } from "@/contexts/AuthContext";
import { canAccessCourse, getCourseAccessType } from "@/lib/access-control";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useCourseAccess(courseId: string) {
  const { user, profile } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [coursePrice, setCoursePrice] = useState<number | null>(null);
  const supabase = createClient();

  // Check enrollment status and fetch course price
  useEffect(() => {
    const checkEnrollmentAndPrice = async () => {
      if (!courseId) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch course price
        const { data: courseData } = await supabase
          .from("courses")
          .select("price")
          .eq("id", courseId)
          .single();

        if (courseData) {
          setCoursePrice(courseData.price || 0);
        }

        // Check enrollment if user is logged in
        if (user && profile) {
          const { data, error } = await supabase
            .from("courses_enrollments")
            .select("*")
            .eq("student_id", user.id)
            .eq("course_id", courseId)
            .eq("is_active", true)
            .single();

          if (error && error.code !== "PGRST116") {
            console.error("Error checking enrollment:", error);
          }

          setIsEnrolled(!!data);
        } else {
          setIsEnrolled(false);
        }
      } catch (error) {
        console.error("Error checking enrollment:", error);
        setIsEnrolled(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkEnrollmentAndPrice();
  }, [user, profile, courseId, supabase]);

  // Check if course is free
  const isFree = coursePrice === 0;

  // Check if user can access the course
  const canAccess = canAccessCourse(
    courseId,
    profile?.role,
    isEnrolled,
    coursePrice || undefined
  );

  // Check if user can preview the course
  const courseConfig = getCourseAccessType(courseId);
  const canPreview = courseConfig?.previewAvailable || false;

  // Check if user needs to enroll
  const needsEnrollment = !isEnrolled && profile?.role === "student";

  // Check if user needs to upgrade (for paid courses)
  const needsUpgrade = !isFree && !user;

  return {
    canAccess,
    canPreview,
    isEnrolled,
    isFree,
    needsEnrollment,
    needsUpgrade,
    isLoading,
    courseConfig,
  };
}

// Hook for checking multiple courses at once
export function useCoursesAccess(courseIds: string[]) {
  const { user, profile } = useAuth();
  const [enrollments, setEnrollments] = useState<Record<string, boolean>>({});
  const [coursePrices, setCoursePrices] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkEnrollments = async () => {
      if (courseIds.length === 0) {
        setEnrollments({});
        setCoursePrices({});
        setIsLoading(false);
        return;
      }

      try {
        // Fetch course prices
        const { data: coursesData } = await supabase
          .from("courses")
          .select("id, price")
          .in("id", courseIds);

        if (coursesData) {
          const priceMap: Record<string, number> = {};
          coursesData.forEach((course) => {
            priceMap[course.id] = course.price || 0;
          });
          setCoursePrices(priceMap);
        }

        // Check enrollments if user is logged in
        if (!user || !profile) {
          setEnrollments({});
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("courses_enrollments")
          .select("course_id")
          .eq("student_id", user.id)
          .eq("is_active", true)
          .in("course_id", courseIds);

        if (error) {
          console.error("Error checking enrollments:", error);
          setEnrollments({});
        } else {
          const enrollmentMap: Record<string, boolean> = {};
          courseIds.forEach((id) => {
            enrollmentMap[id] = data?.some((e) => e.course_id === id) || false;
          });
          setEnrollments(enrollmentMap);
        }
      } catch (error) {
        console.error("Error checking enrollments:", error);
        setEnrollments({});
      } finally {
        setIsLoading(false);
      }
    };

    checkEnrollments();
  }, [user, profile, courseIds, supabase]);

  const getCourseAccess = (courseId: string) => {
    const isEnrolled = enrollments[courseId] || false;
    const canAccess = canAccessCourse(courseId, profile?.role, isEnrolled);
    const courseConfig = getCourseAccessType(courseId);
    const coursePrice = coursePrices[courseId] || 0;

    return {
      canAccess,
      isEnrolled,
      isFree: coursePrice === 0,
      canPreview: courseConfig?.previewAvailable || false,
    };
  };

  return {
    enrollments,
    isLoading,
    getCourseAccess,
  };
}
