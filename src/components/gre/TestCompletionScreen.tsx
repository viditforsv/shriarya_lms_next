"use client";

import { useTestStore } from '@/stores/useTestStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/ui/card';
import { Button } from '@/design-system/components/ui/button';
import { RotateCcw, Eye, Trophy, BarChart3 } from 'lucide-react';

interface TestCompletionScreenProps {
  onRetake: () => void;
  onReview: () => void;
}

export function TestCompletionScreen({
  onRetake,
  onReview,
}: TestCompletionScreenProps) {
  const { test, answers } = useTestStore();

  if (!test) return null;

  // Calculate overall test results
  let totalQuestions = 0;
  let totalCorrect = 0;
  let totalIncorrect = 0;
  let totalUnanswered = 0;

  const sectionResults = test.sections.map((section) => {
    const sectionQuestions = section.questions.length;
    totalQuestions += sectionQuestions;

    let sectionCorrect = 0;
    let sectionIncorrect = 0;
    let sectionUnanswered = 0;

    section.questions.forEach((q) => {
      const userAnswer = answers[q.id];
      const isAnswered = userAnswer !== undefined && userAnswer !== null && userAnswer !== '';

      let isCorrect = false;
      if (isAnswered) {
        if (Array.isArray(q.correctAnswer)) {
          const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
          isCorrect =
            userAnswerArray.length === q.correctAnswer.length &&
            userAnswerArray.every((ans) => q.correctAnswer.includes(String(ans)));
        } else {
          isCorrect = userAnswer === q.correctAnswer;
        }
      }

      if (!isAnswered) {
        sectionUnanswered++;
        totalUnanswered++;
      } else if (isCorrect) {
        sectionCorrect++;
        totalCorrect++;
      } else {
        sectionIncorrect++;
        totalIncorrect++;
      }
    });

    const sectionScore = sectionCorrect;
    const sectionPercentage = sectionQuestions > 0 ? Math.round((sectionCorrect / sectionQuestions) * 100) : 0;

    return {
      section,
      correct: sectionCorrect,
      incorrect: sectionIncorrect,
      unanswered: sectionUnanswered,
      total: sectionQuestions,
      score: sectionScore,
      percentage: sectionPercentage,
    };
  });

  const overallPercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-4xl border border-gray-300">
        <CardHeader className="border-b border-gray-200 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-semibold text-gray-900">
            Test Complete!
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            You&apos;ve completed the GRE practice test
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Overall Score Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-3xl font-bold text-blue-700">{totalCorrect}</div>
              <div className="text-sm text-blue-600 mt-1">Correct</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-3xl font-bold text-red-700">{totalIncorrect}</div>
              <div className="text-sm text-red-600 mt-1">Incorrect</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-3xl font-bold text-gray-700">{totalUnanswered}</div>
              <div className="text-sm text-gray-600 mt-1">Unanswered</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-3xl font-bold text-green-700">{overallPercentage}%</div>
              <div className="text-sm text-green-600 mt-1">Overall Score</div>
            </div>
          </div>

          {/* Overall Performance Indicator */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-gray-900">Overall Performance</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className={`h-3 rounded-full transition-all ${
                  overallPercentage >= 80
                    ? 'bg-green-600'
                    : overallPercentage >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              You answered {totalCorrect} out of {totalQuestions} questions correctly across all sections.
            </p>
          </div>

          {/* Section Breakdown */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Section Breakdown</h3>
            <div className="space-y-3">
              {sectionResults.map((result) => (
                <div
                  key={result.section.id}
                  className="p-4 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{result.section.title}</h4>
                      <p className="text-xs text-gray-600">
                        {result.section.sectionType === 'verbal' ? 'Verbal Reasoning' : 'Quantitative Reasoning'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">{result.percentage}%</div>
                      <div className="text-xs text-gray-600">
                        {result.correct}/{result.total} correct
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        result.percentage >= 80
                          ? 'bg-green-600'
                          : result.percentage >= 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${result.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <Button
              onClick={onReview}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              Review Questions
            </Button>
            <Button
              onClick={onRetake}
              variant="outline"
              className="flex-1 border-gray-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Test
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

