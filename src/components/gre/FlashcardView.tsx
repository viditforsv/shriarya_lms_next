"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/ui/card';
import { Button } from '@/design-system/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCcw, Eye } from 'lucide-react';
import { renderMixedContent } from '@/components/MathRenderer';
import { Question } from '@/types/gre-test';
import { FlashcardData } from '@/stores/useTestStore';

interface FlashcardViewProps {
  questions: Question[];
  flashcardProgress: Record<string, FlashcardData>;
  onUpdateProgress: (questionId: string, data: FlashcardData) => void;
  onClose: () => void;
}

export function FlashcardView({
  questions,
  flashcardProgress,
  onUpdateProgress,
  onClose
}: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = questions[currentIndex];
  const currentProgress = currentQuestion ? flashcardProgress[currentQuestion.id] : null;

  // Reset answer state when question changes
  useEffect(() => {
    setShowAnswer(false);
  }, [currentIndex]);

  const handleRateDifficulty = (masteryLevel: number) => {
    if (!currentQuestion) return;

    const now = Date.now();
    const nextReview = calculateNextReview(now, masteryLevel);

    const newProgress: FlashcardData = {
      masteryLevel,
      lastReviewed: now,
      nextReview,
      reviewCount: (currentProgress?.reviewCount || 0) + 1
    };

    onUpdateProgress(currentQuestion.id, newProgress);
    
    // Move to next question
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All questions reviewed, show completion
      onClose();
    }
  };

  const calculateNextReview = (now: number, masteryLevel: number): number => {
    // Spaced repetition algorithm
    // Higher mastery = longer interval
    const intervals = [0, 1 * 60 * 60 * 1000, 4 * 60 * 60 * 1000, 24 * 60 * 60 * 1000, 7 * 24 * 60 * 60 * 1000, 30 * 24 * 60 * 60 * 1000];
    return now + (intervals[masteryLevel] || intervals[0]);
  };

  if (!currentQuestion) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">No questions available for flashcards.</p>
          <Button onClick={onClose} className="mt-4">
            Close
          </Button>
        </CardContent>
      </Card>
    );
  }

  const correctAnswerText = Array.isArray(currentQuestion.correctAnswer)
    ? currentQuestion.correctAnswer.join(', ')
    : String(currentQuestion.correctAnswer);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-3xl border border-gray-300">
        <CardHeader className="pb-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-900">
              Flashcard {currentIndex + 1} of {questions.length}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Question Side */}
          <div className="min-h-[400px] flex flex-col justify-center">
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-4">
                {!showAnswer ? 'Question' : 'Answer'}
              </div>
              {!showAnswer ? (
                <div className="text-base text-gray-900 leading-relaxed">
                  {renderMixedContent(currentQuestion.prompt)}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-base text-gray-900 leading-relaxed">
                    <strong>Correct Answer:</strong> {renderMixedContent(correctAnswerText)}
                  </div>
                  {currentQuestion.explanation && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-700 leading-relaxed">
                        {renderMixedContent(currentQuestion.explanation)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {!showAnswer ? (
              <Button
                onClick={() => setShowAnswer(true)}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Show Answer
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="text-sm text-gray-600 mb-2 text-center">
                  How well did you know this?
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <Button
                      key={level}
                      variant="outline"
                      onClick={() => handleRateDifficulty(level)}
                      className={`${
                        level <= 2
                          ? 'border-red-300 hover:bg-red-50'
                          : level === 3
                          ? 'border-yellow-300 hover:bg-yellow-50'
                          : 'border-green-300 hover:bg-green-50'
                      }`}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-center gap-2 text-xs text-gray-500">
                  <span>Hard</span>
                  <span className="flex-1"></span>
                  <span>Easy</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowAnswer(false);
              }}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
              disabled={currentIndex === questions.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

