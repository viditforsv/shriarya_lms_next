export interface Subsection {
  id: string
  title: string
  slug: string
  duration?: string
  isCompleted?: boolean
  isPreview?: boolean
}

export interface Chapter {
  id: string
  title: string
  slug: string
  subsections: Subsection[]
  isExpanded?: boolean
  isCompleted?: boolean
}

export interface Section {
  id: string
  title: string
  slug: string
  chapters: Chapter[]
  isExpanded?: boolean
  isCompleted?: boolean
}

export const CBSE_CLASS_10_MATHEMATICS_SYLLABUS: Section[] = [
  {
    id: 'number-systems',
    title: 'Number Systems',
    slug: 'number-systems',
    isExpanded: true,
    chapters: [
      {
        id: 'real-numbers',
        title: 'Real Numbers',
        slug: 'real-numbers',
        subsections: [
          {
            id: 'fundamental-theorem-arithmetic',
            title: 'Fundamental Theorem of Arithmetic',
            slug: 'fundamental-theorem-arithmetic',
            duration: '45 min',
            isCompleted: false
          },
          {
            id: 'proofs-irrationality',
            title: 'Proofs of Irrationality',
            slug: 'proofs-irrationality',
            duration: '50 min',
            isCompleted: false
          },
          {
            id: 'properties-real-numbers',
            title: 'Properties and Applications of Real Numbers',
            slug: 'properties-real-numbers',
            duration: '39 min',
            isCompleted: false
          }
        ],
        isExpanded: true
      }
    ]
  },
  {
    id: 'algebra',
    title: 'Algebra',
    slug: 'algebra',
    isExpanded: true,
    chapters: [
      {
        id: 'polynomials',
        title: 'Polynomials',
        slug: 'polynomials',
        subsections: [
          {
            id: 'zeros-polynomial',
            title: 'Zeros of a Polynomial',
            slug: 'zeros-polynomial',
            duration: '35 min',
            isCompleted: true
          },
          {
            id: 'relationship-zeros-coefficients',
            title: 'Relationship between Zeros and Coefficients',
            slug: 'relationship-zeros-coefficients',
            duration: '40 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      },
      {
        id: 'pair-linear-equations',
        title: 'Pair of Linear Equations in Two Variables',
        slug: 'pair-linear-equations',
        subsections: [
          {
            id: 'graphical-method',
            title: 'Graphical Method of Solution',
            slug: 'graphical-method',
            duration: '45 min',
            isCompleted: false
          },
          {
            id: 'algebraic-solution',
            title: 'Algebraic Solution: Substitution and Elimination',
            slug: 'algebraic-solution',
            duration: '50 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      },
      {
        id: 'quadratic-equations',
        title: 'Quadratic Equations',
        slug: 'quadratic-equations',
        subsections: [
          {
            id: 'euclid-division-lemma',
            title: 'Euclid\'s Division Lemma',
            slug: 'euclid-division-lemma',
            duration: '50 min',
            isCompleted: false,
            isPreview: false
          },
          {
            id: 'standard-form',
            title: 'Standard Form',
            slug: 'standard-form',
            duration: '30 min',
            isCompleted: false
          },
          {
            id: 'factorization-quadratic-formula',
            title: 'Solution by Factorization & Quadratic Formula',
            slug: 'factorization-quadratic-formula',
            duration: '55 min',
            isCompleted: false
          },
          {
            id: 'nature-roots-discriminant',
            title: 'Nature of Roots (Discriminant)',
            slug: 'nature-roots-discriminant',
            duration: '45 min',
            isCompleted: false
          }
        ],
        isExpanded: true
      },
      {
        id: 'arithmetic-progressions',
        title: 'Arithmetic Progressions',
        slug: 'arithmetic-progressions',
        subsections: [
          {
            id: 'nth-term',
            title: 'nth Term',
            slug: 'nth-term',
            duration: '40 min',
            isCompleted: false
          },
          {
            id: 'sum-n-terms',
            title: 'Sum of n Terms',
            slug: 'sum-n-terms',
            duration: '45 min',
            isCompleted: false
          },
          {
            id: 'applications-problems',
            title: 'Applications in Problems',
            slug: 'applications-problems',
            duration: '50 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      }
    ]
  },
  {
    id: 'coordinate-geometry',
    title: 'Coordinate Geometry',
    slug: 'coordinate-geometry',
    isExpanded: false,
    chapters: [
      {
        id: 'concepts-coordinate-geometry',
        title: 'Concepts of Coordinate Geometry',
        slug: 'concepts-coordinate-geometry',
        subsections: [
          {
            id: 'distance-formula',
            title: 'Distance Formula',
            slug: 'distance-formula',
            duration: '40 min',
            isCompleted: false
          },
          {
            id: 'section-formula',
            title: 'Section Formula (Internal Division)',
            slug: 'section-formula',
            duration: '45 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      }
    ]
  },
  {
    id: 'geometry',
    title: 'Geometry',
    slug: 'geometry',
    isExpanded: false,
    chapters: [
      {
        id: 'triangles',
        title: 'Triangles',
        slug: 'triangles',
        subsections: [
          {
            id: 'similarity-criteria',
            title: 'Similarity Criteria and Properties',
            slug: 'similarity-criteria',
            duration: '50 min',
            isCompleted: false
          },
          {
            id: 'basic-proportionality-theorem',
            title: 'Basic Proportionality Theorem (Thales\' theorem)',
            slug: 'basic-proportionality-theorem',
            duration: '45 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      },
      {
        id: 'circles',
        title: 'Circles',
        slug: 'circles',
        subsections: [
          {
            id: 'tangent-circle',
            title: 'Tangent to a Circle',
            slug: 'tangent-circle',
            duration: '40 min',
            isCompleted: false
          },
          {
            id: 'properties-tangents',
            title: 'Properties of Tangents',
            slug: 'properties-tangents',
            duration: '45 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      }
    ]
  },
  {
    id: 'trigonometry',
    title: 'Trigonometry',
    slug: 'trigonometry',
    isExpanded: false,
    chapters: [
      {
        id: 'introduction-trigonometry',
        title: 'Introduction to Trigonometry',
        slug: 'introduction-trigonometry',
        subsections: [
          {
            id: 'trigonometric-ratios',
            title: 'Trigonometric Ratios',
            slug: 'trigonometric-ratios',
            duration: '45 min',
            isCompleted: false
          },
          {
            id: 'values-30-45-60',
            title: 'Values for 30°, 45°, 60°',
            slug: 'values-30-45-60',
            duration: '40 min',
            isCompleted: false
          },
          {
            id: 'relationships-ratios',
            title: 'Relationships between Ratios',
            slug: 'relationships-ratios',
            duration: '35 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      },
      {
        id: 'trigonometric-identities',
        title: 'Trigonometric Identities',
        slug: 'trigonometric-identities',
        subsections: [
          {
            id: 'proof-application-sin2-cos2',
            title: 'Proof and Application of sin²A + cos²A = 1',
            slug: 'proof-application-sin2-cos2',
            duration: '50 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      },
      {
        id: 'heights-distances',
        title: 'Heights and Distances',
        slug: 'heights-distances',
        subsections: [
          {
            id: 'angles-elevation-depression',
            title: 'Angles of Elevation and Depression',
            slug: 'angles-elevation-depression',
            duration: '45 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      }
    ]
  },
  {
    id: 'mensuration',
    title: 'Mensuration',
    slug: 'mensuration',
    isExpanded: false,
    chapters: [
      {
        id: 'areas-related-circles',
        title: 'Areas Related to Circles',
        slug: 'areas-related-circles',
        subsections: [
          {
            id: 'areas-sectors-segments',
            title: 'Areas of Sectors and Segments',
            slug: 'areas-sectors-segments',
            duration: '45 min',
            isCompleted: false
          },
          {
            id: 'perimeter-circumference',
            title: 'Perimeter/Circumference Problems',
            slug: 'perimeter-circumference',
            duration: '40 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      },
      {
        id: 'surface-areas-volumes',
        title: 'Surface Areas and Volumes',
        slug: 'surface-areas-volumes',
        subsections: [
          {
            id: 'cubes-cuboids',
            title: 'Cubes and Cuboids',
            slug: 'cubes-cuboids',
            duration: '50 min',
            isCompleted: false
          },
          {
            id: 'spheres-hemispheres',
            title: 'Spheres and Hemispheres',
            slug: 'spheres-hemispheres',
            duration: '45 min',
            isCompleted: false
          },
          {
            id: 'cylinders-cones',
            title: 'Right Circular Cylinders/Cones',
            slug: 'cylinders-cones',
            duration: '55 min',
            isCompleted: false
          },
          {
            id: 'combinations-solids',
            title: 'Combinations of Two Solids',
            slug: 'combinations-solids',
            duration: '60 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      }
    ]
  },
  {
    id: 'statistics-probability',
    title: 'Statistics and Probability',
    slug: 'statistics-probability',
    isExpanded: false,
    chapters: [
      {
        id: 'statistics',
        title: 'Statistics',
        slug: 'statistics',
        subsections: [
          {
            id: 'mean-median-mode',
            title: 'Mean, Median, Mode of Grouped Data',
            slug: 'mean-median-mode',
            duration: '50 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      },
      {
        id: 'probability',
        title: 'Probability',
        slug: 'probability',
        subsections: [
          {
            id: 'classical-definition',
            title: 'Classical Definition',
            slug: 'classical-definition',
            duration: '40 min',
            isCompleted: false
          },
          {
            id: 'simple-problems',
            title: 'Simple Problems Related to Everyday Events',
            slug: 'simple-problems',
            duration: '45 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      }
    ]
  }
]

export function getSyllabusProgress(syllabus: Section[]): { completed: number; total: number; percentage: number } {
  let completed = 0
  let total = 0

  syllabus.forEach(section => {
    section.chapters.forEach(chapter => {
      chapter.subsections.forEach(subsection => {
        total++
        if (subsection.isCompleted) {
          completed++
        }
      })
    })
  })

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0
  }
}

export function findSubsectionBySlug(syllabus: Section[], slug: string): { section: Section; chapter: Chapter; subsection: Subsection } | null {
  for (const section of syllabus) {
    for (const chapter of section.chapters) {
      for (const subsection of chapter.subsections) {
        if (subsection.slug === slug) {
          return { section, chapter, subsection }
        }
      }
    }
  }
  return null
}
