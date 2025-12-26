# Course Structure Setup Guide

Reference guide for the 5-tier course hierarchy system.

## Quick Start

**For importing from Google Sheets master map:** See [COURSE_IMPORT_FROM_MASTER_MAP.md](./COURSE_IMPORT_FROM_MASTER_MAP.md)

## Database Structure

```
Course
  └── Units (courses_units)
      └── Chapters (courses_chapters)
          └── Topics (courses_topics)
              └── Lessons (courses_lessons)
                  └── Tags (lesson_tags)
```

## Database Tables

1. **`courses`** - Main course information
2. **`courses_units`** - Course units/modules
3. **`courses_chapters`** - Chapters within units
4. **`courses_topics`** - Topics within chapters
5. **`courses_lessons`** - Individual lessons
6. **`lesson_tags`** - Tags for searchability

## Automated Setup (Recommended)

Use the sync script for bulk imports from CSV:
```bash
npx tsx scripts/sync-cbse-course-from-csv.ts <course-uuid>
```

**Note:** The sync script requires a course UUID. Use `npx tsx scripts/find-cbse-courses.ts` to find existing courses.

---

## 🚀 Step-by-Step Instructions

### PHASE 1: Manual Database Setup

#### Step 1: Create Course (Draft)

```sql
INSERT INTO public.courses (
  title,
  slug,
  description,
  curriculum,
  subject,
  grade,
  level,
  price,
  status
) VALUES (
  'Your Course Title',
  'your-course-slug',
  'Course description',
  'CURRICULUM_NAME',  -- e.g., GRE, CBSE, IBDP
  'SUBJECT',          -- e.g., Mathematics, Physics
  'GRADE',            -- e.g., 9, 12, Graduate
  'LEVEL',            -- e.g., intermediate, advanced
  0,                  -- price
  'draft'             -- status: draft, published, archived
) RETURNING id;
```

**Save the returned Course ID** - you'll need it for the next steps.

---

#### Step 2: Create Units

```sql
-- Get your course ID first
-- Replace 'YOUR_COURSE_ID' with actual UUID

INSERT INTO public.courses_units (course_id, unit_name, unit_order, description, is_locked) VALUES
  ('YOUR_COURSE_ID', 'Unit Name 1', 1, 'Optional description', false),
  ('YOUR_COURSE_ID', 'Unit Name 2', 2, 'Optional description', false),
  ('YOUR_COURSE_ID', 'Unit Name 3', 3, 'Optional description', false);
```

**Query to get Unit IDs:**
```sql
SELECT id, unit_name, unit_order 
FROM public.courses_units 
WHERE course_id = 'YOUR_COURSE_ID'
ORDER BY unit_order;
```

---

#### Step 3: Create Chapters

```sql
-- Replace unit IDs with actual UUIDs from previous step

INSERT INTO public.courses_chapters (unit_id, chapter_name, chapter_order, description, is_locked) VALUES
  -- Unit 1 chapters
  ('UNIT_1_ID', 'Chapter 1.1 Name', 1, NULL, false),
  ('UNIT_1_ID', 'Chapter 1.2 Name', 2, NULL, false),
  -- Unit 2 chapters
  ('UNIT_2_ID', 'Chapter 2.1 Name', 1, NULL, false),
  ('UNIT_2_ID', 'Chapter 2.2 Name', 2, NULL, false);
```

**Query to get Chapter IDs:**
```sql
SELECT c.id, c.chapter_name, u.unit_name
FROM public.courses_chapters c
JOIN public.courses_units u ON c.unit_id = u.id
WHERE u.course_id = 'YOUR_COURSE_ID'
ORDER BY u.unit_order, c.chapter_order;
```

**Save this output** - you'll need it for the Python script.

---

### PHASE 2: Automated CSV-Based Setup

#### Step 4: Prepare Your Master CSV

Create a CSV file named `master_map.csv` with this exact structure:

```csv
Sl. No.,Unit,Chapter,Topics,Lesson ID,Lessons,Tags
1,Unit Name,Chapter Name,Topic Name,course_lid_001,Lesson Title,"tag1, tag2, tag3"
2,Unit Name,Chapter Name,Topic Name,course_lid_002,Lesson Title 2,"tag1, tag4"
3,Unit Name,Chapter Name,Another Topic,course_lid_003,Lesson Title 3,"tag2, tag5"
```

**CSV Column Requirements:**

| Column | Description | Example |
|--------|-------------|---------|
| `Sl. No.` | Sequential number | 1, 2, 3... |
| `Unit` | Unit name (must match DB) | Arithmetic |
| `Chapter` | Chapter name (must match DB) | Number Properties |
| `Topics` | Topic name | Prime numbers |
| `Lesson ID` | Unique lesson code | gre_lid_001 |
| `Lessons` | Lesson title | Identification and properties |
| `Tags` | Comma-separated tags | "arithmetic, primes, number-theory" |

**Important Notes:**
- Unit and Chapter names must **exactly match** what you created in the database
- Lesson IDs should be unique and follow a pattern (e.g., `gre_lid_001`, `cbse_lid_001`)
- Tags should be comma-separated within quotes
- Topics with same name under same chapter will be merged (multiple lessons per topic)

**Example CSV Structure:**
```csv
Sl. No.,Unit,Chapter,Topics,Lesson ID,Lessons,Tags
1,Arithmetic,Number Properties,Prime numbers,gre_lid_001,Identification,"arithmetic, primes"
2,Arithmetic,Number Properties,Prime numbers,gre_lid_002,Properties,"arithmetic, primes, properties"
3,Arithmetic,Number Properties,Divisibility,gre_lid_003,Rules for 2-11,"arithmetic, divisibility"
4,Algebra,Linear Equations,Solving,gre_lid_004,Isolation techniques,"algebra, solving"
```

---

#### Step 5: Generate SQL Files

**Note:** You'll need to create SQL INSERT statements manually or use a script to generate them from your CSV file. The SQL should follow this pattern:

```python
#!/usr/bin/env python3
"""
Generate SQL files from master_map.csv for course structure
"""
import csv

# ============================================
# CONFIGURATION - UPDATE THESE
# ============================================

# Your Course ID (from Step 1)
COURSE_ID = 'YOUR_COURSE_ID_HERE'

# Chapter IDs mapping (from Step 3 query)
CHAPTER_IDS = {
    "Chapter Name 1": "chapter-uuid-1",
    "Chapter Name 2": "chapter-uuid-2",
    # Add all your chapters here
}

# CSV file path
CSV_FILE = '../docs/master_map.csv'

# ============================================
# SCRIPT (No changes needed below)
# ============================================

# Read CSV
with open(CSV_FILE, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

# Process data
topics_map = {}
topic_order_tracker = {}
lessons_data = []

for row in rows:
    chapter = row['Chapter']
    topic = row['Topics']
    lesson_id = row['Lesson ID']
    lesson_name = row['Lessons']
    tags = row['Tags']
    
    key = (chapter, topic)
    if key not in topics_map:
        if chapter not in topic_order_tracker:
            topic_order_tracker[chapter] = 1
        else:
            topic_order_tracker[chapter] += 1
        
        topics_map[key] = {
            'chapter': chapter,
            'topic': topic,
            'order': topic_order_tracker[chapter]
        }
    
    lessons_data.append({
        'chapter': chapter,
        'topic': topic,
        'lesson_id': lesson_id,
        'lesson_name': lesson_name,
        'tags': tags
    })

print("Generating SQL files...\n")

# FILE 1: Insert Topics
with open('step1-insert-topics.sql', 'w', encoding='utf-8') as f:
    f.write("-- STEP 1: Insert Topics\n")
    f.write(f"-- Total topics: {len(topics_map)}\n\n")
    
    f.write("INSERT INTO public.courses_topics (chapter_id, topic_name, topic_number, topic_order) VALUES\n")
    
    topic_inserts = []
    for (chapter, topic), data in sorted(topics_map.items(), key=lambda x: (x[1]['chapter'], x[1]['order'])):
        chapter_id = CHAPTER_IDS[chapter]
        order = data['order']
        topic_escaped = topic.replace("'", "''")
        topic_inserts.append(f"  ('{chapter_id}', '{topic_escaped}', '{order}', {order})")
    
    f.write(",\n".join(topic_inserts) + ";\n")

print(f"✓ step1-insert-topics.sql ({len(topics_map)} topics)")

# FILE 2: Insert Lessons
with open('step2-insert-lessons.sql', 'w', encoding='utf-8') as f:
    f.write("-- STEP 2: Insert Lessons (Auto-matches topic IDs)\n")
    f.write(f"-- Total lessons: {len(lessons_data)}\n\n")
    
    f.write("WITH topic_lookup AS (\n")
    f.write("  SELECT t.id as topic_id, t.topic_name, c.id as chapter_id, c.chapter_name\n")
    f.write("  FROM public.courses_topics t\n")
    f.write("  JOIN public.courses_chapters c ON t.chapter_id = c.id\n")
    f.write("  JOIN public.courses_units u ON c.unit_id = u.id\n")
    f.write(f"  WHERE u.course_id = '{COURSE_ID}'\n")
    f.write(")\n")
    f.write("INSERT INTO public.courses_lessons (\n")
    f.write("  course_id, title, lesson_code, slug, chapter_id, topic_id, is_preview, lesson_order\n")
    f.write(")\n")
    f.write("SELECT \n")
    f.write("  lesson_data.course_id::uuid,\n")
    f.write("  lesson_data.title,\n")
    f.write("  lesson_data.lesson_code,\n")
    f.write("  lesson_data.slug,\n")
    f.write("  tl.chapter_id::uuid,\n")
    f.write("  tl.topic_id::uuid,\n")
    f.write("  lesson_data.is_preview::boolean,\n")
    f.write("  lesson_data.lesson_order::integer\n")
    f.write("FROM (\n")
    f.write("  VALUES\n")
    
    lesson_order_tracker = {}
    lesson_values = []
    
    for lesson in lessons_data:
        chapter = lesson['chapter']
        topic = lesson['topic']
        lesson_id = lesson['lesson_id']
        lesson_name = lesson['lesson_name'].replace("'", "''")
        
        topic_key = (chapter, topic)
        if topic_key not in lesson_order_tracker:
            lesson_order_tracker[topic_key] = 1
        else:
            lesson_order_tracker[topic_key] += 1
        
        lesson_order = lesson_order_tracker[topic_key]
        slug = lesson_id.replace('_', '-')
        topic_escaped = topic.replace("'", "''")
        chapter_escaped = chapter.replace("'", "''")
        
        lesson_values.append(
            f"    ('{COURSE_ID}', '{lesson_name}', '{lesson_id}', '{slug}', '{chapter_escaped}', '{topic_escaped}', false, {lesson_order})"
        )
    
    f.write(",\n".join(lesson_values) + "\n")
    f.write(") AS lesson_data(course_id, title, lesson_code, slug, chapter_name, topic_name, is_preview, lesson_order)\n")
    f.write("JOIN topic_lookup tl ON tl.chapter_name = lesson_data.chapter_name AND tl.topic_name = lesson_data.topic_name;\n")

print(f"✓ step2-insert-lessons.sql ({len(lessons_data)} lessons)")

# FILE 3: Insert Tags
with open('step3-insert-tags.sql', 'w', encoding='utf-8') as f:
    f.write("-- STEP 3: Insert Lesson Tags\n\n")
    
    f.write("INSERT INTO public.lesson_tags (lesson_id, tag_name) VALUES\n")
    
    tag_inserts = []
    for lesson in lessons_data:
        lesson_code = lesson['lesson_id']
        tags = lesson['tags'].split(',')
        
        for tag in tags:
            tag = tag.strip()
            if tag:
                tag_escaped = tag.replace("'", "''")
                tag_inserts.append(
                    f"  ((SELECT id FROM public.courses_lessons WHERE lesson_code = '{lesson_code}'), '{tag_escaped}')"
                )
    
    f.write(",\n".join(tag_inserts) + ";\n")

tag_count = sum(len(lesson['tags'].split(',')) for lesson in lessons_data)
print(f"✓ step3-insert-tags.sql ({tag_count} tag entries)")

print("\n" + "="*60)
print("✅ ALL FILES READY!")
print("="*60)
print(f"\nTopics: {len(topics_map)} | Lessons: {len(lessons_data)} | Tags: {tag_count}")
print("\nRun these 3 files in Supabase SQL Editor in order:")
print("  1. step1-insert-topics.sql")
print("  2. step2-insert-lessons.sql")
print("  3. step3-insert-tags.sql\n")
```

**Update the script configuration:**
1. Replace `COURSE_ID` with your course UUID
2. Fill in the `CHAPTER_IDS` dictionary with chapter names and their UUIDs

**Run the script:**
```bash
cd scripts
python3 generate-course-sql.py
```

---

#### Step 6: Execute SQL Files in Supabase

Run the generated files in order in Supabase SQL Editor:

1. **`step1-insert-topics.sql`** - Creates all topics
2. **`step2-insert-lessons.sql`** - Creates all lessons (auto-matches to topics)
3. **`step3-insert-tags.sql`** - Creates all lesson tags

---

## ✅ Verification Queries

### Check Complete Hierarchy
```sql
SELECT 
  u.unit_name,
  u.unit_order,
  c.chapter_name,
  c.chapter_order,
  t.topic_name,
  t.topic_order,
  l.title as lesson_name,
  l.lesson_order,
  l.lesson_code
FROM courses_lessons l
JOIN courses_topics t ON l.topic_id = t.id
JOIN courses_chapters c ON t.chapter_id = c.id
JOIN courses_units u ON c.unit_id = u.id
WHERE u.course_id = 'YOUR_COURSE_ID'
ORDER BY u.unit_order, c.chapter_order, t.topic_order, l.lesson_order;
```

### Count Summary
```sql
SELECT 
  'Units' as level, COUNT(*) as count
FROM courses_units WHERE course_id = 'YOUR_COURSE_ID'
UNION ALL
SELECT 'Chapters', COUNT(*)
FROM courses_chapters c
JOIN courses_units u ON c.unit_id = u.id
WHERE u.course_id = 'YOUR_COURSE_ID'
UNION ALL
SELECT 'Topics', COUNT(*)
FROM courses_topics t
JOIN courses_chapters c ON t.chapter_id = c.id
JOIN courses_units u ON c.unit_id = u.id
WHERE u.course_id = 'YOUR_COURSE_ID'
UNION ALL
SELECT 'Lessons', COUNT(*)
FROM courses_lessons
WHERE course_id = 'YOUR_COURSE_ID'
UNION ALL
SELECT 'Tags', COUNT(*)
FROM lesson_tags lt
JOIN courses_lessons l ON lt.lesson_id = l.id
WHERE l.course_id = 'YOUR_COURSE_ID';
```

### Check for Missing Relationships
```sql
-- Lessons without topics
SELECT * FROM courses_lessons WHERE topic_id IS NULL;

-- Topics without lessons
SELECT t.* 
FROM courses_topics t
LEFT JOIN courses_lessons l ON l.topic_id = t.id
WHERE l.id IS NULL;
```

---

## 📚 Real Example: GRE Course

### Stats
- **Course:** GRE Quantitative Reasoning
- **Units:** 5 (Arithmetic, Algebra, Geometry, Data Analytics, QR Applications)
- **Chapters:** 24
- **Topics:** 127
- **Lessons:** 133
- **Tags:** 621

### Execution Time
- CSV preparation: ~30 minutes
- SQL generation: ~10 seconds
- Database insertion: ~5 minutes
- **Total: ~40 minutes for complete course structure**

---

## 🔧 Troubleshooting

### Common Issues

**1. Syntax Error in INSERT**
- **Cause:** Missing `VALUES` keyword or type mismatches
- **Solution:** Ensure all UUIDs are cast with `::uuid`, booleans with `::boolean`

**2. Foreign Key Violations**
- **Cause:** Chapter/Topic names don't match between CSV and database
- **Solution:** Verify names are exactly the same (case-sensitive)

**3. Duplicate Lesson Codes**
- **Cause:** Same lesson_code used multiple times
- **Solution:** Each lesson must have unique lesson_code

**4. Topics Not Auto-Matching**
- **Cause:** Topic name or chapter name mismatch
- **Solution:** Check spelling and capitalization in CSV vs database

---

## 💡 Best Practices

1. **Naming Conventions:**
   - Use consistent slug format: `curriculum-subject-grade`
   - Lesson codes: `{course_prefix}_lid_{number}` (e.g., `gre_lid_001`)

2. **CSV Management:**
   - Keep master CSV in `docs/` folder
   - Version control your CSV files
   - Document any special characters or formatting

3. **Tag Strategy:**
   - Use lowercase with hyphens: `problem-solving`, `test-strategy`
   - Include hierarchy tags: subject, topic, subtopic
   - Add skill-level tags: `beginner`, `intermediate`, `advanced`

4. **Testing:**
   - Always test with a small subset first (10-20 rows)
   - Verify one complete unit before generating full course
   - Use draft status until fully verified

5. **Publishing:**
   ```sql
   -- Only publish after full verification
   UPDATE courses 
   SET status = 'published' 
   WHERE id = 'YOUR_COURSE_ID';
   ```

---

## 📋 Checklist for New Course

- [ ] Create course in draft status
- [ ] Create all units
- [ ] Create all chapters
- [ ] Get chapter IDs from database
- [ ] Prepare master_map.csv
- [ ] Update Python script with course ID and chapter IDs
- [ ] Generate SQL files
- [ ] Run step1-insert-topics.sql
- [ ] Run step2-insert-lessons.sql
- [ ] Run step3-insert-tags.sql
- [ ] Run verification queries
- [ ] Check course structure in UI
- [ ] Update course to published status

---

## 🎯 Summary

This 5-tier system allows you to:
- ✅ Organize 100+ lessons efficiently
- ✅ Maintain clear hierarchy
- ✅ Enable flexible navigation
- ✅ Support powerful search via tags
- ✅ Scale from simple to complex courses
- ✅ Automate bulk content creation

**Time saved:** Instead of manually creating 133 lessons one-by-one (estimated 4-6 hours), this process takes ~40 minutes including CSV preparation.

---

*Last Updated: November 5, 2025*
*Version: 1.0*













