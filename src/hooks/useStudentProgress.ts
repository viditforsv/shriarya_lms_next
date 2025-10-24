import { useState, useEffect } from "react";

interface TagMastery {
  id: string;
  student_id: string;
  tag_name: string;
  course_id: string;
  total_attempts: number;
  correct_attempts: number;
  accuracy: number;
  avg_time_seconds: number;
  total_time_seconds: number;
  highest_difficulty_mastered: number;
  current_difficulty_level: number;
  mastery_level: "red" | "yellow" | "green";
  mastery_score: number;
  improvement_rate: number;
  retention_score: number;
  first_attempt_date: string;
  last_attempt_date: string;
  last_revision_date: string;
  created_at: string;
  updated_at: string;
}

interface Analytics {
  overview: {
    totalAttempts: number;
    correctAttempts: number;
    accuracy: number;
    avgTimeSeconds: number;
  };
  tagMastery: TagMastery[];
  masteryDistribution: {
    red: number;
    yellow: number;
    green: number;
  };
  recentAttempts: any[];
  overallStats: any;
}

interface UseStudentProgressOptions {
  studentId?: string;
  courseId?: string;
  autoFetch?: boolean;
}

export function useStudentProgress(options: UseStudentProgressOptions = {}) {
  const { studentId, courseId, autoFetch = true } = options;

  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [tagMastery, setTagMastery] = useState<TagMastery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (studentId) params.append("studentId", studentId);
      if (courseId) params.append("courseId", courseId);

      const response = await fetch(
        `/api/student-progress/analytics?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data = await response.json();
      setAnalytics(data.analytics);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const fetchTagMastery = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (studentId) params.append("studentId", studentId);
      if (courseId) params.append("courseId", courseId);

      const response = await fetch(
        `/api/student-progress/tag-mastery?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tag mastery");
      }

      const data = await response.json();
      setTagMastery(data.tagMastery || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const getTagMasteryLevel = (tagName: string): TagMastery | undefined => {
    return tagMastery.find((t) => t.tag_name === tagName);
  };

  const getWeakTags = (): TagMastery[] => {
    return tagMastery.filter((t) => t.mastery_level === "red");
  };

  const getStrongTags = (): TagMastery[] => {
    return tagMastery.filter((t) => t.mastery_level === "green");
  };

  useEffect(() => {
    if (autoFetch) {
      fetchAnalytics();
      fetchTagMastery();
    }
  }, [studentId, courseId, autoFetch]);

  return {
    analytics,
    tagMastery,
    loading,
    error,
    fetchAnalytics,
    fetchTagMastery,
    getTagMasteryLevel,
    getWeakTags,
    getStrongTags,
  };
}
