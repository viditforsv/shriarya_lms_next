'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/card'
import { Button } from '@/app/components-demo/ui/button'
import { Input } from '@/app/components-demo/ui/input'
import { Label } from '@/app/components-demo/ui/label'
import { Textarea } from '@/app/components-demo/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components-demo/ui/select'
import { Badge } from '@/app/components-demo/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components-demo/ui/tabs'
import { Switch } from '@/app/components-demo/ui/switch'
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Eye, 
  Upload, 
  BookOpen, 
  Video, 
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Clock
} from 'lucide-react'
import { 
  CourseTemplate, 
  CourseStructure, 
  CourseSection, 
  LessonTemplate,
  getCourseTemplate,
  getAllCourseTemplates,
  getTemplatesByCurriculum,
  createCourseFromTemplate,
  generateCourseSlug,
  validateCourseStructure
} from '@/lib/course-templates'

export default function CourseBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [course, setCourse] = useState<CourseTemplate | null>(null)
  const [activeTab, setActiveTab] = useState('basic')
  const [isEditing, setIsEditing] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  // Initialize course from template
  useEffect(() => {
    // Template initialization logic can be added here when needed
  }, [])

  const handleTemplateSelect = (templateId: string) => {
    const template = getCourseTemplate(templateId)
    if (template) {
      setCourse(template)
      setSelectedTemplate(templateId)
      setIsEditing(true)
    }
  }

  const handleBasicInfoChange = (field: keyof CourseTemplate, value: unknown) => {
    if (!course) return
    
    setCourse({
      ...course,
      [field]: value
    })
  }

  const handleSectionAdd = () => {
    if (!course) return

    const newSection: CourseSection = {
      id: `section-${Date.now()}`,
      title: 'New Section',
      description: 'Section description',
      order: course.structure.sections.length + 1,
      estimatedDuration: '1 hour',
      lessons: []
    }

    setCourse({
      ...course,
      structure: {
        ...course.structure,
        sections: [...course.structure.sections, newSection]
      }
    })
  }

  const handleSectionUpdate = (sectionIndex: number, field: keyof CourseSection, value: unknown) => {
    if (!course) return

    const updatedSections = [...course.structure.sections]
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      [field]: value
    }

    setCourse({
      ...course,
      structure: {
        ...course.structure,
        sections: updatedSections
      }
    })
  }

  const handleSectionDelete = (sectionIndex: number) => {
    if (!course) return

    const updatedSections = course.structure.sections.filter((_, index) => index !== sectionIndex)
    setCourse({
      ...course,
      structure: {
        ...course.structure,
        sections: updatedSections
      }
    })
  }

  const handleLessonAdd = (sectionIndex: number) => {
    if (!course) return

    const section = course.structure.sections[sectionIndex]
    const newLesson: LessonTemplate = {
      id: `lesson-${Date.now()}`,
      title: 'New Lesson',
      description: 'Lesson description',
      type: 'video',
      duration: '30 minutes',
      order: section.lessons.length + 1,
      isPreview: false,
      resources: [],
      objectives: []
    }

    const updatedSections = [...course.structure.sections]
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      lessons: [...updatedSections[sectionIndex].lessons, newLesson]
    }

    setCourse({
      ...course,
      structure: {
        ...course.structure,
        sections: updatedSections
      }
    })
  }

  const handleLessonUpdate = (sectionIndex: number, lessonIndex: number, field: keyof LessonTemplate, value: unknown) => {
    if (!course) return

    const updatedSections = [...course.structure.sections]
    updatedSections[sectionIndex].lessons[lessonIndex] = {
      ...updatedSections[sectionIndex].lessons[lessonIndex],
      [field]: value
    }

    setCourse({
      ...course,
      structure: {
        ...course.structure,
        sections: updatedSections
      }
    })
  }

  const handleSave = () => {
    if (!course) return

    const validation = validateCourseStructure(course)
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      return
    }

    setValidationErrors([])
    // Course saved successfully
    console.log('Course saved:', course)
  }

  const handlePreview = () => {
    if (!course) return
    // Preview course functionality
    console.log('Previewing course:', course)
  }

  const templates = getAllCourseTemplates()

  if (!course) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Course Builder</h1>
            <p className="text-muted-foreground">
              Choose a template to start creating your course with a standardized structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{template.curriculum}</Badge>
                    <Badge variant="secondary">{template.grade || template.level}</Badge>
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{template.lessonCount} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{template.estimatedDuration}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Use Template
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Course Builder</h1>
            <p className="text-muted-foreground">Building: {course.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Course
            </Button>
          </div>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-800">Please fix the following errors:</h3>
              </div>
              <ul className="list-disc list-inside text-red-700 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Course Builder Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-sm bg-[#feefea] p-1">
            <TabsTrigger 
              value="basic" 
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
            >
              Basic Info
            </TabsTrigger>
            <TabsTrigger 
              value="structure" 
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
            >
              Structure
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
            >
              Settings
            </TabsTrigger>
            <TabsTrigger 
              value="assessments" 
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
            >
              Assessments
            </TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Set up the basic details of your course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      value={course.name}
                      onChange={(e) => handleBasicInfoChange('name', e.target.value)}
                      placeholder="Enter course title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="curriculum">Curriculum</Label>
                    <Select 
                      value={course.curriculum} 
                      onValueChange={(value) => handleBasicInfoChange('curriculum', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CBSE">CBSE</SelectItem>
                        <SelectItem value="ICSE">ICSE</SelectItem>
                        <SelectItem value="IBDP">IBDP</SelectItem>
                        <SelectItem value="IGCSE">IGCSE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={course.description}
                    onChange={(e) => handleBasicInfoChange('description', e.target.value)}
                    placeholder="Describe what students will learn in this course"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={course.subject}
                      onChange={(e) => handleBasicInfoChange('subject', e.target.value)}
                      placeholder="e.g., Mathematics"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade/Level</Label>
                    <Input
                      id="grade"
                      value={course.grade || course.level || ''}
                      onChange={(e) => handleBasicInfoChange(course.grade ? 'grade' : 'level', e.target.value)}
                      placeholder="e.g., Class 10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Estimated Duration</Label>
                    <Input
                      id="duration"
                      value={course.estimatedDuration}
                      onChange={(e) => handleBasicInfoChange('estimatedDuration', e.target.value)}
                      placeholder="e.g., 120 hours"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Prerequisites</Label>
                  <div className="space-y-2">
                    {course.prerequisites.map((prereq, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={prereq}
                          onChange={(e) => {
                            const updatedPrereqs = [...course.prerequisites]
                            updatedPrereqs[index] = e.target.value
                            handleBasicInfoChange('prerequisites', updatedPrereqs)
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedPrereqs = course.prerequisites.filter((_, i) => i !== index)
                            handleBasicInfoChange('prerequisites', updatedPrereqs)
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBasicInfoChange('prerequisites', [...course.prerequisites, ''])}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Prerequisite
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Learning Outcomes</Label>
                  <div className="space-y-2">
                    {course.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={outcome}
                          onChange={(e) => {
                            const updatedOutcomes = [...course.learningOutcomes]
                            updatedOutcomes[index] = e.target.value
                            handleBasicInfoChange('learningOutcomes', updatedOutcomes)
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedOutcomes = course.learningOutcomes.filter((_, i) => i !== index)
                            handleBasicInfoChange('learningOutcomes', updatedOutcomes)
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBasicInfoChange('learningOutcomes', [...course.learningOutcomes, ''])}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Learning Outcome
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Course Structure Tab */}
          <TabsContent value="structure" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Course Structure</CardTitle>
                    <CardDescription>
                      Organize your course into sections and lessons
                    </CardDescription>
                  </div>
                  <Button onClick={handleSectionAdd}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {course.structure.sections.map((section, sectionIndex) => (
                    <Card key={section.id} className="border-l-4 border-l-[#e27447]">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 space-y-2">
                            <Input
                              value={section.title}
                              onChange={(e) => handleSectionUpdate(sectionIndex, 'title', e.target.value)}
                              className="text-lg font-semibold"
                            />
                            <Textarea
                              value={section.description}
                              onChange={(e) => handleSectionUpdate(sectionIndex, 'description', e.target.value)}
                              placeholder="Section description"
                              rows={2}
                            />
                            <div className="flex items-center gap-4">
                              <Input
                                value={section.estimatedDuration}
                                onChange={(e) => handleSectionUpdate(sectionIndex, 'estimatedDuration', e.target.value)}
                                placeholder="Duration"
                                className="w-32"
                              />
                              <Badge variant="outline">
                                {section.lessons.length} lessons
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleLessonAdd(sectionIndex)}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add Lesson
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSectionDelete(sectionIndex)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="flex items-center gap-4 p-4 border rounded-lg">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-4">
                                  <Input
                                    value={lesson.title}
                                    onChange={(e) => handleLessonUpdate(sectionIndex, lessonIndex, 'title', e.target.value)}
                                    className="font-medium"
                                  />
                                  <Select
                                    value={lesson.type}
                                    onValueChange={(value) => handleLessonUpdate(sectionIndex, lessonIndex, 'type', value)}
                                  >
                                    <SelectTrigger className="w-32">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="video">Video</SelectItem>
                                      <SelectItem value="document">Document</SelectItem>
                                      <SelectItem value="quiz">Quiz</SelectItem>
                                      <SelectItem value="assignment">Assignment</SelectItem>
                                      <SelectItem value="practice">Practice</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Input
                                    value={lesson.duration}
                                    onChange={(e) => handleLessonUpdate(sectionIndex, lessonIndex, 'duration', e.target.value)}
                                    placeholder="Duration"
                                    className="w-24"
                                  />
                                </div>
                                <Textarea
                                  value={lesson.description}
                                  onChange={(e) => handleLessonUpdate(sectionIndex, lessonIndex, 'description', e.target.value)}
                                  placeholder="Lesson description"
                                  rows={2}
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={lesson.isPreview}
                                  onCheckedChange={(checked) => handleLessonUpdate(sectionIndex, lessonIndex, 'isPreview', checked)}
                                />
                                <span className="text-sm text-muted-foreground">Preview</span>
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Settings</CardTitle>
                <CardDescription>
                  Configure course access and features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="isFree">Free Course</Label>
                      <Switch
                        id="isFree"
                        checked={course.defaultSettings.isFree}
                        onCheckedChange={(checked) => 
                          handleBasicInfoChange('defaultSettings', {
                            ...course.defaultSettings,
                            isFree: checked
                          })
                        }
                      />
                    </div>
                    
                    {!course.defaultSettings.isFree && (
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={course.defaultSettings.price || 0}
                          onChange={(e) => 
                            handleBasicInfoChange('defaultSettings', {
                              ...course.defaultSettings,
                              price: parseFloat(e.target.value)
                            })
                          }
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allowPreview">Allow Preview</Label>
                      <Switch
                        id="allowPreview"
                        checked={course.defaultSettings.allowPreview}
                        onCheckedChange={(checked) => 
                          handleBasicInfoChange('defaultSettings', {
                            ...course.defaultSettings,
                            allowPreview: checked
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="enableDiscussion">Enable Discussion</Label>
                      <Switch
                        id="enableDiscussion"
                        checked={course.defaultSettings.enableDiscussion}
                        onCheckedChange={(checked) => 
                          handleBasicInfoChange('defaultSettings', {
                            ...course.defaultSettings,
                            enableDiscussion: checked
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="enableProgressTracking">Progress Tracking</Label>
                      <Switch
                        id="enableProgressTracking"
                        checked={course.defaultSettings.enableProgressTracking}
                        onCheckedChange={(checked) => 
                          handleBasicInfoChange('defaultSettings', {
                            ...course.defaultSettings,
                            enableProgressTracking: checked
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="enableCertificates">Certificates</Label>
                      <Switch
                        id="enableCertificates"
                        checked={course.defaultSettings.enableCertificates}
                        onCheckedChange={(checked) => 
                          handleBasicInfoChange('defaultSettings', {
                            ...course.defaultSettings,
                            enableCertificates: checked
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessments</CardTitle>
                <CardDescription>
                  Configure assessment types and weights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.assessmentTypes.map((assessment, index) => (
                    <div key={assessment.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1 space-y-2">
                        <Input
                          value={assessment.name}
                          onChange={(e) => {
                            const updatedAssessments = [...course.assessmentTypes]
                            updatedAssessments[index].name = e.target.value
                            handleBasicInfoChange('assessmentTypes', updatedAssessments)
                          }}
                          className="font-medium"
                        />
                        <Textarea
                          value={assessment.description}
                          onChange={(e) => {
                            const updatedAssessments = [...course.assessmentTypes]
                            updatedAssessments[index].description = e.target.value
                            handleBasicInfoChange('assessmentTypes', updatedAssessments)
                          }}
                          placeholder="Assessment description"
                          rows={2}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={assessment.weight}
                          onChange={(e) => {
                            const updatedAssessments = [...course.assessmentTypes]
                            updatedAssessments[index].weight = parseFloat(e.target.value)
                            handleBasicInfoChange('assessmentTypes', updatedAssessments)
                          }}
                          className="w-20"
                          placeholder="Weight"
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
