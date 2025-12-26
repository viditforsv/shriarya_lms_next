"use client";

import { useCallback, useEffect, useRef } from 'react';
import { useTestStore } from '@/stores/useTestStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/design-system/components/ui/dialog';
import { Button } from '@/design-system/components/ui/button';
import { CheckCircle2, Flag, Circle, Eye } from 'lucide-react';

interface EnhancedReviewScreenProps {
  sectionId: string;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToQuestion: (index: number) => void;
}

export function EnhancedReviewScreen({
  sectionId,
  isOpen,
  onClose,
  onNavigateToQuestion,
}: EnhancedReviewScreenProps) {
  // #region agent log
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current += 1;
    fetch('http://127.0.0.1:7242/ingest/e6346042-1cb4-4e6f-b174-4c1a9e96fc9e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'EnhancedReviewScreen.tsx:30',message:'Component render',data:{renderCount:renderCount.current,isOpen,sectionId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C,D,E'})}).catch(()=>{});
  });
  // #endregion

  // Use selectors to prevent unnecessary re-renders - only subscribe to needed values
  const test = useTestStore((state) => state.test);
  const answers = useTestStore((state) => state.answers);
  const flags = useTestStore((state) => state.flags);
  const currentQuestionIndex = useTestStore((state) => state.currentQuestionIndex);
  const isReviewScreenOpen = useTestStore((state) => state.isReviewScreenOpen);
  const currentSectionId = useTestStore((state) => state.currentSectionId);

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/e6346042-1cb4-4e6f-b174-4c1a9e96fc9e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'EnhancedReviewScreen.tsx:35',message:'Store values after useTestStore',data:{hasTest:!!test,answersCount:Object.keys(answers).length,flagsCount:Object.keys(flags).length,currentQuestionIndex},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  }, [test, answers, flags, currentQuestionIndex]);
  // #endregion

  // #region agent log
  const prevIsOpen = useRef(isOpen);
  const prevIsReviewScreenOpen = useRef(isReviewScreenOpen);
  const prevCurrentSectionId = useRef(currentSectionId);
  useEffect(() => {
    const isOpenChanged = prevIsOpen.current !== isOpen;
    const reviewOpenChanged = prevIsReviewScreenOpen.current !== isReviewScreenOpen;
    const sectionIdChanged = prevCurrentSectionId.current !== currentSectionId;
    if (isOpenChanged || reviewOpenChanged || sectionIdChanged) {
      fetch('http://127.0.0.1:7242/ingest/e6346042-1cb4-4e6f-b174-4c1a9e96fc9e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'EnhancedReviewScreen.tsx:52',message:'Props/state changed',data:{isOpenChanged,reviewOpenChanged,sectionIdChanged,prevIsOpen:prevIsOpen.current,currentIsOpen:isOpen,prevReviewOpen:prevIsReviewScreenOpen.current,currentReviewOpen:isReviewScreenOpen,prevSectionId:prevCurrentSectionId.current,currentSectionId},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B,F'})}).catch(()=>{});
      prevIsOpen.current = isOpen;
      prevIsReviewScreenOpen.current = isReviewScreenOpen;
      prevCurrentSectionId.current = currentSectionId;
    }
  }, [isOpen, isReviewScreenOpen, currentSectionId]);
  // #endregion

  const handleOpenChange = useCallback((open: boolean) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/e6346042-1cb4-4e6f-b174-4c1a9e96fc9e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'EnhancedReviewScreen.tsx:50',message:'handleOpenChange called',data:{open},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    if (!open) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/e6346042-1cb4-4e6f-b174-4c1a9e96fc9e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'EnhancedReviewScreen.tsx:54',message:'Calling onClose',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A,C'})}).catch(()=>{});
      // #endregion
      onClose();
    }
  }, [onClose]); // isOpen not needed - callback receives 'open' as parameter

  if (!test) return null;

  const currentSection = test.sections.find(s => s.id === sectionId);
  if (!currentSection) return null;

  const totalQuestions = currentSection.questions.length;
  const answeredCount = currentSection.questions.filter(
    q => answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== ''
  ).length;
  const flaggedCount = currentSection.questions.filter(q => flags[q.id]).length;
  const unansweredCount = totalQuestions - answeredCount;

  const getQuestionStatus = (questionId: string, index: number) => {
    const isAnswered = answers[questionId] !== undefined && 
                      answers[questionId] !== null && 
                      answers[questionId] !== '';
    const isFlagged = flags[questionId];
    const isCurrent = index === currentQuestionIndex;

    if (isCurrent) return 'current';
    if (isAnswered && isFlagged) return 'answered-flagged';
    if (isAnswered) return 'answered';
    if (isFlagged) return 'flagged';
    return 'unanswered';
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'current':
        return 'border-blue-600 bg-blue-100 ring-2 ring-blue-400';
      case 'answered-flagged':
        return 'border-green-500 bg-green-50 ring-1 ring-yellow-400';
      case 'answered':
        return 'border-green-500 bg-green-50';
      case 'flagged':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return <Eye className="w-4 h-4 text-blue-600" />;
      case 'answered-flagged':
        return (
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <Flag className="w-3 h-3 text-yellow-600 fill-yellow-600" />
          </div>
        );
      case 'answered':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'flagged':
        return <Flag className="w-4 h-4 text-yellow-600 fill-yellow-600" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'current':
        return 'Current';
      case 'answered-flagged':
        return 'Answered & Flagged';
      case 'answered':
        return 'Answered';
      case 'flagged':
        return 'Flagged';
      default:
        return 'Unanswered';
    }
  };

  // Prevent Dialog from rendering if not needed to avoid infinite loops
  if (!isOpen && !test) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Review Questions - {currentSection.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-2">
            Click on any question to navigate to it. Questions are color-coded by status.
          </DialogDescription>
        </DialogHeader>

        {/* Statistics Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6 pt-4 border-t border-gray-200">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-semibold text-gray-900">{totalQuestions}</div>
            <div className="text-xs text-gray-600 mt-1">Total Questions</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-semibold text-green-700">{answeredCount}</div>
            <div className="text-xs text-green-600 mt-1">Answered</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-semibold text-yellow-700">{flaggedCount}</div>
            <div className="text-xs text-yellow-600 mt-1">Flagged</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-semibold text-gray-700">{unansweredCount}</div>
            <div className="text-xs text-gray-600 mt-1">Unanswered</div>
          </div>
        </div>

        {/* Legend */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-xs font-medium text-gray-700 mb-2">Status Legend:</div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 bg-blue-100 rounded"></div>
              <span className="text-gray-600">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-green-500 bg-green-50 rounded"></div>
              <span className="text-gray-600">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-yellow-500 bg-yellow-50 rounded"></div>
              <span className="text-gray-600">Flagged</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-green-500 bg-green-50 ring-1 ring-yellow-400 rounded"></div>
              <span className="text-gray-600">Both</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-300 bg-gray-50 rounded"></div>
              <span className="text-gray-600">Unanswered</span>
            </div>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3 mt-4">
          {currentSection.questions.map((q, idx) => {
            const status = getQuestionStatus(q.id, idx);
            return (
              <button
                key={q.id}
                onClick={() => {
                  onNavigateToQuestion(idx);
                }}
                className={`p-4 border-2 rounded-lg text-center transition-all hover:scale-105 hover:shadow-md ${getStatusClass(status)}`}
                title={`Question ${idx + 1}: ${getStatusText(status)}`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="font-semibold text-sm text-gray-900">Q{idx + 1}</div>
                  <div className="flex items-center justify-center">
                    {getStatusIcon(status)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {getStatusText(status)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
