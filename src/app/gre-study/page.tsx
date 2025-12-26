"use client";

import { useEffect, useState, useCallback } from 'react';
import { useTestStore } from '@/stores/useTestStore';
import { GRETest } from '@/types/gre-test';
import { Button } from '@/design-system/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/ui/card';
import { Clock, Calculator as CalculatorIcon, Flag, Eye, ChevronLeft, ChevronRight, CheckCircle2, XCircle, BookOpen, FileText, Target } from 'lucide-react';
import { Input } from '@/design-system/components/ui/input';
import { renderMixedContent } from '@/components/MathRenderer';
import { ResultsScreen } from '@/components/gre/ResultsScreen';
import { TestCompletionScreen } from '@/components/gre/TestCompletionScreen';
import { EnhancedReviewScreen } from '@/components/gre/EnhancedReviewScreen';
import { Calculator } from '@/components/gre/Calculator';
import { StudyChatbot } from '@/components/gre/StudyChatbot';
import { ExplanationPanel } from '@/components/gre/ExplanationPanel';
import { HintButton } from '@/components/gre/HintButton';
import { BookmarkButton } from '@/components/gre/BookmarkButton';
import { NotesPanel } from '@/components/gre/NotesPanel';
import { FlashcardView } from '@/components/gre/FlashcardView';
import Link from 'next/link';

export default function GREStudyPage() {
  const {
    test,
    currentSectionId,
    currentQuestionIndex,
    answers,
    flags,
    timeLeft,
    isCalculatorOpen,
    isReviewScreenOpen,
    practiceMode,
    showResults,
    testCompleted,
    updateQuestionTime,
    initTest,
    setAnswer,
    toggleFlag,
    toggleCalculator,
    toggleReviewScreen,
    togglePracticeMode,
    navigateQuestion,
    tickTimer,
    hideResultsScreen,
    resetTest,
    mode,
    setMode,
    bookmarks,
    notes,
    flashcardProgress,
    toggleBookmark,
    setNote,
    updateFlashcardProgress
  } = useTestStore();

  const [testStarted, setTestStarted] = useState(false);
  const [selectedSectionType, setSelectedSectionType] = useState<'verbal' | 'quantitative' | null>(null);
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState<number>(0);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [, setPendingAnswer] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedTest, setFetchedTest] = useState<GRETest | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isNotesPanelOpen, setIsNotesPanelOpen] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);

  // Set mode to study on mount
  useEffect(() => {
    setMode('study');
  }, [setMode]);

  // Fetch GRE test data from API
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/gre');
        
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Server returned non-JSON response. Please check the API endpoint.');
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch test data');
        }

        // Validate the response structure - API returns { test, success }
        if (!data || !data.test) {
          console.error('Invalid test data structure:', data);
          throw new Error('No test data received from server');
        }

        if (!data.test.sections || !Array.isArray(data.test.sections) || data.test.sections.length === 0) {
          console.error('Invalid test data structure:', data.test);
          throw new Error('Invalid test data structure received from server');
        }

        setFetchedTest(data.test);
      } catch (err) {
        console.error('Error fetching test data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load test');
        setFetchedTest(null); // Clear invalid data
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, []);

  // Initialize test when section is selected
  const handleStart = () => {
    if (!fetchedTest || !selectedSectionType) return;
    
    // Validate test data structure before initializing
    if (!fetchedTest.sections || !Array.isArray(fetchedTest.sections) || fetchedTest.sections.length === 0) {
      console.error('Invalid test data structure:', fetchedTest);
      setError('Invalid test data. Please refresh the page and try again.');
      return;
    }
    
    initTest(fetchedTest, selectedSectionType);
    setTestStarted(true);
    setCurrentQuestionStartTime(Date.now());
  };

  const handleSectionSelect = (type: 'verbal' | 'quantitative') => {
    setSelectedSectionType(type);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Track question time
  useEffect(() => {
    if (test && currentSectionId && currentQuestionIndex !== undefined) {
      const currentQuestion = test.sections
        .find(s => s.id === currentSectionId)
        ?.questions[currentQuestionIndex];
      
      if (currentQuestion) {
        const now = Date.now();
        if (currentQuestionStartTime > 0) {
          const timeSpent = Math.floor((now - currentQuestionStartTime) / 1000);
          updateQuestionTime(currentQuestion.id, timeSpent);
        }
        setCurrentQuestionStartTime(now);
      }
    }
  }, [currentQuestionIndex, currentSectionId, test, currentQuestionStartTime, updateQuestionTime]);

  // Timer tick (only in practice mode)
  useEffect(() => {
    if (!testStarted || !practiceMode || mode !== 'study') return;
    
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [testStarted, practiceMode, mode, tickTimer]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!testStarted) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case 'n':
        case 'ArrowRight':
          if (test && currentSectionId) {
            const currentSection = test.sections.find(s => s.id === currentSectionId);
            if (currentSection && currentQuestionIndex < currentSection.questions.length - 1) {
              navigateQuestion(currentQuestionIndex + 1);
              setPendingAnswer(null);
            }
          }
          break;
        case 'p':
        case 'ArrowLeft':
          if (currentQuestionIndex > 0) {
            navigateQuestion(currentQuestionIndex - 1);
            setPendingAnswer(null);
          }
          break;
        case 'f':
          if (test && currentSectionId) {
            const currentSection = test.sections.find(s => s.id === currentSectionId);
            if (currentSection) {
              toggleFlag(currentSection.questions[currentQuestionIndex].id);
            }
          }
          break;
        case 'r':
          toggleReviewScreen();
          break;
        case 'c':
          if (test && currentSectionId) {
            const currentSection = test.sections.find(s => s.id === currentSectionId);
            if (currentSection?.sectionType === 'quantitative') {
              toggleCalculator();
            }
          }
          break;
        case 'Escape':
          if (isReviewScreenOpen) toggleReviewScreen();
          if (isCalculatorOpen) toggleCalculator();
          if (isNotesPanelOpen) setIsNotesPanelOpen(false);
          if (showShortcutsHelp) setShowShortcutsHelp(false);
          break;
        case '?':
          setShowShortcutsHelp(true);
          break;
        case 'Home':
          navigateQuestion(0);
          setPendingAnswer(null);
          break;
        case 'End':
          if (test && currentSectionId) {
            const currentSection = test.sections.find(s => s.id === currentSectionId);
            if (currentSection) {
              navigateQuestion(currentSection.questions.length - 1);
              setPendingAnswer(null);
            }
          }
          break;
        default:
          if (e.key >= '1' && e.key <= '9') {
            const num = parseInt(e.key);
            if (test && currentSectionId) {
              const currentSection = test.sections.find(s => s.id === currentSectionId);
              if (currentSection && num <= currentSection.questions.length) {
                navigateQuestion(num - 1);
                setPendingAnswer(null);
              }
            }
          }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [testStarted, test, currentSectionId, currentQuestionIndex, navigateQuestion, toggleFlag, toggleReviewScreen, toggleCalculator, isReviewScreenOpen, isCalculatorOpen, isNotesPanelOpen, showShortcutsHelp]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <Card className="w-full max-w-md border border-gray-300">
          <CardHeader>
            <CardTitle className="text-xl font-normal text-gray-900">GRE Study Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Loading test data...</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-gray-700 h-1.5 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error || !fetchedTest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <Card className="w-full max-w-md border border-gray-300">
          <CardHeader>
            <CardTitle className="text-xl font-normal text-gray-900">GRE Study Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{error || 'No test data available'}</p>
            <Button onClick={() => window.location.reload()} className="bg-gray-900 hover:bg-gray-800">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Section Selection Screen
  if (!testStarted && fetchedTest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <Card className="w-full max-w-3xl border border-gray-300">
          <CardHeader className="text-center pb-4 border-b border-gray-200">
            <CardTitle className="text-2xl font-normal text-gray-900">{fetchedTest.title || 'GRE Study Mode'}</CardTitle>
            <p className="text-sm text-gray-600 mt-2">Select a section type to begin studying</p>
            <div className="mt-3">
              <Link href="/gre-test">
                <Button variant="outline" size="sm">
                  <Target className="w-4 h-4 mr-1" />
                  Switch to Test Mode
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Verbal Section Card */}
              <Card 
                className={`cursor-pointer border-2 transition-colors ${
                  selectedSectionType === 'verbal' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-300'
                }`}
                onClick={() => handleSectionSelect('verbal')}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${selectedSectionType === 'verbal' ? 'bg-blue-500' : 'bg-blue-100'}`}>
                      <BookOpen className={`w-5 h-5 ${selectedSectionType === 'verbal' ? 'text-white' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-medium">Verbal Reasoning</CardTitle>
                      <p className="text-xs text-gray-600 mt-0.5">Reading Comprehension & Vocabulary</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Optional timer available</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p className="font-medium mb-1">Features:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-gray-600 ml-2">
                      <li>AI tutor assistance</li>
                      <li>Explanations & hints</li>
                      <li>Bookmarks & notes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Quantitative Section Card */}
              <Card 
                className={`cursor-pointer border-2 transition-colors ${
                  selectedSectionType === 'quantitative' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-green-300'
                }`}
                onClick={() => handleSectionSelect('quantitative')}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${selectedSectionType === 'quantitative' ? 'bg-green-500' : 'bg-green-100'}`}>
                      <CalculatorIcon className={`w-5 h-5 ${selectedSectionType === 'quantitative' ? 'text-white' : 'text-green-600'}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-medium">Quantitative Reasoning</CardTitle>
                      <p className="text-xs text-gray-600 mt-0.5">Math & Problem Solving</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Optional timer available</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p className="font-medium mb-1">Features:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-gray-600 ml-2">
                      <li>AI tutor assistance</li>
                      <li>Step-by-step solutions</li>
                      <li>Bookmarks & notes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button 
                onClick={handleStart} 
                className={`w-full text-white ${
                  selectedSectionType === 'verbal'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : selectedSectionType === 'quantitative'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                size="default"
                disabled={!selectedSectionType}
              >
                Start Studying {selectedSectionType === 'verbal' ? 'Verbal' : selectedSectionType === 'quantitative' ? 'Quantitative' : ''}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get current section and question
  const currentSection = test?.sections.find(s => s.id === currentSectionId);
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const currentPassage = currentQuestion?.passageId 
    ? currentSection?.passages.find(p => p.id === currentQuestion.passageId)
    : null;

  // Show test completion screen
  if (testCompleted && showResults) {
    return (
      <TestCompletionScreen
        onRetake={() => {
          resetTest();
          setTestStarted(false);
          setSelectedSectionType(null);
        }}
        onReview={() => {
          hideResultsScreen();
          if (currentSectionId) {
            toggleReviewScreen();
          }
        }}
      />
    );
  }

  // Show results screen if section completed (but test not fully complete)
  if (test && showResults && currentSectionId && !testCompleted) {
    return (
      <ResultsScreen
        sectionId={currentSectionId}
        onClose={() => {
          hideResultsScreen();
        }}
        onReviewQuestions={() => {
          hideResultsScreen();
          toggleReviewScreen();
        }}
      />
    );
  }

  // If we don't have test yet, return null
  if (!test || !currentSection || !currentQuestion) {
    return null;
  }

  const totalQuestions = currentSection.questions.length;
  const answeredCount = currentSection.questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '').length;
  const progressPercentage = (answeredCount / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-300 px-4 py-2.5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-sm font-medium text-gray-900">{currentSection.title}</span>
              <span className="ml-2 text-xs text-gray-600">
                {currentSection.sectionType === 'verbal' ? 'Verbal' : 'Quantitative'} - Study Mode
              </span>
            </div>
            {/* Timer - Only show if practice mode is enabled */}
            {practiceMode && (
              <div className="flex items-center gap-1.5 font-mono text-sm text-gray-700">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${
                    currentSection.sectionType === 'verbal' ? 'bg-blue-600' : 'bg-green-600'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">{answeredCount}/{totalQuestions}</span>
            </div>
          </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFlag(currentQuestion.id)}
            className={flags[currentQuestion.id] ? 'bg-yellow-50 border-yellow-400 text-yellow-700' : 'border-gray-300'}
          >
            <Flag className={`w-4 h-4 mr-1 ${flags[currentQuestion.id] ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            {flags[currentQuestion.id] ? 'Unflag' : 'Flag'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleReviewScreen}
            className="border-gray-300"
          >
            <Eye className="w-4 h-4 mr-1" />
            Review
          </Button>
          
          {/* Study Mode Features */}
          <BookmarkButton
            isBookmarked={!!bookmarks[currentQuestion.id]}
            onToggle={() => toggleBookmark(currentQuestion.id)}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsNotesPanelOpen(!isNotesPanelOpen)}
            className={`border-gray-300 ${isNotesPanelOpen ? 'bg-gray-50' : ''}`}
          >
            <FileText className="w-4 h-4 mr-1" />
            Notes
          </Button>
          <HintButton
            question={currentQuestion}
            onHintUsed={(hintIndex) => {
              console.log('Hint used:', hintIndex);
            }}
          />
          
          {currentSection.sectionType === 'quantitative' && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleCalculator}
              className={isCalculatorOpen ? 'bg-blue-50' : ''}
            >
              <CalculatorIcon className="w-4 h-4 mr-1" />
              Calculator
            </Button>
          )}
          
          {/* Flashcard Mode Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFlashcards(true)}
            className="border-gray-300"
          >
            Flashcards
          </Button>

          {/* Practice Mode Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={togglePracticeMode}
            className={practiceMode ? 'bg-purple-50 border-purple-400' : ''}
            title="Toggle practice mode (untimed)"
          >
            {practiceMode ? 'Timer On' : 'Timer Off'}
          </Button>

          {/* Switch to Test Mode */}
          <Link href="/gre-test">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300"
            >
              <Target className="w-4 h-4 mr-1" />
              Test Mode
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex h-[calc(100vh-57px)]">
        {/* Left: Passage */}
        {currentPassage && (
          <div className="w-1/2 border-r border-gray-200 overflow-y-auto bg-white p-6">
            <div 
              className="prose max-w-none text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentPassage.content }}
            />
          </div>
        )}

        {/* Right: Question */}
        <div className={`${currentPassage ? 'w-1/2' : 'w-full'} overflow-y-auto bg-white p-6`}>
          <Card className="mb-4 border border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-gray-900 flex items-center gap-2">
                Question {currentQuestionIndex + 1}
                {flags[currentQuestion.id] && (
                  <Flag className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="mb-6 text-gray-900 text-sm leading-relaxed">
                {renderMixedContent(currentQuestion.prompt)}
              </div>

              {currentQuestion.type === 'single-choice' && currentQuestion.options && (
                <div className="space-y-2">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option.id;
                    const isCorrect = option.id === currentQuestion.correctAnswer ||
                      (Array.isArray(currentQuestion.correctAnswer) && currentQuestion.correctAnswer.includes(option.id));
                    const showFeedback = !!answers[currentQuestion.id]; // Show feedback after submission

                    return (
                      <label
                        key={option.id}
                        className={`flex items-start p-3 border rounded cursor-pointer transition-colors ${
                          isSelected
                            ? showFeedback && isCorrect
                              ? 'border-green-500 bg-green-50'
                              : showFeedback && !isCorrect
                              ? 'border-red-500 bg-red-50'
                              : currentSection.sectionType === 'verbal'
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-green-500 bg-green-50'
                            : showFeedback && isCorrect
                            ? 'border-green-300 bg-green-50/50'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={option.id}
                          checked={isSelected}
                          onChange={() => {
                            setAnswer(currentQuestion.id, option.id);
                          }}
                          className="mt-0.5 mr-3 w-3.5 h-3.5"
                        />
                        <span className="flex-1 text-sm text-gray-900">
                          {renderMixedContent(option.text)}
                        </span>
                        {showFeedback && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-green-600 ml-2 shrink-0" />
                        )}
                        {showFeedback && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-red-600 ml-2 shrink-0" />
                        )}
                      </label>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === 'numeric-entry' && (
                <div className="space-y-3">
                  <Input
                    type="number"
                    placeholder="Enter your answer"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => {
                      setAnswer(currentQuestion.id, e.target.value);
                    }}
                    className="text-lg p-4"
                  />
                  <p className="text-sm text-gray-500">Enter a numeric value</p>
                </div>
              )}
              
              {/* Explanation Panel - Show after submission */}
              <ExplanationPanel
                question={currentQuestion}
                isSubmitted={!!answers[currentQuestion.id]}
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={() => {
                navigateQuestion(Math.max(0, currentQuestionIndex - 1));
                setPendingAnswer(null);
              }}
              disabled={currentQuestionIndex === 0}
              className="transition-all"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <div className="flex gap-2 flex-wrap max-w-md justify-center">
              {currentSection.questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    navigateQuestion(idx);
                    setPendingAnswer(null);
                  }}
                  className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-all hover:scale-105 ${
                    idx === currentQuestionIndex
                      ? currentSection.sectionType === 'verbal'
                        ? 'border-blue-500 bg-blue-100 text-blue-700 shadow-md'
                        : 'border-green-500 bg-green-100 text-green-700 shadow-md'
                      : answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== ''
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : flags[q.id]
                      ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  title={`Question ${idx + 1}${flags[q.id] ? ' (Flagged)' : ''}${answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '' ? ' (Answered)' : ''}`}
                >
                  {answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : flags[q.id] ? (
                    <Flag className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                  ) : (
                    idx + 1
                  )}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => {
                navigateQuestion(Math.min(totalQuestions - 1, currentQuestionIndex + 1));
                setPendingAnswer(null);
              }}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="transition-all"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Review Screen Modal */}
      <EnhancedReviewScreen
        key={`review-${currentSectionId}`}
        sectionId={currentSectionId || ''}
        isOpen={isReviewScreenOpen && !!currentSectionId}
        onClose={useCallback(() => {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/e6346042-1cb4-4e6f-b174-4c1a9e96fc9e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'gre-study/page.tsx:762',message:'onClose callback called',data:{isReviewScreenOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'F'})}).catch(()=>{});
          // #endregion
          toggleReviewScreen();
        }, [toggleReviewScreen, isReviewScreenOpen])}
        onNavigateToQuestion={useCallback((idx: number) => {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/e6346042-1cb4-4e6f-b174-4c1a9e96fc9e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'gre-study/page.tsx:770',message:'onNavigateToQuestion called',data:{idx,currentIndex:currentQuestionIndex},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
          // #endregion
          navigateQuestion(idx);
        }, [navigateQuestion, currentQuestionIndex])}
      />

      {/* Study Mode Features */}
      {/* AI Chatbot */}
      <StudyChatbot
        currentQuestion={currentQuestion}
        sectionType={currentSection.sectionType}
        userAnswer={answers[currentQuestion.id]}
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
      />

      {/* Notes Panel */}
      <NotesPanel
        questionId={currentQuestion.id}
        initialNote={notes[currentQuestion.id] || ''}
        onSave={(note) => setNote(currentQuestion.id, note)}
        isOpen={isNotesPanelOpen}
        onClose={() => setIsNotesPanelOpen(false)}
      />

      {/* Flashcard View */}
      {showFlashcards && (
        <FlashcardView
          questions={currentSection.questions}
          flashcardProgress={flashcardProgress}
          onUpdateProgress={updateFlashcardProgress}
          onClose={() => setShowFlashcards(false)}
        />
      )}

      {/* Calculator */}
      {isCalculatorOpen && (
        <Calculator onClose={toggleCalculator} />
      )}
    </div>
  );
}

