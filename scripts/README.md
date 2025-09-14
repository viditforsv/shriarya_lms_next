# Scripts Directory

This directory contains various utility scripts for managing the ShriArya LMS system.

## Directory Structure

```
scripts/
├── sql/                           # Database schema and security scripts
│   ├── enable-rls-security.sql    # Enable Row Level Security on tables
│   └── fix-question-bank-structure.sql # Fix question bank table structure
├── database-imports/              # Data import scripts
│   ├── import-cbse-syllabus.js    # Import CBSE syllabus data
│   ├── import-lessons.js          # Import lesson data
│   └── prepare-lesson-data.js     # Prepare lesson data for import
├── course-management/             # Course management utilities
│   ├── add-lessons-to-existing-course.js
│   ├── check-course.js
│   ├── restore-course-content.js
│   ├── update-lesson-content.js
│   └── update-lessons-with-sections.js
├── create-flexible-question-structure.js # Question bank utilities
├── reorder-csv-columns.js         # CSV data processing utilities
└── README.md                      # This file
```

## Script Categories

### 🔒 SQL Scripts (`sql/`)

Database schema modifications and security configurations.

- **`enable-rls-security.sql`**: Enables Row Level Security (RLS) on public tables to fix security lint errors
- **`fix-question-bank-structure.sql`**: Recreates question bank tables with proper structure

### 📥 Database Imports (`database-imports/`)

Scripts for importing data into the system.

- **`import-cbse-syllabus.js`**: Imports CBSE Class 10 Mathematics syllabus
- **`import-lessons.js`**: Imports lesson data from CSV files
- **`prepare-lesson-data.js`**: Prepares lesson data for import

### 🎓 Course Management (`course-management/`)

Utilities for managing courses and their content.

- **`add-lessons-to-existing-course.js`**: Adds lessons to existing courses
- **`check-course.js`**: Validates course data and structure
- **`restore-course-content.js`**: Restores course content from backups
- **`update-lesson-content.js`**: Updates lesson content
- **`update-lessons-with-sections.js`**: Updates lessons with section information

### 🔧 Utilities

General utility scripts for data processing and system maintenance.

- **`create-flexible-question-structure.js`**: Creates flexible question bank structure
- **`reorder-csv-columns.js`**: Reorders CSV columns for proper data import

## Usage

### Running SQL Scripts

Execute SQL scripts directly in the Supabase SQL Editor:

```sql
-- Copy and paste the contents of any .sql file
```

### Running JavaScript Scripts

Most JavaScript scripts require Node.js and Supabase configuration:

```bash
# Set up environment variables in .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Run scripts from the project root
node scripts/database-imports/import-cbse-syllabus.js
```

## Security Notes

- **RLS Security**: Always run `sql/enable-rls-security.sql` after creating new public tables
- **Service Role Key**: Only use service role keys in server-side scripts, never in client-side code
- **Data Validation**: Always validate data before running import scripts

## Maintenance

### Adding New Scripts

1. Place scripts in the appropriate subdirectory based on their purpose
2. Update this README with script descriptions
3. Add proper error handling and logging

### Cleaning Up

- Remove unused scripts regularly
- Keep only the latest versions of duplicate scripts
- Document any breaking changes in script behavior

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**

   ```
   Error: Missing Supabase configuration
   ```

   **Solution**: Ensure `.env.local` has correct Supabase credentials

2. **Permission Errors**

   ```
   Error: Authentication required
   ```

   **Solution**: Check that `SUPABASE_SERVICE_ROLE_KEY` has proper permissions

3. **Database Connection Issues**
   ```
   Error: Connection timeout
   ```
   **Solution**: Verify Supabase URL and network connectivity

### Getting Help

For issues with specific scripts:

1. Check the script's console output for detailed error messages
2. Verify database permissions and connectivity
3. Ensure all prerequisites are met
4. Check the script's comments for usage instructions
