# Course Scaling Strategy

## Current Architecture

- Course-specific folders: `src/lib/courses/{course-slug}/`
- Each course has: `syllabus.ts`, `lessons.ts`, `mapping.ts`, `index.ts`
- Dynamic loading via `course-registry.ts`

## Adding New Courses

### 1. Create Course Folder

```bash
mkdir src/lib/courses/cbse-mathematics-class-11
```

### 2. Add Course Files

- `syllabus.ts` - Course structure (sections, chapters, subsections)
- `lessons.ts` - Lesson content and resources
- `mapping.ts` - Syllabus slug → lesson slug mapping
- `index.ts` - Export all data

### 3. Update Registry

Add to `src/lib/course-registry.ts`:

```typescript
'cbse-mathematics-class-11': async () => {
  const courseModule = await import('./courses/cbse-mathematics-class-11')
  return {
    syllabus: courseModule.syllabus,
    lessons: courseModule.lessons,
    mapping: courseModule.mapping
  }
}
```

### 4. Add to Course Database

Add course config to `COURSE_DATABASE` in `course-config.ts`

## Course Naming Convention

- Format: `{curriculum}-{subject}-{grade}`
- Examples: `cbse-mathematics-class-10`, `icse-physics-class-12`

## Testing Checklist

- [ ] Course page loads (200)
- [ ] Lesson pages work (200)
- [ ] Syllabus mapping works
- [ ] Sidebar navigation works

## Future Scaling

- Database migration when ready
- Multi-tenant support
- Partner course hosting
