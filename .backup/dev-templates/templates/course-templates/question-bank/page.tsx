'use client'

import { useState, memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/ui-components/card"
import { Button } from "@/app/components-demo/ui/ui-components/button"
import { Badge } from "@/app/components-demo/ui/ui-components/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components-demo/ui/tabs"
import { CompletionDot } from "@/app/components-demo/ui/template-status"
import { TemplateLayout } from "@/app/components-demo/ui/template-layout"
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Clock,
  Star,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Calculator,
  Lightbulb,
  Brain,
  TrendingUp,
  Users,
  BarChart3
} from 'lucide-react'

const QuestionBankTemplate = memo(function QuestionBankTemplate() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const questions = [
    {
      id: 1,
      title: "Solve the quadratic equation: x² - 5x + 6 = 0",
      category: "Algebra",
      difficulty: "Medium",
      type: "Multiple Choice",
      points: 5,
      timeLimit: 3,
      status: "Published",
      usage: 45,
      accuracy: 78
    },
    {
      id: 2,
      title: "Find the derivative of f(x) = 3x³ + 2x² - 5x + 1",
      category: "Calculus",
      difficulty: "Hard",
      type: "Short Answer",
      points: 8,
      timeLimit: 5,
      status: "Draft",
      usage: 12,
      accuracy: 65
    },
    {
      id: 3,
      title: "What is the area of a circle with radius 7 cm?",
      category: "Geometry",
      difficulty: "Easy",
      type: "Multiple Choice",
      points: 3,
      timeLimit: 2,
      status: "Published",
      usage: 89,
      accuracy: 92
    },
    {
      id: 4,
      title: "Prove that the sum of angles in a triangle is 180°",
      category: "Geometry",
      difficulty: "Hard",
      type: "Essay",
      points: 10,
      timeLimit: 10,
      status: "Review",
      usage: 23,
      accuracy: 71
    },
    {
      id: 5,
      title: "Calculate the limit: lim(x→2) (x² - 4)/(x - 2)",
      category: "Calculus",
      difficulty: "Medium",
      type: "Short Answer",
      points: 6,
      timeLimit: 4,
      status: "Published",
      usage: 67,
      accuracy: 84
    }
  ]

  const categories = ["Algebra", "Geometry", "Calculus", "Statistics", "Trigonometry"]
  const difficulties = ["Easy", "Medium", "Hard"]
  const questionTypes = ["Multiple Choice", "Short Answer", "Essay", "True/False"]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800'
      case 'Draft': return 'bg-gray-100 text-gray-800'
      case 'Review': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feefea] to-[#fffefd]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#2d3748] text-white py-8 relative">
        <CompletionDot isCompleted={true} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-cardo mb-2">Question Bank</h1>
              <p className="text-lg text-gray-300 font-dm-sans">
                Manage and organize your question repository
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{questions.length}</div>
                <div className="text-sm text-gray-300">Total Questions</div>
              </div>
              <Button className="bg-[#e27447] hover:bg-[#d65a2b] text-white rounded-sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-sm bg-white p-1 shadow-sm">
            <TabsTrigger
              value="questions"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <FileText className="w-4 h-4 mr-2" />
              Questions
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Categories
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Target className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-6">
            {/* Search and Filters */}
            <Card className="rounded-sm">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    >
                      <option value="all">All Difficulties</option>
                      {difficulties.map(diff => (
                        <option key={diff} value={diff}>{diff}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions List */}
            <div className="grid gap-4">
              {filteredQuestions.map((question) => (
                <Card key={question.id} className="rounded-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 font-dm-sans">
                            {question.title}
                          </h3>
                          <Badge className={`rounded-sm ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </Badge>
                          <Badge className={`rounded-sm ${getStatusColor(question.status)}`}>
                            {question.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {question.category}
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {question.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {question.points} points
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {question.timeLimit} min
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Used {question.usage} times
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {question.accuracy}% accuracy
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Questions</p>
                      <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-[#e27447]" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Published</p>
                      <p className="text-2xl font-bold text-green-600">
                        {questions.filter(q => q.status === 'Published').length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg. Accuracy</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.round(questions.reduce((acc, q) => acc + q.accuracy, 0) / questions.length)}%
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Usage</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {questions.reduce((acc, q) => acc + q.usage, 0)}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Questions by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map(category => {
                      const count = questions.filter(q => q.category === category).length
                      return (
                        <div key={category} className="flex items-center justify-between">
                          <span className="font-dm-sans">{category}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-[#e27447] h-2 rounded-full" 
                                style={{ width: `${(count / questions.length) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Questions by Difficulty</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {difficulties.map(difficulty => {
                      const count = questions.filter(q => q.difficulty === difficulty).length
                      return (
                        <div key={difficulty} className="flex items-center justify-between">
                          <span className="font-dm-sans">{difficulty}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  difficulty === 'Easy' ? 'bg-green-500' :
                                  difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${(count / questions.length) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => {
                const categoryQuestions = questions.filter(q => q.category === category)
                return (
                  <Card key={category} className="rounded-sm">
                    <CardHeader>
                      <CardTitle className="font-cardo flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#e27447]" />
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Questions:</span>
                          <span className="font-medium">{categoryQuestions.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Avg. Accuracy:</span>
                          <span className="font-medium">
                            {Math.round(categoryQuestions.reduce((acc, q) => acc + q.accuracy, 0) / categoryQuestions.length || 0)}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Usage:</span>
                          <span className="font-medium">
                            {categoryQuestions.reduce((acc, q) => acc + q.usage, 0)}
                          </span>
                        </div>
                        <Button variant="outline" className="w-full rounded-sm mt-4">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Question Bank Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Time Limit (minutes)
                    </label>
                    <input
                      type="number"
                      defaultValue={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Points
                    </label>
                    <input
                      type="number"
                      defaultValue={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auto-publish Questions
                  </label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm" />
                    <span className="text-sm text-gray-600">Automatically publish questions after review</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Categories
                  </label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="font-dm-sans">{category}</span>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="bg-[#e27447] hover:bg-[#d65a2b] text-white rounded-sm">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
})

export default QuestionBankTemplate

