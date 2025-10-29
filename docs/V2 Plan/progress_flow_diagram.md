# 📊 Student Progress Capture Flow - Visual Guide

## 🔄 Complete System Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     STUDENT INTERACTION                                 │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│   STEP 1: Student Opens Question                                        │
│   ──────────────────────────────────                                     │
│   Question: "Find derivative of (x²+1)³"                                │
│   Type: Subjective                                                      │
│   Tags: ["chain_rule", "differentiation", "composite_functions"]       │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│   STEP 2: Student Answers (Multiple Ways)                               │
│   ───────────────────────────────────────────────────                   │
│                                                                          │
│   MCQ:            → Radio button selected: "6x(x²+1)²"                  │
│   Subjective:     → Text input: "6x(x²+1)²"                            │
│   Match Following:→ Drag pairs: [(term, definition)]                    │
│   Fill Blank:     → Enter text: "6x(x²+1)²"                            │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│   STEP 3: Submit Answer (Frontend)                                      │
│   ─────────────────────────────                                          │
│                                                                          │
│   POST /api/student-progress/attempts                                   │
│   {                                                                      │
│     student_id: "s123",                                                  │
│     question_id: "q456",                                                 │
│     selected_answer: "6x(x²+1)²",                                       │
│     time_taken: 45,                                                      │
│     attempts_count: 1,                                                   │
│     hints_used: 0                                                        │
│   }                                                                      │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│   STEP 4: API Processing                                                │
│   ─────────────────────                                                 │
│                                                                          │
│   1. Fetch question details                                             │
│      SELECT tags, correct_answer, question_type                         │
│      FROM question_bank WHERE id = 'q456'                               │
│                                                                          │
│   2. Calculate correctness                                              │
│      - MCQ: Direct comparison                                            │
│      - Subjective: AI grading or fuzzy match                            │
│      - Match: Partial credit per pair                                   │
│                                                                          │
│   3. Determine score                                                     │
│      is_correct = true                                                   │
│      score = 1.0                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│   STEP 5: Store Attempt (Database)                                      │
│   ───────────────────────────                                           │
│                                                                          │
│   INSERT INTO student_question_attempts                                │
│   VALUES (                                                               │
│     student_id: 's123',                                                  │
│     question_id: 'q456',                                                 │
│     selected_answer: {'text': '6x(x²+1)²'},                             │
│     is_correct: true,                                                    │
│     score: 1.0,                                                          │
│     time_taken_seconds: 45,                                             │
│     attempts_count: 1,                                                  │
│     tags: ['chain_rule', 'differentiation', 'composite_functions']      │
│   )                                                                      │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│   STEP 6: Auto-Update Tag Mastery (Trigger)                             │
│   ────────────────────────────────────                                   │
│                                                                          │
│   FOR EACH tag IN ['chain_rule', 'differentiation', 'composite_...]:   │
│                                                                          │
│   UPSERT student_tag_mastery                                           │
│   SET:                                                                   │
│     - total_attempts++                                                   │
│     - correct_attempts++ (if correct)                                    │
│     - mastery_score = correct / total                                   │
│     - avg_time = (old_avg × old_total + new_time) / new_total           │
│                                                                          │
│   Result:                                                               │
│     chain_rule: mastery = 0.85 (was 0.75)                              │
│     differentiation: mastery = 0.92                                     │
│     composite_functions: mastery = 0.65                                 │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│   STEP 7: Query Aggregation (For Display)                              │
│   ──────────────────────────────                                        │
│                                                                          │
│   SELECT tag_name, mastery_score, total_attempts                       │
│   FROM student_tag_mastery                                              │
│   WHERE student_id = 's123'                                             │
│                                                                          │
│   Returns:                                                              │
│   ┌─────────────────────┬──────────────┬───────────────┐               │
│   │ Tag Name            │ Mastery      │ Attempts      │               │
│   ├─────────────────────┼──────────────┼───────────────┤               │
│   │ chain_rule          │ 0.85 🟢      │ 12            │               │
│   │ differentiation     │ 0.92 🟢      │ 8             │               │
│   │ composite_functions  │ 0.65 🟡      │ 5             │               │
│   │ implicit_diff       │ 0.42 🔴      │ 3             │               │
│   └─────────────────────┴──────────────┴───────────────┘               │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│   STEP 8: Display Heatmap (Frontend)                                   │
│   ──────────────────────────────                                        │
│                                                                          │
│   ┌──────────────────────────────────────────────────────┐            │
│   │ 📊 Tag Mastery Dashboard                              │            │
│   ├──────────────────────────────────────────────────────┤            │
│   │                                                       │            │
│   │ 🟢 chain_rule (85%)         🟢 differentiation (92%)│            │
│   │ 🟡 composite_functions (65%) 🔴 implicit_diff (42%) │            │
│   │                                                       │            │
│   └──────────────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│   STEP 9: Recommend Next Questions                                      │
│   ─────────────────────────────                                        │
│                                                                          │
│   Query:                                                                │
│   SELECT question_id FROM question_bank                                 │
│   WHERE tags && (                                                       │
│     SELECT tag_name FROM student_tag_mastery                           │
│     WHERE student_id = 's123'                                          │
│       AND mastery_score < 0.7  -- Weak tags                            │
│     ORDER BY mastery_score ASC                                         │
│     LIMIT 5                                                             │
│   )                                                                      │
│   LIMIT 3                                                               │
│                                                                          │
│   Next questions suggested:                                             │
│   1. Question on "composite_functions" (difficulty 6)                    │
│   2. Question on "implicit_diff" (difficulty 4)                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Key Components Explained

### 1. Answer Capture (Flexible)

```
Question Type         Answer Format              Validation
─────────────────     ─────────────────────      ────────────────────
MCQ                   "A" or "B"                 Exact match
Subjective            "6x(x²+1)²"                Fuzzy/AI grading
Match Following        [{a: "term1", b: "def1"}] Partial credit per match
Fill Blank            "answer text"              Exact/fuzzy
True/False            true/false                 Boolean
```

### 2. Score Calculation

```
Type                Scoring Method
─────────────────────────────────────────────────────
MCQ                 Binary: 1.0 (correct) or 0.0
Match Following     Partial: correct_pairs / total_pairs
Subjective          AI/Manual: 0.0 to 1.0
Fill Blank          Exact: 1.0, Fuzzy: 0.5-0.9
```

### 3. Tag Aggregation Formula

```
For each tag in question.tags:
  mastery_score = correct_attempts / total_attempts
  avg_time = sum(times) / total_attempts

  RYG Status:
    🔴 < 0.5: Red    → Needs re-teaching
    🟡 0.5-0.8: Yellow → Keep practicing
    🟢 > 0.8: Green   → Mastered
```

---

## 💡 Example: Complete Walkthrough

### Scenario

**Student:** Sarah  
**Question:** "Find derivative of sin²(x)"  
**Expected Answer:** "2sin(x)cos(x) = sin(2x)"  
**Tags:** ["trigonometry", "chain_rule", "identities"]

### Flow

**1. Sarah opens question**

- Timer starts
- Question loads: "Find derivative of sin²(x)"
- Tags: ["trigonometry", "chain_rule", "identities"]

**2. Sarah answers**

- Time: 2 minutes 15 seconds (135 seconds)
- Answer: "2sin(x)cos(x)"

**3. System evaluates**

```javascript
is_correct = checkAnswer(student_answer, expected_answer);
score = is_correct ? 1.0 : 0.0; // Result: 1.0
```

**4. Store attempt**

```sql
INSERT INTO student_question_attempts (
  student_id: 'sarah-uuid',
  question_id: 'q789',
  selected_answer: '2sin(x)cos(x)',
  is_correct: true,
  score: 1.0,
  time_taken_seconds: 135,
  tags: ['trigonometry', 'chain_rule', 'identities']
);
```

**5. Update mastery (automatically via trigger)**

```sql
-- For 'trigonometry' tag:
UPDATE student_tag_mastery
SET total_attempts = total_attempts + 1,
    correct_attempts = correct_attempts + 1,
    mastery_score = (correct_attempts + 1) / (total_attempts + 1)
WHERE student_id = 'sarah-uuid' AND tag_name = 'trigonometry';
```

**6. Result**

- trigonometry: 0.75 → 0.80 🟢 (Mastered!)
- chain_rule: 0.82 → 0.83 🟢 (Already strong)
- identities: 0.68 → 0.70 🟡 (Improved, keep practicing)

**7. Heatmap updated** (reflects new mastery)

**8. Next recommendation**

- System sees "identities" at 0.70 (🟡)
- Recommends: "Simplify sin(3x)cos(x) using identities"

---

## 🔍 Advanced Analytics

### Retention Tracking

```sql
-- Find questions attempted > 7 days ago
SELECT tag_name,
       COUNT(*) as later_attempts,
       AVG(score) as retention_score
FROM student_question_attempts
WHERE student_id = 's123'
  AND created_at < NOW() - INTERVAL '7 days'
GROUP BY tag_name;
```

### Stamina Detection

```sql
-- Compare accuracy early vs late in session
WITH session_analysis AS (
  SELECT session_id,
         AVG(score) FILTER (WHERE attempt_order <= 5) as early_accuracy,
         AVG(score) FILTER (WHERE attempt_order > 5) as late_accuracy
  FROM student_question_attempts
  WHERE session_id IS NOT NULL
  GROUP BY session_id
)
SELECT
  session_id,
  late_accuracy - early_accuracy as stamina_drop
FROM session_analysis;
```

---

## ✅ Summary

1. **Capture:** Every answer, time, attempts
2. **Store:** Raw attempts + metadata in DB
3. **Aggregate:** Auto-calculate mastery per tag
4. **Visualize:** Heatmap with RYG status
5. **Recommend:** Next questions based on weak tags

This creates a complete feedback loop for adaptive learning.
