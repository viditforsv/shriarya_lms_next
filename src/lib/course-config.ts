// Enhanced course configuration system with template integration
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
  // New fields for template integration
  templateId?: string
  structure?: Record<string, unknown>
  settings?: Record<string, unknown>
  assessmentTypes?: Record<string, unknown>[]
  resourceTypes?: Record<string, unknown>[]
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
  isYouTube?: boolean
  youtubeId?: string
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
    lessons: 45,
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
    // Chapter 1: Real Numbers
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
          url: 'https://www.youtube.com/watch?v=h2R3Boke8FY',
          title: 'Real Numbers Introduction Video',
          duration: 1800,
          isYouTube: true,
          youtubeId: 'h2R3Boke8FY'
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
          url: 'https://shrividhyaclasses.b-cdn.net/AI%20Enabled%20QPG.mp4',
          title: 'Euclid\'s Division Lemma Video',
          duration: 2000
        }
      ]
    },
    {
      id: 'fundamental-theorem-arithmetic',
      slug: 'fundamental-theorem-arithmetic',
      title: 'Fundamental Theorem of Arithmetic',
      description: 'Understanding prime factorization and its applications.',
      duration: '55 minutes',
      type: 'video',
      isPreview: false,
      order: 3,
      resources: [
        {
          id: 'fta-video',
          type: 'video',
          url: '/videos/fundamental-theorem-arithmetic.mp4',
          title: 'Fundamental Theorem of Arithmetic Video',
          duration: 2200
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
      order: 4,
      resources: [
        {
          id: 'practice-worksheet',
          type: 'pdf',
          url: '/pdfs/real-numbers-practice.pdf',
          title: 'Practice Worksheet'
        }
      ]
    },

    // Chapter 2: Polynomials
    {
      id: 'polynomials-intro',
      slug: 'polynomials-intro',
      title: 'Introduction to Polynomials',
      description: 'Understanding polynomials, degrees, and types of polynomials.',
      duration: '40 minutes',
      type: 'video',
      isPreview: true,
      order: 5,
      resources: [
        {
          id: 'polynomials-video',
          type: 'video',
          url: '/videos/polynomials-intro.mp4',
          title: 'Polynomials Introduction Video',
          duration: 1600
        }
      ]
    },
    {
      id: 'polynomial-zeroes',
      slug: 'polynomial-zeroes',
      title: 'Zeroes of Polynomials',
      description: 'Finding zeroes of polynomials and their relationship with coefficients.',
      duration: '50 minutes',
      type: 'video',
      isPreview: false,
      order: 6,
      resources: [
        {
          id: 'zeroes-video',
          type: 'video',
          url: '/videos/polynomial-zeroes.mp4',
          title: 'Zeroes of Polynomials Video',
          duration: 2000
        }
      ]
    },
    {
      id: 'polynomials-practice',
      slug: 'polynomials-practice',
      title: 'Polynomials Practice Problems',
      description: 'Practice problems on polynomials and their properties.',
      duration: '55 minutes',
      type: 'practice',
      isPreview: false,
      order: 7,
      resources: [
        {
          id: 'polynomials-worksheet',
          type: 'pdf',
          url: '/pdfs/polynomials-practice.pdf',
          title: 'Polynomials Practice Worksheet'
        }
      ]
    },

    // Chapter 3: Pair of Linear Equations in Two Variables
    {
      id: 'linear-equations-intro',
      slug: 'linear-equations-intro',
      title: 'Introduction to Linear Equations',
      description: 'Understanding linear equations in two variables and their graphical representation.',
      duration: '45 minutes',
      type: 'video',
      isPreview: true,
      order: 8,
      resources: [
        {
          id: 'linear-video',
          type: 'video',
          url: '/videos/linear-equations-intro.mp4',
          title: 'Linear Equations Introduction Video',
          duration: 1800
        }
      ]
    },
    {
      id: 'graphical-method',
      slug: 'graphical-method',
      title: 'Graphical Method of Solution',
      description: 'Solving linear equations using graphical method.',
      duration: '50 minutes',
      type: 'video',
      isPreview: false,
      order: 9,
      resources: [
        {
          id: 'graphical-video',
          type: 'video',
          url: '/videos/graphical-method.mp4',
          title: 'Graphical Method Video',
          duration: 2000
        }
      ]
    },
    {
      id: 'algebraic-methods',
      slug: 'algebraic-methods',
      title: 'Algebraic Methods of Solution',
      description: 'Substitution and elimination methods for solving linear equations.',
      duration: '55 minutes',
      type: 'video',
      isPreview: false,
      order: 10,
      resources: [
        {
          id: 'algebraic-video',
          type: 'video',
          url: '/videos/algebraic-methods.mp4',
          title: 'Algebraic Methods Video',
          duration: 2200
        }
      ]
    },
    {
      id: 'linear-equations-practice',
      slug: 'linear-equations-practice',
      title: 'Linear Equations Practice Problems',
      description: 'Practice problems on solving linear equations.',
      duration: '60 minutes',
      type: 'practice',
      isPreview: false,
      order: 11,
      resources: [
        {
          id: 'linear-worksheet',
          type: 'pdf',
          url: '/pdfs/linear-equations-practice.pdf',
          title: 'Linear Equations Practice Worksheet'
        }
      ]
    },

    // Chapter 4: Quadratic Equations
    {
      id: 'quadratic-intro',
      slug: 'quadratic-intro',
      title: 'Introduction to Quadratic Equations',
      description: 'Understanding quadratic equations and their standard form.',
      duration: '40 minutes',
      type: 'video',
      isPreview: true,
      order: 12,
      resources: [
        {
          id: 'quadratic-video',
          type: 'video',
          url: '/videos/quadratic-intro.mp4',
          title: 'Quadratic Equations Introduction Video',
          duration: 1600
        }
      ]
    },
    {
      id: 'quadratic-formula',
      slug: 'quadratic-formula',
      title: 'Quadratic Formula',
      description: 'Derivation and application of the quadratic formula.',
      duration: '50 minutes',
      type: 'video',
      isPreview: false,
      order: 13,
      resources: [
        {
          id: 'formula-video',
          type: 'video',
          url: '/videos/quadratic-formula.mp4',
          title: 'Quadratic Formula Video',
          duration: 2000
        }
      ]
    },
    {
      id: 'quadratic-practice',
      slug: 'quadratic-practice',
      title: 'Quadratic Equations Practice Problems',
      description: 'Practice problems on solving quadratic equations.',
      duration: '55 minutes',
      type: 'practice',
      isPreview: false,
      order: 14,
      resources: [
        {
          id: 'quadratic-worksheet',
          type: 'pdf',
          url: '/pdfs/quadratic-practice.pdf',
          title: 'Quadratic Equations Practice Worksheet'
        }
      ]
    },

    // Chapter 5: Arithmetic Progressions
    {
      id: 'ap-intro',
      slug: 'ap-intro',
      title: 'Introduction to Arithmetic Progressions',
      description: 'Understanding arithmetic progressions and their properties.',
      duration: '45 minutes',
      type: 'video',
      isPreview: true,
      order: 15,
      resources: [
        {
          id: 'ap-video',
          type: 'video',
          url: '/videos/ap-intro.mp4',
          title: 'Arithmetic Progressions Introduction Video',
          duration: 1800
        }
      ]
    },
    {
      id: 'ap-formulas',
      slug: 'ap-formulas',
      title: 'AP Formulas and Sum',
      description: 'Learning formulas for nth term and sum of AP.',
      duration: '50 minutes',
      type: 'video',
      isPreview: false,
      order: 16,
      resources: [
        {
          id: 'ap-formulas-video',
          type: 'video',
          url: '/videos/ap-formulas.mp4',
          title: 'AP Formulas Video',
          duration: 2000
        }
      ]
    },
    {
      id: 'ap-practice',
      slug: 'ap-practice',
      title: 'Arithmetic Progressions Practice Problems',
      description: 'Practice problems on arithmetic progressions.',
      duration: '55 minutes',
      type: 'practice',
      isPreview: false,
      order: 17,
      resources: [
        {
          id: 'ap-worksheet',
          type: 'pdf',
          url: '/pdfs/ap-practice.pdf',
          title: 'AP Practice Worksheet'
        }
      ]
    },

    // Chapter 6: Triangles
    {
      id: 'triangles-intro',
      slug: 'triangles-intro',
      title: 'Introduction to Triangles',
      description: 'Understanding triangles and their properties.',
      duration: '40 minutes',
      type: 'video',
      isPreview: true,
      order: 18,
      resources: [
        {
          id: 'triangles-video',
          type: 'video',
          url: '/videos/triangles-intro.mp4',
          title: 'Triangles Introduction Video',
          duration: 1600
        }
      ]
    },
    {
      id: 'similarity-triangles',
      slug: 'similarity-triangles',
      title: 'Similarity of Triangles',
      description: 'Understanding similar triangles and their properties.',
      duration: '50 minutes',
      type: 'video',
      isPreview: false,
      order: 19,
      resources: [
        {
          id: 'similarity-video',
          type: 'video',
          url: '/videos/similarity-triangles.mp4',
          title: 'Similarity of Triangles Video',
          duration: 2000
        }
      ]
    },
    {
      id: 'triangles-practice',
      slug: 'triangles-practice',
      title: 'Triangles Practice Problems',
      description: 'Practice problems on triangles and similarity.',
      duration: '55 minutes',
      type: 'practice',
      isPreview: false,
      order: 20,
      resources: [
        {
          id: 'triangles-worksheet',
          type: 'pdf',
          url: '/pdfs/triangles-practice.pdf',
          title: 'Triangles Practice Worksheet'
        }
      ]
    },

    // Chapter 7: Coordinate Geometry
    {
      id: 'coordinate-intro',
      slug: 'coordinate-intro',
      title: 'Introduction to Coordinate Geometry',
      description: 'Understanding coordinate system and plotting points.',
      duration: '40 minutes',
      type: 'video',
      isPreview: true,
      order: 21,
      resources: [
        {
          id: 'coordinate-video',
          type: 'video',
          url: '/videos/coordinate-intro.mp4',
          title: 'Coordinate Geometry Introduction Video',
          duration: 1600
        }
      ]
    },
    {
      id: 'distance-formula',
      slug: 'distance-formula',
      title: 'Distance Formula',
      description: 'Learning distance formula and its applications.',
      duration: '45 minutes',
      type: 'video',
      isPreview: false,
      order: 22,
      resources: [
        {
          id: 'distance-video',
          type: 'video',
          url: '/videos/distance-formula.mp4',
          title: 'Distance Formula Video',
          duration: 1800
        }
      ]
    },
    {
      id: 'coordinate-practice',
      slug: 'coordinate-practice',
      title: 'Coordinate Geometry Practice Problems',
      description: 'Practice problems on coordinate geometry.',
      duration: '50 minutes',
      type: 'practice',
      isPreview: false,
      order: 23,
      resources: [
        {
          id: 'coordinate-worksheet',
          type: 'pdf',
          url: '/pdfs/coordinate-practice.pdf',
          title: 'Coordinate Geometry Practice Worksheet'
        }
      ]
    },

    // Chapter 8: Introduction to Trigonometry
    {
      id: 'trigonometry-intro',
      slug: 'trigonometry-intro',
      title: 'Introduction to Trigonometry',
      description: 'Understanding trigonometric ratios and their applications.',
      duration: '45 minutes',
      type: 'video',
      isPreview: true,
      order: 24,
      resources: [
        {
          id: 'trig-video',
          type: 'video',
          url: '/videos/trigonometry-intro.mp4',
          title: 'Trigonometry Introduction Video',
          duration: 1800
        }
      ]
    },
    {
      id: 'trigonometric-ratios',
      slug: 'trigonometric-ratios',
      title: 'Trigonometric Ratios',
      description: 'Learning sine, cosine, tangent and their relationships.',
      duration: '50 minutes',
      type: 'video',
      isPreview: false,
      order: 25,
      resources: [
        {
          id: 'ratios-video',
          type: 'video',
          url: '/videos/trigonometric-ratios.mp4',
          title: 'Trigonometric Ratios Video',
          duration: 2000
        }
      ]
    },
    {
      id: 'trigonometry-practice',
      slug: 'trigonometry-practice',
      title: 'Trigonometry Practice Problems',
      description: 'Practice problems on trigonometric ratios.',
      duration: '55 minutes',
      type: 'practice',
      isPreview: false,
      order: 26,
      resources: [
        {
          id: 'trig-worksheet',
          type: 'pdf',
          url: '/pdfs/trigonometry-practice.pdf',
          title: 'Trigonometry Practice Worksheet'
        }
      ]
    },

    // Chapter 9: Some Applications of Trigonometry
    {
      id: 'trig-applications',
      slug: 'trig-applications',
      title: 'Applications of Trigonometry',
      description: 'Real-world applications of trigonometry in heights and distances.',
      duration: '50 minutes',
      type: 'video',
      isPreview: false,
      order: 27,
      resources: [
        {
          id: 'applications-video',
          type: 'video',
          url: '/videos/trig-applications.mp4',
          title: 'Trigonometry Applications Video',
          duration: 2000
        }
      ]
    },
    {
      id: 'trig-applications-practice',
      slug: 'trig-applications-practice',
      title: 'Trigonometry Applications Practice',
      description: 'Practice problems on trigonometry applications.',
      duration: '55 minutes',
      type: 'practice',
      isPreview: false,
      order: 28,
      resources: [
        {
          id: 'applications-worksheet',
          type: 'pdf',
          url: '/pdfs/trig-applications-practice.pdf',
          title: 'Trigonometry Applications Practice Worksheet'
        }
      ]
    },

    // Chapter 10: Circles
    {
      id: 'circles-intro',
      slug: 'circles-intro',
      title: 'Introduction to Circles',
      description: 'Understanding circles and their properties.',
      duration: '40 minutes',
      type: 'video',
      isPreview: true,
      order: 29,
      resources: [
        {
          id: 'circles-video',
          type: 'video',
          url: '/videos/circles-intro.mp4',
          title: 'Circles Introduction Video',
          duration: 1600
        }
      ]
    },
    {
      id: 'circle-theorems',
      slug: 'circle-theorems',
      title: 'Circle Theorems',
      description: 'Learning important theorems related to circles.',
      duration: '50 minutes',
      type: 'video',
      isPreview: false,
      order: 30,
      resources: [
        {
          id: 'theorems-video',
          type: 'video',
          url: '/videos/circle-theorems.mp4',
          title: 'Circle Theorems Video',
          duration: 2000
        }
      ]
    },
    {
      id: 'circles-practice',
      slug: 'circles-practice',
      title: 'Circles Practice Problems',
      description: 'Practice problems on circles and their properties.',
      duration: '55 minutes',
      type: 'practice',
      isPreview: false,
      order: 31,
      resources: [
        {
          id: 'circles-worksheet',
          type: 'pdf',
          url: '/pdfs/circles-practice.pdf',
          title: 'Circles Practice Worksheet'
        }
      ]
    },

    // Chapter 11: Constructions
    {
      id: 'constructions-intro',
      slug: 'constructions-intro',
      title: 'Introduction to Constructions',
      description: 'Learning geometric constructions using compass and ruler.',
      duration: '45 minutes',
      type: 'video',
      isPreview: false,
      order: 32,
      resources: [
        {
          id: 'constructions-video',
          type: 'video',
          url: '/videos/constructions-intro.mp4',
          title: 'Constructions Introduction Video',
          duration: 1800
        }
      ]
    },
    {
      id: 'constructions-practice',
      slug: 'constructions-practice',
      title: 'Constructions Practice',
      description: 'Practice geometric constructions.',
      duration: '50 minutes',
      type: 'practice',
      isPreview: false,
      order: 33,
      resources: [
        {
          id: 'constructions-worksheet',
          type: 'pdf',
          url: '/pdfs/constructions-practice.pdf',
          title: 'Constructions Practice Worksheet'
        }
      ]
    },

    // Chapter 12: Areas Related to Circles
    {
      id: 'circle-areas-intro',
      slug: 'circle-areas-intro',
      title: 'Areas Related to Circles',
      description: 'Calculating areas of sectors and segments of circles.',
      duration: '45 minutes',
      type: 'video',
      isPreview: false,
      order: 34,
      resources: [
        {
          id: 'areas-video',
          type: 'video',
          url: '/videos/circle-areas-intro.mp4',
          title: 'Circle Areas Video',
          duration: 1800
        }
      ]
    },
    {
      id: 'circle-areas-practice',
      slug: 'circle-areas-practice',
      title: 'Circle Areas Practice Problems',
      description: 'Practice problems on areas related to circles.',
      duration: '50 minutes',
      type: 'practice',
      isPreview: false,
      order: 35,
      resources: [
        {
          id: 'areas-worksheet',
          type: 'pdf',
          url: '/pdfs/circle-areas-practice.pdf',
          title: 'Circle Areas Practice Worksheet'
        }
      ]
    },

    // Chapter 13: Surface Areas and Volumes
    {
      id: 'surface-volumes-intro',
      slug: 'surface-volumes-intro',
      title: 'Surface Areas and Volumes',
      description: 'Calculating surface areas and volumes of 3D shapes.',
      duration: '50 minutes',
      type: 'video',
      isPreview: false,
      order: 36,
      resources: [
        {
          id: 'surface-video',
          type: 'video',
          url: '/videos/surface-volumes-intro.mp4',
          title: 'Surface Areas and Volumes Video',
          duration: 2000
        }
      ]
    },
    {
      id: 'surface-volumes-practice',
      slug: 'surface-volumes-practice',
      title: 'Surface Areas and Volumes Practice',
      description: 'Practice problems on surface areas and volumes.',
      duration: '55 minutes',
      type: 'practice',
      isPreview: false,
      order: 37,
      resources: [
        {
          id: 'surface-worksheet',
          type: 'pdf',
          url: '/pdfs/surface-volumes-practice.pdf',
          title: 'Surface Areas and Volumes Practice Worksheet'
        }
      ]
    },

    // Chapter 14: Statistics
    {
      id: 'statistics-intro',
      slug: 'statistics-intro',
      title: 'Introduction to Statistics',
      description: 'Understanding mean, median, mode and their applications.',
      duration: '45 minutes',
      type: 'video',
      isPreview: false,
      order: 38,
      resources: [
        {
          id: 'stats-video',
          type: 'video',
          url: '/videos/statistics-intro.mp4',
          title: 'Statistics Introduction Video',
          duration: 1800
        }
      ]
    },
    {
      id: 'statistics-practice',
      slug: 'statistics-practice',
      title: 'Statistics Practice Problems',
      description: 'Practice problems on statistics.',
      duration: '50 minutes',
      type: 'practice',
      isPreview: false,
      order: 39,
      resources: [
        {
          id: 'stats-worksheet',
          type: 'pdf',
          url: '/pdfs/statistics-practice.pdf',
          title: 'Statistics Practice Worksheet'
        }
      ]
    },

    // Chapter 15: Probability
    {
      id: 'probability-intro',
      slug: 'probability-intro',
      title: 'Introduction to Probability',
      description: 'Understanding probability and its applications.',
      duration: '45 minutes',
      type: 'video',
      isPreview: false,
      order: 40,
      resources: [
        {
          id: 'probability-video',
          type: 'video',
          url: '/videos/probability-intro.mp4',
          title: 'Probability Introduction Video',
          duration: 1800
        }
      ]
    },
    {
      id: 'probability-practice',
      slug: 'probability-practice',
      title: 'Probability Practice Problems',
      description: 'Practice problems on probability.',
      duration: '50 minutes',
      type: 'practice',
      isPreview: false,
      order: 41,
      resources: [
        {
          id: 'probability-worksheet',
          type: 'pdf',
          url: '/pdfs/probability-practice.pdf',
          title: 'Probability Practice Worksheet'
        }
      ]
    },

    // Mock Tests and Assessments
    {
      id: 'mock-test-1',
      slug: 'mock-test-1',
      title: 'Mock Test 1 - Chapters 1-5',
      description: 'Comprehensive mock test covering first 5 chapters.',
      duration: '180 minutes',
      type: 'assessment',
      isPreview: false,
      order: 42,
      resources: [
        {
          id: 'mock-test-1-pdf',
          type: 'pdf',
          url: '/pdfs/mock-test-1.pdf',
          title: 'Mock Test 1 Question Paper'
        }
      ]
    },
    {
      id: 'mock-test-2',
      slug: 'mock-test-2',
      title: 'Mock Test 2 - Chapters 6-10',
      description: 'Comprehensive mock test covering chapters 6-10.',
      duration: '180 minutes',
      type: 'assessment',
      isPreview: false,
      order: 43,
      resources: [
        {
          id: 'mock-test-2-pdf',
          type: 'pdf',
          url: '/pdfs/mock-test-2.pdf',
          title: 'Mock Test 2 Question Paper'
        }
      ]
    },
    {
      id: 'mock-test-3',
      slug: 'mock-test-3',
      title: 'Mock Test 3 - Chapters 11-15',
      description: 'Comprehensive mock test covering chapters 11-15.',
      duration: '180 minutes',
      type: 'assessment',
      isPreview: false,
      order: 44,
      resources: [
        {
          id: 'mock-test-3-pdf',
          type: 'pdf',
          url: '/pdfs/mock-test-3.pdf',
          title: 'Mock Test 3 Question Paper'
        }
      ]
    },
    {
      id: 'final-mock-test',
      slug: 'final-mock-test',
      title: 'Final Mock Test - Complete Syllabus',
      description: 'Complete syllabus mock test for board exam preparation.',
      duration: '180 minutes',
      type: 'assessment',
      isPreview: false,
      order: 45,
      resources: [
        {
          id: 'final-mock-test-pdf',
          type: 'pdf',
          url: '/pdfs/final-mock-test.pdf',
          title: 'Final Mock Test Question Paper'
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
