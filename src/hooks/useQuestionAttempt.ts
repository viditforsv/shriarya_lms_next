import { useState } from "react";

interface RecordAttemptParams {
  questionId: string;
  lessonId?: string;
  courseId?: string;
  timeSpentSeconds: number;
  isCorrect: boolean;
  hintUsed?: boolean;
  sessionId?: string;
  sessionOrder?: number;
}

interface AttemptResponse {
  success: boolean;
  attempt?: any;
  error?: string;
}

export function useQuestionAttempt() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recordAttempt = async (
    params: RecordAttemptParams
  ): Promise<AttemptResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/student-progress/attempts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_id: params.questionId,
          lesson_id: params.lessonId,
          course_id: params.courseId,
          time_taken_seconds: params.timeSpentSeconds,
          is_correct: params.isCorrect,
          hint_used: params.hintUsed || false,
          session_id: params.sessionId,
          session_order: params.sessionOrder,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to record attempt");
      }

      return {
        success: true,
        attempt: data.attempt,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    recordAttempt,
    loading,
    error,
  };
}
