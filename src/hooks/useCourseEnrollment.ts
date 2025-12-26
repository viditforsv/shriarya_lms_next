"use client";

import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  enrollment_date: string;
  is_active: boolean;
}

export function useCourseEnrollment() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  // Enroll in a course
  const enroll = useCallback(
    async (courseId: string): Promise<Enrollment | null> => {
      if (!user) {
        setError("Please log in to enroll in courses");
        return null;
      }

      setLoading(courseId);
      setError(null);

      try {
        const { data, error: enrollError } = await supabase
          .from("courses_enrollments")
          .insert({
            student_id: user.id,
            course_id: courseId,
            is_active: true,
          })
          .select()
          .single();

        if (enrollError) throw enrollError;
        return data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to enroll in course";
        setError(message);
        return null;
      } finally {
        setLoading(null);
      }
    },
    [user, supabase]
  );

  // Cancel enrollment
  const cancel = useCallback(
    async (courseId: string): Promise<void> => {
      if (!user) {
        setError("Please log in to manage enrollments");
        return;
      }

      setLoading(courseId);
      setError(null);

      try {
        const { error: cancelError } = await supabase
          .from("courses_enrollments")
          .update({ is_active: false })
          .eq("student_id", user.id)
          .eq("course_id", courseId);

        if (cancelError) throw cancelError;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to cancel enrollment";
        setError(message);
      } finally {
        setLoading(null);
      }
    },
    [user, supabase]
  );

  // Check if user is enrolled
  const checkEnrollment = useCallback(
    async (courseId: string): Promise<boolean> => {
      if (!user) return false;

      try {
        const { data } = await supabase
          .from("courses_enrollments")
          .select("*")
          .eq("student_id", user.id)
          .eq("course_id", courseId)
          .eq("is_active", true)
          .single();

        return !!data;
      } catch (err) {
        console.error("Error checking enrollment:", err);
        return false;
      }
    },
    [user, supabase]
  );

  return {
    enroll,
    cancel,
    checkEnrollment,
    loading,
    error,
    clearError: () => setError(null),
  };
}

export function useCourseAccess(courseId: string) {
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClient();

  const checkAccess = useCallback(async () => {
    if (!user) {
      setHasAccess(false);
      setLoading(false);
      return;
    }

    try {
      const { data } = await supabase
        .from("courses_enrollments")
        .select("*")
        .eq("student_id", user.id)
        .eq("course_id", courseId)
        .eq("is_active", true)
        .single();

      setHasAccess(!!data);
    } catch (err) {
      console.error("Error checking course access:", err);
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  }, [user, courseId, supabase]);

  // Check access on mount and when dependencies change
  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  return {
    hasAccess,
    loading,
    checkAccess,
  };
}
