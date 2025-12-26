"use client";

import { useState } from 'react';
import { Button } from '@/design-system/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/design-system/components/ui/dialog';
import { Lightbulb } from 'lucide-react';
import { renderMixedContent } from '@/components/MathRenderer';
import { Question } from '@/types/gre-test';

interface HintButtonProps {
  question: Question;
  onHintUsed?: (hintIndex: number) => void;
}

export function HintButton({ question, onHintUsed }: HintButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedHints, setRevealedHints] = useState<Set<number>>(new Set());

  if (!question.hints || question.hints.length === 0) {
    return null;
  }

  const handleRevealHint = (index: number) => {
    setRevealedHints((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
    onHintUsed?.(index);
  };

  const handleShowAnswer = () => {
    // Reveal all hints and mark as answer shown
    setRevealedHints(new Set(question.hints!.map((_: string, i: number) => i)));
    onHintUsed?.(question.hints!.length);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
      >
        <Lightbulb className="w-4 h-4 mr-1" />
        Hint ({revealedHints.size}/{question.hints.length})
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Hints
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {question.hints.map((hint: string, index: number) => (
              <div
                key={index}
                className={`p-4 border rounded-lg ${
                  revealedHints.has(index)
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Hint {index + 1}
                  </span>
                  {!revealedHints.has(index) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevealHint(index)}
                      className="text-xs"
                    >
                      Reveal
                    </Button>
                  )}
                </div>
                {revealedHints.has(index) && (
                  <div className="text-sm text-gray-800 leading-relaxed">
                    {renderMixedContent(hint)}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleShowAnswer}
                className="w-full"
                disabled={revealedHints.size === question.hints.length}
              >
                Show Answer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

