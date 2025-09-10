import { LessonConfig } from '@/lib/course-config'

export const lessons: LessonConfig[] = [
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
        id: 'properties-worksheet',
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
    id: 'trigonometric-ratios',
    slug: 'trigonometric-ratios',
    title: 'Trigonometric Ratios',
    description: `
      <h3>Trigonometric Ratios</h3>
      <p>Trigonometric ratios are fundamental relationships between the sides of a right-angled triangle and its angles.</p>
      
      <h4>Basic Ratios:</h4>
      <ul>
        <li><strong>Sine (sin):</strong> Opposite side / Hypotenuse</li>
        <li><strong>Cosine (cos):</strong> Adjacent side / Hypotenuse</li>
        <li><strong>Tangent (tan):</strong> Opposite side / Adjacent side</li>
      </ul>
      
      <h4>Reciprocal Ratios:</h4>
      <ul>
        <li><strong>Cosecant (cosec):</strong> 1/sin = Hypotenuse / Opposite side</li>
        <li><strong>Secant (sec):</strong> 1/cos = Hypotenuse / Adjacent side</li>
        <li><strong>Cotangent (cot):</strong> 1/tan = Adjacent side / Opposite side</li>
      </ul>
      
      <h4>Example:</h4>
      <p>In a right triangle with sides 3, 4, 5:</p>
      <p>sin θ = 3/5, cos θ = 4/5, tan θ = 3/4</p>
    `,
    duration: '45 minutes',
    type: 'video',
    isPreview: false,
    order: 4,
    resources: [
      {
        id: 'trig-ratios-video',
        type: 'video',
        url: '/videos/trigonometric-ratios.mp4',
        title: 'Trigonometric Ratios Video',
        duration: 1800
      }
    ]
  },
  {
    id: 'probability-practice',
    slug: 'probability-practice',
    title: 'Probability Practice Problems',
    description: `
      <h3>Probability Practice Problems</h3>
      <p>Practice solving probability problems with real-world examples and step-by-step solutions.</p>
      
      <h4>Problem Types:</h4>
      <ul>
        <li><strong>Basic Probability:</strong> Finding probability of single events</li>
        <li><strong>Compound Events:</strong> Probability of multiple events</li>
        <li><strong>Conditional Probability:</strong> Probability given certain conditions</li>
        <li><strong>Real-world Applications:</strong> Weather, games, surveys</li>
      </ul>
      
      <h4>Example Problem:</h4>
      <p>A bag contains 5 red balls and 3 blue balls. What is the probability of drawing a red ball?</p>
      <p><strong>Solution:</strong> P(Red) = 5/(5+3) = 5/8</p>
    `,
    duration: '50 minutes',
    type: 'practice',
    isPreview: false,
    order: 5,
    resources: [
      {
        id: 'probability-worksheet',
        type: 'pdf',
        url: '/pdfs/probability-practice.pdf',
        title: 'Probability Practice Worksheet'
      }
    ]
  }
]
