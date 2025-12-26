"use client";

import { useEffect, useState } from 'react';
import { useTestStore } from '@/stores/useTestStore';
import { mockGRETest } from '@/lib/mock-gre-data';
import { Button } from '@/design-system/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/ui/card';
import { Input } from '@/design-system/components/ui/input';
import { Clock, Calculator, Flag, Eye, ChevronLeft, ChevronRight, CheckCircle2, BookOpen, Calculator as CalcIcon, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/design-system/components/ui/dialog';
import { Progress } from '@/design-system/components/ui/progress';

export default function GRETestPage() {
  const {
    test,
    currentSectionId,
    currentQuestionIndex,
    answers,
    flags,
    timeLeft,
    isCalculatorOpen,
    isReviewScreenOpen,
    initTest,
    setAnswer,
    toggleFlag,
    toggleCalculator,
    toggleReviewScreen,
    navigateQuestion,
    tickTimer,
    completeSection
  } = useTestStore();

  const [testStarted, setTestStarted] = useState(false);
  const [selectedSectionType, setSelectedSectionType] = useState<'verbal' | 'quantitative' | null>(null);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  // Initialize test
  useEffect(() => {
    if (!test) {
      initTest(mockGRETest);
    }
  }, [test, initTest]);

  // Timer effect
  useEffect(() => {
    if (testStarted && timeLeft > 0) {
      const interval = setInterval(() => {
        tickTimer();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [testStarted, timeLeft, tickTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSectionSelect = (sectionType: 'verbal' | 'quantitative') => {
    setSelectedSectionType(sectionType);
  };

  const handleStart = () => {
    if (selectedSectionType) {
      initTest(mockGRETest, selectedSectionType);
      setTestStarted(true);
    }
  };

  const handleCompleteSection = () => {
    setShowCompletionDialog(true);
  };

  const confirmCompleteSection = () => {
    completeSection();
    setShowCompletionDialog(false);
  };

  const currentSection = test?.sections.find(s => s.id === currentSectionId);
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const currentPassage = currentQuestion?.passageId 
    ? currentSection?.passages.find(p => p.id === currentQuestion.passageId)
    : null;

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>GRE Test Simulator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Loading test...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Section Selection Screen
  if (!testStarted) {
    const verbalSections = test.sections.filter(s => s.sectionType === 'verbal');
    const quantSections = test.sections.filter(s => s.sectionType === 'quantitative');
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <Card className="w-full max-w-4xl shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl mb-2">{test.title}</CardTitle>
            <p className="text-gray-600">Select a section type to begin</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Verbal Section Card */}
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedSectionType === 'verbal' 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:border-blue-300'
                }`}
                onClick={() => handleSectionSelect('verbal')}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${
                      selectedSectionType === 'verbal' ? 'bg-blue-500' : 'bg-blue-100'
                    }`}>
                      <BookOpen className={`w-6 h-6 ${
                        selectedSectionType === 'verbal' ? 'text-white' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Verbal Reasoning</CardTitle>
                      <p className="text-sm text-gray-600">Reading Comprehension & Vocabulary</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4" />
                    <span>30 minutes per section</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Sections available:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                      <li>Medium difficulty (5 questions)</li>
                      <li>Hard difficulty (2 questions)</li>
                      <li>Easy difficulty (2 questions)</li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500">
                      Adaptive routing based on your performance
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quantitative Section Card */}
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedSectionType === 'quantitative' 
                    ? 'ring-2 ring-green-500 bg-green-50' 
                    : 'hover:border-green-300'
                }`}
                onClick={() => handleSectionSelect('quantitative')}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${
                      selectedSectionType === 'quantitative' ? 'bg-green-500' : 'bg-green-100'
                    }`}>
                      <CalcIcon className={`w-6 h-6 ${
                        selectedSectionType === 'quantitative' ? 'text-white' : 'text-green-600'
                      }`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Quantitative Reasoning</CardTitle>
                      <p className="text-sm text-gray-600">Math & Problem Solving</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4" />
                    <span>35 minutes per section</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Sections available:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                      <li>Medium difficulty (5 questions)</li>
                      <li>Hard difficulty (3 questions)</li>
                      <li>Easy difficulty (3 questions)</li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500">
                      Includes algebra, geometry, and data interpretation
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="pt-4 border-t">
              <div className="space-y-2 mb-4">
                <p className="text-gray-700 font-medium">Test Instructions:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4">
                  <li>You will start with a medium difficulty section</li>
                  <li>Your performance determines the next section (easy or hard)</li>
                  <li>Answer all questions to the best of your ability</li>
                  <li>You can flag questions for review</li>
                  <li>Use the calculator for quantitative sections</li>
                </ul>
              </div>
              <Button 
                onClick={handleStart} 
                className="w-full" 
                size="lg"
                disabled={!selectedSectionType}
              >
                Start {selectedSectionType === 'verbal' ? 'Verbal' : selectedSectionType === 'quantitative' ? 'Quantitative' : 'Test'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentSection || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>GRE Test Simulator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Loading section...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalQuestions = currentSection.questions.length;
  const answeredCount = currentSection.questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '').length;
  const progressPercentage = (answeredCount / totalQuestions) * 100;
  const isTimeLow = timeLeft < 300; // Less than 5 minutes
  const isTimeCritical = timeLeft < 60; // Less than 1 minute

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-300 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div>
            <span className="font-semibold text-gray-800">{currentSection.title}</span>
            <span className="ml-2 text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
              {currentSection.sectionType === 'verbal' ? 'Verbal' : 'Quantitative'}
            </span>
          </div>
          <div className={`flex items-center gap-2 font-mono ${
            isTimeCritical ? 'text-red-600 font-bold' : isTimeLow ? 'text-orange-600' : 'text-gray-700'
          }`}>
            <Clock className={`w-4 h-4 ${isTimeCritical ? 'animate-pulse' : ''}`} />
            <span className={isTimeCritical ? 'animate-pulse' : ''}>{formatTime(timeLeft)}</span>
            {isTimeLow && (
              <AlertCircle className="w-4 h-4 ml-1" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">{answeredCount}/{totalQuestions}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFlag(currentQuestion.id)}
            className={flags[currentQuestion.id] ? 'bg-yellow-100 border-yellow-400' : ''}
          >
            <Flag className={`w-4 h-4 mr-1 ${flags[currentQuestion.id] ? 'fill-yellow-500' : ''}`} />
            {flags[currentQuestion.id] ? 'Unflag' : 'Flag'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleReviewScreen}
          >
            <Eye className="w-4 h-4 mr-1" />
            Review
          </Button>
          {currentSection.sectionType === 'quantitative' && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleCalculator}
              className={isCalculatorOpen ? 'bg-blue-50' : ''}
            >
              <Calculator className="w-4 h-4 mr-1" />
              Calculator
            </Button>
          )}
          {answeredCount === totalQuestions && (
            <Button
              onClick={handleCompleteSection}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Complete Section
            </Button>
          )}
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left: Passage */}
        {currentPassage && (
          <div className="w-1/2 border-r border-gray-300 overflow-y-auto bg-white p-6">
            <div 
              className="prose max-w-none text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentPassage.content }}
            />
          </div>
        )}

        {/* Right: Question */}
        <div className={`${currentPassage ? 'w-1/2' : 'w-full'} overflow-y-auto bg-gray-50 p-6`}>
          <Card className="mb-4 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Question {currentQuestionIndex + 1}
                {flags[currentQuestion.id] && (
                  <Flag className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="mb-6 text-gray-800 text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentQuestion.prompt }}
              />

              {currentQuestion.type === 'single-choice' && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-150 ${
                        answers[currentQuestion.id] === option.id
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={option.id}
                        checked={answers[currentQuestion.id] === option.id}
                        onChange={() => setAnswer(currentQuestion.id, option.id)}
                        className="mt-1 mr-3 w-4 h-4"
                      />
                      <span className="flex-1 text-gray-800">{option.text}</span>
                    </label>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'text-select' && (
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Enter your answer"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => {
                      setAnswer(currentQuestion.id, e.target.value);
                    }}
                    className="text-lg p-4"
                  />
                  <p className="text-sm text-gray-500">Type your answer in the text field above</p>
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
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={() => navigateQuestion(Math.max(0, currentQuestionIndex - 1))}
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
                  onClick={() => navigateQuestion(idx)}
                  className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-all hover:scale-110 ${
                    idx === currentQuestionIndex
                      ? 'border-blue-500 bg-blue-100 text-blue-700 shadow-md scale-110'
                      : answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== ''
                      ? 'border-green-500 bg-green-100 text-green-700'
                      : flags[q.id]
                      ? 'border-yellow-500 bg-yellow-100 text-yellow-700'
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
              onClick={() => navigateQuestion(Math.min(totalQuestions - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="transition-all"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Review Screen Modal */}
      <Dialog open={isReviewScreenOpen} onOpenChange={(open) => {
        if (!open) toggleReviewScreen();
      }}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Questions - {currentSection.title}</DialogTitle>
            <DialogDescription>
              Click on any question to navigate to it
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-5 gap-3 mt-4">
            {currentSection.questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  navigateQuestion(idx);
                  toggleReviewScreen();
                }}
                className={`p-4 border-2 rounded-lg text-center transition-all hover:scale-105 ${
                  answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== ''
                    ? 'border-green-500 bg-green-50'
                    : flags[q.id]
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div className="font-semibold">Q{idx + 1}</div>
                <div className="text-xs mt-1">
                  {answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '' ? 'Answered' : flags[q.id] ? 'Flagged' : 'Incomplete'}
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Section Completion Confirmation */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Section?</DialogTitle>
            <DialogDescription>
              You have answered all questions. Are you ready to complete this section and proceed to the next?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end mt-4">
            <Button variant="outline" onClick={() => setShowCompletionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmCompleteSection} className="bg-green-600 hover:bg-green-700">
              Complete Section
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Calculator */}
      {isCalculatorOpen && (
        <div className="fixed bottom-4 right-4 bg-white border-2 border-gray-300 rounded-lg shadow-xl p-4 w-72 z-50">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-800">Calculator</span>
            <Button variant="outline" size="sm" onClick={toggleCalculator} className="h-8 w-8 p-0">×</Button>
          </div>
          <div className="bg-gray-100 p-3 rounded text-right font-mono text-xl mb-3 min-h-[2.5rem] flex items-center justify-end">
            0
          </div>
          <div className="grid grid-cols-4 gap-2">
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
              <button
                key={btn}
                className="p-3 bg-gray-200 hover:bg-gray-300 rounded font-medium transition-colors"
              >
                {btn}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">Basic calculator (UI only)</p>
        </div>
      )}
    </div>
  );
}
