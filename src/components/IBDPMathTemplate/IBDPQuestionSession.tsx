"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Progress } from "@/app/components-demo/ui/ui-components/progress";
import {
  CheckCircle,
  Clock,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Target,
} from "lucide-react";
import { MathRenderer, renderMultiPartQuestion } from "@/components/MathRenderer";

interface Question {
  id: string;
  question_text: string;
  tags: string[];
  marks: number;
  solution?: string;
  difficulty?: number;
}

interface IBDPQuestionSessionProps {
  questions: Question[];
  onSessionComplete?: (
    results: Array<{
      questionId: string;
      timeSpent: number;
      result: "correct" | "incorrect" | "skip";
    }>
  ) => void;
  className?: string;
}

export function IBDPQuestionSession({
  questions,
  onSessionComplete,
  className = "",
}: IBDPQuestionSessionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [sessionResults, setSessionResults] = useState<
    Array<{
      questionId: string;
      timeSpent: number;
      result: "correct" | "incorrect" | "skip";
    }>
  >([]);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Start timer when component mounts or question changes
  useEffect(() => {
    setStartTime(Date.now());
    setTimeSpent(0);
    setShowSolution(false);
  }, [currentQuestionIndex]);

  // Update time spent
  useEffect(() => {
    if (startTime && !isSessionComplete) {
      const interval = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, isSessionComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (result: "correct" | "incorrect" | "skip") => {
    const newResult = {
      questionId: currentQuestion.id,
      timeSpent,
      result,
    };

    setSessionResults((prev) => [...prev, newResult]);

    // Move to next question or complete session
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsSessionComplete(true);
      onSessionComplete?.(sessionResults);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSessionResults([]);
    setIsSessionComplete(false);
    setShowSolution(false);
  };

  if (questions.length === 0) {
    return (
      <Card className={`rounded-sm ${className}`}>
        <CardContent className="py-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Questions Available
          </h3>
          <p className="text-muted-foreground">
            Questions for this lesson will be added soon.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isSessionComplete) {
    return (
      <Card className={`rounded-sm ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-6 h-6" />
            Session Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-sm border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {sessionResults.filter((r) => r.result === "correct").length}
              </div>
              <div className="text-sm text-green-700">Correct</div>
            </div>
            <div className="p-4 bg-red-50 rounded-sm border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {sessionResults.filter((r) => r.result === "incorrect").length}
              </div>
              <div className="text-sm text-red-700">Incorrect</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-sm border border-gray-200">
              <div className="text-2xl font-bold text-gray-600">
                {sessionResults.filter((r) => r.result === "skip").length}
              </div>
              <div className="text-sm text-gray-700">Skipped</div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700 mb-2">
              Total Time:{" "}
              {formatTime(
                sessionResults.reduce((acc, r) => acc + r.timeSpent, 0)
              )}
            </div>
            <div className="text-sm text-gray-600">
              Average per question:{" "}
              {formatTime(
                Math.round(
                  sessionResults.reduce((acc, r) => acc + r.timeSpent, 0) /
                    sessionResults.length
                )
              )}
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              onClick={handleRestart}
              variant="outline"
              className="rounded-sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart Session
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`rounded-sm bg-white border border-gray-200 ${className}`}>
      <CardHeader className="pb-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Header */}
        <div className="flex items-start justify-between mb-3">
          <Badge variant="outline" className="rounded-sm">
            {currentQuestion.marks}{" "}
            {currentQuestion.marks === 1 ? "mark" : "marks"}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeSpent)}</span>
          </div>
        </div>

        {/* Question Text */}
        <div className="text-lg leading-relaxed text-[#1e293b] min-h-[60px]">
          {renderMultiPartQuestion(currentQuestion.question_text)}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {currentQuestion.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            size="sm"
            className="rounded-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={() => handleAnswer("correct")}
              variant="outline"
              className="rounded-sm border-green-200 text-green-700 hover:bg-green-50"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Correct
            </Button>
            <Button
              onClick={() => handleAnswer("incorrect")}
              variant="outline"
              className="rounded-sm border-red-200 text-red-700 hover:bg-red-50"
            >
              Incorrect
            </Button>
            <Button
              onClick={() => handleAnswer("skip")}
              variant="outline"
              className="rounded-sm border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Skip
            </Button>
          </div>

          <Button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            variant="outline"
            size="sm"
            className="rounded-sm"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Solution Toggle */}
        {currentQuestion.solution && (
          <div className="border-t border-gray-100 pt-4">
            <Button
              onClick={() => setShowSolution(!showSolution)}
              variant="outline"
              className="rounded-sm border-blue-300 text-blue-700 hover:bg-blue-50 px-4 py-2 font-medium"
            >
              <Target className="w-4 h-4 mr-2" />
              {showSolution ? "Hide" : "Show"} Solution
            </Button>

            {showSolution && (
              <div className="mt-3 p-4 bg-blue-50 rounded-sm border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Solution:</h4>
                <div className="text-blue-700">
                  {renderMultiPartQuestion(currentQuestion.solution)}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
