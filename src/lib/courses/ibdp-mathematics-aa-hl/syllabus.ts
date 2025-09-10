import { Section } from '@/lib/cbse-syllabus'

export const syllabus: Section[] = [
  {
    id: 'number-algebra',
    title: 'Number and Algebra',
    slug: 'number-algebra',
    isExpanded: true,
    chapters: [
      {
        id: 'sequences-series',
        title: 'Sequences and Series',
        slug: 'sequences-series',
        subsections: [
          {
            id: 'arithmetic-sequences',
            title: 'Arithmetic Sequences and Series',
            slug: 'arithmetic-sequences',
            duration: '60 min',
            isCompleted: false
          },
          {
            id: 'geometric-sequences',
            title: 'Geometric Sequences and Series',
            slug: 'geometric-sequences',
            duration: '65 min',
            isCompleted: false
          },
          {
            id: 'infinite-series',
            title: 'Infinite Geometric Series',
            slug: 'infinite-series',
            duration: '50 min',
            isCompleted: false
          }
        ],
        isExpanded: true
      },
      {
        id: 'binomial-theorem',
        title: 'Binomial Theorem',
        slug: 'binomial-theorem',
        subsections: [
          {
            id: 'binomial-expansion',
            title: 'Binomial Expansion',
            slug: 'binomial-expansion',
            duration: '55 min',
            isCompleted: false
          },
          {
            id: 'binomial-coefficients',
            title: 'Binomial Coefficients and Pascal\'s Triangle',
            slug: 'binomial-coefficients',
            duration: '45 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      },
      {
        id: 'complex-numbers',
        title: 'Complex Numbers',
        slug: 'complex-numbers',
        subsections: [
          {
            id: 'complex-arithmetic',
            title: 'Complex Number Arithmetic',
            slug: 'complex-arithmetic',
            duration: '50 min',
            isCompleted: false
          },
          {
            id: 'polar-form',
            title: 'Polar Form and De Moivre\'s Theorem',
            slug: 'polar-form',
            duration: '70 min',
            isCompleted: false
          },
          {
            id: 'complex-roots',
            title: 'Roots of Complex Numbers',
            slug: 'complex-roots',
            duration: '60 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      }
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    slug: 'functions',
    isExpanded: false,
    chapters: [
      {
        id: 'function-concepts',
        title: 'Function Concepts',
        slug: 'function-concepts',
        subsections: [
          {
            id: 'domain-range',
            title: 'Domain and Range',
            slug: 'domain-range',
            duration: '45 min',
            isCompleted: false
          },
          {
            id: 'composite-functions',
            title: 'Composite Functions',
            slug: 'composite-functions',
            duration: '50 min',
            isCompleted: false
          },
          {
            id: 'inverse-functions',
            title: 'Inverse Functions',
            slug: 'inverse-functions',
            duration: '55 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      },
      {
        id: 'polynomial-functions',
        title: 'Polynomial Functions',
        slug: 'polynomial-functions',
        subsections: [
          {
            id: 'polynomial-properties',
            title: 'Properties of Polynomial Functions',
            slug: 'polynomial-properties',
            duration: '60 min',
            isCompleted: false
          },
          {
            id: 'factor-theorem',
            title: 'Factor and Remainder Theorems',
            slug: 'factor-theorem',
            duration: '55 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      },
      {
        id: 'exponential-logarithmic',
        title: 'Exponential and Logarithmic Functions',
        slug: 'exponential-logarithmic',
        subsections: [
          {
            id: 'exponential-functions',
            title: 'Exponential Functions',
            slug: 'exponential-functions',
            duration: '50 min',
            isCompleted: false
          },
          {
            id: 'logarithmic-functions',
            title: 'Logarithmic Functions',
            slug: 'logarithmic-functions',
            duration: '55 min',
            isCompleted: false
          },
          {
            id: 'exponential-models',
            title: 'Exponential Growth and Decay Models',
            slug: 'exponential-models',
            duration: '60 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      }
    ]
  },
  {
    id: 'geometry-trigonometry',
    title: 'Geometry and Trigonometry',
    slug: 'geometry-trigonometry',
    isExpanded: false,
    chapters: [
      {
        id: 'trigonometric-functions',
        title: 'Trigonometric Functions',
        slug: 'trigonometric-functions',
        subsections: [
          {
            id: 'unit-circle',
            title: 'Unit Circle and Radian Measure',
            slug: 'unit-circle',
            duration: '55 min',
            isCompleted: false
          },
          {
            id: 'trigonometric-identities',
            title: 'Trigonometric Identities',
            slug: 'trigonometric-identities',
            duration: '65 min',
            isCompleted: false
          },
          {
            id: 'trigonometric-equations',
            title: 'Trigonometric Equations',
            slug: 'trigonometric-equations',
            duration: '60 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      },
      {
        id: 'vectors',
        title: 'Vectors',
        slug: 'vectors',
        subsections: [
          {
            id: 'vector-operations',
            title: 'Vector Operations',
            slug: 'vector-operations',
            duration: '50 min',
            isCompleted: false
          },
          {
            id: 'scalar-product',
            title: 'Scalar Product',
            slug: 'scalar-product',
            duration: '55 min',
            isCompleted: false
          },
          {
            id: 'vector-product',
            title: 'Vector Product',
            slug: 'vector-product',
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
        id: 'descriptive-statistics',
        title: 'Descriptive Statistics',
        slug: 'descriptive-statistics',
        subsections: [
          {
            id: 'measures-central-tendency',
            title: 'Measures of Central Tendency',
            slug: 'measures-central-tendency',
            duration: '45 min',
            isCompleted: false
          },
          {
            id: 'measures-dispersion',
            title: 'Measures of Dispersion',
            slug: 'measures-dispersion',
            duration: '50 min',
            isCompleted: false
          },
          {
            id: 'normal-distribution',
            title: 'Normal Distribution',
            slug: 'normal-distribution',
            duration: '65 min',
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
            id: 'conditional-probability',
            title: 'Conditional Probability',
            slug: 'conditional-probability',
            duration: '55 min',
            isCompleted: false
          },
          {
            id: 'bayes-theorem',
            title: 'Bayes\' Theorem',
            slug: 'bayes-theorem',
            duration: '60 min',
            isCompleted: false
          },
          {
            id: 'discrete-random-variables',
            title: 'Discrete Random Variables',
            slug: 'discrete-random-variables',
            duration: '65 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      }
    ]
  },
  {
    id: 'calculus',
    title: 'Calculus',
    slug: 'calculus',
    isExpanded: false,
    chapters: [
      {
        id: 'limits-continuity',
        title: 'Limits and Continuity',
        slug: 'limits-continuity',
        subsections: [
          {
            id: 'limit-concepts',
            title: 'Limit Concepts',
            slug: 'limit-concepts',
            duration: '60 min',
            isCompleted: false
          },
          {
            id: 'continuity',
            title: 'Continuity',
            slug: 'continuity',
            duration: '55 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      },
      {
        id: 'differentiation',
        title: 'Differentiation',
        slug: 'differentiation',
        subsections: [
          {
            id: 'derivative-rules',
            title: 'Derivative Rules',
            slug: 'derivative-rules',
            duration: '65 min',
            isCompleted: false
          },
          {
            id: 'chain-rule',
            title: 'Chain Rule',
            slug: 'chain-rule',
            duration: '60 min',
            isCompleted: false
          },
          {
            id: 'implicit-differentiation',
            title: 'Implicit Differentiation',
            slug: 'implicit-differentiation',
            duration: '55 min',
            isCompleted: false
          },
          {
            id: 'applications-derivatives',
            title: 'Applications of Derivatives',
            slug: 'applications-derivatives',
            duration: '70 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      },
      {
        id: 'integration',
        title: 'Integration',
        slug: 'integration',
        subsections: [
          {
            id: 'integration-techniques',
            title: 'Integration Techniques',
            slug: 'integration-techniques',
            duration: '65 min',
            isCompleted: false
          },
          {
            id: 'integration-by-parts',
            title: 'Integration by Parts',
            slug: 'integration-by-parts',
            duration: '60 min',
            isCompleted: false
          },
          {
            id: 'applications-integration',
            title: 'Applications of Integration',
            slug: 'applications-integration',
            duration: '70 min',
            isCompleted: false
          }
        ],
        isExpanded: false
      }
    ]
  }
]
