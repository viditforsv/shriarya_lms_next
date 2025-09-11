# Course Deletion Guide

This guide explains how to properly delete a course and all its related data from both the database and frontend.

## Overview

When you delete a course, the system will automatically remove:

1. **Enrollments** - All student enrollments for the course
2. **User Progress** - All student progress and completion data
3. **Resources** - All uploaded files, videos, and media
4. **Lesson Sections** - All lesson content sections
5. **Lessons** - All lessons in the course
6. **Course** - The course itself

## Database Deletion Order

The deletion follows this order to maintain referential integrity:

```
1. User Progress Data (if exists)
2. Enrollments
3. Resources (for all lessons)
4. Lesson Sections (for all lessons)
5. Lessons
6. Course
```

## API Usage

### Delete Course via API

```bash
curl -X DELETE "http://localhost:3000/api/courses?id=COURSE_ID" \
  -H "Content-Type: application/json"
```

**Response:**

```json
{
  "message": "Course and all related data deleted successfully",
  "deletedItems": {
    "enrollments": true,
    "resources": 15,
    "lessonSections": true,
    "lessons": 8,
    "course": true
  }
}
```

## Frontend Usage

### 1. Using the Utility Function

```typescript
import { deleteCourse } from "@/lib/course-deletion";

// Simple deletion
const success = await deleteCourse(courseId, courseTitle);

// With cleanup callback
const success = await deleteCourseWithCleanup(courseId, courseTitle, () => {
  // Refresh course list
  // Redirect to courses page
  // Update UI state
});
```

### 2. Using the React Hook

```typescript
import { useCourseDeletion } from "@/hooks/useCourseDeletion";

function CourseManagement() {
  const { isDeleting, deleteCourse, error } = useCourseDeletion();

  const handleDelete = async () => {
    const success = await deleteCourse(courseId, courseTitle);
    if (success) {
      // Handle successful deletion
    }
  };

  return (
    <Button onClick={handleDelete} disabled={isDeleting} variant="destructive">
      {isDeleting ? "Deleting..." : "Delete Course"}
    </Button>
  );
}
```

### 3. Using the Pre-built Component

```typescript
import { CourseDeletionButton } from "@/components/CourseDeletionButton";

function CourseList() {
  const [courses, setCourses] = useState(courses);

  const handleCourseDeleted = (deletedCourseId) => {
    setCourses(courses.filter((course) => course.id !== deletedCourseId));
  };

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <CourseDeletionButton
            course={course}
            onCourseDeleted={() => handleCourseDeleted(course.id)}
          />
        </div>
      ))}
    </div>
  );
}
```

## Features

### ✅ Confirmation Dialog

- Shows detailed warning about what will be deleted
- Lists all data types that will be removed
- Cannot be undone warning

### ✅ Loading States

- Shows loading spinner during deletion
- Disables buttons to prevent double-clicks
- Toast notifications for success/error

### ✅ Error Handling

- Graceful error handling with user-friendly messages
- Console logging for debugging
- Non-blocking errors for optional data (like user progress)

### ✅ Comprehensive Cleanup

- Deletes all related data in correct order
- Handles foreign key constraints properly
- Returns detailed deletion summary

## Security

- **Admin Only**: Only users with admin role can delete courses
- **Authentication Required**: Must be logged in to delete courses
- **Confirmation Required**: User must confirm deletion in UI

## Error Scenarios

### Common Errors and Solutions

1. **"Authentication required"**

   - User must be logged in
   - Check if session is valid

2. **"Admin access required"**

   - User must have admin role
   - Check user profile role

3. **"Course ID is required"**

   - Must provide course ID in request
   - Check API call parameters

4. **"Failed to delete enrollments"**
   - Database constraint issue
   - Check foreign key relationships

## Testing

### Manual Testing

1. **Create a test course** with lessons and resources
2. **Enroll some test users** in the course
3. **Delete the course** using the API or UI
4. **Verify all data is removed**:
   - Course no longer exists
   - Lessons are gone
   - Resources are deleted
   - Enrollments are removed
   - User progress is cleared

### API Testing

```bash
# Test successful deletion
curl -X DELETE "http://localhost:3000/api/courses?id=test-course-id"

# Test missing ID
curl -X DELETE "http://localhost:3000/api/courses"

# Test non-existent course
curl -X DELETE "http://localhost:3000/api/courses?id=non-existent-id"
```

## Best Practices

1. **Always confirm deletion** - Never delete without user confirmation
2. **Show loading states** - Provide visual feedback during deletion
3. **Handle errors gracefully** - Show meaningful error messages
4. **Update UI immediately** - Remove deleted course from lists
5. **Log deletion events** - Keep audit trail of deletions
6. **Test thoroughly** - Verify all related data is removed

## Database Schema Dependencies

The deletion system works with these tables:

- `courses` - Main course table
- `lessons` - Course lessons
- `resources` - Lesson resources (files, videos)
- `enrollments` - Student enrollments
- `user_progress` - Student progress data (optional)

All foreign key relationships are properly handled in the deletion order.
