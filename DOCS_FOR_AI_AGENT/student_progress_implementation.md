# Student Progress Dashboard Implementation

## Overview

Complete implementation of student progress tracking with tag mastery, R/Y/G adaptation rules, and admin analytics dashboard.

## Database Schema

### Tables Created

#### 1. `student_performance_log`

Tracks every individual question attempt with detailed metrics:

- `student_id`: FK to auth.users
- `question_id`: FK to question_bank
- `attempt_number`: Nth attempt for the same question
- `time_taken_seconds`: Time spent on this attempt
- `is_correct`: Boolean accuracy flag
- `difficulty_level`: Question difficulty (1-10)
- `hint_used`: Whether student used hints
- `session_id`: Groups attempts in same practice session
- `tags[]`: Array of tags from the question

#### 2. `student_tag_mastery`

Aggregated performance metrics per tag:

- `tag_name`: The skill/concept tag
- `total_attempts` / `correct_attempts`: Attempt counts
- `accuracy`: Percentage (0-100)
- `avg_time_seconds`: Average time per question
- `mastery_level`: R/Y/G classification
  - **Red**: < 60% accuracy (needs reteaching)
  - **Yellow**: 60-85% accuracy (developing)
  - **Green**: > 85% accuracy (mastered)
- `mastery_score`: Composite score (0-100)
- `improvement_rate`: Learning velocity
- `retention_score`: Long-term memory tracking

### Auto-Update Trigger

A PostgreSQL trigger (`update_student_tag_mastery()`) automatically recalculates tag mastery whenever a new attempt is logged:

- Aggregates all attempts for each tag
- Calculates accuracy, time, difficulty progression
- Assigns R/Y/G mastery level
- Computes composite mastery score (70% accuracy + 20% difficulty + 10% consistency)

## API Endpoints

### 1. Record Question Attempt

```
POST /api/student-progress/attempts
```

**Body:**

```json
{
  "question_id": "uuid",
  "lesson_id": "uuid",
  "course_id": "uuid",
  "time_taken_seconds": 45,
  "is_correct": true,
  "hint_used": false,
  "session_id": "session_123",
  "session_order": 5
}
```

### 2. Get Student Attempts

```
GET /api/student-progress/attempts?studentId=xxx&courseId=xxx
```

Query params: `studentId`, `questionId`, `courseId`, `lessonId`, `sessionId`, `limit`

### 3. Get Tag Mastery

```
GET /api/student-progress/tag-mastery?studentId=xxx&courseId=xxx
```

Returns all tag mastery records with R/Y/G classification

### 4. Get Student Analytics

```
GET /api/student-progress/analytics?studentId=xxx&courseId=xxx
```

Returns comprehensive analytics:

- Overview stats (attempts, accuracy, avg time)
- Tag mastery breakdown
- Mastery distribution (R/Y/G counts)
- Recent attempts

### 5. Get Class Analytics (Admin Only)

```
GET /api/student-progress/class-analytics?courseId=xxx
```

Returns class-wide metrics:

- Overview (total students, attempts, class accuracy)
- Student rankings by mastery score
- Tag insights (which tags are difficult/easy)
- Struggling tags (most red mastery)
- Mastered tags (most green mastery)

## Frontend Components

### Admin Dashboard

**Path:** `/admin/student-progress`

Features:

- **Overview Tab**: Class stats, R/Y/G distribution, struggling/mastered tags
- **Students Tab**: Student performance rankings with R/Y/G counts
- **Tags Tab**: Detailed per-tag analytics across all students
- Course filtering
- Real-time metrics

### React Hooks

#### `useQuestionAttempt()`

```typescript
const { recordAttempt, loading, error } = useQuestionAttempt();

await recordAttempt({
  questionId: "uuid",
  courseId: "uuid",
  timeSpentSeconds: 45,
  isCorrect: true,
  hintUsed: false,
});
```

#### `useStudentProgress()`

```typescript
const { analytics, tagMastery, loading, getWeakTags, getStrongTags } =
  useStudentProgress({ courseId: "xxx" });

// Get weak tags (red mastery)
const weakTags = getWeakTags();

// Check mastery level for specific tag
const chainRuleMastery = getTagMasteryLevel("Chain Rule");
```

## R/Y/G Adaptation Rules

### Red (Struggling - < 60% accuracy)

**Actions:**

- Reteach fundamentals
- Provide more practice at lower difficulty
- Show hints and step-by-step solutions
- Schedule frequent reviews

### Yellow (Developing - 60-85% accuracy)

**Actions:**

- Continue practice at current difficulty
- Gradually increase difficulty
- Mix with higher-level questions
- Monitor for improvement

### Green (Mastered - > 85% accuracy)

**Actions:**

- Move to advanced topics
- Challenge with harder questions
- Use for spaced repetition
- Apply in combined/application problems

## Content Effectiveness Metrics

The dashboard tracks:

1. **Struggling Tags**: Most students have red mastery
2. **Mastered Tags**: Most students have green mastery
3. **Per-Tag Difficulty Level**: Based on class performance
4. **Average Time**: Expected vs actual time per tag
5. **Student Ranking**: By composite mastery score

## Usage Example

### 1. Deploy Database Schema

Run the SQL script in your Supabase SQL Editor or via psql:

```bash
# Run the SQL migration in Supabase Studio SQL Editor
# Or use psql with your SQL file
```

### 2. Track Question Attempts

In your question component:

```typescript
import { useQuestionAttempt } from "@/hooks/useQuestionAttempt";

const QuestionCard = ({ question, courseId, lessonId }) => {
  const { recordAttempt } = useQuestionAttempt();
  const [startTime, setStartTime] = useState(Date.now());

  const handleSubmit = async (isCorrect: boolean) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    await recordAttempt({
      questionId: question.id,
      courseId,
      lessonId,
      timeSpentSeconds: timeSpent,
      isCorrect,
    });
  };
};
```

### 3. View Admin Dashboard

Navigate to `/admin/student-progress` and select a course to see:

- Class performance overview
- Student rankings
- Tag mastery insights
- Struggling vs mastered tags

## Security

- **Row Level Security (RLS)** enabled on both tables
- Students can only view/insert their own data
- Admins can view all data
- API endpoints verify user authentication
- Course enrollment checks (for paid courses)

## Future Enhancements

1. **Retention Tracking**: Track performance decay over time
2. **Spaced Repetition**: Auto-schedule reviews based on retention curve
3. **Personalized Recommendations**: Suggest next questions based on weak tags
4. **AI Tutor Integration**: Context-aware help for struggling tags
5. **Stamina Detection**: Identify when students get tired
6. **Learning Velocity**: Track improvement rate over time
7. **Export Reports**: PDF/CSV exports for teachers

## Files Created

### Database

- SQL migration files should be created and run in Supabase Studio

### API Routes

- `src/app/api/student-progress/attempts/route.ts`
- `src/app/api/student-progress/tag-mastery/route.ts`
- `src/app/api/student-progress/analytics/route.ts`
- `src/app/api/student-progress/class-analytics/route.ts`

### Frontend

- `src/app/admin/student-progress/page.tsx`
- `src/hooks/useQuestionAttempt.ts`
- `src/hooks/useStudentProgress.ts`

### Documentation

- This file contains the complete implementation guide
