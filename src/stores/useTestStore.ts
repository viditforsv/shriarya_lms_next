import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GRETest } from '../types/gre-test';

export interface FlashcardData {
  masteryLevel: number;
  lastReviewed: number;
  nextReview: number;
  reviewCount: number;
}

interface TestState {
  // Data
  test: GRETest | null;
  currentSectionId: string | null;
  currentQuestionIndex: number;
  
  // User Inputs
  answers: Record<string, string | number | string[] | null>; // questionId -> value
  flags: Record<string, boolean>; // questionId -> isFlagged
  
  // UI State
  timeLeft: number;
  isCalculatorOpen: boolean;
  isReviewScreenOpen: boolean;
  mode: 'test' | 'study';
  practiceMode: boolean;
  showResults: boolean;
  testCompleted: boolean;
  
  // Study Mode Features
  bookmarks: Record<string, boolean>; // questionId -> isBookmarked
  notes: Record<string, string>; // questionId -> note
  flashcardProgress: Record<string, FlashcardData>; // questionId -> progress
  questionTimes: Record<string, number>; // questionId -> time spent in seconds
  sectionResults: Record<string, { correct: number; total: number; percentage: number }>; // sectionId -> results
  
  // Actions
  initTest: (test: GRETest, sectionType?: 'verbal' | 'quantitative') => void;
  setAnswer: (questionId: string, answer: string | number | string[] | null) => void;
  toggleFlag: (questionId: string) => void;
  toggleCalculator: () => void;
  toggleReviewScreen: () => void;
  navigateQuestion: (index: number) => void;
  tickTimer: () => void;
  completeSection: () => void;
  setMode: (mode: 'test' | 'study') => void;
  togglePracticeMode: () => void;
  hideResultsScreen: () => void;
  resetTest: () => void;
  toggleBookmark: (questionId: string) => void;
  setNote: (questionId: string, note: string) => void;
  updateFlashcardProgress: (questionId: string, progress: FlashcardData) => void;
  updateQuestionTime: (questionId: string, timeSpent: number) => void;
}

export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      test: null,
      currentSectionId: null,
      currentQuestionIndex: 0,
      answers: {},
      flags: {},
      timeLeft: 0,
      isCalculatorOpen: false,
      isReviewScreenOpen: false,
      mode: 'test',
      practiceMode: false,
      showResults: false,
      testCompleted: false,
      bookmarks: {},
      notes: {},
      flashcardProgress: {},
      questionTimes: {},
      sectionResults: {},

      initTest: (test, sectionType) => {
        let startingSectionId = test.startingSectionId;
        
        // If sectionType is provided, find the appropriate starting section
        if (sectionType) {
          const section = test.sections.find(
            s => s.sectionType === sectionType && s.id.includes('medium')
          );
          if (section) {
            startingSectionId = section.id;
          }
        }
        
        const startingSection = test.sections.find(s => s.id === startingSectionId);
        set({
          test,
          currentSectionId: startingSectionId,
          currentQuestionIndex: 0,
          timeLeft: startingSection?.durationSeconds || 0,
          answers: {},
          flags: {}
        });
      },

      setAnswer: (qId, val) => set((state) => ({
        answers: { ...state.answers, [qId]: val }
      })),

      toggleFlag: (qId) => set((state) => ({
        flags: { ...state.flags, [qId]: !state.flags[qId] }
      })),

      toggleCalculator: () => set((state) => ({ isCalculatorOpen: !state.isCalculatorOpen })),

      toggleReviewScreen: () => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/e6346042-1cb4-4e6f-b174-4c1a9e96fc9e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTestStore.ts:77',message:'toggleReviewScreen called',data:{currentState:get().isReviewScreenOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        return set((state) => {
          const newState = !state.isReviewScreenOpen;
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/e6346042-1cb4-4e6f-b174-4c1a9e96fc9e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTestStore.ts:82',message:'toggleReviewScreen state update',data:{oldState:state.isReviewScreenOpen,newState},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
          // #endregion
          return { isReviewScreenOpen: newState };
        });
      },

      navigateQuestion: (idx) => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/e6346042-1cb4-4e6f-b174-4c1a9e96fc9e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTestStore.ts:79',message:'navigateQuestion called',data:{idx,currentIndex:get().currentQuestionIndex,currentIsReviewOpen:get().isReviewScreenOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        return set((state) => {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/e6346042-1cb4-4e6f-b174-4c1a9e96fc9e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTestStore.ts:85',message:'navigateQuestion state update',data:{oldIndex:state.currentQuestionIndex,newIndex:idx,oldReviewOpen:state.isReviewScreenOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
          // #endregion
          return { currentQuestionIndex: idx, isReviewScreenOpen: false };
        });
      },

      tickTimer: () => set((state) => ({ timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0 })),

      completeSection: () => {
        const { test, currentSectionId, answers } = get();
        if (!test || !currentSectionId) return;

        const currentSection = test.sections.find(s => s.id === currentSectionId);
        if (!currentSection) return;

        // --- ADAPTIVE LOGIC CORE ---
        // 1. Calculate Score for current section
        let score = 0;
        let correctCount = 0;
        currentSection.questions.forEach(q => {
             // Basic equality check - expand for multi-select logic later
            if (answers[q.id] === q.correctAnswer) {
              score++;
              correctCount++;
            }
        });

        // Calculate section results
        const sectionPercentage = currentSection.questions.length > 0 
          ? Math.round((correctCount / currentSection.questions.length) * 100) 
          : 0;

        // Store section results
        set((state) => ({
          sectionResults: {
            ...state.sectionResults,
            [currentSectionId]: {
              correct: correctCount,
              total: currentSection.questions.length,
              percentage: sectionPercentage,
            },
          },
          showResults: true,
        }));

        // 2. Find next section based on routingRules
        const rule = currentSection.routingRules.find(r => 
            (r.condition.minScore === undefined || score >= r.condition.minScore) &&
            (r.condition.maxScore === undefined || score <= r.condition.maxScore)
        );

        if (rule) {
            const nextSection = test.sections.find(s => s.id === rule.nextSectionId);
            set({
                currentSectionId: nextSection?.id,
                currentQuestionIndex: 0,
                timeLeft: nextSection?.durationSeconds || 0,
                // Reset flags? Usually yes for new section. Keep answers? No.
                // Note: Real GRE doesn't let you return to previous sections.
            });
        } else {
            // Test Over or Error
            set({ testCompleted: true });
            console.log("Test Complete");
        }
      },

      setMode: (mode) => set({ mode }),
      
      togglePracticeMode: () => set((state) => ({ practiceMode: !state.practiceMode })),
      
      hideResultsScreen: () => set({ showResults: false }),
      
      resetTest: () => set({
        test: null,
        currentSectionId: null,
        currentQuestionIndex: 0,
        answers: {},
        flags: {},
        timeLeft: 0,
        isCalculatorOpen: false,
        isReviewScreenOpen: false,
        showResults: false,
        testCompleted: false,
        sectionResults: {},
        questionTimes: {},
      }),
      
      toggleBookmark: (questionId) => set((state) => ({
        bookmarks: { ...state.bookmarks, [questionId]: !state.bookmarks[questionId] }
      })),
      
      setNote: (questionId, note) => set((state) => ({
        notes: { ...state.notes, [questionId]: note }
      })),
      
      updateFlashcardProgress: (questionId, progress) => set((state) => ({
        flashcardProgress: { ...state.flashcardProgress, [questionId]: progress }
      })),
      
      updateQuestionTime: (questionId, timeSpent) => set((state) => ({
        questionTimes: { ...state.questionTimes, [questionId]: timeSpent }
      })),
    }),
    { name: 'gre-test-storage' }
  )
);

