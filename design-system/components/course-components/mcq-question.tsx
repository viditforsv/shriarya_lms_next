'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'

interface MCQQuestionProps {
  question: string
  options: string[]
  answer: number
  explanation?: string
  className?: string
}

export function MCQQuestion({ 
  question, 
  options, 
  answer, 
  explanation,
  className = '' 
}: MCQQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const isCorrect = selected === answer
  const hasAnswered = selected !== null

  const handleSubmit = () => {
    if (selected !== null) {
      setIsSubmitted(true)
      setShowExplanation(true)
    }
  }

  const handleReset = () => {
    setSelected(null)
    setIsSubmitted(false)
    setShowExplanation(false)
  }

  const getOptionStyle = (index: number) => {
    if (!isSubmitted) {
      return selected === index 
        ? "bg-blue-50 border-blue-500 text-blue-900" 
        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
    }
    
    if (index === answer) {
      return "bg-green-50 border-green-500 text-green-900"
    }
    
    if (index === selected && index !== answer) {
      return "bg-red-50 border-red-500 text-red-900"
    }
    
    return "bg-gray-50 border-gray-200 text-gray-500"
  }

  const getOptionIcon = (index: number) => {
    if (!isSubmitted) return null
    
    if (index === answer) {
      return <CheckCircle className="w-4 h-4 text-green-600" />
    }
    
    if (index === selected && index !== answer) {
      return <XCircle className="w-4 h-4 text-red-600" />
    }
    
    return null
  }

  return (
    <Card className={`rounded-sm ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-[#1e293b] leading-relaxed">
          {question}
        </CardTitle>
        {isSubmitted && (
          <div className="flex items-center space-x-2 mt-2">
            {isCorrect ? (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Correct!
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800 border-red-200">
                <XCircle className="w-3 h-3 mr-1" />
                Incorrect
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Options */}
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => !isSubmitted && setSelected(index)}
              disabled={isSubmitted}
              className={`w-full text-left p-4 rounded-sm border-2 transition-all duration-200 flex items-center justify-between ${
                !isSubmitted ? 'cursor-pointer' : 'cursor-default'
              } ${getOptionStyle(index)}`}
            >
              <span className="text-base leading-relaxed">{option}</span>
              {getOptionIcon(index)}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 pt-2">
          <Button
            onClick={handleSubmit}
            disabled={!hasAnswered || isSubmitted}
            className="bg-[#e27447] hover:bg-[#e27447]/90 text-white rounded-sm"
          >
            {isSubmitted ? 'Submitted' : 'Submit Answer'}
          </Button>
          
          {isSubmitted && (
            <Button
              onClick={handleReset}
              variant="outline"
              className="rounded-sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>

        {/* Explanation */}
        {showExplanation && explanation && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-sm">
            <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
            <p className="text-blue-800 leading-relaxed">{explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Example usage component
export function MCQQuestionExample() {
  const sampleQuestions = [
    {
      question: "What is the value of √2?",
      options: [
        "1.414213562...",
        "1.732050808...",
        "2.236067977...",
        "3.141592654..."
      ],
      answer: 0,
      explanation: "√2 is an irrational number approximately equal to 1.414213562... It cannot be expressed as a simple fraction."
    },
    {
      question: "Which property states that a + b = b + a?",
      options: [
        "Associative Property",
        "Commutative Property",
        "Distributive Property",
        "Identity Property"
      ],
      answer: 1,
      explanation: "The commutative property states that the order of operands does not change the result of the operation."
    }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1e293b] mb-6">MCQ Questions</h2>
      {sampleQuestions.map((q, index) => (
        <MCQQuestion
          key={index}
          question={q.question}
          options={q.options}
          answer={q.answer}
          explanation={q.explanation}
        />
      ))}
    </div>
  )
}
