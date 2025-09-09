'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/card'
import { Button } from '@/app/components-demo/ui/button'
import { Badge } from '@/app/components-demo/ui/badge'
import { Input } from '@/app/components-demo/ui/input'
import { Textarea } from '@/app/components-demo/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components-demo/ui/select'
import { 
  BookOpen, 
  Plus, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users, 
  DollarSign,
  FileText,
  Award,
  Zap
} from 'lucide-react'
import { getAllCourseTemplates, CourseTemplate } from '@/lib/course-templates'
import { useAuth } from '@/contexts/AuthContext'

interface CourseCreationData {
  templateId: string
  title: string
  description: string
  instructorId: string
  customizations: {
    price?: number
    isFree?: boolean
    tags?: string[]
    features?: string[]
  }
}

export default function CourseTemplateConverter() {
  const router = useRouter()
  const { user } = useAuth()
  const [templates, setTemplates] = useState<CourseTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<CourseTemplate | null>(null)
  const [courseData, setCourseData] = useState<CourseCreationData>({
    templateId: '',
    title: '',
    description: '',
    instructorId: user?.id || '',
    customizations: {
      price: 0,
      isFree: true,
      tags: [],
      features: []
    }
  })
  const [isCreating, setIsCreating] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    const allTemplates = getAllCourseTemplates()
    setTemplates(allTemplates)
  }, [])

  const handleTemplateSelect = (template: CourseTemplate) => {
    setSelectedTemplate(template)
    setCourseData(prev => ({
      ...prev,
      templateId: template.id,
      title: template.name,
      description: template.description,
      customizations: {
        ...prev.customizations,
        isFree: true,
        tags: [],
        features: []
      }
    }))
    setStep(2)
  }

  const handleCreateCourse = async () => {
    if (!selectedTemplate || !user) return

    setIsCreating(true)
    try {
      const response = await fetch('/api/courses/builder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}` // This should be a proper token
        },
        body: JSON.stringify({
          templateId: courseData.templateId,
          customizations: {
            title: courseData.title,
            description: courseData.description,
            instructorId: courseData.instructorId,
            ...courseData.customizations
          }
        })
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/dashboard/courses/manage`)
      } else {
        console.error('Failed to create course')
      }
    } catch (error) {
      console.error('Error creating course:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const updateCourseData = (field: string, value: string | number) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateCustomization = (field: string, value: string | number | boolean) => {
    setCourseData(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        [field]: value
      }
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
            Create Course from Template
          </h1>
          <p className="text-muted-foreground">
            Choose a template and customize it to create your course
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#e27447]' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#e27447] text-white' : 'bg-muted'}`}>
                {step > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
              </div>
              <span className="text-sm font-medium">Choose Template</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#e27447]' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#e27447] text-white' : 'bg-muted'}`}>
                {step > 2 ? <CheckCircle className="w-4 h-4" /> : '2'}
              </div>
              <span className="text-sm font-medium">Customize</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-[#e27447]' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#e27447] text-white' : 'bg-muted'}`}>
                3
              </div>
              <span className="text-sm font-medium">Create</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          {step === 1 && (
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-semibold mb-6">Choose a Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="hover:shadow-md transition-shadow cursor-pointer group"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardHeader>
                      <div className="w-full h-32 bg-gradient-to-br from-[#e27447] to-[#d1653a] rounded-lg flex items-center justify-center mb-4">
                        <BookOpen className="w-12 h-12 text-white" />
                      </div>
                      <CardTitle className="group-hover:text-[#e27447] transition-colors">
                        {template.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <Badge variant="outline">{template.curriculum}</Badge>
                          <Badge variant="secondary">
                            Free
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{template.estimatedDuration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>{template.lessonCount} lessons</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">
                            {template.subject}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {template.grade}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Course Customization */}
          {step === 2 && selectedTemplate && (
            <>
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Details</CardTitle>
                    <CardDescription>
                      Customize your course information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Course Title</label>
                      <Input
                        value={courseData.title}
                        onChange={(e) => updateCourseData('title', e.target.value)}
                        placeholder="Enter course title"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Description</label>
                      <Textarea
                        value={courseData.description}
                        onChange={(e) => updateCourseData('description', e.target.value)}
                        placeholder="Enter course description"
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Price Type</label>
                        <Select 
                          value={courseData.customizations.isFree ? 'free' : 'paid'} 
                          onValueChange={(value) => updateCustomization('isFree', value === 'free')}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">Free Course</SelectItem>
                            <SelectItem value="paid">Paid Course</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {!courseData.customizations.isFree && (
                        <div>
                          <label className="text-sm font-medium mb-2 block">Price ($)</label>
                          <Input
                            type="number"
                            value={courseData.customizations.price}
                            onChange={(e) => updateCustomization('price', parseFloat(e.target.value))}
                            placeholder="0.00"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Template Preview */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Template Preview</CardTitle>
                    <CardDescription>
                      Based on: {selectedTemplate.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#e27447]" />
                        <span className="text-sm font-medium">{selectedTemplate.curriculum}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#e27447]" />
                        <span className="text-sm">{selectedTemplate.subject}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#e27447]" />
                        <span className="text-sm">{selectedTemplate.estimatedDuration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#e27447]" />
                        <span className="text-sm">{selectedTemplate.lessonCount} lessons</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Features:</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Interactive Lessons</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Practice Exercises</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Progress Tracking</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Learning Outcomes:</h4>
                      <div className="space-y-1">
                        {selectedTemplate.learningOutcomes.slice(0, 3).map((outcome, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Award className="w-3 h-3 text-blue-600" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button 
                        onClick={() => setStep(3)} 
                        className="w-full"
                        disabled={!courseData.title || !courseData.description}
                      >
                        Continue to Review
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Final Review and Creation */}
          {step === 3 && selectedTemplate && (
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Course</CardTitle>
                  <CardDescription>
                    Review the details before creating your course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{courseData.title}</h3>
                        <p className="text-muted-foreground">{courseData.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-[#e27447]" />
                          <span className="text-sm">{selectedTemplate.curriculum}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#e27447]" />
                          <span className="text-sm">{selectedTemplate.subject}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#e27447]" />
                          <span className="text-sm">{selectedTemplate.estimatedDuration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-[#e27447]" />
                          <span className="text-sm">
                            {courseData.customizations.isFree ? 'Free' : `$${courseData.customizations.price}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Course Structure Preview</h4>
                        <div className="space-y-2">
                          {selectedTemplate.structure.sections.slice(0, 3).map((section, index) => (
                            <div key={index} className="p-3 bg-muted rounded-lg">
                              <div className="font-medium text-sm">{section.title}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {section.lessons.length} lessons • {section.estimatedDuration}
                              </div>
                            </div>
                          ))}
                          {selectedTemplate.structure.sections.length > 3 && (
                            <div className="text-sm text-muted-foreground text-center">
                              +{selectedTemplate.structure.sections.length - 3} more sections
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setStep(2)}
                          className="flex-1"
                        >
                          Back to Edit
                        </Button>
                        <Button 
                          onClick={handleCreateCourse}
                          disabled={isCreating}
                          className="flex-1"
                        >
                          {isCreating ? (
                            <>
                              <Zap className="w-4 h-4 mr-2 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Create Course
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
