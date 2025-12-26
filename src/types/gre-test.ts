export type QuestionType = 'single-choice' | 'multi-select' | 'numeric-entry' | 'text-select';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string; // The HTML/Text of the question
  passageId?: string; // If linked to a reading passage
  options?: { id: string; text: string }[]; // For choice/select types
  correctAnswer: string | string[]; // Array for multi-select
  explanation?: string; // Optional explanation for the answer
  topics?: string[]; // Optional related topics
  hints?: string[]; // Optional hints for the question
}

export interface Passage {
  id: string;
  content: string; // HTML content of reading passage
}

export interface SectionRouting {
  nextSectionId: string;
  condition: {
    minScore?: number;
    maxScore?: number;
    default?: boolean; // If true, this is the fallback route
  };
}

export interface TestSection {
  id: string;
  title: string;
  sectionType: 'verbal' | 'quantitative';
  durationSeconds: number;
  questions: Question[];
  passages: Passage[]; // Local to section
  routingRules: SectionRouting[]; // Where to go next
}

export interface GRETest {
  id: string;
  title: string;
  sections: TestSection[]; // Flat list of all possible sections
  startingSectionId: string;
}

