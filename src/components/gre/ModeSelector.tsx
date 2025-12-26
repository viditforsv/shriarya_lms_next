"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/ui/card';
import { Clock, BookOpen, Calculator as CalculatorIcon, GraduationCap, Target } from 'lucide-react';

interface ModeSelectorProps {
  onSelectMode: (mode: 'test' | 'study') => void;
  selectedMode: 'test' | 'study' | null;
}

export function ModeSelector({ onSelectMode, selectedMode }: ModeSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-normal text-gray-900 mb-2">Choose Your Mode</h2>
        <p className="text-sm text-gray-600">Select how you want to practice</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Test Mode Card */}
        <Card
          className={`cursor-pointer border-2 transition-colors ${
            selectedMode === 'test'
              ? 'border-gray-900 bg-gray-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => onSelectMode('test')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded ${selectedMode === 'test' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <Target className={`w-5 h-5 ${selectedMode === 'test' ? 'text-white' : 'text-gray-700'}`} />
              </div>
              <div>
                <CardTitle className="text-lg font-medium text-gray-900">Test Mode</CardTitle>
                <p className="text-xs text-gray-600 mt-0.5">Simulate real GRE test conditions</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            <ul className="text-xs text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>Timed or Practice mode</span>
              </li>
              <li className="flex items-center gap-2">
                <Target className="w-3 h-3" />
                <span>Realistic test experience</span>
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="w-3 h-3" />
                <span>Adaptive routing</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Study Mode Card */}
        <Card
          className={`cursor-pointer border-2 transition-colors ${
            selectedMode === 'study'
              ? 'border-gray-900 bg-gray-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => onSelectMode('study')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded ${selectedMode === 'study' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <GraduationCap className={`w-5 h-5 ${selectedMode === 'study' ? 'text-white' : 'text-gray-700'}`} />
              </div>
              <div>
                <CardTitle className="text-lg font-medium text-gray-900">Study Mode</CardTitle>
                <p className="text-xs text-gray-600 mt-0.5">Learn with AI tutor, explanations, and hints</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            <ul className="text-xs text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <GraduationCap className="w-3 h-3" />
                <span>AI chatbot assistance</span>
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="w-3 h-3" />
                <span>Explanations & hints</span>
              </li>
              <li className="flex items-center gap-2">
                <CalculatorIcon className="w-3 h-3" />
                <span>Bookmarks, notes & flashcards</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

