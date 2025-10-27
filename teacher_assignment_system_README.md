# Teacher-Student Assignment Grading System

## Overview

Complete implementation of a teacher-student assignment grading system where students upload PDF assignments, teachers download them, mark them offline, and upload graded PDFs back to student portals.

## Features Implemented

### 1. Database Schema Updates

- Added `assigned_teacher_id` column to `courses_enrollments` table
- Enhanced `assignment_submissions` table with grading columns:
  - `graded_file_path` and `graded_file_url`
  - `marks_obtained` and `max_marks`
  - `graded_at`, `graded_by`, `teacher_comments`
  - `grading_status` (pending/graded/returned)

### 2. API Endpoints Created

#### Admin APIs

- **POST `/api/admin/enrollments/assign-teacher`**: Assign teacher to enrollment

#### Teacher APIs

- **GET `/api/teacher/students`**: Get all students assigned to teacher
- **GET `/api/teacher/submissions`**: Get student submissions for grading
- **POST `/api/teacher/upload-graded`**: Upload graded PDF with marks and comments

#### Student APIs

- **GET `/api/student/graded-submissions`**: Get graded assignments for a course

### 3. Admin UI Updates

- **File**: `src/app/admin/user-enrollments/page.tsx`
- Added "Assigned Teacher" column to enrollment table
- Dropdown to select/assign teachers to enrollments
- Teachers filtered to show only users with 'teacher' or 'admin' role

### 4. Teacher Dashboard

- **File**: `src/app/teacher/dashboard/page.tsx`
- View assigned students grouped by course
- See pending submission counts per student
- Navigate to student submissions

### 5. Teacher Grading Interface

- **File**: `src/app/teacher/submissions/[studentId]/[courseId]/page.tsx`
- View all submissions from a student
- Download submission PDF
- Upload graded PDF with modal

### 6. Upload Graded Modal

- **File**: `src/components/teacher/UploadGradedModal.tsx`
- File upload for graded PDF
- Marks input (obtained/max)
- Comments textarea
- Success/error handling

### 7. Student Graded Assignments View

- **File**: `src/app/student/graded-assignments/[courseId]/page.tsx`
- View all graded submissions
- Display marks and teacher comments
- Download graded PDF

## Database Migration

Run the migration file to update your database schema:

```sql
-- See: database_migrations/teacher_assignment_system.sql
```

The migration adds:

1. `assigned_teacher_id` to `courses_enrollments`
2. Grading columns to `assignment_submissions`
3. Indexes for performance

## Usage

### For Admins

1. Navigate to `/admin/user-enrollments`
2. Use the "Assigned Teacher" dropdown to assign teachers to student enrollments
3. Teachers are filtered from users with role='teacher' or role='admin'

### For Teachers

1. Navigate to `/teacher/dashboard`
2. See all assigned students grouped by course
3. Click on a student to view their submissions
4. Download student submissions
5. Upload graded PDFs with marks and comments

### For Students

1. Navigate to `/student/graded-assignments/[courseId]`
2. View graded assignments with marks and teacher feedback
3. Download graded PDFs

## File Storage

- Student submissions: `assignments/{courseSlug}/{assignmentId}_{userId}_{timestamp}.pdf`
- Graded submissions: `assignments/{courseSlug}/graded/{assignmentId}_{userId}_{timestamp}_graded.pdf`

## Design System

All UI components follow the existing design system:

- `rounded-sm` for border-radius
- Orange theme (`#e27447`) for primary actions
- Consistent spacing and typography

## Notes

- Only PDF files are accepted (validated on upload)
- File size limit: 10MB
- Teachers can only access submissions from their assigned students
- Students can only view their own graded submissions
