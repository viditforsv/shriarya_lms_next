<!-- 290c269b-d20d-46ba-99fd-a1c58060eabc 6b02ba66-7ff7-4b2c-91b8-2197149ec6d7 -->
# Unified Course Template Strategy

## Vision: Single Template for All Courses

### 5-Tier Hierarchy System

All courses will follow a unified 5-tier structure:

```
Units → Chapters → Topics → Lessons → Tags
```

**Display Rules**:

- **Sidebar**: Shows Units → Chapters → Lessons (3 levels)
- **Topic Number**: Displayed with lessons in sidebar and lesson content
- **Tags**: Used for progress tracking and recommendations

### Dynamic Lesson Content System

Lessons may contain multiple content types (shown as tabs):

1. **Questions, Concepts, Formulas** (IBDP AAHL style)
2. **PDF Assignment & Solutions** (CBSE Class 9 style)
3. **Videos**
4. **Quizzes** (GMAT style)

**Dynamic Tab Visibility**: Only show tabs for elements that exist in a lesson (empty elements = hidden tab)

## Current State Analysis

### Current Template Variations

1. **Database Template System** (`courses_templates` table):

   - Flexible structure with `sections`, `fields`, and `settings`
   - Supports all curricula (CBSE, ICSE, IBDP, IGCSE)
   - Used by `DynamicCourseRenderer` for course overview

2. **Hardcoded IBDP Logic** (needs removal):

   - `isIBDPMathCourse` check based on slug pattern
   - Special `IBDPCourseStructure` component for content tab
   - Special `IBDPMathLessonPage` component for lesson pages
   - Hardcoded in `CoursePageClient.tsx` and `lesson/[lessonSlug]/page.tsx`

3. **Current Hierarchy Issues**:

   - Missing `topics` tier in database structure
   - Topic information not properly tracked or displayed
   - Lesson tabs hardcoded instead of dynamic

### Problems with Current Approach

- **Inconsistency**: IBDP courses use different rendering logic than others
- **Missing Hierarchy Tier**: Topics not implemented
- **Static Tabs**: All lessons show all tabs, even when empty
- **Maintenance**: Changes require updates in multiple places
- **Scalability**: Adding new curriculum types requires code changes
- **Template System Underutilized**: Database templates exist but special cases bypass them

## Consolidation Strategy

### Phase 1: Template Configuration (Database)

**Goal**: Make template structure handle all rendering differences

**Changes**:

- Add template-level configuration for:
  - Content structure type (`"standard"` | `"ibdp-math"` | `"hierarchical"`)
  - Lesson page layout type
  - Custom component references (optional)

**Template Settings Enhancement**:

```typescript
settings: {
  rendering: {
    contentStructure: "standard" | "ibdp-math" | "hierarchical",
    lessonPageType: "standard" | "ibdp-math",
    useCustomComponents: boolean
  }
}
```

### Phase 2: Refactor Components

**Goal**: Make components template-agnostic

**Changes**:

1. **CoursePageClient.tsx**:

   - Remove `isIBDPMathCourse` hardcoded check
   - Use `template.settings.rendering.contentStructure` instead
   - Render content based on template settings, not slug patterns

2. **Lesson Page** (`lesson/[lessonSlug]/page.tsx`):

   - Remove `isIBDPMathCourse` check
   - Use template settings to determine lesson layout
   - Create unified lesson page component that adapts based on template

3. **Component Consolidation**:

   - Merge `IBDPCourseStructure` functionality into template-driven component
   - Keep `IBDPMathLessonPage` as optional template-specific component
   - Or refactor to be fully template-driven

### Phase 3: Migration

**Goal**: Update existing courses to use unified template

**Steps**:

1. Create single default template (e.g., "Unified Course Template")
2. Update existing courses to reference this template
3. Store IBDP-specific settings in template configuration, not code
4. Remove hardcoded logic after migration

### Phase 4: Template Defaults

**Goal**: Single template with curriculum-specific defaults

**Approach**:

- One master template: "ShriArya Standard Course Template"
- Curriculum-specific defaults stored in template settings
- All courses use same template, variations come from settings + course data

## Implementation Details

### Template Settings Structure

```typescript
{
  rendering: {
    contentStructure: "hierarchical",  // Units → Chapters → Lessons
    lessonPageType: "standard",         // Standard lesson page
    showParticipantsTab: true            // Admin feature
  },
  ui: {
    showProgress: true,
    showEnrollment: true,
    showFacts: true,
    showSyllabus: true
  },
  defaultValues: {
    // Curriculum-specific defaults
    CBSE: { /* ... */ },
    IBDP: { /* ... */ },
    ICSE: { /* ... */ },
    IGCSE: { /* ... */ }
  }
}
```

### File Modifications Required

1. **src/types/course-templates.ts**

   - Extend `TemplateSettings` with `rendering` configuration

2. **src/app/courses/[slug]/CoursePageClient.tsx**

   - Remove `isIBDPMathCourse` variable
   - Use `template.settings.rendering.contentStructure`
   - Make content rendering template-driven

3. **src/app/courses/[slug]/lesson/[lessonSlug]/page.tsx**

   - Remove `isIBDPMathCourse` check
   - Use template settings for lesson layout

4. **src/lib/course-template-renderer.ts**

   - Support rendering configurations
   - Apply curriculum-specific defaults

5. **Database Migration**

   - Update existing template records
   - Add `rendering` configuration to all templates
   - Create unified default template if needed

## Benefits

1. **Single Source of Truth**: All rendering logic comes from database templates
2. **Easier Maintenance**: Changes in one place affect all courses
3. **Better Scalability**: New curricula don't require code changes
4. **Consistent UX**: All courses follow same patterns
5. **Admin Control**: Template settings can be changed without code deployment

## Migration Path

1. **Backward Compatible First**: Keep hardcoded logic but add template settings
2. **Gradual Migration**: Move courses one by one to unified template
3. **Remove Hardcoded Logic**: Once all courses migrated, remove special cases
4. **Testing**: Ensure all course types work with unified template

### To-dos

- [ ] Create API endpoint `/api/courses/[slug]/stats` that returns course enrollment statistics (total students, active enrollments) for admins
- [ ] Add Moodle-style horizontal tab navigation above course content in CoursePageClient, conditionally shown for admins
- [ ] Create 'Participants' tab content showing enrollment statistics (student count, active enrollments) in card layout
- [ ] Add state management and API call to fetch course stats when admin user views the course page