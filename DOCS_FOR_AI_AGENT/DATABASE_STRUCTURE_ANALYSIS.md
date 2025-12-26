# Database Structure Analysis: Courses, Chapters, Topics, Lessons, and Tags

## Current 5-Tier Hierarchy Structure

```
courses
  └── courses_units (course_id → courses.id)
      └── courses_chapters (unit_id → courses_units.id)
          └── courses_topics (chapter_id → courses_chapters.id)
              └── courses_lessons (topic_id, chapter_id, course_id)
                  └── lesson_tags (lesson_id → courses_lessons.id)
```

## Table Relationships

### 1. **courses** (Root Table)
- **Primary Key**: `id` (uuid)
- **Key Fields**: `title`, `slug`, `status`, `price`, `template_id`
- **Relationships**: 
  - One-to-many with `courses_units`
  - One-to-many with `courses_lessons` (direct)
  - One-to-many with `courses_enrollments`

### 2. **courses_units**
- **Primary Key**: `id` (uuid)
- **Foreign Keys**: `course_id` → `courses.id`
- **Key Fields**: `unit_name`, `unit_order`, `is_locked`
- **Relationships**:
  - Many-to-one with `courses`
  - One-to-many with `courses_chapters`

### 3. **courses_chapters**
- **Primary Key**: `id` (uuid)
- **Foreign Keys**: `unit_id` → `courses_units.id`
- **Key Fields**: `chapter_name`, `chapter_order`, `is_locked`
- **Relationships**:
  - Many-to-one with `courses_units`
  - One-to-many with `courses_topics`
  - One-to-many with `courses_lessons` (direct)

### 4. **courses_topics**
- **Primary Key**: `id` (uuid)
- **Foreign Keys**: `chapter_id` → `courses_chapters.id`
- **Key Fields**: `topic_name`, `topic_number`, `topic_order`
- **Relationships**:
  - Many-to-one with `courses_chapters`
  - One-to-many with `courses_lessons`

### 5. **courses_lessons** (Complex - Multiple Foreign Keys)
- **Primary Key**: `id` (uuid)
- **Foreign Keys**: 
  - `course_id` → `courses.id` ⚠️ **REDUNDANT** (can be derived via topic → chapter → unit → course)
  - `chapter_id` → `courses_chapters.id` ⚠️ **REDUNDANT** (can be derived via topic → chapter)
  - `topic_id` → `courses_topics.id`
  - `quiz_id` → `quizzes.id`
- **Key Fields**: `title`, `slug`, `lesson_order`, `content`, `video_url`, `pdf_url`, `topic_number`
- **Relationships**:
  - Many-to-one with `courses` (direct)
  - Many-to-one with `courses_chapters` (direct)
  - Many-to-one with `courses_topics`
  - One-to-many with `lesson_tags`
  - One-to-one with `quizzes`

### 6. **lesson_tags**
- **Composite Primary Key**: `(lesson_id, tag_name)`
- **Foreign Keys**: `lesson_id` → `courses_lessons.id`
- **Key Fields**: `tag_name`
- **Relationships**:
  - Many-to-one with `courses_lessons`

## Issues Identified

### 1. **Redundant Foreign Keys in courses_lessons**
- `course_id` is redundant - can be derived: `topic → chapter → unit → course`
- `chapter_id` is redundant - can be derived: `topic → chapter`
- This creates data inconsistency risks and extra maintenance

### 2. **Deep Hierarchy (5 Levels)**
- Makes queries complex (requires multiple JOINs)
- Slower query performance
- Harder to maintain referential integrity

### 3. **Topics Table Underutilization**
- Topics might be mergeable with chapters
- `topic_number` and `topic_order` suggest topics could be a field on chapters instead

### 4. **Tags as Separate Table**
- Could be simplified to a `text[]` array field on `courses_lessons`
- Current structure requires JOIN for every tag query

### 5. **Inconsistent Ordering Fields**
- `unit_order`, `chapter_order`, `topic_order`, `lesson_order` - all separate
- Could be unified with a single `order` field pattern

## Current Query Patterns (from codebase)

### Fetching Course Structure
```typescript
// Requires 4-5 JOINs to get full structure
courses_units
  → courses_chapters
    → courses_topics
      → courses_lessons
        → lesson_tags
```

### Lessons Query (from API)
```sql
SELECT lessons.*, 
       chapter:courses_chapters(...),
       topic:courses_topics(...)
FROM courses_lessons
WHERE course_id = ?
```

## Simplification Opportunities

### Option 1: Flatten Hierarchy (Recommended)
- Merge `courses_topics` into `courses_chapters` (add `topic_number` field)
- Remove redundant `course_id` and `chapter_id` from `courses_lessons`
- Keep only `topic_id` (which would become `chapter_id`)

**New Structure:**
```
courses
  └── courses_units
      └── courses_chapters (with topic_number field)
          └── courses_lessons (only chapter_id)
              └── lesson_tags (or tags as array)
```

### Option 2: Merge Units and Chapters
- Combine `courses_units` and `courses_chapters` into single `courses_sections` table
- Add `section_type` field ('unit' or 'chapter')
- Reduces from 5 to 4 levels

### Option 3: Tags as Array
- Change `lesson_tags` table to `tags text[]` field on `courses_lessons`
- Simplifies queries, reduces JOINs

### Option 4: Remove Topics Entirely
- If topics are rarely used, merge into chapters
- Use `chapter_name` and `topic_number` pattern

## Recommendations

1. **Remove redundant foreign keys** from `courses_lessons` (keep only `topic_id` or `chapter_id`)
2. **Consider flattening** - merge topics into chapters if topics are just organizational
3. **Convert tags to array** if tag queries are simple
4. **Add database views** for common query patterns to simplify application code
5. **Consider materialized views** for course structure if read-heavy

## Questions to Answer

1. Are topics actually used differently than chapters, or are they just sub-chapters?
2. How often are tags queried independently vs. with lessons?
3. Is the 5-tier hierarchy necessary, or could it be 3-4 tiers?
4. Are there performance issues with current structure?
5. How often do lessons belong to multiple topics/chapters?

