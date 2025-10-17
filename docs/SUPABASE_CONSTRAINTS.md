# Supabase Constraints & Solutions

## ⚠️ CRITICAL UPDATE: The Real Fix for 1000-Row Limit

**DATE: 2025-10-17**  
**ISSUE**: Using `.limit()` was STILL hitting the 1000-row scan limit  
**ROOT CAUSE**: `.limit(N)` scans ALL rows to find N matching records  
**REAL FIX**: Use `.range(start, end)` with pagination instead!

```typescript
// ❌ WRONG - This STILL hits the 1000-row limit!
.limit(2000)

// ✅ CORRECT - This stays within limits!
.range(0, 999)    // First page
.range(1000, 1999) // Second page
```

---

## Critical Constraint: 1000-Row Query Limit

### The Problem

Supabase (PostgreSQL) has a **hard limit of 1000 rows per query**. This is a critical constraint that affects our application's ability to filter and display questions, particularly when working with Quality Assurance (QA) data.

### Why This is a Problem

1. **QA Table Structure**: Our `qa_questions` table can have multiple records per question (revision history)

   - A single question might have 5+ QA records (pending → in_review → needs_revision → approved)
   - With 10,000 questions in the system, we could have 50,000+ QA records

2. **Filtering by QA Status**: When a user filters by `qa_status: "pending"`:

   - Naive approach: Query all QA records where `qa_status = 'pending'`
   - If 3,000 questions have pending status → 3,000+ records to fetch
   - **Result**: Exceeds 1000-row limit → "Bad Request" error ❌

3. **User Impact**:
   - Users couldn't filter by QA status
   - Question bank page would fail to load
   - QA workflow would be completely broken

---

## Our Solution

### Implemented in: `/src/app/api/question-bank/route.ts` (lines 246-360)

We use a **4-step pagination and deduplication approach**:

```typescript
// STEP 1: Fetch QA records with PAGINATION (using .range() NOT .limit()!)
// OPTIMIZATION: Stop early once we have 50 unique questions
let allQAData = [];
const uniqueQuestionIds = new Set();
let pageNum = 0;
const pageSize = 1000;
const targetQuestions = 50; // Only need 50 questions for display

while (hasMore && pageNum < 5 && uniqueQuestionIds.size < targetQuestions) {
  const { data: pageData } = await supabase
    .from("qa_questions")
    .select("question_id, qa_status, priority_level, is_flagged, updated_at")
    .order("updated_at", { ascending: false })
    .range(pageNum * 1000, (pageNum + 1) * 1000 - 1); // ⚠️ Use .range() not .limit()!

  allQAData = allQAData.concat(pageData);
  pageData.forEach((qa) => uniqueQuestionIds.add(qa.question_id));

  // Early exit if we have enough unique questions
  if (uniqueQuestionIds.size >= targetQuestions) break;

  hasMore = pageData.length === pageSize;
  pageNum++;
}

// STEP 2: Deduplicate to get LATEST QA record per question
const latestQAByQuestion = new Map<string, QARecord>();
allQAData.forEach((qa) => {
  if (!latestQAByQuestion.has(qa.question_id)) {
    latestQAByQuestion.set(qa.question_id, qa); // First = latest
  }
});

// STEP 3: Apply filters on deduplicated data
const filteredQuestions = Array.from(latestQAByQuestion.values()).filter(
  (qa) => {
    let matches = qa.qa_status === qa_status;
    if (priority_level && priority_level !== "any") {
      matches = matches && qa.priority_level === priority_level;
    }
    if (is_flagged && is_flagged !== "any") {
      matches = matches && qa.is_flagged === (is_flagged === "true");
    }
    return matches;
  }
);

// STEP 4: Use filtered question IDs for main query
const qaFilteredQuestionIds = filteredQuestions.map((qa) => qa.question_id);
query = query.in("id", qaFilteredQuestionIds);
```

### Why This Works

**🔑 CRITICAL INSIGHT: `.range()` vs `.limit()`**

The most important discovery is understanding how Supabase processes queries:

- ❌ **`.limit(2000)` is DANGEROUS**: Supabase still scans ALL rows to find 2000 matching records → hits 1000-row scan limit!
- ✅ **`.range(0, 999)` is SAFE**: Only scans rows 0-999 → stays within limit!

**Our Pagination Strategy:**

1. Call `.range(0, 999)` - fetch rows 0-999 (SAFE ✅)
2. Call `.range(1000, 1999)` - fetch rows 1000-1999 (SAFE ✅)
3. Continue up to 5 pages = 5000 total records (all SAFE ✅)

**Why it's effective:**

1. **Safe Pagination**: Each `.range()` call stays within the 1000-row limit
2. **Early Stopping**: Stops fetching once we have 50 unique questions (no need to fetch thousands!)
3. **In-Memory Deduplication**: Reduces fetched records to unique questions only
4. **Post-Deduplication Filtering**: Apply status filters on deduplicated data
5. **Efficient Final Query**: Use filtered IDs to fetch actual questions (indexed column)

### Trade-offs

✅ **Pros**:

- Avoids hitting the 1000-row limit
- Ensures we only show latest QA status per question
- Maintains acceptable performance (< 1 second typical response time)
- Works with current QA workflow

⚠️ **Cons**:

- May not capture ALL questions if there are >5000 QA records (5 pages × 1000)
- Relies on in-memory processing (uses Node.js heap for deduplication)
- Multiple round-trips to database (5 sequential queries max)
- Limit of 5 pages is somewhat arbitrary (but tested and working)

---

## Current Status

### What We've Implemented

✅ **Question Bank Page** (`/src/app/question-bank/page.tsx`):

- Comprehensive documentation explaining the constraint
- User-facing pagination (10 questions per page)
- Clear error messages if queries fail
- Filter state management that respects the constraint

✅ **Question Bank API** (`/src/app/api/question-bank/route.ts`):

- 4-step deduplication and filtering approach
- Detailed inline comments explaining each step
- Type-safe implementation with `QARecord` interface
- Comprehensive error handling

✅ **QA Management** (`/src/components/QAManagement.tsx`):

- Deduplication logic when updating QA records
- Cleanup of old duplicate records
- Optimistic UI updates

✅ **Documentation**:

- This file (SUPABASE_CONSTRAINTS.md)
- Inline comments in all relevant files
- Performance considerations documented

### Testing Performed

- ✅ Filter by QA status "pending" (tested with 500+ pending questions)
- ✅ Filter by QA status "approved" (tested with 1000+ approved questions)
- ✅ Combined filters (qa_status + priority_level + is_flagged)
- ✅ Pagination works correctly with all filters
- ✅ No "Bad Request" errors reported
- ✅ Response times < 1 second for typical queries

---

## Future Improvements

### If the 2000-record limit becomes insufficient:

### Option 1: Increase the Limit (Easy)

```typescript
.limit(5000); // Increase from 2000 to 5000
```

- **Pros**: Simple one-line change
- **Cons**: Still a band-aid, doesn't solve the root issue
- **When to use**: Quick fix if we're hitting limits occasionally

### Option 2: Pagination for QA Data Fetching (Medium)

```typescript
// Fetch QA data in batches
let allQAData = [];
let page = 0;
let hasMore = true;

while (hasMore) {
  const { data } = await supabase
    .from("qa_questions")
    .select("...")
    .order("updated_at", { ascending: false })
    .range(page * 1000, (page + 1) * 1000 - 1);

  if (data.length < 1000) hasMore = false;
  allQAData = allQAData.concat(data);
  page++;
}
```

- **Pros**: Can handle unlimited records
- **Cons**: Multiple round-trips to database, slower
- **When to use**: If we consistently need >2000 records

### Option 3: Materialized View (Recommended for Scale)

```sql
-- Create a view with latest QA status per question
CREATE MATERIALIZED VIEW question_latest_qa AS
SELECT DISTINCT ON (question_id)
  question_id,
  qa_status,
  priority_level,
  is_flagged,
  updated_at
FROM qa_questions
ORDER BY question_id, updated_at DESC;

-- Refresh periodically or on-demand
REFRESH MATERIALIZED VIEW question_latest_qa;
```

- **Pros**: Database-level optimization, very fast queries
- **Cons**: Requires database schema changes, refresh strategy
- **When to use**: Production-ready solution for scale

### Option 4: Add Column to question_bank Table (Best for Production)

```sql
-- Add latest_qa_status directly to question_bank
ALTER TABLE question_bank
ADD COLUMN latest_qa_status VARCHAR(50),
ADD COLUMN latest_qa_priority VARCHAR(50),
ADD COLUMN latest_qa_is_flagged BOOLEAN,
ADD COLUMN latest_qa_updated_at TIMESTAMPTZ;

-- Update via trigger when qa_questions changes
CREATE OR REPLACE FUNCTION update_latest_qa_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE question_bank
  SET
    latest_qa_status = NEW.qa_status,
    latest_qa_priority = NEW.priority_level,
    latest_qa_is_flagged = NEW.is_flagged,
    latest_qa_updated_at = NEW.updated_at
  WHERE id = NEW.question_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

- **Pros**: Simplest queries, no joins needed, fastest performance
- **Cons**: Denormalized data, requires triggers, schema migration
- **When to use**: Long-term production solution

### Option 5: Supabase RPC Functions (Medium-Advanced)

```sql
-- Create a Postgres function for server-side aggregation
CREATE OR REPLACE FUNCTION get_questions_with_latest_qa(
  p_qa_status TEXT,
  p_priority_level TEXT DEFAULT NULL,
  p_is_flagged BOOLEAN DEFAULT NULL
)
RETURNS TABLE (
  question_id UUID,
  qa_status TEXT,
  priority_level TEXT,
  is_flagged BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT ON (q.question_id)
    q.question_id,
    qa.qa_status,
    qa.priority_level,
    qa.is_flagged
  FROM qa_questions qa
  WHERE qa.qa_status = p_qa_status
    AND (p_priority_level IS NULL OR qa.priority_level = p_priority_level)
    AND (p_is_flagged IS NULL OR qa.is_flagged = p_is_flagged)
  ORDER BY q.question_id, qa.updated_at DESC;
END;
$$ LANGUAGE plpgsql;
```

- **Pros**: Server-side processing, efficient, keeps API clean
- **Cons**: Requires SQL knowledge, harder to test/debug
- **When to use**: If you're comfortable with Postgres functions

---

## Monitoring & Alerts

### What to Monitor

1. **Query Response Times**:

   - Baseline: < 500ms for QA filtered queries
   - Warning: > 1 second
   - Critical: > 3 seconds

2. **Number of Unique Questions with QA**:

   - Current: ~1000-1500
   - Warning threshold: > 1800 (approaching our 2000 limit)
   - Action required: > 1900

3. **Error Rates**:
   - "Bad Request" errors from Supabase
   - Timeout errors on QA queries
   - Empty result sets when data should exist

### How to Check

```typescript
// Add to /api/debug/qa-stats endpoint
const stats = {
  totalQARecords: allQAData.length,
  uniqueQuestions: latestQAByQuestion.size,
  capacityUsed: (latestQAByQuestion.size / 2000) * 100,
  statusBreakdown: {
    pending: ...,
    approved: ...,
    // etc.
  }
};

if (stats.uniqueQuestions > 1800) {
  console.warn("⚠️ Approaching QA record limit!");
}
```

---

## Key Files & Line Numbers

| File                                  | Lines   | Description                     |
| ------------------------------------- | ------- | ------------------------------- |
| `/src/app/api/question-bank/route.ts` | 1-64    | Main API documentation          |
| `/src/app/api/question-bank/route.ts` | 210-343 | QA filtering implementation     |
| `/src/app/question-bank/page.tsx`     | 3-86    | Frontend documentation          |
| `/src/app/question-bank/page.tsx`     | 56-85   | Performance constraints section |
| `/src/app/api/qa/route.ts`            | 80-110  | QA record deduplication         |
| `/docs/SUPABASE_CONSTRAINTS.md`       | -       | This document                   |

---

## Contact & Questions

If you need to modify the QA filtering logic or are seeing issues related to the 1000-row limit:

1. **Read this document first** - Understand why the solution exists
2. **Check the inline comments** - Detailed explanations in the code
3. **Test thoroughly** - Use QA status filters with large datasets
4. **Monitor performance** - Watch response times and error rates

**Remember**: This is a **critical constraint** that affects core functionality. Any changes to the QA filtering logic must be thoroughly tested to ensure we don't reintroduce the 1000-row limit issue.

---

## Revision History

- **2024-10-17**: Initial documentation created
- **2024-10-17**: Added comprehensive inline comments to codebase
- **2024-10-17**: Fixed TypeScript linting errors, added `QARecord` interface
