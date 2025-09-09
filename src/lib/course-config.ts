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
      description: `
        <h3>Understanding Real Numbers</h3>
        <p>Real numbers form the foundation of mathematics. In this lesson, we'll explore:</p>
        <ul>
          <li><strong>Rational Numbers:</strong> Numbers that can be expressed as fractions (p/q where q ≠ 0)</li>
          <li><strong>Irrational Numbers:</strong> Numbers that cannot be expressed as fractions (like √2, √3, π)</li>
          <li><strong>Properties:</strong> Commutative, associative, and distributive properties</li>
        </ul>
        <h4>Key Concepts:</h4>
        <p>Every real number can be represented on the number line. Rational numbers have terminating or repeating decimal expansions, while irrational numbers have non-terminating, non-repeating decimal expansions.</p>
        <h4>Example:</h4>
        <p>√2 ≈ 1.414213562... (non-terminating, non-repeating)</p>
        <p>1/3 = 0.333... (repeating decimal)</p>
      `,
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
      id: 'real-numbers-properties',
      slug: 'real-numbers-properties',
      title: 'Properties of Real Numbers',
      description: `
        <h3>Properties of Real Numbers</h3>
        <p>Real numbers follow several important properties:</p>
        <h4>1. Commutative Property</h4>
        <ul>
          <li><strong>Addition:</strong> a + b = b + a</li>
          <li><strong>Multiplication:</strong> a × b = b × a</li>
        </ul>
        <h4>2. Associative Property</h4>
        <ul>
          <li><strong>Addition:</strong> (a + b) + c = a + (b + c)</li>
          <li><strong>Multiplication:</strong> (a × b) × c = a × (b × c)</li>
        </ul>
        <h4>3. Distributive Property</h4>
        <p><strong>a × (b + c) = a × b + a × c</strong></p>
        <h4>Examples:</h4>
        <p>• 3 + 5 = 5 + 3 = 8 (Commutative)</p>
        <p>• (2 + 3) + 4 = 2 + (3 + 4) = 9 (Associative)</p>
        <p>• 2 × (3 + 4) = 2 × 3 + 2 × 4 = 14 (Distributive)</p>
      `,
      duration: '40 minutes',
      type: 'video',
      isPreview: false,
      order: 2,
      resources: [
        {
          url: 'https://example.com/real-numbers-properties.pdf',
          type: 'pdf',
          title: 'Properties Worksheet'
        }
      ]
    },
    {
      id: 'euclid-division-lemma',
      slug: 'euclid-division-lemma',
      title: 'Euclid\'s Division Lemma',
      description: `
        <h3>Euclid's Division Lemma</h3>
        <p>Euclid's Division Lemma is a fundamental theorem in number theory that states:</p>
        <blockquote>
          <p><strong>For any two positive integers a and b, there exist unique integers q and r such that:</strong></p>
          <p><strong>a = bq + r, where 0 ≤ r < b</strong></p>
        </blockquote>
        <h4>Understanding the Components:</h4>
        <ul>
          <li><strong>a:</strong> Dividend (the number being divided)</li>
          <li><strong>b:</strong> Divisor (the number dividing)</li>
          <li><strong>q:</strong> Quotient (the result of division)</li>
          <li><strong>r:</strong> Remainder (must be less than divisor)</li>
        </ul>
        <h4>Example:</h4>
        <p>For a = 17 and b = 5:</p>
        <p>17 = 5 × 3 + 2</p>
        <p>Here, q = 3 and r = 2 (since 0 ≤ 2 < 5)</p>
      `,
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
      description: `
        <h3>Fundamental Theorem of Arithmetic</h3>
        <p>The Fundamental Theorem of Arithmetic states that every integer greater than 1 can be expressed as a unique product of prime numbers.</p>
        
        <h4>Statement:</h4>
        <blockquote>
          <p><strong>Every composite number can be expressed as a product of primes, and this factorization is unique, apart from the order in which the prime factors occur.</strong></p>
        </blockquote>
        
        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>Prime Factorization:</strong> Breaking down a number into its prime factors</li>
          <li><strong>Uniqueness:</strong> Each number has only one prime factorization (order doesn't matter)</li>
          <li><strong>Applications:</strong> Used in finding HCF, LCM, and solving various problems</li>
        </ul>
        
        <h4>Examples:</h4>
        <ul>
          <li><strong>12 = 2² × 3¹</strong> (Prime factors: 2, 2, 3)</li>
          <li><strong>18 = 2¹ × 3²</strong> (Prime factors: 2, 3, 3)</li>
          <li><strong>30 = 2¹ × 3¹ × 5¹</strong> (Prime factors: 2, 3, 5)</li>
        </ul>
        
        <h4>Finding HCF and LCM:</h4>
        <p><strong>HCF:</strong> Take the lowest power of each common prime factor</p>
        <p><strong>LCM:</strong> Take the highest power of each prime factor</p>
        
        <h4>Example:</h4>
        <p>For 12 = 2² × 3¹ and 18 = 2¹ × 3²:</p>
        <p>HCF = 2¹ × 3¹ = 6</p>
        <p>LCM = 2² × 3² = 36</p>
      `,
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
        },
        {
          id: 'fta-worksheet',
          type: 'pdf',
          url: '/pdfs/fundamental-theorem-worksheet.pdf',
          title: 'Prime Factorization Worksheet'
        }
      ]
    },
    {
      id: 'real-numbers-quiz',
      slug: 'real-numbers-quiz',
      title: 'Real Numbers Interactive Quiz',
      description: `
        <h3>Real Numbers Interactive Quiz</h3>
        <p>Test your understanding of real numbers concepts with these interactive multiple choice questions.</p>
        
        <div class="mcq-container">
          <h4>Question 1:</h4>
          <p>Which of the following is an irrational number?</p>
          <div class="mcq-options">
            <div class="mcq-option">A) √16</div>
            <div class="mcq-option">B) √17</div>
            <div class="mcq-option">C) 0.333...</div>
            <div class="mcq-option">D) 22/7</div>
          </div>
          <div class="mcq-explanation">
            <strong>Answer: B) √17</strong><br>
            √17 cannot be expressed as a fraction and has a non-terminating, non-repeating decimal expansion.
          </div>
          
          <h4>Question 2:</h4>
          <p>What is the HCF of 12 and 18?</p>
          <div class="mcq-options">
            <div class="mcq-option">A) 2</div>
            <div class="mcq-option">B) 3</div>
            <div class="mcq-option">C) 6</div>
            <div class="mcq-option">D) 36</div>
          </div>
          <div class="mcq-explanation">
            <strong>Answer: C) 6</strong><br>
            12 = 2² × 3, 18 = 2 × 3². HCF = 2 × 3 = 6
          </div>
          
          <h4>Question 3:</h4>
          <p>Which property is illustrated by: 3 × (4 + 5) = 3 × 4 + 3 × 5?</p>
          <div class="mcq-options">
            <div class="mcq-option">A) Commutative</div>
            <div class="mcq-option">B) Associative</div>
            <div class="mcq-option">C) Distributive</div>
            <div class="mcq-option">D) Identity</div>
          </div>
          <div class="mcq-explanation">
            <strong>Answer: C) Distributive</strong><br>
            The distributive property states that a × (b + c) = a × b + a × c
          </div>
        </div>
        
        <h4>Learning Objectives:</h4>
        <ul>
          <li>Identify rational and irrational numbers</li>
          <li>Apply properties of real numbers</li>
          <li>Calculate HCF and LCM using prime factorization</li>
          <li>Understand decimal expansions</li>
        </ul>
      `,
      duration: '30 minutes',
      type: 'quiz',
      isPreview: false,
      order: 5,
      resources: [
        {
          id: 'real-numbers-quiz-interactive',
          type: 'interactive',
          url: '/interactive/real-numbers-quiz',
          title: 'Interactive Real Numbers Quiz'
        },
        {
          id: 'real-numbers-quiz-pdf',
          type: 'pdf',
          url: '/pdfs/real-numbers-quiz.pdf',
          title: 'Real Numbers Quiz PDF'
        }
      ]
    },
    {
      id: 'real-numbers-practice',
      slug: 'real-numbers-practice',
      title: 'Real Numbers Practice Problems',
      description: `
        <h3>Real Numbers Practice Problems</h3>
        <p>Comprehensive practice problems covering all concepts of real numbers including rational and irrational numbers, properties, and applications.</p>
        
        <h4>Problem Categories:</h4>
        <ul>
          <li><strong>Basic Operations:</strong> Addition, subtraction, multiplication, division</li>
          <li><strong>Properties Application:</strong> Commutative, associative, distributive</li>
          <li><strong>Rational vs Irrational:</strong> Classification and identification</li>
          <li><strong>Decimal Expansions:</strong> Terminating and non-terminating decimals</li>
          <li><strong>Number Line:</strong> Representation and ordering</li>
        </ul>
        
        <h4>Sample Problems:</h4>
        <div class="problem-set">
          <h5>Problem 1:</h5>
          <p>Classify the following numbers as rational or irrational:</p>
          <ul>
            <li>√16</li>
            <li>√17</li>
            <li>0.333...</li>
            <li>π</li>
          </ul>
          
          <h5>Problem 2:</h5>
          <p>Find the HCF and LCM of 12 and 18 using prime factorization.</p>
          
          <h5>Problem 3:</h5>
          <p>Prove that √3 is irrational.</p>
          
          <h5>Problem 4:</h5>
          <p>Express 0.6̄ (repeating decimal) as a fraction.</p>
        </div>
        
        <h4>Solution Strategies:</h4>
        <ul>
          <li><strong>Prime Factorization:</strong> Break down numbers into prime factors</li>
          <li><strong>Proof by Contradiction:</strong> Assume opposite and derive contradiction</li>
          <li><strong>Decimal to Fraction:</strong> Use algebraic manipulation</li>
          <li><strong>Properties:</strong> Apply commutative, associative, distributive laws</li>
        </ul>
      `,
      duration: '60 minutes',
      type: 'practice',
      isPreview: false,
      order: 6,
      resources: [
        {
          id: 'practice-worksheet',
          type: 'pdf',
          url: '/pdfs/real-numbers-practice.pdf',
          title: 'Practice Worksheet'
        },
        {
          id: 'practice-solutions',
          type: 'pdf',
          url: '/pdfs/real-numbers-solutions.pdf',
          title: 'Detailed Solutions'
        }
      ]
    },

    // Chapter 2: Polynomials
    {
      id: 'polynomials-intro',
      slug: 'polynomials-intro',
      title: 'Introduction to Polynomials',
      description: `
        <h3>Introduction to Polynomials</h3>
        <p>A polynomial is an algebraic expression consisting of variables and coefficients, involving only addition, subtraction, multiplication, and non-negative integer exponents.</p>
        <h4>General Form:</h4>
        <p><strong>P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀</strong></p>
        <h4>Key Terms:</h4>
        <ul>
          <li><strong>Degree:</strong> Highest power of the variable</li>
          <li><strong>Coefficient:</strong> Numerical factor of each term</li>
          <li><strong>Constant Term:</strong> Term with no variable (a₀)</li>
          <li><strong>Leading Coefficient:</strong> Coefficient of the highest degree term</li>
        </ul>
        <h4>Examples:</h4>
        <ul>
          <li>3x² + 2x + 1 (Degree: 2, Leading coefficient: 3)</li>
          <li>5x³ - 2x + 7 (Degree: 3, Leading coefficient: 5)</li>
          <li>x⁴ + 3x² - 1 (Degree: 4, Leading coefficient: 1)</li>
        </ul>
      `,
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
      description: `
        <h3>Zeroes of Polynomials</h3>
        <p>The zeroes (or roots) of a polynomial are the values of the variable that make the polynomial equal to zero.</p>
        
        <h4>Definition:</h4>
        <p>If P(x) is a polynomial and P(a) = 0, then 'a' is called a zero of the polynomial P(x).</p>
        
        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>Zero:</strong> Value that makes polynomial equal to zero</li>
          <li><strong>Root:</strong> Another term for zero</li>
          <li><strong>Factor Theorem:</strong> If 'a' is a zero, then (x - a) is a factor</li>
          <li><strong>Remainder Theorem:</strong> P(a) gives remainder when P(x) is divided by (x - a)</li>
        </ul>
        
        <h4>Finding Zeroes:</h4>
        <ul>
          <li><strong>Linear Polynomial:</strong> ax + b = 0 → x = -b/a</li>
          <li><strong>Quadratic Polynomial:</strong> Use factorization or quadratic formula</li>
          <li><strong>Higher Degree:</strong> Use factor theorem and synthetic division</li>
        </ul>
        
        <h4>Examples:</h4>
        <div class="example-set">
          <h5>Example 1:</h5>
          <p>Find zeroes of P(x) = x² - 5x + 6</p>
          <p><strong>Solution:</strong> x² - 5x + 6 = (x - 2)(x - 3) = 0</p>
          <p>Therefore, x = 2 and x = 3 are the zeroes.</p>
          
          <h5>Example 2:</h5>
          <p>Find zeroes of P(x) = x³ - 6x² + 11x - 6</p>
          <p><strong>Solution:</strong> By trial, P(1) = 0, so (x - 1) is a factor.</p>
          <p>x³ - 6x² + 11x - 6 = (x - 1)(x² - 5x + 6) = (x - 1)(x - 2)(x - 3)</p>
          <p>Zeroes are x = 1, x = 2, and x = 3.</p>
        </div>
        
        <h4>Relationship with Coefficients:</h4>
        <p>For a quadratic polynomial ax² + bx + c with zeroes α and β:</p>
        <ul>
          <li><strong>Sum of zeroes:</strong> α + β = -b/a</li>
          <li><strong>Product of zeroes:</strong> α × β = c/a</li>
        </ul>
      `,
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
        },
        {
          id: 'zeroes-worksheet',
          type: 'pdf',
          url: '/pdfs/polynomial-zeroes-worksheet.pdf',
          title: 'Zeroes Practice Worksheet'
        }
      ]
    },
    {
      id: 'polynomials-practice',
      slug: 'polynomials-practice',
      title: 'Polynomials Practice Problems',
      description: `
        <h3>Polynomials Practice Problems</h3>
        <p>Comprehensive practice problems covering polynomial concepts including degree, coefficients, zeroes, and factorization.</p>
        
        <h4>Problem Types:</h4>
        <ul>
          <li><strong>Polynomial Identification:</strong> Degree, coefficients, constant terms</li>
          <li><strong>Zero Finding:</strong> Using factorization and factor theorem</li>
          <li><strong>Polynomial Operations:</strong> Addition, subtraction, multiplication</li>
          <li><strong>Factorization:</strong> Common factors, grouping, special identities</li>
          <li><strong>Relationship Problems:</strong> Sum and product of zeroes</li>
        </ul>
        
        <h4>Sample Problems:</h4>
        <div class="problem-set">
          <h5>Problem 1:</h5>
          <p>Find the degree and leading coefficient of the polynomial: 3x⁴ - 2x³ + 5x² - x + 7</p>
          
          <h5>Problem 2:</h5>
          <p>If α and β are zeroes of the polynomial x² - 5x + 6, find:</p>
          <ul>
            <li>α + β</li>
            <li>α × β</li>
            <li>α² + β²</li>
          </ul>
          
          <h5>Problem 3:</h5>
          <p>Factorize: x³ - 8x² + 19x - 12</p>
          
          <h5>Problem 4:</h5>
          <p>Find a quadratic polynomial whose zeroes are 2 + √3 and 2 - √3.</p>
        </div>
        
        <h4>Solution Techniques:</h4>
        <ul>
          <li><strong>Factor Theorem:</strong> Test values to find factors</li>
          <li><strong>Synthetic Division:</strong> Divide polynomials efficiently</li>
          <li><strong>Vieta's Formulas:</strong> Use sum and product relationships</li>
          <li><strong>Special Identities:</strong> Apply a² - b², (a + b)², etc.</li>
        </ul>
      `,
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
        },
        {
          id: 'polynomials-solutions',
          type: 'pdf',
          url: '/pdfs/polynomials-solutions.pdf',
          title: 'Detailed Solutions'
        }
      ]
    },

    // Chapter 3: Pair of Linear Equations in Two Variables
    {
      id: 'linear-equations-intro',
      slug: 'linear-equations-intro',
      title: 'Introduction to Linear Equations',
      description: `
        <h3>Introduction to Linear Equations in Two Variables</h3>
        <p>Linear equations in two variables are fundamental in algebra and have wide applications in real-world problems.</p>
        
        <h4>Definition:</h4>
        <p>A linear equation in two variables x and y is an equation of the form:</p>
        <p><strong>ax + by + c = 0</strong></p>
        <p>where a, b, and c are real numbers, and a and b are not both zero.</p>
        
        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>Variables:</strong> x and y are the two variables</li>
          <li><strong>Coefficients:</strong> a and b are coefficients of x and y respectively</li>
          <li><strong>Constant Term:</strong> c is the constant term</li>
          <li><strong>Solution:</strong> A pair (x, y) that satisfies the equation</li>
        </ul>
        
        <h4>Standard Forms:</h4>
        <ul>
          <li><strong>General Form:</strong> ax + by + c = 0</li>
          <li><strong>Slope-Intercept Form:</strong> y = mx + c</li>
          <li><strong>Point-Slope Form:</strong> y - y₁ = m(x - x₁)</li>
        </ul>
        
        <h4>Graphical Representation:</h4>
        <p>Every linear equation in two variables represents a straight line on the coordinate plane.</p>
        
        <h4>Examples:</h4>
        <div class="example-set">
          <h5>Example 1:</h5>
          <p>2x + 3y - 6 = 0</p>
          <p>This is a linear equation where a = 2, b = 3, c = -6</p>
          
          <h5>Example 2:</h5>
          <p>y = 2x + 1</p>
          <p>In standard form: 2x - y + 1 = 0</p>
          
          <h5>Example 3:</h5>
          <p>Find solutions for 2x + 3y = 6</p>
          <p>Some solutions: (0, 2), (3, 0), (1, 4/3)</p>
        </div>
        
        <h4>Applications:</h4>
        <ul>
          <li><strong>Cost Problems:</strong> Finding cost relationships</li>
          <li><strong>Age Problems:</strong> Comparing ages over time</li>
          <li><strong>Distance Problems:</strong> Speed, time, and distance relationships</li>
          <li><strong>Mixture Problems:</strong> Combining different quantities</li>
        </ul>
      `,
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
        },
        {
          id: 'linear-notes',
          type: 'pdf',
          url: '/pdfs/linear-equations-notes.pdf',
          title: 'Linear Equations Study Notes'
        }
      ]
    },
    {
      id: 'graphical-method',
      slug: 'graphical-method',
      title: 'Graphical Method of Solution',
      description: `
        <h3>Graphical Method of Solving Linear Equations</h3>
        <p>The graphical method involves plotting both equations on the same coordinate plane and finding their point of intersection.</p>
        
        <h4>Steps to Solve Graphically:</h4>
        <ol>
          <li><strong>Convert to Slope-Intercept Form:</strong> Express both equations as y = mx + c</li>
          <li><strong>Find Points:</strong> Calculate at least two points for each line</li>
          <li><strong>Plot Lines:</strong> Draw both lines on the coordinate plane</li>
          <li><strong>Find Intersection:</strong> The point where lines meet is the solution</li>
        </ol>
        
        <h4>Types of Solutions:</h4>
        <ul>
          <li><strong>Unique Solution:</strong> Lines intersect at one point (consistent system)</li>
          <li><strong>No Solution:</strong> Lines are parallel (inconsistent system)</li>
          <li><strong>Infinite Solutions:</strong> Lines coincide (dependent system)</li>
        </ul>
        
        <h4>Example:</h4>
        <div class="example-set">
          <h5>Solve the system:</h5>
          <p>2x + 3y = 6 ... (1)</p>
          <p>x - y = 1 ... (2)</p>
          
          <h5>Step 1: Convert to slope-intercept form</h5>
          <p>From (1): y = -2x/3 + 2</p>
          <p>From (2): y = x - 1</p>
          
          <h5>Step 2: Find points</h5>
          <p><strong>For y = -2x/3 + 2:</strong></p>
          <p>When x = 0: y = 2 → (0, 2)</p>
          <p>When x = 3: y = 0 → (3, 0)</p>
          
          <p><strong>For y = x - 1:</strong></p>
          <p>When x = 0: y = -1 → (0, -1)</p>
          <p>When x = 1: y = 0 → (1, 0)</p>
          
          <h5>Step 3: Plot and find intersection</h5>
          <p>The lines intersect at approximately (1.8, 0.8)</p>
          <p>Therefore, x ≈ 1.8, y ≈ 0.8</p>
        </div>
        
        <h4>Advantages and Limitations:</h4>
        <ul>
          <li><strong>Advantages:</strong> Visual representation, easy to understand</li>
          <li><strong>Limitations:</strong> Not precise for exact solutions, time-consuming</li>
        </ul>
      `,
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
        },
        {
          id: 'graphical-worksheet',
          type: 'pdf',
          url: '/pdfs/graphical-method-worksheet.pdf',
          title: 'Graphical Method Worksheet'
        }
      ]
    },
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
      description: `
        <h3>Introduction to Arithmetic Progressions (AP)</h3>
        <p>An Arithmetic Progression is a sequence of numbers where the difference between consecutive terms is constant.</p>
        
        <h4>Definition:</h4>
        <p>A sequence a₁, a₂, a₃, ..., aₙ is called an Arithmetic Progression if:</p>
        <p><strong>aₙ₊₁ - aₙ = d (constant) for all n ≥ 1</strong></p>
        <p>where 'd' is called the common difference.</p>
        
        <h4>Key Terms:</h4>
        <ul>
          <li><strong>First Term (a₁):</strong> The first number in the sequence</li>
          <li><strong>Common Difference (d):</strong> The constant difference between consecutive terms</li>
          <li><strong>nth Term (aₙ):</strong> The term at position n</li>
          <li><strong>General Term:</strong> aₙ = a₁ + (n-1)d</li>
        </ul>
        
        <h4>Examples:</h4>
        <div class="example-set">
          <h5>Example 1:</h5>
          <p>2, 5, 8, 11, 14, ...</p>
          <p>First term (a₁) = 2, Common difference (d) = 3</p>
          <p>General term: aₙ = 2 + (n-1) × 3 = 3n - 1</p>
          
          <h5>Example 2:</h5>
          <p>10, 7, 4, 1, -2, ...</p>
          <p>First term (a₁) = 10, Common difference (d) = -3</p>
          <p>General term: aₙ = 10 + (n-1) × (-3) = 13 - 3n</p>
          
          <h5>Example 3:</h5>
          <p>Find the 10th term of AP: 3, 7, 11, 15, ...</p>
          <p>Here, a₁ = 3, d = 4</p>
          <p>a₁₀ = 3 + (10-1) × 4 = 3 + 36 = 39</p>
        </div>
        
        <h4>Properties:</h4>
        <ul>
          <li><strong>Three consecutive terms:</strong> If a, b, c are in AP, then 2b = a + c</li>
          <li><strong>Arithmetic Mean:</strong> The middle term of three consecutive terms</li>
          <li><strong>Sum Property:</strong> Sum of terms equidistant from ends is constant</li>
        </ul>
        
        <h4>Applications:</h4>
        <ul>
          <li><strong>Time and Distance:</strong> Uniform motion problems</li>
          <li><strong>Financial Planning:</strong> Regular savings, loan payments</li>
          <li><strong>Pattern Recognition:</strong> Finding missing terms in sequences</li>
        </ul>
      `,
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
        },
        {
          id: 'ap-notes',
          type: 'pdf',
          url: '/pdfs/ap-intro-notes.pdf',
          title: 'AP Introduction Study Notes'
        }
      ]
    },
    {
      id: 'ap-formulas',
      slug: 'ap-formulas',
      title: 'AP Formulas and Sum',
      description: `
        <h3>AP Formulas: nth Term and Sum of n Terms</h3>
        <p>Master the essential formulas for Arithmetic Progressions to solve problems efficiently.</p>
        
        <h4>1. Formula for nth Term:</h4>
        <p><strong>aₙ = a₁ + (n-1)d</strong></p>
        <p>where:</p>
        <ul>
          <li>aₙ = nth term</li>
          <li>a₁ = first term</li>
          <li>d = common difference</li>
          <li>n = position of the term</li>
        </ul>
        
        <h4>2. Formula for Sum of n Terms:</h4>
        <p><strong>Sₙ = n/2 [2a₁ + (n-1)d]</strong></p>
        <p>or</p>
        <p><strong>Sₙ = n/2 [a₁ + aₙ]</strong></p>
        
        <h4>Derivation of Sum Formula:</h4>
        <p>Let Sₙ = a₁ + a₂ + a₃ + ... + aₙ</p>
        <p>Writing in reverse: Sₙ = aₙ + aₙ₋₁ + aₙ₋₂ + ... + a₁</p>
        <p>Adding both equations:</p>
        <p>2Sₙ = (a₁ + aₙ) + (a₂ + aₙ₋₁) + ... + (aₙ + a₁)</p>
        <p>Since each pair equals (a₁ + aₙ):</p>
        <p>2Sₙ = n(a₁ + aₙ)</p>
        <p>Therefore: Sₙ = n/2(a₁ + aₙ)</p>
        
        <h4>Examples:</h4>
        <div class="example-set">
          <h5>Example 1: Finding nth Term</h5>
          <p>Find the 15th term of AP: 3, 7, 11, 15, ...</p>
          <p><strong>Solution:</strong></p>
          <p>a₁ = 3, d = 4, n = 15</p>
          <p>a₁₅ = 3 + (15-1) × 4 = 3 + 56 = 59</p>
          
          <h5>Example 2: Finding Sum</h5>
          <p>Find the sum of first 20 terms of AP: 2, 5, 8, 11, ...</p>
          <p><strong>Solution:</strong></p>
          <p>a₁ = 2, d = 3, n = 20</p>
          <p>S₂₀ = 20/2 [2×2 + (20-1)×3]</p>
          <p>S₂₀ = 10 [4 + 57] = 10 × 61 = 610</p>
          
          <h5>Example 3: Finding Number of Terms</h5>
          <p>How many terms of AP: 5, 8, 11, ... must be taken to get a sum of 155?</p>
          <p><strong>Solution:</strong></p>
          <p>a₁ = 5, d = 3, Sₙ = 155</p>
          <p>155 = n/2 [2×5 + (n-1)×3]</p>
          <p>155 = n/2 [10 + 3n - 3] = n/2 [7 + 3n]</p>
          <p>310 = n(7 + 3n) = 7n + 3n²</p>
          <p>3n² + 7n - 310 = 0</p>
          <p>Solving: n = 10 (taking positive value)</p>
        </div>
        
        <h4>Special Cases:</h4>
        <ul>
          <li><strong>Sum of first n natural numbers:</strong> Sₙ = n(n+1)/2</li>
          <li><strong>Sum of first n odd numbers:</strong> Sₙ = n²</li>
          <li><strong>Sum of first n even numbers:</strong> Sₙ = n(n+1)</li>
        </ul>
      `,
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
        },
        {
          id: 'ap-formulas-worksheet',
          type: 'pdf',
          url: '/pdfs/ap-formulas-worksheet.pdf',
          title: 'AP Formulas Worksheet'
        }
      ]
    },
    {
      id: 'ap-practice',
      slug: 'ap-practice',
      title: 'Arithmetic Progressions Practice Problems',
      description: `
        <h3>Arithmetic Progressions Practice Problems</h3>
        <p>Comprehensive practice problems covering all aspects of Arithmetic Progressions including finding terms, sums, and solving word problems.</p>
        
        <h4>Problem Categories:</h4>
        <ul>
          <li><strong>Finding Terms:</strong> nth term, specific terms, missing terms</li>
          <li><strong>Sum Calculations:</strong> Sum of n terms, sum of specific ranges</li>
          <li><strong>Word Problems:</strong> Real-life applications and scenarios</li>
          <li><strong>Properties:</strong> Three consecutive terms, arithmetic mean</li>
          <li><strong>Advanced Problems:</strong> Finding number of terms, solving equations</li>
        </ul>
        
        <h4>Sample Problems:</h4>
        <div class="problem-set">
          <h5>Problem 1:</h5>
          <p>Find the 25th term of the AP: 7, 13, 19, 25, ...</p>
          
          <h5>Problem 2:</h5>
          <p>The sum of first 15 terms of an AP is 300. If the first term is 5, find the common difference.</p>
          
          <h5>Problem 3:</h5>
          <p>In an AP, the 8th term is 17 and the 14th term is 29. Find the AP.</p>
          
          <h5>Problem 4:</h5>
          <p>A man saves ₹100 in the first month, ₹150 in the second month, ₹200 in the third month, and so on. How much will he save in 2 years?</p>
          
          <h5>Problem 5:</h5>
          <p>Find the sum of all three-digit numbers divisible by 7.</p>
        </div>
        
        <h4>Solution Strategies:</h4>
        <ul>
          <li><strong>Identify AP:</strong> Check if difference between consecutive terms is constant</li>
          <li><strong>Use Formulas:</strong> Apply nth term and sum formulas appropriately</li>
          <li><strong>Set up Equations:</strong> Use given information to form equations</li>
          <li><strong>Word Problems:</strong> Translate real-world scenarios into mathematical terms</li>
        </ul>
        
        <h4>Common Mistakes to Avoid:</h4>
        <ul>
          <li>Confusing position number with term value</li>
          <li>Using wrong formula for sum calculation</li>
          <li>Not checking if sequence is actually an AP</li>
          <li>Calculation errors in arithmetic operations</li>
        </ul>
      `,
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
        },
        {
          id: 'ap-solutions',
          type: 'pdf',
          url: '/pdfs/ap-solutions.pdf',
          title: 'Detailed Solutions'
        }
      ]
    },

    // Chapter 6: Triangles
    {
      id: 'triangles-intro',
      slug: 'triangles-intro',
      title: 'Introduction to Triangles',
      description: `
        <h3>Introduction to Triangles and Similarity</h3>
        <p>Triangles are fundamental geometric shapes with important properties and relationships that form the basis of many geometric proofs and applications.</p>
        
        <h4>Basic Properties of Triangles:</h4>
        <ul>
          <li><strong>Sum of Angles:</strong> The sum of all three interior angles is always 180°</li>
          <li><strong>Triangle Inequality:</strong> Sum of any two sides is greater than the third side</li>
          <li><strong>Exterior Angle:</strong> An exterior angle equals the sum of opposite interior angles</li>
          <li><strong>Centroid:</strong> Point where all three medians meet</li>
        </ul>
        
        <h4>Types of Triangles:</h4>
        <ul>
          <li><strong>By Sides:</strong> Equilateral, Isosceles, Scalene</li>
          <li><strong>By Angles:</strong> Acute, Right, Obtuse</li>
          <li><strong>Special Triangles:</strong> Right-angled, Isosceles right-angled</li>
        </ul>
        
        <h4>Similarity of Triangles:</h4>
        <p>Two triangles are similar if their corresponding angles are equal and corresponding sides are proportional.</p>
        
        <h4>Criteria for Similarity:</h4>
        <ul>
          <li><strong>AAA (Angle-Angle-Angle):</strong> All corresponding angles are equal</li>
          <li><strong>SSS (Side-Side-Side):</strong> All corresponding sides are proportional</li>
          <li><strong>SAS (Side-Angle-Side):</strong> Two sides proportional and included angle equal</li>
        </ul>
        
        <h4>Basic Proportionality Theorem (BPT):</h4>
        <p>If a line is drawn parallel to one side of a triangle, it divides the other two sides proportionally.</p>
        
        <h4>Examples:</h4>
        <div class="example-set">
          <h5>Example 1:</h5>
          <p>In triangle ABC, if DE || BC, and AD = 3 cm, DB = 2 cm, AE = 4.5 cm, find EC.</p>
          <p><strong>Solution:</strong></p>
          <p>By BPT: AD/DB = AE/EC</p>
          <p>3/2 = 4.5/EC</p>
          <p>EC = (4.5 × 2)/3 = 3 cm</p>
          
          <h5>Example 2:</h5>
          <p>Prove that triangles ABC and DEF are similar if:</p>
          <p>∠A = ∠D = 60°, ∠B = ∠E = 80°, AB/DE = BC/EF = AC/DF = 2/3</p>
          <p><strong>Solution:</strong></p>
          <p>All corresponding angles are equal (AAA criterion)</p>
          <p>All corresponding sides are proportional (SSS criterion)</p>
          <p>Therefore, ΔABC ~ ΔDEF</p>
        </div>
        
        <h4>Applications:</h4>
        <ul>
          <li><strong>Height Measurement:</strong> Finding heights using shadow lengths</li>
          <li><strong>Map Scaling:</strong> Converting between different scales</li>
          <li><strong>Architecture:</strong> Proportional designs and structures</li>
          <li><strong>Photography:</strong> Maintaining aspect ratios</li>
        </ul>
      `,
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
        },
        {
          id: 'triangles-notes',
          type: 'pdf',
          url: '/pdfs/triangles-intro-notes.pdf',
          title: 'Triangles Study Notes'
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
      description: `
        <h3>Introduction to Trigonometry</h3>
        <p>Trigonometry is the branch of mathematics that deals with the relationships between the sides and angles of triangles.</p>
        <h4>Basic Trigonometric Ratios:</h4>
        <p>For a right-angled triangle with angle θ:</p>
        <ul>
          <li><strong>sin θ = Opposite/Hypotenuse</strong></li>
          <li><strong>cos θ = Adjacent/Hypotenuse</strong></li>
          <li><strong>tan θ = Opposite/Adjacent</strong></li>
        </ul>
        <h4>Standard Angles:</h4>
        <table border="1" style="border-collapse: collapse; width: 100%;">
          <tr>
            <th>Angle</th>
            <th>sin</th>
            <th>cos</th>
            <th>tan</th>
          </tr>
          <tr>
            <td>30°</td>
            <td>1/2</td>
            <td>√3/2</td>
            <td>1/√3</td>
          </tr>
          <tr>
            <td>45°</td>
            <td>1/√2</td>
            <td>1/√2</td>
            <td>1</td>
          </tr>
          <tr>
            <td>60°</td>
            <td>√3/2</td>
            <td>1/2</td>
            <td>√3</td>
          </tr>
        </table>
        <h4>Fundamental Identity:</h4>
        <p><strong>sin²θ + cos²θ = 1</strong></p>
      `,
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
      type: 'quiz',
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
      type: 'quiz',
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
      type: 'quiz',
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
      type: 'quiz',
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
