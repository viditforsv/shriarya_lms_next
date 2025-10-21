# IBDP Math Template

A specialized course template for IBDP Mathematics courses with interactive question practice and AI tutor integration.

## 🎯 Overview

The IBDP Math Template provides a two-panel layout optimized for mathematics learning:

- **Left Panel**: Collapsible navigation sidebar with Units → Chapters → Lessons hierarchy
- **Right Panel**: Main content area with Questions and Concepts tabs

## 📁 Components

### 1. IBDPMathLessonPage

The main container component that orchestrates the entire lesson experience.

**Features:**

- Two-panel layout (sidebar + main content)
- Collapsible sidebar with search functionality
- Progress tracking per lesson
- Resume last lesson functionality
- Tab-based content organization

**Props:**

```typescript
interface IBDPMathLessonPageProps {
  courseSlug: string;
  currentLessonSlug: string;
  units: Unit[];
  currentLesson: Lesson;
  questions?: Question[];
  unitName?: string;
  chapterName?: string;
  onProgressUpdate?: (lessonId: string, progress: number) => void;
}
```

### 2. IBDPQuestionCard

Interactive question card with LaTeX rendering and progress tracking.

**Features:**

- KaTeX LaTeX rendering for mathematical content
- Auto-start timer on question open
- Self-assessment buttons (Correct/Incorrect/Skip)
- Toggle solution visibility
- Tag-based navigation to concepts
- Review later functionality
- Time tracking and recording

**Props:**

```typescript
interface IBDPQuestionCardProps {
  questionId: string;
  questionText: string;
  tags: string[];
  marks: number;
  solution?: string;
  onMarkDone?: (
    questionId: string,
    timeSpent: number,
    result: "correct" | "incorrect" | "skip"
  ) => void;
  onReviewLater?: (questionId: string) => void;
  onTagClick?: (tag: string) => void;
}
```

### 3. IBDPConceptsTab

Multi-tab concept explorer with AI tutor integration.

**Features:**

- Three sub-tabs: Concepts, Formulas, AI Tutor
- Concept summaries with key points
- Formula sheet with LaTeX rendering
- AI chatbot for topic-specific help
- Recommended practice questions
- Topic-locked AI responses (IBDP Math only)

**Props:**

```typescript
interface IBDPConceptsTabProps {
  unitName: string;
  chapterName: string;
  lessonName: string;
  tags?: string[];
  conceptSummary?: ConceptSummary;
  formulas?: Formula[];
  recommendedQuestions?: RecommendedQuestion[];
  onQuestionClick?: (questionId: string) => void;
}
```

## 🎨 Design System

The template follows the existing design system:

- **Colors:**
  - Primary: `#e27447` (orange accent)
  - Background: `#feefea` (light peach)
  - Text: `#1e293b` (dark slate)
- **Components:** Shadcn/UI with Tailwind CSS
- **Border Radius:** `rounded-sm` (consistent with project standards)
- **Icons:** Lucide React icons in black or theme orange

## 🔄 Data Flow

### Question Progress Tracking

When a student marks a question:

```typescript
handleMarkDone(questionId, timeSpent, result)
  ↓
Update local state (completedQuestions)
  ↓
Calculate progress percentage
  ↓
Call onProgressUpdate callback
  ↓
Save to database (TODO)
```

**Database Fields to Save:**

- `question_id`
- `student_id`
- `time_spent` (seconds)
- `result` ('correct' | 'incorrect' | 'skip')
- `timestamp`
- `lesson_id`

### Review Later Functionality

```typescript
handleReviewLater(questionId)
  ↓
Toggle reviewLaterQuestions Set
  ↓
Update UI badge count
  ↓
Save to database (TODO)
```

**Database Fields:**

- `question_id`
- `student_id`
- `flagged` (boolean)
- `timestamp`

## 🤖 AI Chatbot Integration

The AI chatbot is context-aware and topic-locked:

**Context Provided:**

- `unit_name`
- `chapter_name`
- `lesson_name`
- `tags[]` (from last viewed question)
- `board: "IBDP"`

**Behavior:**

- Strictly mathematical responses
- IBDP syllabus-aligned
- LaTeX-formatted explanations
- Can recommend practice questions
- Topic-locked (no off-topic responses)

**Future Integration:**
Replace the mock AI response in `IBDPConceptsTab.tsx` with:

```typescript
const response = await fetch("/api/ai-tutor", {
  method: "POST",
  body: JSON.stringify({
    message: currentMessage,
    context: {
      unitName,
      chapterName,
      lessonName,
      tags,
      board: "IBDP",
    },
  }),
});
```

## 📊 Progress Indicators

### Sidebar Progress Card

- Shows current lesson completion percentage
- Displays completed questions count
- Shows review later count
- Visual progress bar

### Question Status Icons

- ✅ Completed
- 🔖 Review Later
- ⏱️ In Progress

## 🔧 Extensibility

The template is designed for future enhancements:

### Phase 2 Features (Ready to Add)

1. **Adaptive Difficulty**

   - Track performance per tag
   - Recommend easier/harder questions
   - Adjust difficulty dynamically

2. **Analytics Dashboard**

   - Weekly progress summary
   - Time spent per topic
   - Accuracy by difficulty level
   - Weak areas identification

3. **Gamification**

   - XP points system
   - Achievement badges
   - Leaderboard integration
   - Streak tracking

4. **Teacher Mode**

   - Toggle to show all solutions
   - View student progress
   - Analytics overlay

5. **Question Filters**
   - Filter by tag
   - Filter by difficulty
   - Filter by status (done/pending/review)

## 🚀 Usage

### Demo Page

Visit `/components-demo/ibdp-math-template-demo` to see the template in action.

### Integration with Course System

To use this template for an actual course:

1. Create an IBDP course in the database
2. Link the course to this template ID
3. Add units, chapters, and lessons
4. Populate questions with LaTeX content
5. Configure formulas and concept summaries

### Sample Question Format

```typescript
{
  id: "q1",
  question_text: "Find the sum: $\\sum_{i=1}^{n} i = ?$",
  tags: ["sequences", "summation", "arithmetic"],
  marks: 5,
  difficulty: 4,
  solution: "Using the formula $S_n = \\frac{n(n+1)}{2}$..."
}
```

## 📝 LaTeX Rendering

All mathematical content is rendered using KaTeX:

- Inline math: `$x^2 + y^2 = r^2$`
- Display math: `$$\\int_0^\\infty e^{-x} dx$$`
- Text formatting supported
- Color commands available

## 🎓 Pedagogical Features

1. **Self-Paced Learning**: Students control when to view solutions
2. **Self-Assessment**: Immediate feedback through self-marking
3. **Time Awareness**: Automatic time tracking builds exam skills
4. **Concept Reinforcement**: Easy navigation between practice and theory
5. **AI Support**: On-demand help without breaking flow

## 🛠️ Technical Notes

- Built with Next.js 14+ (App Router)
- Client-side rendering for interactivity
- Local state management (can be upgraded to Zustand/Redux if needed)
- LocalStorage for resume functionality
- Responsive design (desktop-first, as per project requirements)

## 📦 Dependencies

- `katex`: LaTeX rendering
- `lucide-react`: Icons
- `@radix-ui/*`: UI components (via shadcn/ui)
- `tailwindcss`: Styling

## 🔍 Future Optimizations

1. Virtualize question list for large question banks
2. Preload next lesson content
3. Cache AI responses
4. Offline mode support
5. Progressive Web App (PWA) features
