# CBSE Syllabus Import Guide

This guide explains how to import the CBSE Class 10 Mathematics syllabus into your LMS database.

## Prerequisites

1. **Node.js** (v16 or higher)
2. **Supabase Project** with the following environment variables in `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **CSV File**: `docs/CBSE-10-Maths-Complete-Syllabus.csv` (already created)

## Installation

1. Navigate to the scripts directory:

   ```bash
   cd scripts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Import

1. **Run the import script**:

   ```bash
   npm run import
   ```

   Or directly:

   ```bash
   node import-cbse-syllabus.js
   ```

## What the Script Does

The import script will:

1. **Create a Course Template** for CBSE Mathematics courses
2. **Create a Course Instance** with the complete syllabus
3. **Import 94 Lessons** organized by units and chapters
4. **Set up the Database Structure** with proper relationships

### Database Structure Created

- **Course Template**: `cbse-mathematics-template`
- **Course Instance**: `cbse-class-10-mathematics`
- **94 Lessons** with proper ordering and metadata
- **7 Units** covering all CBSE topics
- **15 Chapters** organized by subject areas

### Course Structure

```
Unit 1: Number Systems (6 lessons)
├── Chapter 1: Real Numbers
│   ├── Introduction to Real Numbers
│   ├── Fundamental Theorem of Arithmetic
│   ├── Proofs of Irrationality
│   └── Practice Problems

Unit 2: Algebra (25 lessons)
├── Chapter 2: Polynomials
├── Chapter 3: Pair of Linear Equations
├── Chapter 4: Quadratic Equations
└── Chapter 5: Arithmetic Progressions

Unit 3: Coordinate Geometry (6 lessons)
├── Chapter 6: Coordinate Geometry

Unit 4: Geometry (10 lessons)
├── Chapter 7: Triangles
└── Chapter 8: Circles

Unit 5: Trigonometry (19 lessons)
├── Chapter 9: Introduction to Trigonometry
├── Chapter 10: Trigonometric Identities
└── Chapter 11: Heights and Distances

Unit 6: Mensuration (10 lessons)
├── Chapter 12: Areas Related to Circles
└── Chapter 13: Surface Areas and Volumes

Unit 7: Statistics & Probability (13 lessons)
├── Chapter 14: Statistics
└── Chapter 15: Probability
```

## Frontend Integration

The frontend has been updated to support the CBSE syllabus structure:

### New Components

1. **CBSESyllabusView**: Displays the complete syllabus structure
2. **CBSEUnitView**: Shows individual units with chapters and lessons
3. **Updated Course Page**: Integrates CBSE-specific views

### API Endpoints

- `GET /api/syllabus/[courseSlug]`: Fetch syllabus data
- `POST /api/syllabus/[courseSlug]`: Update syllabus structure

### Course Page Features

- **Tabbed Interface**: Overview, Syllabus, Lessons
- **Progress Tracking**: Shows completion percentage
- **Unit Navigation**: Easy navigation between units
- **Lesson Access**: Direct links to individual lessons

## Accessing the Course

After successful import, you can access the course at:

```
https://your-domain.com/courses/cbse-class-10-mathematics
```

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**

   ```
   Error: Missing Supabase configuration
   ```

   **Solution**: Ensure `.env.local` has the correct Supabase credentials

2. **CSV File Not Found**

   ```
   Error: CSV file not found
   ```

   **Solution**: Ensure `docs/CBSE-10-Maths-Complete-Syllabus.csv` exists

3. **Database Permission Issues**
   ```
   Error: Authentication required
   ```
   **Solution**: Check that `SUPABASE_SERVICE_ROLE_KEY` has proper permissions

### Verification

After import, verify the data:

1. **Check Course Template**:

   ```sql
   SELECT * FROM course_templates WHERE slug = 'cbse-mathematics-template';
   ```

2. **Check Course Instance**:

   ```sql
   SELECT * FROM courses WHERE slug = 'cbse-class-10-mathematics';
   ```

3. **Check Lessons Count**:
   ```sql
   SELECT COUNT(*) FROM lessons WHERE course_id = 'your-course-id';
   ```

## Customization

### Modifying the Syllabus

To update the syllabus:

1. Edit `docs/CBSE-10-Maths-Complete-Syllabus.csv`
2. Re-run the import script
3. The script will update existing data

### Adding New Courses

To create additional CBSE courses:

1. Modify `COURSE_CONFIG` in the script
2. Update the CSV file structure
3. Run the import script

## Support

For issues or questions:

1. Check the console output for detailed error messages
2. Verify database permissions and connectivity
3. Ensure all prerequisites are met

## Next Steps

After successful import:

1. **Test the Course**: Navigate to the course page
2. **Verify Lessons**: Check that all lessons are accessible
3. **Test Progress**: Ensure progress tracking works
4. **Customize Content**: Add specific content to individual lessons
5. **Set Up Resources**: Add videos, PDFs, and other resources to lessons
