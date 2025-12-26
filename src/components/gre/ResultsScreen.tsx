"use client";

import { useTestStore } from '@/stores/useTestStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/ui/card';
import { Button } from '@/design-system/components/ui/button';
import { CheckCircle2, XCircle, AlertCircle, BarChart3 } from 'lucide-react';

interface ResultsScreenProps {
  sectionId: string;
  onClose: () => void;
  onReviewQuestions: () => void;
}

export function ResultsScreen({
  sectionId,
  onClose,
  onReviewQuestions,
}: ResultsScreenProps) {
  const { test, answers } = useTestStore();

  if (!test) return null;

  const currentSection = test.sections.find(s => s.id === sectionId);
  if (!currentSection) return null;

  // Calculate results
  const totalQuestions = currentSection.questions.length;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  const questionResults = currentSection.questions.map((q) => {
    const userAnswer = answers[q.id];
    const isAnswered = userAnswer !== undefined && userAnswer !== null && userAnswer !== '';
    
    let isCorrect = false;
    if (isAnswered) {
      if (Array.isArray(q.correctAnswer)) {
        // Multi-select: check if arrays match
        const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
        isCorrect = 
          userAnswerArray.length === q.correctAnswer.length &&
          userAnswerArray.every(ans => q.correctAnswer.includes(String(ans)));
      } else {
        isCorrect = userAnswer === q.correctAnswer;
      }
    }

    if (!isAnswered) {
      unansweredCount++;
    } else if (isCorrect) {
      correctCount++;
    } else {
      incorrectCount++;
    }

    return {
      question: q,
      userAnswer,
      isCorrect,
      isAnswered,
    };
  });

  const score = correctCount;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-4xl border border-gray-300">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Section Results - {currentSection.title}
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            {currentSection.sectionType === 'verbal' ? 'Verbal Reasoning' : 'Quantitative Reasoning'}
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Score Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-3xl font-bold text-blue-700">{score}</div>
              <div className="text-sm text-blue-600 mt-1">Correct</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-3xl font-bold text-red-700">{incorrectCount}</div>
              <div className="text-sm text-red-600 mt-1">Incorrect</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-3xl font-bold text-gray-700">{unansweredCount}</div>
              <div className="text-sm text-gray-600 mt-1">Unanswered</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-3xl font-bold text-green-700">{percentage}%</div>
              <div className="text-sm text-green-600 mt-1">Score</div>
            </div>
          </div>

          {/* Performance Indicator */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-gray-900">Performance Summary</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className={`h-3 rounded-full transition-all ${
                  percentage >= 80
                    ? 'bg-green-600'
                    : percentage >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              You answered {correctCount} out of {totalQuestions} questions correctly.
            </p>
          </div>

          {/* Question Breakdown */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Question Breakdown</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {questionResults.map((result, idx) => (
                <div
                  key={result.question.id}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 ${
                    result.isCorrect
                      ? 'border-green-500 bg-green-50'
                      : result.isAnswered
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">Question {idx + 1}</span>
                    {result.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : result.isAnswered ? (
                      <XCircle className="w-5 h-5 text-red-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {result.isCorrect
                      ? 'Correct'
                      : result.isAnswered
                      ? 'Incorrect'
                      : 'Unanswered'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              onClick={onReviewQuestions}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Review Questions
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

