// Dynamic Course Template Renderer
// This component renders course pages based on template structure

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components-demo/ui/ui-components/card'
import { RenderedCourse, CourseTemplate, TemplateSection } from '@/types/course-templates'

interface DynamicCourseRendererProps {
  course: RenderedCourse
  template: CourseTemplate
}

export function DynamicCourseRenderer({ course, template }: DynamicCourseRendererProps) {
  // Render sections based on template structure
  const renderSection = (section: TemplateSection) => {
    switch (section.type) {
      case 'overview':
        return renderOverviewSection(section, course)
      case 'syllabus':
        return renderSyllabusSection(section, course)
      case 'facts':
        return renderFactsSection(section, course)
      case 'lessons':
        return renderLessonsSection(section, course)
      default:
        return renderGenericSection(section, course)
    }
  }

  return (
    <div className="space-y-6">
      {template.structure.sections.map((section) => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderSection(section)}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Render Overview Section
function renderOverviewSection(section: TemplateSection, course: RenderedCourse) {
  return (
    <div className="space-y-6">
      {/* Description */}
      {section.fields.includes('description') && (
        <p className="text-muted-foreground">
          {course.description || 'This course provides comprehensive learning materials and practical exercises.'}
        </p>
      )}

      {/* Features */}
      {section.fields.includes('features') && course.features && (
        <div>
          <h4 className="font-semibold mb-4 text-[#1e293b]">Course Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#e27447] rounded-full"></div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prerequisites */}
      {section.fields.includes('prerequisites') && course.prerequisites && (
        <div>
          <h4 className="font-semibold mb-4 text-[#1e293b]">Prerequisites</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {course.prerequisites.map((prereq, index) => (
              <li key={index}>• {prereq}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Learning Outcomes */}
      {section.fields.includes('learningOutcomes') && course.learningOutcomes && (
        <div>
          <h4 className="font-semibold mb-4 text-[#1e293b]">What you&apos;ll learn</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {course.learningOutcomes.map((outcome, index) => (
              <li key={index}>• {outcome}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Render Syllabus Section
function renderSyllabusSection(section: TemplateSection, course: RenderedCourse) {
  if (!section.fields.includes('syllabusContent') || !course.templateData?.syllabusContent) {
    return <p className="text-muted-foreground">Syllabus content not available.</p>
  }

  const syllabus = course.templateData.syllabusContent as Record<string, unknown>
  
  return (
    <div>
      <h4 className="font-semibold mb-4 text-[#1e293b]">Complete Syllabus</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {(syllabus.chapters as unknown[])?.map((chapter: unknown, index: number) => {
          const c = chapter as Record<string, unknown>
          return (
            <div key={index} className="space-y-3">
              {(c.units as unknown[])?.map((unit: unknown, unitIndex: number) => {
                const u = unit as Record<string, unknown>
                return (
                  <div key={unitIndex} className="border-l-4 border-[#e27447] pl-3">
                    <h5 className="font-medium text-[#1e293b]">{String(u.title)}</h5>
                    <p className="text-muted-foreground">{String(u.description)}</p>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Render Facts Section
function renderFactsSection(section: TemplateSection, course: RenderedCourse) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {section.fields.includes('duration') && (
        <div>
          <h4 className="font-semibold mb-2">Duration</h4>
          <p className="text-sm text-muted-foreground">{course.duration}</p>
        </div>
      )}
      
      {section.fields.includes('lessons') && (
        <div>
          <h4 className="font-semibold mb-2">Lessons</h4>
          <p className="text-sm text-muted-foreground">{course.lessons} lessons</p>
        </div>
      )}
      
      {section.fields.includes('curriculum') && (
        <div>
          <h4 className="font-semibold mb-2">Curriculum</h4>
          <p className="text-sm text-muted-foreground">{course.curriculum}</p>
        </div>
      )}
      
      {section.fields.includes('grade') && (
        <div>
          <h4 className="font-semibold mb-2">Grade</h4>
          <p className="text-sm text-muted-foreground">{course.grade}</p>
        </div>
      )}
    </div>
  )
}

// Render Lessons Section
function renderLessonsSection(section: TemplateSection, course: RenderedCourse) {
  return (
    <div>
      <h4 className="font-semibold mb-4 text-[#1e293b]">Course Content</h4>
      <p className="text-sm text-muted-foreground">
        {course.lessons} lessons • {course.isFree ? 'Free' : `$${course.price || 0}`}
      </p>
      {/* This would be populated with actual lessons */}
    </div>
  )
}

// Render Generic Section
function renderGenericSection(section: TemplateSection, course: RenderedCourse) {
  return (
    <div>
      <p className="text-muted-foreground">
        Content for {section.title} section would be rendered here based on template fields.
      </p>
      {section.fields.map((field, index) => (
        <div key={index} className="mb-2">
          <span className="font-medium">{field}:</span> {String(course.templateData?.[field] || 'Not available')}
        </div>
      ))}
    </div>
  )
}
