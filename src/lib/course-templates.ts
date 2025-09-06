// Course Template System - Standardized boilerplates for different curricula
// This ensures consistency and scalability across all courses

export interface CourseTemplate {
  id: string
  name: string
  curriculum: 'CBSE' | 'ICSE' | 'IBDP' | 'IGCSE'
  subject: string
  grade?: string
  level?: string
  description: string
  estimatedDuration: string
  lessonCount: number
  structure: CourseStructure
  defaultSettings: CourseSettings
  prerequisites: string[]
  learningOutcomes: string[]
  assessmentTypes: AssessmentType[]
  resourceTypes: ResourceType[]
}

export interface CourseStructure {
  sections: CourseSection[]
  assessments: AssessmentTemplate[]
  resources: ResourceTemplate[]
}

export interface CourseSection {
  id: string
  title: string
  description: string
  order: number
  lessons: LessonTemplate[]
  estimatedDuration: string
}

export interface LessonTemplate {
  id: string
  title: string
  description: string
  type: 'video' | 'document' | 'quiz' | 'assignment' | 'practice'
  duration: string
  order: number
  isPreview: boolean
  resources: ResourceTemplate[]
  objectives: string[]
}

export interface AssessmentTemplate {
  id: string
  title: string
  type: 'quiz' | 'assignment' | 'exam' | 'project'
  description: string
  weight: number
  duration: string
  questions: QuestionTemplate[]
}

export interface QuestionTemplate {
  id: string
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay'
  question: string
  options?: string[]
  correctAnswer?: string
  points: number
}

export interface ResourceTemplate {
  id: string
  title: string
  type: 'video' | 'pdf' | 'image' | 'link' | 'audio' | 'interactive'
  description: string
  isRequired: boolean
  estimatedSize?: string
}

export interface CourseSettings {
  isFree: boolean
  price?: number
  allowPreview: boolean
  enableDiscussion: boolean
  enableProgressTracking: boolean
  enableCertificates: boolean
  maxStudents?: number
  enrollmentDeadline?: string
}

export interface AssessmentType {
  id: string
  name: string
  description: string
  weight: number
}

export interface ResourceType {
  id: string
  name: string
  description: string
  maxSize: string
  allowedFormats: string[]
}

// Predefined Course Templates
export const COURSE_TEMPLATES: Record<string, CourseTemplate> = {
  'cbse-mathematics-class-10': {
    id: 'cbse-mathematics-class-10',
    name: 'CBSE Mathematics Class 10',
    curriculum: 'CBSE',
    subject: 'Mathematics',
    grade: 'Class 10',
    description: 'Comprehensive CBSE Class 10 Mathematics course covering all chapters with detailed explanations, practice problems, and board exam preparation.',
    estimatedDuration: '120 hours',
    lessonCount: 15,
    structure: {
      sections: [
        {
          id: 'real-numbers',
          title: 'Chapter 1: Real Numbers',
          description: 'Understanding real numbers, rational and irrational numbers, and their properties.',
          order: 1,
          estimatedDuration: '8 hours',
          lessons: [
            {
              id: 'real-numbers-intro',
              title: 'Introduction to Real Numbers',
              description: 'Understanding the concept of real numbers, rational and irrational numbers.',
              type: 'video',
              duration: '45 minutes',
              order: 1,
              isPreview: true,
              resources: [
                {
                  id: 'real-numbers-video',
                  title: 'Real Numbers Introduction Video',
                  type: 'video',
                  description: 'Comprehensive video explanation of real numbers',
                  isRequired: true,
                  estimatedSize: '500MB'
                },
                {
                  id: 'real-numbers-notes',
                  title: 'Real Numbers Study Notes',
                  type: 'pdf',
                  description: 'Detailed study notes and formulas',
                  isRequired: true,
                  estimatedSize: '2MB'
                }
              ],
              objectives: [
                'Understand the concept of real numbers',
                'Distinguish between rational and irrational numbers',
                'Apply properties of real numbers in problem solving'
              ]
            },
            {
              id: 'euclid-division-lemma',
              title: 'Euclid\'s Division Lemma',
              description: 'Learn about Euclid\'s Division Lemma and its applications.',
              type: 'video',
              duration: '50 minutes',
              order: 2,
              isPreview: false,
              resources: [
                {
                  id: 'euclid-video',
                  title: 'Euclid\'s Division Lemma Video',
                  type: 'video',
                  description: 'Step-by-step explanation of Euclid\'s Division Lemma',
                  isRequired: true,
                  estimatedSize: '600MB'
                }
              ],
              objectives: [
                'Understand Euclid\'s Division Lemma',
                'Apply the lemma to solve problems',
                'Connect with HCF and LCM concepts'
              ]
            },
            {
              id: 'real-numbers-practice',
              title: 'Real Numbers Practice Problems',
              description: 'Practice problems and exercises on real numbers concepts.',
              type: 'practice',
              duration: '60 minutes',
              order: 3,
              isPreview: false,
              resources: [
                {
                  id: 'practice-worksheet',
                  title: 'Practice Worksheet',
                  type: 'pdf',
                  description: 'Comprehensive practice problems',
                  isRequired: true,
                  estimatedSize: '1MB'
                }
              ],
              objectives: [
                'Solve various types of real number problems',
                'Apply learned concepts in different scenarios',
                'Build confidence in problem solving'
              ]
            }
          ]
        },
        {
          id: 'polynomials',
          title: 'Chapter 2: Polynomials',
          description: 'Understanding polynomials, their types, and operations.',
          order: 2,
          estimatedDuration: '10 hours',
          lessons: [
            {
              id: 'polynomials-intro',
              title: 'Introduction to Polynomials',
              description: 'Basic concepts of polynomials and their classification.',
              type: 'video',
              duration: '40 minutes',
              order: 1,
              isPreview: true,
              resources: [],
              objectives: [
                'Understand polynomial terminology',
                'Classify different types of polynomials',
                'Identify degree and coefficients'
              ]
            }
          ]
        }
      ],
      assessments: [
        {
          id: 'chapter-1-quiz',
          title: 'Real Numbers Quiz',
          type: 'quiz',
          description: 'Assessment on real numbers concepts',
          weight: 10,
          duration: '30 minutes',
          questions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              question: 'Which of the following is an irrational number?',
              options: ['√2', '3/4', '0.5', '1'],
              correctAnswer: '√2',
              points: 2
            },
            {
              id: 'q2',
              type: 'short-answer',
              question: 'Explain Euclid\'s Division Lemma.',
              points: 5
            }
          ]
        }
      ],
      resources: [
        {
          id: 'formula-sheet',
          title: 'Mathematics Formula Sheet',
          type: 'pdf',
          description: 'Complete formula reference for Class 10 Mathematics',
          isRequired: true,
          estimatedSize: '3MB'
        }
      ]
    },
    defaultSettings: {
      isFree: true,
      allowPreview: true,
      enableDiscussion: true,
      enableProgressTracking: true,
      enableCertificates: true
    },
    prerequisites: [
      'Basic understanding of Class 9 Mathematics',
      'Knowledge of fundamental arithmetic operations'
    ],
    learningOutcomes: [
      'Master all CBSE Class 10 Mathematics concepts',
      'Solve complex problems with confidence',
      'Excel in board examinations',
      'Develop strong mathematical reasoning'
    ],
    assessmentTypes: [
      { id: 'quizzes', name: 'Quizzes', description: 'Short assessments after each chapter', weight: 20 },
      { id: 'assignments', name: 'Assignments', description: 'Problem-solving exercises', weight: 30 },
      { id: 'midterm', name: 'Midterm Exam', description: 'Comprehensive mid-course assessment', weight: 25 },
      { id: 'final', name: 'Final Exam', description: 'Complete course assessment', weight: 25 }
    ],
    resourceTypes: [
      { id: 'video', name: 'Video Lessons', description: 'Recorded video content', maxSize: '1GB', allowedFormats: ['mp4', 'mov', 'avi'] },
      { id: 'pdf', name: 'Documents', description: 'Study materials and notes', maxSize: '10MB', allowedFormats: ['pdf', 'doc', 'docx'] },
      { id: 'interactive', name: 'Interactive Content', description: 'Simulations and exercises', maxSize: '50MB', allowedFormats: ['html', 'js', 'json'] }
    ]
  },
  'ibdp-mathematics-hl': {
    id: 'ibdp-mathematics-hl',
    name: 'IBDP Mathematics Analysis & Approaches HL',
    curriculum: 'IBDP',
    subject: 'Mathematics',
    level: 'Analysis & Approaches HL',
    description: 'Advanced Higher Level Mathematics course for IBDP students focusing on analytical approaches and mathematical reasoning.',
    estimatedDuration: '200 hours',
    lessonCount: 20,
    structure: {
      sections: [
        {
          id: 'functions',
          title: 'Topic 1: Functions',
          description: 'Advanced study of functions, their properties, and graphical representations.',
          order: 1,
          estimatedDuration: '15 hours',
          lessons: [
            {
              id: 'functions-intro',
              title: 'Introduction to Functions',
              description: 'Basic concepts of functions and their properties.',
              type: 'video',
              duration: '60 minutes',
              order: 1,
              isPreview: true,
              resources: [],
              objectives: [
                'Understand function notation and terminology',
                'Identify domain and range of functions',
                'Analyze function behavior'
              ]
            }
          ]
        }
      ],
      assessments: [],
      resources: []
    },
    defaultSettings: {
      isFree: false,
      price: 299,
      allowPreview: true,
      enableDiscussion: true,
      enableProgressTracking: true,
      enableCertificates: true
    },
    prerequisites: [
      'Strong foundation in mathematics',
      'Previous IBDP or equivalent experience',
      'Advanced problem-solving skills'
    ],
    learningOutcomes: [
      'Master IBDP Mathematics HL concepts',
      'Develop analytical thinking',
      'Prepare for university mathematics',
      'Excel in IBDP examinations'
    ],
    assessmentTypes: [
      { id: 'ia', name: 'Internal Assessment', description: 'Mathematical exploration project', weight: 20 },
      { id: 'quizzes', name: 'Topic Quizzes', description: 'Regular topic assessments', weight: 30 },
      { id: 'paper1', name: 'Paper 1', description: 'Non-calculator examination', weight: 25 },
      { id: 'paper2', name: 'Paper 2', description: 'Calculator examination', weight: 25 }
    ],
    resourceTypes: [
      { id: 'video', name: 'Video Lectures', description: 'Advanced mathematical concepts', maxSize: '2GB', allowedFormats: ['mp4', 'mov'] },
      { id: 'interactive', name: 'Mathematical Software', description: 'Graphing and calculation tools', maxSize: '100MB', allowedFormats: ['html', 'js', 'geogebra'] },
      { id: 'pdf', name: 'Research Papers', description: 'Academic materials and references', maxSize: '20MB', allowedFormats: ['pdf'] }
    ]
  }
}

// Helper functions for course creation
export function getCourseTemplate(templateId: string): CourseTemplate | null {
  return COURSE_TEMPLATES[templateId] || null
}

export function getAllCourseTemplates(): CourseTemplate[] {
  return Object.values(COURSE_TEMPLATES)
}

export function getTemplatesByCurriculum(curriculum: string): CourseTemplate[] {
  return Object.values(COURSE_TEMPLATES).filter(
    template => template.curriculum.toLowerCase() === curriculum.toLowerCase()
  )
}

export function createCourseFromTemplate(templateId: string, customizations?: Partial<CourseTemplate>): CourseTemplate {
  const template = getCourseTemplate(templateId)
  if (!template) {
    throw new Error(`Template ${templateId} not found`)
  }

  // Deep clone the template and apply customizations
  const course = JSON.parse(JSON.stringify(template))
  
  if (customizations) {
    Object.assign(course, customizations)
  }

  return course
}

export function generateCourseSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function validateCourseStructure(course: CourseTemplate): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!course.name || course.name.trim().length === 0) {
    errors.push('Course name is required')
  }

  if (!course.description || course.description.trim().length === 0) {
    errors.push('Course description is required')
  }

  if (!course.structure.sections || course.structure.sections.length === 0) {
    errors.push('Course must have at least one section')
  }

  course.structure.sections.forEach((section, sectionIndex) => {
    if (!section.title || section.title.trim().length === 0) {
      errors.push(`Section ${sectionIndex + 1} must have a title`)
    }

    if (!section.lessons || section.lessons.length === 0) {
      errors.push(`Section "${section.title}" must have at least one lesson`)
    }

    section.lessons.forEach((lesson, lessonIndex) => {
      if (!lesson.title || lesson.title.trim().length === 0) {
        errors.push(`Lesson ${lessonIndex + 1} in section "${section.title}" must have a title`)
      }

      if (!lesson.type) {
        errors.push(`Lesson "${lesson.title}" must have a type`)
      }
    })
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}
