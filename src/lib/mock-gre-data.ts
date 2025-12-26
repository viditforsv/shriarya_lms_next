import { GRETest } from '@/types/gre-test';

export const mockGRETest: GRETest = {
  id: 'gre-mock-test-001',
  title: 'GRE Practice Test',
  startingSectionId: 'verbal-medium',
  sections: [
    {
      id: 'verbal-medium',
      title: 'Verbal Reasoning - Medium',
      sectionType: 'verbal',
      durationSeconds: 1800, // 30 minutes
      passages: [
        {
          id: 'passage-1',
          content: `
            <p><strong>Passage 1</strong></p>
            <p>The study of ancient civilizations reveals that technological advancement does not always correlate with cultural sophistication. While the Romans excelled in engineering and infrastructure, their literary contributions, though significant, were often derivative of Greek models. Conversely, the Greeks, despite their remarkable achievements in philosophy, mathematics, and the arts, lagged behind in practical engineering applications.</p>
            <p>This dichotomy suggests that cultural priorities and available resources shape technological development in ways that are not always predictable. The Romans' emphasis on military expansion and administrative efficiency drove innovations in road-building and aqueducts, while the Greeks' focus on intellectual pursuits fostered advances in abstract thinking and theoretical knowledge.</p>
          `
        }
      ],
      questions: [
        {
          id: 'q1',
          type: 'single-choice',
          prompt: 'According to the passage, which of the following best describes the relationship between Roman and Greek achievements?',
          passageId: 'passage-1',
          options: [
            { id: 'a', text: 'Romans surpassed Greeks in all areas of cultural achievement' },
            { id: 'b', text: 'Greeks were superior to Romans in practical applications' },
            { id: 'c', text: 'Each civilization excelled in different domains' },
            { id: 'd', text: 'Roman achievements were entirely independent of Greek influence' }
          ],
          correctAnswer: 'c'
        },
        {
          id: 'q2',
          type: 'single-choice',
          prompt: 'The passage suggests that technological development is primarily influenced by:',
          passageId: 'passage-1',
          options: [
            { id: 'a', text: 'Inherent intellectual capacity' },
            { id: 'b', text: 'Cultural priorities and available resources' },
            { id: 'c', text: 'Geographic location' },
            { id: 'd', text: 'Population size' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'q3',
          type: 'single-choice',
          prompt: 'Which of the following can be inferred about Greek engineering?',
          passageId: 'passage-1',
          options: [
            { id: 'a', text: 'It was more advanced than Roman engineering' },
            { id: 'b', text: 'It was less developed than their theoretical knowledge' },
            { id: 'c', text: 'It focused primarily on military applications' },
            { id: 'd', text: 'It was derivative of Roman models' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'q4',
          type: 'single-choice',
          prompt: 'The word "dichotomy" in the passage most nearly means:',
          passageId: 'passage-1',
          options: [
            { id: 'a', text: 'Similarity' },
            { id: 'b', text: 'Division into two parts' },
            { id: 'c', text: 'Unification' },
            { id: 'd', text: 'Complexity' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'q5',
          type: 'single-choice',
          prompt: 'Based on the passage, Roman innovations in infrastructure were primarily motivated by:',
          passageId: 'passage-1',
          options: [
            { id: 'a', text: 'Intellectual curiosity' },
            { id: 'b', text: 'Military expansion and administrative efficiency' },
            { id: 'c', text: 'Artistic expression' },
            { id: 'd', text: 'Religious practices' }
          ],
          correctAnswer: 'b'
        }
      ],
      routingRules: [
        {
          nextSectionId: 'verbal-hard',
          condition: { minScore: 4 } // Score 4 or 5 -> Hard section
        },
        {
          nextSectionId: 'verbal-easy',
          condition: { maxScore: 3, default: true } // Score 0-3 -> Easy section
        }
      ]
    },
    {
      id: 'verbal-hard',
      title: 'Verbal Reasoning - Hard',
      sectionType: 'verbal',
      durationSeconds: 1800, // 30 minutes
      passages: [
        {
          id: 'passage-2',
          content: `
            <p><strong>Passage 2 (Hard)</strong></p>
            <p>Postmodern literary theory challenges the traditional notion of authorial intent, positing that meaning is not fixed within a text but emerges through the interaction between reader and text. This perspective, while liberating in its democratization of interpretation, raises questions about the possibility of misreading or the validity of certain interpretations over others.</p>
            <p>Critics of postmodernism argue that this approach leads to interpretive anarchy, where any reading becomes as valid as any other. Proponents counter that acknowledging the constructed nature of meaning does not eliminate the possibility of rigorous analysis, but rather shifts the focus from discovering a single "correct" interpretation to understanding the mechanisms through which meaning is produced.</p>
          `
        }
      ],
      questions: [
        {
          id: 'q6',
          type: 'single-choice',
          prompt: 'The primary purpose of the passage is to:',
          passageId: 'passage-2',
          options: [
            { id: 'a', text: 'Advocate for a return to traditional literary interpretation' },
            { id: 'b', text: 'Present contrasting views on postmodern literary theory' },
            { id: 'c', text: 'Demonstrate the superiority of postmodern approaches' },
            { id: 'd', text: 'Criticize all forms of literary analysis' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'q7',
          type: 'single-choice',
          prompt: 'According to proponents of postmodernism, the shift in focus involves:',
          passageId: 'passage-2',
          options: [
            { id: 'a', text: 'Eliminating the need for rigorous analysis' },
            { id: 'b', text: 'Understanding how meaning is produced rather than finding a single correct interpretation' },
            { id: 'c', text: 'Establishing definitive meanings for texts' },
            { id: 'd', text: 'Rejecting all forms of interpretation' }
          ],
          correctAnswer: 'b'
        }
      ],
      routingRules: [
        {
          nextSectionId: 'test-complete',
          condition: { default: true }
        }
      ]
    },
    {
      id: 'verbal-easy',
      title: 'Verbal Reasoning - Easy',
      sectionType: 'verbal',
      durationSeconds: 1800, // 30 minutes
      passages: [
        {
          id: 'passage-3',
          content: `
            <p><strong>Passage 3 (Easy)</strong></p>
            <p>Reading is one of the most fundamental skills in education. It allows people to access information, learn new concepts, and enjoy stories. Good reading skills help students succeed in school and later in their careers.</p>
            <p>Teachers use various methods to help students improve their reading. Some focus on phonics, while others emphasize comprehension strategies. The best approach often combines multiple techniques tailored to individual student needs.</p>
          `
        }
      ],
      questions: [
        {
          id: 'q8',
          type: 'single-choice',
          prompt: 'What is the main topic of the passage?',
          passageId: 'passage-3',
          options: [
            { id: 'a', text: 'The history of reading' },
            { id: 'b', text: 'The importance of reading skills' },
            { id: 'c', text: 'Teaching methods' },
            { id: 'd', text: 'Student success' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'q9',
          type: 'single-choice',
          prompt: 'According to the passage, what helps students succeed?',
          passageId: 'passage-3',
          options: [
            { id: 'a', text: 'Good reading skills' },
            { id: 'b', text: 'Phonics only' },
            { id: 'c', text: 'Comprehension only' },
            { id: 'd', text: 'One teaching method' }
          ],
          correctAnswer: 'a'
        }
      ],
      routingRules: [
        {
          nextSectionId: 'test-complete',
          condition: { default: true }
        }
      ]
    },
    // Quantitative Reasoning Sections
    {
      id: 'quant-medium',
      title: 'Quantitative Reasoning - Medium',
      sectionType: 'quantitative',
      durationSeconds: 2100, // 35 minutes
      passages: [],
      questions: [
        {
          id: 'q10',
          type: 'single-choice',
          prompt: 'If 3x + 5 = 20, what is the value of x?',
          options: [
            { id: 'a', text: '3' },
            { id: 'b', text: '5' },
            { id: 'c', text: '7' },
            { id: 'd', text: '15' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'q11',
          type: 'single-choice',
          prompt: 'A rectangle has a length of 12 inches and a width of 8 inches. What is its area?',
          options: [
            { id: 'a', text: '20 square inches' },
            { id: 'b', text: '40 square inches' },
            { id: 'c', text: '96 square inches' },
            { id: 'd', text: '100 square inches' }
          ],
          correctAnswer: 'c'
        },
        {
          id: 'q12',
          type: 'numeric-entry',
          prompt: 'If a train travels 240 miles in 4 hours, what is its average speed in miles per hour?',
          correctAnswer: '60'
        },
        {
          id: 'q13',
          type: 'single-choice',
          prompt: 'What is 25% of 80?',
          options: [
            { id: 'a', text: '15' },
            { id: 'b', text: '20' },
            { id: 'c', text: '25' },
            { id: 'd', text: '30' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'q14',
          type: 'single-choice',
          prompt: 'If the radius of a circle is 5 units, what is its circumference? (Use π = 3.14)',
          options: [
            { id: 'a', text: '15.7 units' },
            { id: 'b', text: '31.4 units' },
            { id: 'c', text: '78.5 units' },
            { id: 'd', text: '157 units' }
          ],
          correctAnswer: 'b'
        }
      ],
      routingRules: [
        {
          nextSectionId: 'quant-hard',
          condition: { minScore: 4 } // Score 4 or 5 -> Hard section
        },
        {
          nextSectionId: 'quant-easy',
          condition: { maxScore: 3, default: true } // Score 0-3 -> Easy section
        }
      ]
    },
    {
      id: 'quant-hard',
      title: 'Quantitative Reasoning - Hard',
      sectionType: 'quantitative',
      durationSeconds: 2100, // 35 minutes
      passages: [],
      questions: [
        {
          id: 'q15',
          type: 'single-choice',
          prompt: 'If f(x) = x² + 3x - 10, what is f(2)?',
          options: [
            { id: 'a', text: '0' },
            { id: 'b', text: '2' },
            { id: 'c', text: '4' },
            { id: 'd', text: '6' }
          ],
          correctAnswer: 'a'
        },
        {
          id: 'q16',
          type: 'numeric-entry',
          prompt: 'A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?',
          correctAnswer: '10'
        },
        {
          id: 'q17',
          type: 'single-choice',
          prompt: 'If log₂(x) = 5, what is the value of x?',
          options: [
            { id: 'a', text: '10' },
            { id: 'b', text: '25' },
            { id: 'c', text: '32' },
            { id: 'd', text: '64' }
          ],
          correctAnswer: 'c'
        }
      ],
      routingRules: [
        {
          nextSectionId: 'test-complete',
          condition: { default: true }
        }
      ]
    },
    {
      id: 'quant-easy',
      title: 'Quantitative Reasoning - Easy',
      sectionType: 'quantitative',
      durationSeconds: 2100, // 35 minutes
      passages: [],
      questions: [
        {
          id: 'q18',
          type: 'single-choice',
          prompt: 'What is 2 + 3?',
          options: [
            { id: 'a', text: '4' },
            { id: 'b', text: '5' },
            { id: 'c', text: '6' },
            { id: 'd', text: '7' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'q19',
          type: 'single-choice',
          prompt: 'What is 10 × 5?',
          options: [
            { id: 'a', text: '40' },
            { id: 'b', text: '50' },
            { id: 'c', text: '60' },
            { id: 'd', text: '70' }
          ],
          correctAnswer: 'b'
        },
        {
          id: 'q20',
          type: 'numeric-entry',
          prompt: 'What is 15 - 7?',
          correctAnswer: '8'
        }
      ],
      routingRules: [
        {
          nextSectionId: 'test-complete',
          condition: { default: true }
        }
      ]
    }
  ]
};

