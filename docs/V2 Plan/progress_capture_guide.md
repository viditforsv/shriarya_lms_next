# 📊 Student Progress Capture System

## 🎯 Overview

**Goal:** Capture every student interaction with questions, analyze performance per tag, and generate visual mastery heatmaps.

---

## 1️⃣ Question Types & Answer Capture

### Supported Question Types

| Type                      | Capture Method                           | Scoring Logic                  |
| ------------------------- | ---------------------------------------- | ------------------------------ |
| **MCQ (Multiple Choice)** | Radio buttons → record selected option   | Binary: Correct/Incorrect      |
| **Subjective**            | Text area → record written answer        | Manual or AI grading           |
| **True/False**            | Toggle → record boolean                  | Binary: Correct/Incorrect      |
| **Fill in the Blank**     | Text input → record entered text         | Exact match or fuzzy           |
| **Match the Following**   | Drag & drop pairs → record matched pairs | Partial credit per match       |
| **Short Answer**          | Text input → record answer               | Semantic similarity or keyword |

### Data Capture Flow

```
Student Interaction → Record Attempt → Calculate Score → Update Tag Mastery
```

---

## 2️⃣ Database Schema for Progress Tracking

### Core Tables

```sql
-- Student's raw attempt data
CREATE TABLE student_question_attempts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id uuid REFERENCES auth.users(id),
    question_id uuid REFERENCES question_bank(id),
    lesson_id uuid REFERENCES courses_lessons(id),

    -- Answer capture
    selected_answer jsonb,           -- {option: "A", text: "...", matched_pairs: [...]}
    is_correct boolean,
    score decimal(5,2),              -- 0.00 to 1.00 (percentage)

    -- Performance metrics
    time_taken_seconds integer,
    attempts_count integer,
    hints_used integer,
    first_attempt_correct boolean,

    -- Metadata
    session_id text,                 -- Group attempts from same practice session
    created_at timestamptz DEFAULT now(),

    -- Tag context (denormalized for fast queries)
    tags text[]
);

-- Aggregated mastery per tag (fast lookup)
CREATE TABLE student_tag_mastery (
    student_id uuid REFERENCES auth.users(id),
    tag_name text,

    -- Metrics
    total_attempts integer DEFAULT 0,
    correct_attempts integer DEFAULT 0,
    mastery_score decimal(5,2),     -- 0.00 to 1.00
    avg_time_seconds integer,
    last_attempted_at timestamptz,

    -- Advanced metrics
    retention_score decimal(5,2),    -- Accuracy after time gap
    stamina_indicator decimal(5,2), -- Performance over long sessions
    adaptability_score decimal(5,2), -- Success on new question patterns

    PRIMARY KEY (student_id, tag_name),
    updated_at timestamptz DEFAULT now()
);

-- Question attempt details (for detailed analytics)
CREATE TABLE question_attempt_metadata (
    attempt_id uuid REFERENCES student_question_attempts(id),
    tag text,
    time_on_question integer,       -- Seconds
    intermediate_steps jsonb,         -- For debugging: "[did they use hint? show work?]"
    confidence_level integer,        -- 1-5 self-reported
    review_later boolean,

    PRIMARY KEY (attempt_id, tag)
);
```

---

## 3️⃣ Answer Capture Implementation

### Example: MCQ Capture

```typescript
// src/app/api/student-progress/attempts/route.ts

export async function POST(request: NextRequest) {
  const { student_id, question_id, selected_answer, time_taken } =
    await request.json();

  const supabase = await createClient();

  // 1. Get question details
  const { data: question } = await supabase
    .from("question_bank")
    .select("correct_answer, tags, question_type")
    .eq("id", question_id)
    .single();

  // 2. Determine if correct
  let is_correct = false;
  let score = 0;

  if (question.question_type === "mcq") {
    is_correct = selected_answer === question.correct_answer;
    score = is_correct ? 1.0 : 0.0;
  } else if (question.question_type === "match_following") {
    // Match the following: partial credit per match
    const correct_pairs = question.correct_answer; // JSON array of pairs
    const student_pairs = selected_answer;
    score = calculateMatchScore(correct_pairs, student_pairs);
    is_correct = score === 1.0;
  } else if (question.question_type === "subjective") {
    // Subjective: AI grading or manual
    const grading = await gradeSubjective(
      selected_answer,
      question.correct_answer
    );
    is_correct = grading.score > 0.7; // Threshold
    score = grading.score;
  }

  // 3. Save attempt
  const { data: attempt } = await supabase
    .from("student_question_attempts")
    .insert({
      student_id,
      question_id,
      selected_answer,
      is_correct,
      score,
      time_taken_seconds: time_taken,
      tags: question.tags,
    })
    .select()
    .single();

  // 4. Update tag mastery (aggregation)
  await updateTagMastery(student_id, question.tags, {
    correct: is_correct,
    score,
    time_taken,
  });

  return NextResponse.json({ attempt_id: attempt.id, is_correct, score });
}
```

### Example: Match the Following

```typescript
function calculateMatchScore(correct: string[], student: string[]): number {
  let correctCount = 0;

  // Compare each matched pair
  correct.forEach((pair, index) => {
    if (student[index] === pair) correctCount++;
  });

  return correctCount / correct.length;
}
```

---

## 4️⃣ Tag-Level Aggregation Queries

### Query 1: Calculate Mastery Score Per Tag

```sql
-- Aggregation function: Update mastery for specific tags
CREATE OR REPLACE FUNCTION update_tag_mastery(
    p_student_id uuid,
    p_tags text[],
    p_is_correct boolean,
    p_score decimal,
    p_time_taken integer
) RETURNS void AS $$
DECLARE
    tag text;
BEGIN
    -- Loop through each tag
    FOREACH tag IN ARRAY p_tags LOOP
        -- Upsert: Insert or update existing record
        INSERT INTO student_tag_mastery (
            student_id,
            tag_name,
            total_attempts,
            correct_attempts,
            mastery_score,
            avg_time_seconds,
            last_attempted_at
        ) VALUES (
            p_student_id,
            tag,
            1,
            CASE WHEN p_is_correct THEN 1 ELSE 0 END,
            p_score,
            p_time_taken,
            NOW()
        )
        ON CONFLICT (student_id, tag_name) DO UPDATE SET
            total_attempts = student_tag_mastery.total_attempts + 1,
            correct_attempts = student_tag_mastery.correct_attempts +
                             CASE WHEN p_is_correct THEN 1 ELSE 0 END,
            mastery_score = (student_tag_mastery.correct_attempts +
                            CASE WHEN p_is_correct THEN 1 ELSE 0 END)::decimal /
                           (student_tag_mastery.total_attempts + 1),
            avg_time_seconds = (student_tag_mastery.avg_time_seconds * student_tag_mastery.total_attempts + p_time_taken) / (student_tag_mastery.total_attempts + 1),
            last_attempted_at = NOW(),
            updated_at = NOW();
    END LOOP;
END;
$$ LANGUAGE plpgsql;
```

### Query 2: Get Student's Tag Mastery Heatmap

```typescript
// src/app/api/student-progress/tag-mastery/route.ts

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const student_id = searchParams.get("student_id");

  const supabase = await createClient();

  // Fetch all tag mastery scores
  const { data: mastery } = await supabase
    .from("student_tag_mastery")
    .select("tag_name, mastery_score, total_attempts, last_attempted_at")
    .eq("student_id", student_id)
    .order("mastery_score", { ascending: false });

  // Format for heatmap
  const heatmap_data = mastery?.map((tag) => ({
    tag: tag.tag_name,
    score: tag.mastery_score,
    attempts: tag.total_attempts,
    status: getRYGStatus(tag.mastery_score), // 🔴 Yellow 🟢
    last_attempted: tag.last_attempted_at,
  }));

  return NextResponse.json({ heatmap_data });
}

function getRYGStatus(score: number): "red" | "yellow" | "green" {
  if (score < 0.5) return "red"; // 🔴 Weak - Need re-teach
  if (score < 0.8) return "yellow"; // 🟡 Practice - Keep practicing
  return "green"; // 🟢 Mastered - Ready to advance
}
```

### Query 3: Get Weakest Tags (Recommendation Engine)

```sql
-- SQL: Find tags where student needs practice
SELECT
    tag_name,
    mastery_score,
    total_attempts,
    last_attempted_at
FROM student_tag_mastery
WHERE student_id = 'student-uuid'
    AND mastery_score < 0.7          -- Below 70%
    AND total_attempts > 0            -- Has practiced
ORDER BY mastery_score ASC, last_attempted_at ASC
LIMIT 10;                             -- Top 10 weakest
```

### Query 4: Calculate Retention Score

```sql
-- Find questions attempted more than 7 days ago
WITH retention_data AS (
    SELECT
        tag_name,
        SUM(CASE WHEN first_attempt_correct = true THEN 1 ELSE 0 END) as first_correct,
        SUM(CASE WHEN is_correct = true THEN 1 ELSE 0 END) as later_correct,
        COUNT(*) as total_review_attempts
    FROM student_question_attempts
    WHERE student_id = 'student-uuid'
        AND created_at < NOW() - INTERVAL '7 days'
    GROUP BY tag_name
)
SELECT
    tag_name,
    first_correct::decimal / total_review_attempts as first_attempt_accuracy,
    later_correct::decimal / total_review_attempts as retention_accuracy,
    (later_correct::decimal / total_review_attempts) - (first_correct::decimal / total_review_attempts) as retention_score
FROM retention_data;
```

---

## 5️⃣ Visualization: Tag Mastery Heatmap

### Frontend Component

```typescript
// src/components/TagMasteryHeatmap.tsx

interface TagData {
  tag: string;
  score: number;
  attempts: number;
  status: "red" | "yellow" | "green";
}

export function TagMasteryHeatmap() {
  const [tags, setTags] = useState<TagData[]>([]);

  useEffect(() => {
    fetch("/api/student-progress/tag-mastery?student_id=current")
      .then((res) => res.json())
      .then((data) => setTags(data.heatmap_data));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2">
      {tags.map((tag) => (
        <div
          key={tag.tag}
          className={`
                        p-3 rounded-sm border
                        ${
                          tag.status === "red"
                            ? "bg-red-100 border-red-300"
                            : ""
                        }
                        ${
                          tag.status === "yellow"
                            ? "bg-yellow-100 border-yellow-300"
                            : ""
                        }
                        ${
                          tag.status === "green"
                            ? "bg-green-100 border-green-300"
                            : ""
                        }
                    `}
        >
          <div className="font-semibold">{tag.tag}</div>
          <div className="text-sm">{Math.round(tag.score * 100)}%</div>
          <div className="text-xs text-gray-600">{tag.attempts} attempts</div>
        </div>
      ))}
    </div>
  );
}
```

---

## 6️⃣ Complete Flow Example

### Scenario: Student practices "Chain Rule" questions

```
1. Question Loaded
   - Question: "Find derivative of (x²+1)³"
   - Tags: ["chain_rule", "differentiation", "composite_functions"]

2. Student Answers
   - Time: 45 seconds
   - Answer: "6x(x²+1)²"
   - Correct: True

3. System Records
   student_question_attempts:
   {
     student_id: "s123",
     question_id: "q456",
     selected_answer: "6x(x²+1)²",
     is_correct: true,
     score: 1.0,
     time_taken_seconds: 45,
     tags: ["chain_rule", "differentiation", "composite_functions"]
   }

4. Update Tag Mastery
   For each tag:
   - chain_rule: correct_attempts++, mastery_score recalulated
   - differentiation: correct_attempts++, mastery_score recalculated
   - composite_functions: correct_attempts++, mastery_score recalculated

5. Heatmap Updated
   - chain_rule: 🟢 0.85 (was 0.75)
   - differentiation: 🟢 0.92 (was 0.90)
   - composite_functions: 🟡 0.65 (was 0.55)
```

---

## 7️⃣ Summary

### What We Track

- ✅ Answer content (selected option, text, matched pairs)
- ✅ Correctness (binary + percentage score)
- ✅ Time taken (seconds per question)
- ✅ Attempts count (how many tries)
- ✅ Hints used (dependency indicator)

### How We Calculate Mastery

```
For each tag:
  mastery_score = correct_attempts / total_attempts
  avg_time = sum(time_taken) / total_attempts

Status:
  🔴 Red (score < 0.5): Needs re-teaching
  🟡 Yellow (0.5 ≤ score < 0.8): Keep practicing
  🟢 Green (score ≥ 0.8): Ready for next level
```

### Where It All Connects

```
Question Attempt → Record in DB → Update Tag Mastery → Query Aggregation → Heatmap Display
```

---

## 🚀 Next Steps

1. **Implement answer capture** for each question type
2. **Create aggregation functions** in Supabase
3. **Build heatmap visualization** component
4. **Test with real student data**
5. **Add recommendation engine** based on tag mastery

---

_This system enables adaptive learning by tracking granular performance and generating actionable insights._
