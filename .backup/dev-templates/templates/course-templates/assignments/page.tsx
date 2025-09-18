"use client"

import { useState, memo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/ui-components/card'
import { Button } from '@/app/components-demo/ui/ui-components/button'
import { Badge } from '@/app/components-demo/ui/ui-components/badge'
import { Progress } from '@/app/components-demo/ui/ui-components/progress'
import { Textarea } from '@/app/components-demo/ui/textarea'
import { 
  ArrowLeft,
  Upload,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  Edit,
  Send,
  BookOpen,
  Users,
  Award
} from '@/app/components-demo/ui/icons'
import { CompletionDot } from '@/app/components-demo/ui/template-status'
import { TemplateLayout } from '@/app/components-demo/ui/template-layout'

const AssignmentsTemplate = memo(function AssignmentsTemplate() {
  const [selectedAssignment, setSelectedAssignment] = useState(0)
  const [submissionText, setSubmissionText] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  // Mock data
  const course = {
    title: 'CBSE Mathematics Class 10',
    instructor: 'Dr. Sarah Johnson'
  }

  const assignments = [
    {
      id: 1,
      title: 'Quadratic Equations Practice',
      description: 'Solve the following quadratic equations using different methods (factoring, completing the square, and quadratic formula). Show all your work clearly.',
      dueDate: '2024-01-15',
      points: 100,
      status: 'assigned',
      submitted: false,
      graded: false,
      instructions: [
        'Solve each equation using at least two different methods',
        'Show all steps clearly',
        'Check your answers by substituting back into the original equation',
        'Submit your work as a PDF or clear photos'
      ],
      questions: [
        'Solve: x² - 5x + 6 = 0',
        'Solve: 2x² - 8x + 6 = 0',
        'Solve: x² + 4x - 5 = 0',
        'Solve: 3x² - 12x + 9 = 0'
      ]
    },
    {
      id: 2,
      title: 'Geometry Problem Set',
      description: 'Complete the geometry problems involving triangles, circles, and coordinate geometry.',
      dueDate: '2024-01-20',
      points: 150,
      status: 'assigned',
      submitted: true,
      graded: true,
      grade: 85,
      feedback: 'Good work overall! Make sure to show all construction steps clearly in geometry problems.',
      submittedDate: '2024-01-18'
    },
    {
      id: 3,
      title: 'Statistics Project',
      description: 'Collect data and create statistical analysis of a topic of your choice.',
      dueDate: '2024-01-25',
      points: 200,
      status: 'upcoming',
      submitted: false,
      graded: false
    }
  ]

  const currentAssignment = assignments[selectedAssignment]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const submitAssignment = () => {
    // Handle submission logic
    console.log('Submitting assignment:', {
      assignmentId: currentAssignment.id,
      text: submissionText,
      files: uploadedFiles
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800'
      case 'submitted': return 'bg-yellow-100 text-yellow-800'
      case 'graded': return 'bg-green-100 text-green-800'
      case 'upcoming': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (assignment: { graded: boolean; submitted: boolean; status: string }) => {
    if (assignment.graded) return <Award className="w-4 h-4" />
    if (assignment.submitted) return <CheckCircle className="w-4 h-4" />
    if (assignment.status === 'upcoming') return <Clock className="w-4 h-4" />
    return <AlertCircle className="w-4 h-4" />
  }

  return (
    <TemplateLayout
      title="Assignments Template"
      description="A comprehensive assignments management template featuring assignment creation, submission tracking, grading interface, and student progress monitoring."
      phase="Phase 1-3"
      ready={true}
    >
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Assignments</h1>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <span className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>{course.title}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.instructor}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Assignment List */}
          <div className="lg:col-span-1">
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="text-lg">Assignment List</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {assignments.map((assignment, index) => (
                  <div
                    key={assignment.id}
                    className={`p-3 rounded-sm border cursor-pointer transition-colors ${
                      selectedAssignment === index 
                        ? 'border-[#e27447] bg-[#feefea]' 
                        : 'border-[#feefea] hover:border-[#e27447] hover:bg-[#feefea]/50'
                    }`}
                    onClick={() => setSelectedAssignment(index)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={`text-sm font-medium ${
                        selectedAssignment === index ? 'text-[#1e293b]' : 'text-muted-foreground'
                      }`}>
                        {assignment.title}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(assignment)}
                        <Badge className={`text-xs ${getStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{assignment.points} pts</span>
                      <span>{assignment.dueDate}</span>
                    </div>
                    {assignment.graded && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium text-green-600">
                          Grade: {assignment.grade}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Assignment Details */}
          <div className="lg:col-span-3">
            <Card className="rounded-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-[#1e293b] mb-2">
                      {currentAssignment.title}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {currentAssignment.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getStatusColor(currentAssignment.status)}`}>
                      {currentAssignment.status}
                    </Badge>
                    {currentAssignment.graded && (
                      <Badge className="bg-green-100 text-green-800">
                        <Award className="w-3 h-3 mr-1" />
                        Graded
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Assignment Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 p-3 bg-[#feefea] rounded-sm">
                    <Calendar className="w-5 h-5 text-[#e27447]" />
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-medium text-[#1e293b]">{currentAssignment.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-[#feefea] rounded-sm">
                    <Award className="w-5 h-5 text-[#e27447]" />
                    <div>
                      <p className="text-sm text-muted-foreground">Points</p>
                      <p className="font-medium text-[#1e293b]">{currentAssignment.points}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-[#feefea] rounded-sm">
                    <Clock className="w-5 h-5 text-[#e27447]" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time Remaining</p>
                      <p className="font-medium text-[#1e293b]">3 days</p>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                {currentAssignment.instructions && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Instructions</h3>
                    <div className="bg-[#feefea] p-4 rounded-sm">
                      <ul className="space-y-2 text-[#1e293b]">
                        {currentAssignment.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-[#e27447] mt-0.5 flex-shrink-0" />
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Questions */}
                {currentAssignment.questions && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Questions</h3>
                    <div className="space-y-3">
                      {currentAssignment.questions.map((question, index) => (
                        <div key={index} className="p-4 border border-[#feefea] rounded-sm">
                          <h4 className="font-medium text-[#1e293b] mb-2">
                            Question {index + 1}
                          </h4>
                          <p className="text-muted-foreground">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grade and Feedback */}
                {currentAssignment.graded && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-sm">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Grade & Feedback</h3>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="text-2xl font-bold text-green-600">
                        {currentAssignment.grade}%
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted on {currentAssignment.submittedDate}</p>
                        <p className="text-sm text-muted-foreground">{currentAssignment.points} points earned</p>
                      </div>
                    </div>
                    <p className="text-green-700">{currentAssignment.feedback}</p>
                  </div>
                )}

                {/* Submission Form */}
                {!currentAssignment.submitted && !currentAssignment.graded && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#1e293b]">Submit Your Assignment</h3>
                    
                    {/* Text Submission */}
                    <div>
                      <label className="block text-sm font-medium text-[#1e293b] mb-2">
                        Written Response
                      </label>
                      <Textarea
                        placeholder="Type your answers here..."
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        className="min-h-[200px] rounded-sm border-[#feefea] focus:border-[#e27447] focus:ring-[#e27447]"
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-[#1e293b] mb-2">
                        Upload Files
                      </label>
                      <div className="border-2 border-dashed border-[#feefea] rounded-sm p-6 text-center">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop files here, or click to browse
                        </p>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById('file-upload')?.click()}
                          className="rounded-sm"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Files
                        </Button>
                      </div>
                      
                      {/* Uploaded Files */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-sm">
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-[#1e293b]">{file.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#feefea]">
                      <div className="text-sm text-muted-foreground">
                        Make sure to review your submission before submitting
                      </div>
                      <Button 
                        onClick={submitAssignment}
                        className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Submit Assignment
                      </Button>
                    </div>
                  </div>
                )}

                {/* Submitted Status */}
                {currentAssignment.submitted && !currentAssignment.graded && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-yellow-600" />
                      <h3 className="text-lg font-semibold text-yellow-800">Assignment Submitted</h3>
                    </div>
                    <p className="text-yellow-700">
                      Your assignment has been submitted successfully. You&apos;ll receive your grade and feedback once it&apos;s been reviewed.
                    </p>
                    <p className="text-sm text-yellow-600 mt-2">
                      Submitted on {currentAssignment.submittedDate}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
    </TemplateLayout>
  )
})

export default AssignmentsTemplate

