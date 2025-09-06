// Centralized course configuration system
// This replaces the static folder structure with dynamic course management

export interface CourseConfig {
  id: string
  slug: string
  title: string
  description: string
  curriculum: 'CBSE' | 'ICSE' | 'IBDP' | 'IGCSE'
  subject: string
  grade?: string
  level?: string
  isFree: boolean
  price?: number
  status: 'published' | 'draft' | 'archived'
  instructor: string
  duration: string
  lessons: number
  thumbnail: string
  features: string[]
  prerequisites: string[]
  learningOutcomes: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface LessonConfig {
  id: string
  slug: string
  title: string
  description: string
  duration: string
  type: 'video' | 'document' | 'quiz' | 'assignment' | 'practice'
  isPreview: boolean
  order: number
  resources: ResourceConfig[]
}

export interface ResourceConfig {
  id: string
  type: 'video' | 'pdf' | 'image' | 'link' | 'audio'
  url: string
  title: string
  description?: string
  duration?: number
}

// Centralized course database
export const COURSE_DATABASE: Record<string, CourseConfig> = {
  'cbse-mathematics-class-10': {
    id: 'cbse-mathematics-class-10',
    slug: 'cbse-mathematics-class-10',
    title: 'CBSE Mathematics Class 10',
    description: 'Comprehensive CBSE Class 10 Mathematics course covering all chapters with detailed explanations, practice problems, and board exam preparation.',
    curriculum: 'CBSE',
    subject: 'Mathematics',
    grade: 'Class 10',
    isFree: true,
    status: 'published',
    instructor: 'Shri Arya Education',
    duration: '120 hours',
    lessons: 15,
    thumbnail: '/images/courses/cbse-math-10.jpg',
    features: [
      'Complete NCERT syllabus coverage',
      'Board exam focused preparation',
      'Step-by-step problem solving',
      'Practice tests and mock exams',
      'Doubt clearing sessions'
    ],
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
    tags: ['CBSE', 'Mathematics', 'Class 10', 'Board Exam', 'NCERT'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  'cbse-mathematics-class-9': {
    id: 'cbse-mathematics-class-9',
    slug: 'cbse-mathematics-class-9',
    title: 'CBSE Mathematics Class 9',
    description: 'Foundation course for CBSE Class 9 Mathematics covering fundamental concepts and building strong mathematical base.',
    curriculum: 'CBSE',
    subject: 'Mathematics',
    grade: 'Class 9',
    isFree: true,
    status: 'published',
    instructor: 'Shri Arya Education',
    duration: '100 hours',
    lessons: 12,
    thumbnail: '/images/courses/cbse-math-9.jpg',
    features: [
      'NCERT syllabus coverage',
      'Concept building approach',
      'Interactive learning methods',
      'Regular assessments'
    ],
    prerequisites: [
      'Basic arithmetic knowledge',
      'Understanding of elementary geometry'
    ],
    learningOutcomes: [
      'Build strong mathematical foundation',
      'Understand fundamental concepts clearly',
      'Prepare for Class 10 Mathematics',
      'Develop problem-solving skills'
    ],
    tags: ['CBSE', 'Mathematics', 'Class 9', 'Foundation', 'NCERT'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-10'
  },
  'ibdp-mathematics-analysis-approaches-hl': {
    id: 'ibdp-mathematics-analysis-approaches-hl',
    slug: 'ibdp-mathematics-analysis-approaches-hl',
    title: 'IBDP Mathematics Analysis & Approaches HL',
    description: 'Advanced Higher Level Mathematics course for IBDP students focusing on analytical approaches and mathematical reasoning.',
    curriculum: 'IBDP',
    subject: 'Mathematics',
    level: 'Analysis & Approaches HL',
    isFree: false,
    price: 299,
    status: 'published',
    instructor: 'Shri Arya Education',
    duration: '200 hours',
    lessons: 20,
    thumbnail: '/images/courses/ibdp-math-hl.jpg',
    features: [
      'IBDP curriculum alignment',
      'Higher Level content',
      'Mathematical analysis focus',
      'University preparation',
      'International standards'
    ],
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
    tags: ['IBDP', 'Mathematics', 'Higher Level', 'Analysis', 'International'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-20'
  }
}

// Lesson configurations for each course
export const LESSON_DATABASE: Record<string, LessonConfig[]> = {
  'cbse-mathematics-class-10': [
    {
      id: 'real-numbers-intro',
      slug: 'real-numbers-intro',
      title: 'Introduction to Real Numbers',
      description: 'Understanding the concept of real numbers, rational and irrational numbers, and their properties.',
      duration: '45 minutes',
      type: 'video',
      isPreview: true,
      order: 1,
      resources: [
        {
          id: 'real-numbers-video',
          type: 'video',
          url: '/videos/real-numbers-intro.mp4',
          title: 'Real Numbers Introduction Video',
          duration: 1800
        },
        {
          id: 'real-numbers-pdf',
          type: 'pdf',
          url: '/pdfs/real-numbers-notes.pdf',
          title: 'Real Numbers Study Notes'
        }
      ]
    },
    {
      id: 'euclid-division-lemma',
      slug: 'euclid-division-lemma',
      title: 'Euclid\'s Division Lemma',
      description: 'Learn about Euclid\'s Division Lemma and its applications in number theory.',
      duration: '50 minutes',
      type: 'video',
      isPreview: false,
      order: 2,
      resources: [
        {
          id: 'euclid-video',
          type: 'video',
          url: '/videos/euclid-division-lemma.mp4',
          title: 'Euclid\'s Division Lemma Video',
          duration: 2000
        }
      ]
    },
    {
      id: 'real-numbers-practice',
      slug: 'real-numbers-practice',
      title: 'Real Numbers Practice Problems',
      description: 'Practice problems and exercises on real numbers concepts.',
      duration: '60 minutes',
      type: 'practice',
      isPreview: false,
      order: 3,
      resources: [
        {
          id: 'practice-worksheet',
          type: 'pdf',
          url: '/pdfs/real-numbers-practice.pdf',
          title: 'Practice Worksheet'
        }
      ]
    }
  ],
  'cbse-mathematics-class-9': [
    {
      id: 'number-systems',
      slug: 'number-systems',
      title: 'Number Systems',
      description: 'Introduction to different types of numbers and their properties.',
      duration: '40 minutes',
      type: 'video',
      isPreview: true,
      order: 1,
      resources: [
        {
          id: 'number-systems-video',
          type: 'video',
          url: '/videos/number-systems.mp4',
          title: 'Number Systems Video',
          duration: 1600
        }
      ]
    }
  ],
  'ibdp-mathematics-analysis-approaches-hl': [
    {
      id: 'functions-and-graphs',
      slug: 'functions-and-graphs',
      title: 'Functions and Graphs',
      description: 'Advanced study of functions, their properties, and graphical representations.',
      duration: '90 minutes',
      type: 'video',
      isPreview: true,
      order: 1,
      resources: [
        {
          id: 'functions-video',
          type: 'video',
          url: '/videos/functions-graphs.mp4',
          title: 'Functions and Graphs Video',
          duration: 3600
        }
      ]
    }
  ]
}

// Helper functions
export function getAllCourses(): CourseConfig[] {
  return Object.values(COURSE_DATABASE).filter(course => course.status === 'published')
}

export function getCourseBySlug(slug: string): CourseConfig | null {
  return COURSE_DATABASE[slug] || null
}

export function getCoursesByCurriculum(curriculum: string): CourseConfig[] {
  return Object.values(COURSE_DATABASE).filter(
    course => course.curriculum.toLowerCase() === curriculum.toLowerCase() && course.status === 'published'
  )
}

export function getLessonsByCourseSlug(courseSlug: string): LessonConfig[] {
  return LESSON_DATABASE[courseSlug] || []
}

export function getLessonBySlug(courseSlug: string, lessonSlug: string): LessonConfig | null {
  const lessons = LESSON_DATABASE[courseSlug] || []
  return lessons.find(lesson => lesson.slug === lessonSlug) || null
}

export function getFreeCourses(): CourseConfig[] {
  return Object.values(COURSE_DATABASE).filter(
    course => course.isFree && course.status === 'published'
  )
}

export function searchCourses(query: string): CourseConfig[] {
  const searchTerm = query.toLowerCase()
  return Object.values(COURSE_DATABASE).filter(
    course => 
      course.status === 'published' &&
      (course.title.toLowerCase().includes(searchTerm) ||
       course.description.toLowerCase().includes(searchTerm) ||
       course.subject.toLowerCase().includes(searchTerm) ||
       course.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  )
}
