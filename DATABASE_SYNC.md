# Database Sync Strategy: Dev ↔ Production

## Overview

This document outlines how to keep your **development** and **production** Supabase databases in sync.

## Current Setup

- **Dev Database**: Your local development Supabase project
- **Prod Database**: Your live production Supabase project
- **Problem**: No migration system to sync schema changes

## Solution: Supabase Migrations

### Option 1: Supabase CLI (Recommended)

#### Installation

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login
```

#### Initial Setup

```bash
# Initialize Supabase in your project (if not already done)
supabase init

# Link to your DEV project
supabase link --project-ref YOUR_DEV_PROJECT_REF

# Create a new migration
supabase migration new create_progress_tables

# Edit the migration file in supabase/migrations/
```

#### Workflow: Dev to Prod

**Step 1: Develop Migration Locally**

```bash
# Link to DEV
supabase link --project-ref YOUR_DEV_PROJECT_REF

# Test migration on DEV
supabase db reset  # Resets DB and runs all migrations

# Create new migration
supabase migration new add_new_feature
```

**Step 2: Test on Dev**

```bash
# Apply migration to DEV
supabase db push
```

**Step 3: Apply to Prod**

```bash
# Link to PROD
supabase link --project-ref YOUR_PROD_PROJECT_REF

# Push migrations to PROD
supabase db push
```

#### Migration File Location

All migrations should go in:

```
supabase/
  migrations/
    20240101000000_initial_schema.sql
    20240102000000_add_student_progress.sql
    20240103000000_add_new_feature.sql
```

### Option 2: Manual SQL Scripts (Current Approach)

#### Current Structure

You already have SQL files in:

- `docs/present_dnd.sql`
- `docs/V2 Plan/migrations/001_create_progress_tables.sql`

#### Workflow

**Step 1: Create SQL Script**

```bash
# Save your SQL to docs/migrations/
mkdir -p docs/migrations
```

**Step 2: Apply to Dev**

```sql
-- Copy SQL to Supabase Dashboard → SQL Editor
-- Run on DEV database
```

**Step 3: Apply to Prod**

```sql
-- Copy same SQL to Supabase Dashboard → SQL Editor
-- Run on PROD database (CAREFUL!)
```

#### Best Practices

1. **Always test on DEV first**
2. **Version control all SQL files**
3. **Document breaking changes**
4. **Keep a changelog**

## Recommended Setup

### Create Centralized Migrations Folder

```bash
mkdir -p database/migrations
```

### Structure

```
database/
  migrations/
    001_initial_schema.sql
    002_add_profiles.sql
    003_add_courses.sql
    004_add_progress_tracking.sql
    005_add_student_mastery.sql
  README.md
```

### Migration Template

```sql
-- Migration: Add Student Progress Tables
-- Date: 2024-01-XX
-- Author: [Your Name]
-- Description: Adds tables for tracking student question attempts and tag mastery
--
-- BREAKING CHANGES: None
-- ROLLBACK: See rollback/005_rollback.sql

BEGIN;

-- Your SQL here
CREATE TABLE IF NOT EXISTS student_question_attempts (
    -- ...
);

COMMIT;
```

## CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/migrate.yml
name: Database Migration

on:
  push:
    branches: [main]
    paths:
      - "database/migrations/*.sql"

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Supabase CLI
        run: npm install -g supabase

      - name: Run Migrations on Prod
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
          PROJECT_REF: ${{ secrets.PROD_PROJECT_REF }}
        run: |
          supabase link --project-ref $PROJECT_REF
          supabase db push
```

## Quick Reference

### Common Commands

```bash
# View current migration status
supabase migration list

# Reset local database (local dev only!)
supabase db reset

# Pull remote changes (local dev only!)
supabase db pull

# Diff: See differences between local and remote
supabase db diff

# Generate migration from local changes
supabase db diff --use-migra -f migration_name
```

## Rollback Strategy

### For Supabase CLI

```sql
-- Create down migration
supabase migration new rollback_feature

-- In the rollback file:
BEGIN;
DROP TABLE IF EXISTS student_question_attempts;
DROP TABLE IF EXISTS student_tag_mastery;
COMMIT;
```

### For Manual SQL

Always create a rollback script alongside your migration:

```
database/
  migrations/
    005_add_progress.sql
  rollbacks/
    005_rollback.sql
```

## Environment-Specific Configs

### .env.local (Dev)

```env
NEXT_PUBLIC_SUPABASE_URL=https://dev-project.supabase.co
SUPABASE_PROJECT_REF=abc123dev
```

### .env.production (Prod)

```env
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
SUPABASE_PROJECT_REF=xyz789prod
```

## Important Notes

1. **NEVER run destructive operations on PROD without testing on DEV**
2. **Always backup PROD before migrations**
3. **Test migrations on staging if available**
4. **Document all breaking changes**
5. **Keep migrations idempotent** (use IF NOT EXISTS, etc.)

## Current Project Status

**Existing SQL Files:**

- ✅ `docs/present_dnd.sql` - Full schema dump
- ✅ `docs/V2 Plan/migrations/001_create_progress_tables.sql` - Progress tracking

**Action Items:**

1. [ ] Set up Supabase CLI
2. [ ] Create centralized `database/migrations/` folder
3. [ ] Move existing SQL files to migrations folder
4. [ ] Link both DEV and PROD projects
5. [ ] Create CI/CD pipeline for automated migrations
6. [ ] Document rollback procedures

## Getting Help

- Supabase CLI Docs: https://supabase.com/docs/guides/cli
- Migration Guide: https://supabase.com/docs/guides/cli/local-development#database-migrations
- Discord: https://discord.supabase.com
