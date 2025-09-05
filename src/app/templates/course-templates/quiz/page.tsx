"use client"

import { useState, memo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/card'
import { Button } from '@/app/components-demo/ui/button'
import { Badge } from '@/app/components-demo/ui/badge'
import { Progress } from '@/app/components-demo/ui/progress'
import { 
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Target,
  BookOpen,
  FileText
} from 'lucide-react'
import { CompletionDot } from '@/app/components-demo/ui/template-status'
import { TemplateLayout } from "@/app/components-demo/ui/template-layout"
const QuizTemplate = memo(function QuizTemplate() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>({})
  const [showResults, setShowResults] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(1800) // 30 minutes
  const [quizStarted, setQuizStarted] = useState(false)

  // Mock quiz data
  const quiz = {
    id: '1',
    title: 'Quadratic Equations Quiz',
    description: 'Test your understanding of quadratic equations with this comprehensive quiz.',
    duration: '30 min',
    totalQuestions: 5,
    passingScore: 70,
    course: 'CBSE Mathematics Class 10'
  }

  const questions = [
    {
      id: 1,
      question: "What is the standard form of a quadratic equation?",
      type: "multiple_choice",
      options: [
        "ax² + bx + c = 0",
        "ax + b = 0", 
        "ax³ + bx² + cx + d = 0",
        "x² = 0"
      ],
      correct: 0,
      explanation: "The standard form of a quadratic equation is ax² + bx + c = 0, where a ≠ 0."
    },
    {
      id: 2,
      question: "What is the discriminant of the equation x² - 4x + 4 = 0?",
      type: "multiple_choice",
      options: ["0", "16", "-16", "8"],
      correct: 0,
      explanation: "The discriminant is b² - 4ac = (-4)² - 4(1)(4) = 16 - 16 = 0."
    },
    {
      id: 3,
      question: "How many real solutions does x² + 1 = 0 have?",
      type: "multiple_choice",
      options: ["0", "1", "2", "Infinite"],
      correct: 0,
      explanation: "x² + 1 = 0 has no real solutions since x² = -1 has no real roots."
    },
    {
      id: 4,
      question: "Solve: x² - 5x + 6 = 0",
      type: "multiple_choice",
      options: ["x = 2, x = 3", "x = 1, x = 6", "x = -2, x = -3", "x = 0, x = 5"],
      correct: 0,
      explanation: "Factoring: (x - 2)(x - 3) = 0, so x = 2 or x = 3."
    },
    {
      id: 5,
      question: "What is the vertex form of a quadratic equation?",
      type: "multiple_choice",
      options: [
        "y = a(x - h)² + k",
        "y = ax² + bx + c",
        "y = mx + b",
        "y = a(x + h)² - k"
      ],
      correct: 0,
      explanation: "The vertex form is y = a(x - h)² + k, where (h, k) is the vertex."
    }
  ]

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const answeredQuestions = Object.keys(answers).length
  const correctAnswers = questions.filter((q, index) => {
    const userAnswer = answers[index]
    if (Array.isArray(userAnswer)) {
      // For multiple choice questions, check if the answer array contains the correct answer
      return userAnswer.includes(q.correct.toString())
    }
    return userAnswer === q.correct.toString()
  }).length
  const score = Math.round((correctAnswers / questions.length) * 100)

  const handleAnswerSelect = (answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const startQuiz = () => {
    setQuizStarted(true)
    // Timer countdown
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowResults(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-b border-[#e27447] py-6 relative">
          <CompletionDot isCompleted={true} />
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/templates/course-templates" 
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course Templates
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Quiz Introduction */}
          <Card className="max-w-4xl mx-auto rounded-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-[#1e293b] mb-2">
                {quiz.title}
              </CardTitle>
              <CardDescription className="text-lg">
                {quiz.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quiz Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[#feefea] rounded-sm">
                  <Clock className="w-8 h-8 text-[#e27447] mx-auto mb-2" />
                  <h3 className="font-semibold text-[#1e293b]">Duration</h3>
                  <p className="text-muted-foreground">{quiz.duration}</p>
                </div>
                <div className="text-center p-4 bg-[#feefea] rounded-sm">
                  <Target className="w-8 h-8 text-[#e27447] mx-auto mb-2" />
                  <h3 className="font-semibold text-[#1e293b]">Questions</h3>
                  <p className="text-muted-foreground">{quiz.totalQuestions} questions</p>
                </div>
                <div className="text-center p-4 bg-[#feefea] rounded-sm">
                  <Trophy className="w-8 h-8 text-[#e27447] mx-auto mb-2" />
                  <h3 className="font-semibold text-[#1e293b]">Passing Score</h3>
                  <p className="text-muted-foreground">{quiz.passingScore}%</p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-[#feefea] p-6 rounded-sm">
                <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Instructions</h3>
                <ul className="space-y-2 text-[#1e293b]">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#e27447] mt-0.5 flex-shrink-0" />
                    <span>Read each question carefully before selecting your answer</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#e27447] mt-0.5 flex-shrink-0" />
                    <span>You can navigate between questions using Previous/Next buttons</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#e27447] mt-0.5 flex-shrink-0" />
                    <span>The quiz will auto-submit when time runs out</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#e27447] mt-0.5 flex-shrink-0" />
                    <span>You can review your answers before submitting</span>
                  </li>
                </ul>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <Button 
                  onClick={startQuiz}
                  className="bg-[#e27447] hover:bg-[#e27447]/90 text-white px-8 py-3 text-lg rounded-sm"
                >
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-b border-[#e27447] py-6 relative">
          <CompletionDot isCompleted={true} />
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/templates/course-templates" 
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course Templates
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto rounded-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-[#1e293b] mb-2">
                Quiz Results
              </CardTitle>
              <CardDescription className="text-lg">
                {quiz.title} - {quiz.course}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score Display */}
              <div className="text-center">
                <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-4xl font-bold mb-4 ${
                  score >= quiz.passingScore 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {score}%
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${
                  score >= quiz.passingScore ? 'text-green-600' : 'text-red-600'
                }`}>
                  {score >= quiz.passingScore ? 'Congratulations!' : 'Keep Learning!'}
                </h2>
                <p className="text-muted-foreground">
                  {score >= quiz.passingScore 
                    ? 'You passed the quiz successfully!' 
                    : `You need ${quiz.passingScore}% to pass. Try again!`
                  }
                </p>
              </div>

              {/* Detailed Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[#feefea] rounded-sm">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-[#1e293b]">Correct</h3>
                  <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
                </div>
                <div className="text-center p-4 bg-[#feefea] rounded-sm">
                  <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-[#1e293b]">Incorrect</h3>
                  <p className="text-2xl font-bold text-red-600">{questions.length - correctAnswers}</p>
                </div>
                <div className="text-center p-4 bg-[#feefea] rounded-sm">
                  <Target className="w-8 h-8 text-[#e27447] mx-auto mb-2" />
                  <h3 className="font-semibold text-[#1e293b]">Total</h3>
                  <p className="text-2xl font-bold text-[#1e293b]">{questions.length}</p>
                </div>
              </div>

              {/* Question Review */}
              <div>
                <h3 className="text-lg font-semibold text-[#1e293b] mb-4">Question Review</h3>
                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const userAnswer = answers[index]
                    const isCorrect = Array.isArray(userAnswer) 
                      ? userAnswer.includes(question.correct.toString())
                      : userAnswer === question.correct.toString()
                    return (
                      <div key={question.id} className={`p-4 rounded-sm border ${
                        isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}>
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-sm font-medium ${
                            isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                          }`}>
                            {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#1e293b] mb-2">
                              Question {index + 1}: {question.question}
                            </h4>
                            <div className="space-y-1 mb-2">
                              {question.options?.map((option, optionIndex) => (
                                <div key={optionIndex} className={`text-sm p-2 rounded-sm ${
                                  optionIndex === question.correct 
                                    ? 'bg-green-100 text-green-800' 
                                    : (Array.isArray(answers[index]) 
                                        ? answers[index].includes(optionIndex.toString())
                                        : answers[index] === optionIndex.toString()) && !isCorrect
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {option}
                                </div>
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCurrentQuestion(0)
                    setAnswers({})
                    setShowResults(false)
                    setQuizStarted(false)
                    setTimeRemaining(1800)
                  }}
                  className="rounded-sm"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
                <Button className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm">
                  Continue Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-b border-[#e27447] py-4 relative">
        <CompletionDot isCompleted={true} />
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#1e293b]">{quiz.title}</h1>
              <p className="text-sm text-muted-foreground">{quiz.course}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#e27447]" />
                <span className="font-medium text-[#1e293b]">{formatTime(timeRemaining)}</span>
              </div>
              <Badge className="bg-[#e27447] text-white rounded-sm">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-[#1e293b] font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="rounded-sm mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-[#1e293b]">
                Question {currentQuestion + 1}
              </CardTitle>
              <CardDescription>
                {currentQ.question}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQ.options?.map((option, index) => (
                  <label 
                    key={index} 
                    className={`flex items-center space-x-3 p-4 rounded-sm border cursor-pointer transition-colors ${
                      (Array.isArray(answers[currentQuestion]) 
                        ? answers[currentQuestion].includes(index.toString())
                        : answers[currentQuestion] === index.toString()) 
                        ? 'border-[#e27447] bg-[#feefea]' 
                        : 'border-[#feefea] hover:border-[#e27447] hover:bg-[#feefea]/50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name={`question-${currentQ.id}`}
                      value={index}
                      checked={Array.isArray(answers[currentQuestion]) 
                        ? answers[currentQuestion].includes(index.toString())
                        : answers[currentQuestion] === index.toString()}
                      onChange={() => handleAnswerSelect(index.toString())}
                      className="text-[#e27447] focus:ring-[#e27447]"
                    />
                    <span className="text-[#1e293b]">{option}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="rounded-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {answeredQuestions} of {questions.length} answered
              </span>
            </div>

            <Button 
              onClick={handleNext}
              className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
            >
              {currentQuestion === questions.length - 1 ? 'Submit Quiz' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default QuizTemplate

