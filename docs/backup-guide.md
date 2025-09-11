# Supabase Database Backup Guide

## Method 1: Supabase Dashboard (Easiest)

### Full Database Backup:

1. **Go to Supabase Dashboard** → Your Project
2. **Settings** → **Database**
3. **Backups** tab
4. **Create Backup** → Choose "Full Backup"
5. **Download** the backup file when ready

### Table-specific Backup:

1. **Table Editor** → Select your table
2. **Export** → Choose format (CSV, JSON, SQL)
3. **Download** the exported data

## Method 2: SQL Dump (Complete Schema + Data)

### Using Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Create full database dump
supabase db dump --file backup.sql
```

### Using pg_dump (if you have PostgreSQL client):

```bash
# Get connection string from Supabase Settings → Database
pg_dump "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres" > backup.sql
```

## Method 3: Programmatic Backup (Node.js Script)

### Create backup script:

```javascript
// backup-database.js
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function backupTable(tableName) {
  console.log(`📋 Backing up table: ${tableName}`);

  const { data, error } = await supabase.from(tableName).select("*");

  if (error) {
    console.error(`❌ Error backing up ${tableName}:`, error.message);
    return null;
  }

  const backup = {
    table: tableName,
    timestamp: new Date().toISOString(),
    rowCount: data?.length || 0,
    data: data,
  };

  return backup;
}

async function createBackup() {
  const tables = ["courses", "lessons", "resources", "enrollments", "profiles"];
  const backup = {
    timestamp: new Date().toISOString(),
    tables: {},
  };

  for (const table of tables) {
    const tableBackup = await backupTable(table);
    if (tableBackup) {
      backup.tables[table] = tableBackup;
    }
  }

  const filename = `backup-${new Date().toISOString().split("T")[0]}.json`;
  fs.writeFileSync(filename, JSON.stringify(backup, null, 2));

  console.log(`✅ Backup created: ${filename}`);
  console.log(`📊 Tables backed up: ${Object.keys(backup.tables).length}`);
}

createBackup();
```

## Method 4: Quick Backup Before Changes

### Before running the lesson_sections removal:

```sql
-- Create backup tables
CREATE TABLE courses_backup AS SELECT * FROM courses;
CREATE TABLE lessons_backup AS SELECT * FROM lessons;
CREATE TABLE resources_backup AS SELECT * FROM resources;
CREATE TABLE enrollments_backup AS SELECT * FROM enrollments;
CREATE TABLE profiles_backup AS SELECT * FROM profiles;

-- Verify backup
SELECT 'courses' as table_name, COUNT(*) as row_count FROM courses_backup
UNION ALL
SELECT 'lessons', COUNT(*) FROM lessons_backup
UNION ALL
SELECT 'resources', COUNT(*) FROM resources_backup
UNION ALL
SELECT 'enrollments', COUNT(*) FROM enrollments_backup
UNION ALL
SELECT 'profiles', COUNT(*) FROM profiles_backup;
```

## Recommended Approach for Your Case:

Since you're about to remove the `lesson_sections` table, I recommend:

1. **Quick Method**: Use Supabase Dashboard → Settings → Database → Backups
2. **Alternative**: Run the backup script I'll create below
3. **Verify**: Check that your important data (courses, lessons, resources) is backed up

## Backup Verification:

After backup, verify by checking:

- Row counts match
- Sample data looks correct
- All important tables are included
