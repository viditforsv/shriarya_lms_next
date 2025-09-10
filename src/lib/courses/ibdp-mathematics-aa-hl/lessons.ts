import { LessonConfig } from '@/lib/course-config'

export const lessons: LessonConfig[] = [
  // Sequences and Series
  {
    id: 'arithmetic-sequences',
    slug: 'arithmetic-sequences',
    title: 'Arithmetic Sequences and Series',
    description: `
      <h3>Arithmetic Sequences and Series</h3>
      <p>An arithmetic sequence is a sequence where each term after the first is obtained by adding a constant difference to the previous term.</p>
      
      <h4>Key Concepts:</h4>
      <ul>
        <li><strong>General Term:</strong> uₙ = u₁ + (n-1)d</li>
        <li><strong>Sum Formula:</strong> Sₙ = n/2[2u₁ + (n-1)d]</li>
        <li><strong>Common Difference:</strong> d = uₙ₊₁ - uₙ</li>
      </ul>
      
      <h4>Example:</h4>
      <p>For the sequence 3, 7, 11, 15, ...</p>
      <p>• First term (u₁) = 3</p>
      <p>• Common difference (d) = 4</p>
      <p>• 10th term = 3 + (10-1)×4 = 39</p>
      <p>• Sum of first 10 terms = 10/2[2×3 + (10-1)×4] = 210</p>
    `,
    duration: '60 minutes',
    type: 'video',
    isPreview: true,
    order: 1,
    resources: [
      {
        id: 'arithmetic-sequences-video',
        type: 'video',
        url: '/videos/arithmetic-sequences.mp4',
        title: 'Arithmetic Sequences Video',
        duration: 2400
      },
      {
        id: 'arithmetic-practice',
        type: 'pdf',
        url: '/pdfs/arithmetic-sequences-practice.pdf',
        title: 'Arithmetic Sequences Practice Problems'
      }
    ]
  },
  {
    id: 'geometric-sequences',
    slug: 'geometric-sequences',
    title: 'Geometric Sequences and Series',
    description: `
      <h3>Geometric Sequences and Series</h3>
      <p>A geometric sequence is a sequence where each term after the first is obtained by multiplying the previous term by a constant ratio.</p>
      
      <h4>Key Concepts:</h4>
      <ul>
        <li><strong>General Term:</strong> uₙ = u₁ × r^(n-1)</li>
        <li><strong>Sum Formula:</strong> Sₙ = u₁(1-r^n)/(1-r) for r ≠ 1</li>
        <li><strong>Common Ratio:</strong> r = uₙ₊₁/uₙ</li>
      </ul>
      
      <h4>Example:</h4>
      <p>For the sequence 2, 6, 18, 54, ...</p>
      <p>• First term (u₁) = 2</p>
      <p>• Common ratio (r) = 3</p>
      <p>• 5th term = 2 × 3^(5-1) = 162</p>
      <p>• Sum of first 5 terms = 2(1-3^5)/(1-3) = 242</p>
    `,
    duration: '65 minutes',
    type: 'video',
    isPreview: false,
    order: 2,
    resources: [
      {
        id: 'geometric-sequences-video',
        type: 'video',
        url: '/videos/geometric-sequences.mp4',
        title: 'Geometric Sequences Video',
        duration: 2600
      }
    ]
  },
  {
    id: 'complex-numbers-intro',
    slug: 'complex-numbers-intro',
    title: 'Introduction to Complex Numbers',
    description: `
      <h3>Complex Numbers</h3>
      <p>Complex numbers extend the real number system to include solutions to equations like x² + 1 = 0.</p>
      
      <h4>Key Concepts:</h4>
      <ul>
        <li><strong>Definition:</strong> z = a + bi where i² = -1</li>
        <li><strong>Real Part:</strong> Re(z) = a</li>
        <li><strong>Imaginary Part:</strong> Im(z) = b</li>
        <li><strong>Conjugate:</strong> z* = a - bi</li>
      </ul>
      
      <h4>Operations:</h4>
      <p>• Addition: (a + bi) + (c + di) = (a + c) + (b + d)i</p>
      <p>• Multiplication: (a + bi)(c + di) = (ac - bd) + (ad + bc)i</p>
      <p>• Division: Use conjugate to rationalize</p>
    `,
    duration: '50 minutes',
    type: 'video',
    isPreview: false,
    order: 3,
    resources: [
      {
        id: 'complex-numbers-video',
        type: 'video',
        url: '/videos/complex-numbers-intro.mp4',
        title: 'Complex Numbers Introduction Video',
        duration: 2000
      }
    ]
  },
  {
    id: 'derivative-basics',
    slug: 'derivative-basics',
    title: 'Introduction to Derivatives',
    description: `
      <h3>Derivatives</h3>
      <p>The derivative of a function represents the instantaneous rate of change of the function at any point.</p>
      
      <h4>Key Concepts:</h4>
      <ul>
        <li><strong>Definition:</strong> f'(x) = lim[h→0] [f(x+h) - f(x)]/h</li>
        <li><strong>Power Rule:</strong> d/dx(x^n) = nx^(n-1)</li>
        <li><strong>Product Rule:</strong> d/dx[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)</li>
        <li><strong>Quotient Rule:</strong> d/dx[f(x)/g(x)] = [f'(x)g(x) - f(x)g'(x)]/g(x)²</li>
      </ul>
      
      <h4>Applications:</h4>
      <p>• Finding tangent lines</p>
      <p>• Optimization problems</p>
      <p>• Rate of change problems</p>
    `,
    duration: '65 minutes',
    type: 'video',
    isPreview: false,
    order: 4,
    resources: [
      {
        id: 'derivatives-video',
        type: 'video',
        url: '/videos/derivatives-intro.mp4',
        title: 'Derivatives Introduction Video',
        duration: 2600
      },
      {
        id: 'derivatives-worksheet',
        type: 'pdf',
        url: '/pdfs/derivatives-practice.pdf',
        title: 'Derivatives Practice Worksheet'
      }
    ]
  },
  {
    id: 'integration-basics',
    slug: 'integration-basics',
    title: 'Introduction to Integration',
    description: `
      <h3>Integration</h3>
      <p>Integration is the reverse process of differentiation and is used to find areas under curves and solve differential equations.</p>
      
      <h4>Key Concepts:</h4>
      <ul>
        <li><strong>Indefinite Integral:</strong> ∫f(x)dx = F(x) + C</li>
        <li><strong>Definite Integral:</strong> ∫[a to b]f(x)dx = F(b) - F(a)</li>
        <li><strong>Power Rule:</strong> ∫x^n dx = x^(n+1)/(n+1) + C</li>
        <li><strong>Fundamental Theorem:</strong> d/dx[∫f(x)dx] = f(x)</li>
      </ul>
      
      <h4>Applications:</h4>
      <p>• Finding areas under curves</p>
      <p>• Solving differential equations</p>
      <p>• Volume calculations</p>
    `,
    duration: '65 minutes',
    type: 'video',
    isPreview: false,
    order: 5,
    resources: [
      {
        id: 'integration-video',
        type: 'video',
        url: '/videos/integration-intro.mp4',
        title: 'Integration Introduction Video',
        duration: 2600
      }
    ]
  }
]
