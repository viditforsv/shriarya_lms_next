"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/design-system/components/ui/card";
import { Badge } from "@/design-system/components/ui/badge";
import { Progress } from "@/design-system/components/ui/progress";
import {
  Clock,
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { renderMultiPartQuestion } from "@/components/MathRenderer";
import { Checkbox } from "@/design-system/components/ui/checkbox";

interface QuizOption {
  value: string;
  label: string;
}

interface QuizQuestion {
  id: string;
  question_order: number;
  question_bank: {
    id: string;
    question_text: string;
    difficulty: number;
    question_type: string;
    total_marks: number;
    topic: string;
    subtopic: string;
    correct_answer?: string;
    explanation?: string;
    options?: QuizOption[];
  };
}

interface Quiz {
  id: string;
  title: string;
  difficulty: string;
  time_limit: number | null;
  lesson_id?: string | null;
  courses_lessons?: {
    id: string;
    title: string;
    lesson_code: string;
    course_id?: string;
  } | null;
}

interface QuizPlayerProps {
  quizId: string;
}

export function QuizPlayer({ quizId }: QuizPlayerProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [questionStartTimes, setQuestionStartTimes] = useState<Record<string, number>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recordedAttempts, setRecordedAttempts] = useState<Set<string>>(new Set());
  const [quizSessionId] = useState<string>(`quiz_${quizId}_${Date.now()}`);
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({});
  const [currentQuestionTime, setCurrentQuestionTime] = useState<number>(0);
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const fetchQuizData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch quiz details
      const quizResponse = await fetch(`/api/quizzes?id=${quizId}`);
      if (quizResponse.ok) {
        const quizData = await quizResponse.json();
        if (quizData.quizzes && quizData.quizzes.length > 0) {
          setQuiz(quizData.quizzes[0]);
          if (quizData.quizzes[0].time_limit) {
            setTimeRemaining(quizData.quizzes[0].time_limit * 60); // Convert to seconds
          }
        }
      }

      // Fetch quiz questions
      const questionsResponse = await fetch(`/api/quizzes/${quizId}/questions`);
      if (questionsResponse.ok) {
        const questionsData = await questionsResponse.json();
        setQuestions(questionsData.questions || []);
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  // Track when a question is viewed to measure time spent
  useEffect(() => {
    if (started && !submitted && questions.length > 0 && currentQuestionIndex >= 0) {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion) {
        const startTime = Date.now();
        setQuestionStartTimes((prev) => ({
          ...prev,
          [currentQuestion.question_bank.id]: startTime,
        }));
        setCurrentQuestionTime(0); // Reset timer for new question
      }
    }
  }, [currentQuestionIndex, started, submitted, questions]);

  // Update current question timer every second
  useEffect(() => {
    if (started && !submitted && questions.length > 0 && currentQuestionIndex >= 0) {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion) {
        const startTime = questionStartTimes[currentQuestion.question_bank.id];
        if (startTime) {
          const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            setCurrentQuestionTime(elapsed);
          }, 1000);

          return () => clearInterval(interval);
        }
      }
    }
  }, [started, submitted, currentQuestionIndex, questions, questionStartTimes]);

  const recordQuestionAttempt = useCallback(async (
    questionId: string,
    selectedAnswer: string,
    correctAnswer: string | undefined
  ) => {
    // Don't record if no correct answer
    if (!correctAnswer) {
      return;
    }

    // Check if already recorded and mark as recording
    setRecordedAttempts((prev) => {
      if (prev.has(questionId)) {
        return prev; // Already recorded, return same set
      }
      // Mark as recording immediately to prevent duplicates
      return new Set(prev).add(questionId);
    });

    // Get time taken
    const startTime = questionStartTimes[questionId] || Date.now();
    const timeTaken = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
    const isCorrect = selectedAnswer === correctAnswer;

    try {
      const response = await fetch("/api/student-progress/attempts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_id: questionId,
          lesson_id: quiz?.lesson_id || null,
          course_id: quiz?.courses_lessons?.course_id || null,
          time_taken_seconds: timeTaken,
          is_correct: isCorrect,
          hint_used: false,
          session_id: quizSessionId,
          session_order: questions.findIndex(q => q.question_bank.id === questionId) + 1,
        }),
      });

      if (response.ok) {
        console.log(`✅ Recorded attempt: ${isCorrect ? "Correct" : "Incorrect"} (${timeTaken}s)`);
      } else {
        const errorData = await response.json();
        console.error("Error recording attempt:", errorData);
        // Remove from recorded set if failed
        setRecordedAttempts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(questionId);
          return newSet;
        });
      }
    } catch (error) {
      console.error("Error recording attempt:", error);
      // Remove from recorded set if failed
      setRecordedAttempts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    }
  }, [questionStartTimes, quiz, quizSessionId, questions]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
    
    // If answer was already checked and user is changing it, clear checked state
    // (but only if the previous answer was wrong - if correct, it stays locked)
    if (checkedAnswers[questionId]) {
      const currentQuestion = questions.find(
        (q) => q.question_bank.id === questionId
      );
      const wasCorrect = 
        currentQuestion?.question_bank.correct_answer &&
        answers[questionId] === currentQuestion.question_bank.correct_answer;
      
      // Only clear if the previous answer was wrong
      if (!wasCorrect) {
        setCheckedAnswers({
          ...checkedAnswers,
          [questionId]: false,
        });
      }
    }
  };

  const handleCheckAnswer = (questionId: string) => {
    setCheckedAnswers({
      ...checkedAnswers,
      [questionId]: true,
    });

    // Record attempt when answer is checked (for MCQ and True/False)
    const currentQuestion = questions.find(
      (q) => q.question_bank.id === questionId
    );
    
    if (
      (currentQuestion?.question_bank.question_type === "mcq" ||
        currentQuestion?.question_bank.question_type === "true_false") &&
      currentQuestion?.question_bank.correct_answer &&
      answers[questionId]
    ) {
      recordQuestionAttempt(
        questionId,
        answers[questionId],
        currentQuestion.question_bank.correct_answer
      );
    }
  };

  const handleSubmit = useCallback(() => {
    setSubmitted(true);

    // Calculate score (simplified - checks if answer matches correct_answer)
    let correct = 0;
    let total = 0;

    questions.forEach((q) => {
      if (q.question_bank.correct_answer) {
        total++;
        if (answers[q.question_bank.id] === q.question_bank.correct_answer) {
          correct++;
        }
      }
    });

    if (total > 0) {
      setScore(Math.round((correct / total) * 100));
    }
  }, [questions, answers]);

  // Timer effect
  useEffect(() => {
    if (started && !submitted && timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer);
            handleSubmit(); // Auto-submit when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [started, submitted, timeRemaining, handleSubmit]);

  const handleStart = () => {
    setStarted(true);
    setSubmitted(false);
    setAnswers({});
    setScore(null);
    setCurrentQuestionIndex(0);
    setRecordedAttempts(new Set());
    setQuestionStartTimes({});
    setCheckedAnswers({});
    if (quiz?.time_limit) {
      setTimeRemaining(quiz.time_limit * 60);
    }
  };

  const handleRetry = () => {
    setStarted(false);
    setSubmitted(false);
    setAnswers({});
    setScore(null);
    setCurrentQuestionIndex(0);
    setRecordedAttempts(new Set());
    setQuestionStartTimes({});
    setCheckedAnswers({});
    if (quiz?.time_limit) {
      setTimeRemaining(quiz.time_limit * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading quiz...</p>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No questions available for this quiz yet.
        </p>
      </div>
    );
  }

  // Quiz not started
  if (!started) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{quiz.title}</CardTitle>
          <CardDescription>Test your knowledge with this quiz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="font-semibold">{questions.length}</p>
              </div>
            </div>

            {quiz.time_limit && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time Limit</p>
                  <p className="font-semibold">{quiz.time_limit} minutes</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className="font-semibold capitalize">{quiz.difficulty}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Marks</p>
                <p className="font-semibold">
                  {questions.reduce(
                    (sum, q) => sum + q.question_bank.total_marks,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
            onClick={handleStart}
          >
            <Play className="w-5 h-5 mr-2" />
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Quiz submitted - Show results
  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
          <CardDescription>
            Here&apos;s how you performed on this quiz
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Display */}
          {score !== null && (
            <div className="text-center py-8">
              <div className="inline-block p-8 bg-primary/10 rounded-full mb-4">
                <Award className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">{score}%</h3>
              <p className="text-lg text-muted-foreground">
                {score >= 80
                  ? "Excellent work!"
                  : score >= 60
                  ? "Good job!"
                  : score >= 40
                  ? "Keep practicing!"
                  : "Review the material and try again"}
              </p>
            </div>
          )}

          {/* Question Review */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Review Your Answers</h4>
            {questions.map((q, index) => {
              const userAnswer = answers[q.question_bank.id];
              const correctAnswer = q.question_bank.correct_answer;
              const isCorrect = userAnswer === correctAnswer;

              return (
                <Card
                  key={q.id}
                  className="border-l-4"
                  style={{
                    borderLeftColor: correctAnswer
                      ? isCorrect
                        ? "rgb(34, 197, 94)"
                        : "rgb(239, 68, 68)"
                      : "rgb(156, 163, 175)",
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2 mb-3">
                      <Badge variant="outline">Q{index + 1}</Badge>
                      {correctAnswer && (
                        <Badge
                          variant={isCorrect ? "default" : "destructive"}
                          className={isCorrect ? "bg-green-600" : ""}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Correct
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 mr-1" />
                              Incorrect
                            </>
                          )}
                        </Badge>
                      )}
                    </div>

                    <div className="prose prose-sm max-w-none mb-3">
                      {renderMultiPartQuestion(q.question_bank.question_text)}
                    </div>

                    {correctAnswer && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm">
                          <span className="font-semibold">Your answer:</span>{" "}
                          <span
                            className={
                              isCorrect ? "text-green-600" : "text-red-600"
                            }
                          >
                            {userAnswer || "Not answered"}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm">
                            <span className="font-semibold">
                              Correct answer:
                            </span>{" "}
                            <span className="text-green-600">
                              {correctAnswer}
                            </span>
                          </p>
                        )}
                        {q.question_bank.explanation && (
                          <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm font-semibold mb-1">
                              Explanation:
                            </p>
                            <div className="prose prose-sm max-w-none">
                              {renderMultiPartQuestion(
                                q.question_bank.explanation
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={handleRetry}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Retry Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Quiz in progress
  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Badge>
              {timeRemaining !== null && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span
                    className={`font-semibold ${
                      timeRemaining < 60 ? "text-red-600" : "text-foreground"
                    }`}
                  >
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
            </div>
            <Progress
              value={((currentQuestionIndex + 1) / questions.length) * 100}
              className="w-32 h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Question */}
      {currentQuestion && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
                <CardDescription>
                  {currentQuestion.question_bank.total_marks} mark(s) •
                  Difficulty: {currentQuestion.question_bank.difficulty}/10
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                {/* Question Timer */}
                {started && !submitted && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span
                      className={`font-semibold ${
                        currentQuestionTime >= 90
                          ? "text-red-600"
                          : currentQuestionTime >= 70
                          ? "text-yellow-600"
                          : "text-foreground"
                      }`}
                    >
                      {formatTime(currentQuestionTime)}
                    </span>
                  </div>
                )}
              <Badge variant="outline">
                {currentQuestion.question_bank.question_type}
              </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Question Text */}
            <div className="mb-6">
              <div className="prose prose-base max-w-none text-foreground">
              {renderMultiPartQuestion(
                currentQuestion.question_bank.question_text
              )}
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-4">

              {currentQuestion.question_bank.question_type === "true_false" ? (
                // True/False Options with Check Answer button
                <div className="space-y-4">
                <div className="space-y-2">
                    {["True", "False"].map((option) => {
                      const questionId = currentQuestion.question_bank.id;
                      const isSelected = answers[questionId] === option;
                      const correctAnswer =
                        currentQuestion.question_bank.correct_answer;
                      const isCorrect = option === correctAnswer;
                      const isChecked = checkedAnswers[questionId] || false;
                      const isAnswerCorrect = isChecked && answers[questionId] === correctAnswer;

                      let optionClassName = "w-full flex items-center space-x-2 p-4 border-2 rounded-lg transition-all cursor-pointer ";
                      if (isChecked) {
                        if (isAnswerCorrect && isCorrect) {
                          // Correct answer - only show in green if user got it right
                          optionClassName +=
                            "bg-green-50 border-green-500";
                        } else if (isSelected && !isAnswerCorrect) {
                          // Selected but wrong - show in red
                          optionClassName +=
                            "bg-red-50 border-red-500";
                        } else {
                          // Not selected, not correct - normal styling
                          optionClassName +=
                            "border-gray-200 hover:bg-gray-50";
                        }
                      } else if (isSelected) {
                        optionClassName += "bg-blue-50 border-blue-500";
                      } else {
                        optionClassName +=
                          "border-gray-200 hover:border-primary/50";
                      }

                      // Only disable if answer is correct
                      if (isChecked && isAnswerCorrect) {
                        optionClassName += " cursor-not-allowed";
                      }

                      return (
                        <button
                      key={option}
                          onClick={() => {
                            // Allow changing answer if wrong, but not if correct
                            if (!(isChecked && isAnswerCorrect)) {
                              handleAnswer(questionId, option);
                            }
                          }}
                          disabled={isChecked && isAnswerCorrect}
                          className={optionClassName}
                        >
                        <Checkbox
                            checked={isSelected}
                            disabled={isChecked && isAnswerCorrect}
                          />
                          <span className="font-medium flex-1 text-left">
                            {option}
                          </span>
                          {isChecked && isAnswerCorrect && isCorrect && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                          {isChecked && isSelected && !isAnswerCorrect && (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </button>
                      );
                    })}
                      </div>

                  {/* Check Answer Button */}
                  <div className="flex gap-2">
                    {answers[currentQuestion.question_bank.id] &&
                      !(checkedAnswers[currentQuestion.question_bank.id] &&
                        answers[currentQuestion.question_bank.id] ===
                          currentQuestion.question_bank.correct_answer) && (
                        <Button
                          onClick={() =>
                            handleCheckAnswer(currentQuestion.question_bank.id)
                          }
                          className="bg-primary hover:bg-primary/90"
                        >
                          {checkedAnswers[currentQuestion.question_bank.id]
                            ? "Check Answer Again"
                            : "Check Answer"}
                        </Button>
                      )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        const questionId = currentQuestion.question_bank.id;
                        setAnswers({
                          ...answers,
                          [questionId]: "",
                        });
                        setCheckedAnswers({
                          ...checkedAnswers,
                          [questionId]: false,
                        });
                        setShowExplanations((prev) => ({
                          ...prev,
                          [questionId]: false,
                        }));
                      }}
                    >
                      Reset
                    </Button>
                    </div>

                  {/* Answer Feedback */}
                  {checkedAnswers[currentQuestion.question_bank.id] &&
                    currentQuestion.question_bank.correct_answer && (
                      <div
                        className={`p-3 border rounded-sm ${
                          answers[currentQuestion.question_bank.id] ===
                          currentQuestion.question_bank.correct_answer
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"
                        }`}
                      >
                        <p
                          className={`text-sm font-medium mb-1 ${
                            answers[currentQuestion.question_bank.id] ===
                            currentQuestion.question_bank.correct_answer
                              ? "text-green-800"
                              : "text-red-800"
                          }`}
                        >
                          {answers[currentQuestion.question_bank.id] ===
                          currentQuestion.question_bank.correct_answer
                            ? "✓ Correct!"
                            : "✗ Incorrect"}
                        </p>
                        {answers[currentQuestion.question_bank.id] ===
                          currentQuestion.question_bank.correct_answer && (
                          <p className="text-sm text-green-700">
                            <span className="font-medium">Correct Answer: </span>
                            {currentQuestion.question_bank.correct_answer}
                          </p>
                        )}
                      </div>
                    )}

                  {/* Show explanation toggle if available and answer is checked */}
                  {checkedAnswers[currentQuestion.question_bank.id] &&
                    currentQuestion.question_bank.explanation && (
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                          onClick={() => {
                            const questionId = currentQuestion.question_bank.id;
                            setShowExplanations((prev) => ({
                              ...prev,
                              [questionId]: !prev[questionId],
                            }));
                          }}
                        >
                          <span className="text-sm font-medium">
                            {showExplanations[currentQuestion.question_bank.id]
                              ? "Hide Explanation"
                              : "Show Explanation"}
                          </span>
                          {showExplanations[currentQuestion.question_bank.id] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                        {showExplanations[currentQuestion.question_bank.id] && (
                          <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm font-semibold mb-2 text-blue-900">
                              Explanation:
                            </p>
                            <div className="prose prose-sm max-w-none text-blue-800">
                              {renderMultiPartQuestion(
                                currentQuestion.question_bank.explanation
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                    )}
                </div>
              ) : (() => {
                // Parse options if they come as a string (JSONB might be stringified)
                let options = currentQuestion.question_bank.options;
                if (options && typeof options === "string") {
                  try {
                    options = JSON.parse(options);
                  } catch (e) {
                    console.error("Failed to parse options:", e);
                    return false;
                  }
                }
                return currentQuestion.question_bank.question_type === "mcq" &&
                  options &&
                  Array.isArray(options) &&
                  options.length > 0;
              })() ? (
                // MCQ Options with Check Answer button pattern
                <div className="space-y-4">
                <div className="space-y-2">
                  {(() => {
                    // Parse options if needed
                    let options = currentQuestion.question_bank.options;
                    if (options && typeof options === "string") {
                      try {
                        options = JSON.parse(options);
                      } catch (e) {
                        console.error("Failed to parse options:", e);
                        return [];
                      }
                    }
                    return Array.isArray(options) ? options : [];
                  })().map(
                      (option: QuizOption, index: number) => {
                        const questionId = currentQuestion.question_bank.id;
                        const isSelected =
                          answers[questionId] === option.value;
                        const correctAnswer =
                          currentQuestion.question_bank.correct_answer;
                        const isCorrect = option.value === correctAnswer;
                        const isChecked = checkedAnswers[questionId] || false;

                        // Determine styling based on selection and checked state
                        const isAnswerCorrect = isChecked && answers[questionId] === correctAnswer;
                        let optionClassName = "w-full flex items-center space-x-2 p-3 border rounded-sm transition-all cursor-pointer ";
                        if (isChecked) {
                          if (isAnswerCorrect && isCorrect) {
                            // Correct answer - only show in green if user got it right
                            optionClassName +=
                              "bg-green-50 border-green-500 border-2";
                          } else if (isSelected && !isAnswerCorrect) {
                            // Selected but wrong - show in red
                            optionClassName +=
                              "bg-red-50 border-red-500 border-2";
                          } else {
                            // Not selected, not correct - normal styling
                            optionClassName +=
                              "border-gray-200 hover:bg-gray-50";
                          }
                        } else if (isSelected) {
                          optionClassName += "bg-blue-50 border-blue-500";
                        } else {
                          optionClassName +=
                            "border-gray-200 hover:bg-gray-50";
                        }

                        // Only disable if answer is correct
                        if (isChecked && isAnswerCorrect) {
                          optionClassName += " cursor-not-allowed";
                        }

                        return (
                          <button
                        key={index}
                            onClick={() => {
                              // Allow changing answer if wrong, but not if correct
                              if (!(isChecked && isAnswerCorrect)) {
                                handleAnswer(questionId, option.value);
                              }
                            }}
                            disabled={isChecked && isAnswerCorrect}
                            className={optionClassName}
                          >
                            <div
                              className={`w-6 h-6 flex items-center justify-center border-2 rounded-sm text-sm font-medium ${
                                isSelected || (isChecked && isAnswerCorrect && isCorrect)
                                  ? "bg-primary border-primary text-white"
                                  : "border-primary text-primary"
                              }`}
                            >
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="flex-1 text-left">
                              {option.value}
                            </span>
                            {isChecked && isAnswerCorrect && isCorrect && (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                            {isChecked && isSelected && !isAnswerCorrect && (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>

                  {/* Check Answer Button */}
                  <div className="flex gap-2">
                    {answers[currentQuestion.question_bank.id] &&
                      !(checkedAnswers[currentQuestion.question_bank.id] &&
                        answers[currentQuestion.question_bank.id] ===
                          currentQuestion.question_bank.correct_answer) && (
                        <Button
                        onClick={() =>
                            handleCheckAnswer(currentQuestion.question_bank.id)
                          }
                          className="bg-primary hover:bg-primary/90"
                        >
                          {checkedAnswers[currentQuestion.question_bank.id]
                            ? "Check Answer Again"
                            : "Check Answer"}
                        </Button>
                      )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        const questionId = currentQuestion.question_bank.id;
                        setAnswers({
                          ...answers,
                          [questionId]: "",
                        });
                        setCheckedAnswers({
                          ...checkedAnswers,
                          [questionId]: false,
                        });
                        setShowExplanations((prev) => ({
                          ...prev,
                          [questionId]: false,
                        }));
                      }}
                    >
                      Reset
                    </Button>
                  </div>

                  {/* Answer Feedback */}
                  {checkedAnswers[currentQuestion.question_bank.id] &&
                    currentQuestion.question_bank.correct_answer && (
                      <div
                        className={`p-3 border rounded-sm ${
                              answers[currentQuestion.question_bank.id] ===
                          currentQuestion.question_bank.correct_answer
                            ? "bg-green-50 border-green-200"
                            : "bg-red-50 border-red-200"
                        }`}
                      >
                        <p
                          className={`text-sm font-medium mb-1 ${
                              answers[currentQuestion.question_bank.id] ===
                            currentQuestion.question_bank.correct_answer
                              ? "text-green-800"
                              : "text-red-800"
                          }`}
                        >
                          {answers[currentQuestion.question_bank.id] ===
                          currentQuestion.question_bank.correct_answer
                            ? "✓ Correct!"
                            : "✗ Incorrect"}
                        </p>
                        {answers[currentQuestion.question_bank.id] ===
                          currentQuestion.question_bank.correct_answer && (
                          <p className="text-sm text-green-700">
                            <span className="font-medium">Correct Answer: </span>
                            {currentQuestion.question_bank.correct_answer}
                          </p>
                        )}
                        </div>
                    )}

                  {/* Show explanation toggle if available and answer is checked */}
                  {checkedAnswers[currentQuestion.question_bank.id] &&
                    currentQuestion.question_bank.explanation && (
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                          onClick={() => {
                            const questionId = currentQuestion.question_bank.id;
                            setShowExplanations((prev) => ({
                              ...prev,
                              [questionId]: !prev[questionId],
                            }));
                          }}
                        >
                          <span className="text-sm font-medium">
                            {showExplanations[currentQuestion.question_bank.id]
                              ? "Hide Explanation"
                              : "Show Explanation"}
                          </span>
                          {showExplanations[currentQuestion.question_bank.id] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                        {showExplanations[currentQuestion.question_bank.id] && (
                          <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm font-semibold mb-2 text-blue-900">
                              Explanation:
                            </p>
                            <div className="prose prose-sm max-w-none text-blue-800">
                              {renderMultiPartQuestion(
                                currentQuestion.question_bank.explanation
                              )}
                      </div>
                        </div>
                        )}
                      </div>
                  )}
                </div>
              ) : currentQuestion.question_bank.question_type ===
                "fill_blank" ? (
                // Fill in the Blank - Single line input
                <Input
                  className="w-full p-3 text-lg"
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion.question_bank.id] || ""}
                  onChange={(e) =>
                    handleAnswer(
                      currentQuestion.question_bank.id,
                      e.target.value
                    )
                  }
                />
              ) : (
                // Subjective questions - Textarea
                <textarea
                  className="w-full min-h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion.question_bank.id] || ""}
                  onChange={(e) =>
                    handleAnswer(
                      currentQuestion.question_bank.id,
                      e.target.value
                    )
                  }
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4 border-t">
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
                }
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentQuestionIndex === questions.length - 1 ? (
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleSubmit}
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    setCurrentQuestionIndex(
                      Math.min(questions.length - 1, currentQuestionIndex + 1)
                    )
                  }
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Question Grid Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Question Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {questions.map((q, index) => (
              <button
                key={q.id}
                className={`p-2 rounded-lg border-2 text-sm font-semibold transition-all ${
                  index === currentQuestionIndex
                    ? "border-primary bg-primary text-white"
                    : answers[q.question_bank.id]
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-primary/50"
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Answered: {Object.keys(answers).length} / {questions.length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
