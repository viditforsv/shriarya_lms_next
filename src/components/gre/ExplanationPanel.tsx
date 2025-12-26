"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/ui/card';
import { Button } from '@/design-system/components/ui/button';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { renderMixedContent } from '@/components/MathRenderer';
import { Question } from '@/types/gre-test';

interface ExplanationPanelProps {
  question: Question;
  isSubmitted: boolean;
}

export function ExplanationPanel({ question, isSubmitted }: ExplanationPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!question.explanation || !isSubmitted) {
    return null;
  }

  return (
    <Card className="mt-4 border border-gray-300">
      <CardHeader 
        className="pb-3 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gray-700" />
            <CardTitle className="text-sm font-medium text-gray-900">Explanation</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="h-6 w-6 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="text-sm text-gray-800 leading-relaxed">
            {renderMixedContent(question.explanation)}
          </div>
          {question.topics && question.topics.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Related Topics:</p>
              <div className="flex flex-wrap gap-2">
                {question.topics.map((topic: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

