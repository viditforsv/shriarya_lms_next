"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/design-system/components/ui/card";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import { CheckCircle, Bookmark, Eye, EyeOff, Clock, Tag } from "lucide-react";
import { MathRenderer } from "@/components/MathRenderer";

interface IBDPQuestionCardProps {
  questionId: string;
  questionText: string;
  tags: string[];
  marks: number;
  solution?: string;
  onMarkDone?: (
    questionId: string,
    timeSpent: number,
    result: "correct" | "incorrect" | "skip"
  ) => void;
  onReviewLater?: (questionId: string) => void;
  onTagClick?: (tag: string) => void;
  className?: string;
}

export function IBDPQuestionCard({
  questionId,
  questionText,
  tags,
  marks,
  solution,
  onMarkDone,
  onReviewLater,
  onTagClick,
  className = "",
}: IBDPQuestionCardProps) {
  const [showSolution, setShowSolution] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isReviewLater, setIsReviewLater] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [selectedResult, setSelectedResult] = useState<
    "correct" | "incorrect" | "skip" | null
  >(null);

  // Start timer when component mounts
  useEffect(() => {
    if (!isDone) {
      setStartTime(Date.now());
    }
  }, [isDone]);

  // Update time spent
  useEffect(() => {
    if (!isDone && startTime) {
      const interval = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isDone, startTime]);

  const handleMarkDone = (result: "correct" | "incorrect" | "skip") => {
    setIsDone(true);
    setSelectedResult(result);
    onMarkDone?.(questionId, timeSpent, result);
  };

  const handleReviewLater = () => {
    setIsReviewLater(!isReviewLater);
    onReviewLater?.(questionId);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className={`rounded-sm bg-white border border-gray-200 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="outline" className="rounded-sm">
            {marks} {marks === 1 ? "mark" : "marks"}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeSpent)}</span>
          </div>
        </div>

        {/* Question Text */}
        <div className="text-lg leading-relaxed text-[#1e293b] min-h-[60px]">
          <MathRenderer latex={questionText} displayMode={false} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-sm cursor-pointer hover:bg-[#e27447] hover:text-white transition-colors"
              onClick={() => onTagClick?.(tag)}
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Solution Section */}
        {solution && showSolution && (
          <div className="p-4 bg-[#feefea] border border-[#e27447] rounded-sm">
            <h4 className="font-semibold text-[#1e293b] mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#e27447]" />
              Solution
            </h4>
            <div className="text-base leading-relaxed text-gray-700">
              <MathRenderer latex={solution} displayMode={false} />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
          {!isDone ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSolution(!showSolution)}
                className="rounded-sm"
              >
                {showSolution ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide Solution
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    View Solution
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleReviewLater}
                className={`rounded-sm ${
                  isReviewLater
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : ""
                }`}
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Review Later
              </Button>

              <div className="ml-auto flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkDone("skip")}
                  className="rounded-sm"
                >
                  Skip
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkDone("incorrect")}
                  className="rounded-sm border-red-300 text-red-600 hover:bg-red-50"
                >
                  Incorrect
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleMarkDone("correct")}
                  className="rounded-sm bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Correct
                </Button>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <Badge
                className={`rounded-sm ${
                  selectedResult === "correct"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : selectedResult === "incorrect"
                    ? "bg-red-100 text-red-800 border-red-200"
                    : "bg-gray-100 text-gray-800 border-gray-200"
                }`}
              >
                {selectedResult === "correct" && (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Marked Correct
                  </>
                )}
                {selectedResult === "incorrect" && "Marked Incorrect"}
                {selectedResult === "skip" && "Skipped"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Time: {formatTime(timeSpent)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
