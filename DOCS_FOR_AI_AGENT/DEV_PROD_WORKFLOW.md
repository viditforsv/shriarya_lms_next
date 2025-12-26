# Dev → Prod Workflow Guide

Complete guide for managing code and database changes between dev and production environments.

## Overview

- **Dev Environment**: Local development with dev database
- **Prod Environment**: Production deployment with prod database
- **Code**: Managed via Git (dev branch → main branch)
- **Database**: Managed via Supabase migrations + data sync scripts

---

## 1. Daily Development Workflow

### Setup (One-time)

1. **Configure `.env.local` for dev:**
```bash
NEXT_PUBLIC_ENVIRONMENT=dev

# Dev Supabase (your dev database with many courses)
NEXT_PUBLIC_SUPABASE_URL_DEV=https://your-dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV=your-dev-anon-key
SUPABASE_SERVICE_ROLE_KEY_DEV=your-dev-service-role-key

# Prod Supabase (keep for reference, won't be used in dev)
NEXT_PUBLIC_SUPABASE_URL_PROD=https://ootnqmojcqnzfrtvzzec.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD=your-prod-anon-key
SUPABASE_SERVICE_ROLE_KEY_PROD=your-prod-service-role-key
```

2. **Work on `dev` branch:**
```bash
git checkout dev
npm run dev
```

### During Development

- ✅ Code changes → Test locally with **dev database**
- ✅ Schema changes → Create migration files in `supabase/migrations/`
- ✅ Data changes → Test in **dev database** first

---

## 2. Database Schema Changes (Migrations)

### When You Make Schema Changes

**Option A: Using Supabase CLI (Recommended)**

1. **Link to your dev project:**
```bash
supabase link --project-ref your-dev-project-ref
```

2. **Create a new migration:**
```bash
supabase migration new add_new_table
# This creates: supabase/migrations/YYYYMMDDHHMMSS_add_new_table.sql
```

3. **Write your SQL in the migration file:**
```sql
-- supabase/migrations/YYYYMMDDHHMMSS_add_new_table.sql
CREATE TABLE new_table (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL
);
```

4. **Apply to dev database:**
```bash
supabase db push
```

5. **Test in dev**, then commit migration file to git:
```bash
git add supabase/migrations/
git commit -m "Add new_table migration"
```

**Option B: Manual Migration Files**

1. Create migration file: `supabase/migrations/YYYYMMDDHHMMSS_description.sql`
2. Apply to dev via Supabase Dashboard SQL Editor
3. Commit migration file to git

### Migration File Naming Convention

```
YYYYMMDDHHMMSS_description.sql
```

Example: `20250115143000_add_user_preferences.sql`

---

## 3. Deploying Code to Production

### Step 1: Merge Code to Main Branch

```bash
# On dev branch, ensure everything is committed
git checkout dev
git add .
git commit -m "Your changes"

# Merge to main
git checkout main
git merge dev
git push origin main
```

Vercel will automatically deploy from `main` branch.

### Step 2: Update Production Environment Variables

Ensure Vercel has:
- `NEXT_PUBLIC_ENVIRONMENT=prod`
- `NEXT_PUBLIC_SUPABASE_URL_PROD=...`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD=...`
- `SUPABASE_SERVICE_ROLE_KEY_PROD=...`

---

## 4. Deploying Database Changes to Production

### Step 1: Apply Migrations to Prod

**Option A: Using Supabase CLI**

1. **Link to prod project:**
```bash
supabase link --project-ref ootnqmojcqnzfrtvzzec
```

2. **Push migrations:**
```bash
supabase db push
```

**Option B: Using Supabase Dashboard**

1. Go to Supabase Dashboard → SQL Editor
2. Copy migration SQL from `supabase/migrations/` files
3. Run in SQL Editor (in order by timestamp)

**Option C: Using Migration Script**

```bash
npm run migrate:prod
# (Script to be created - see scripts section)
```

### Step 2: Verify Migration

- Check Supabase Dashboard → Table Editor
- Verify schema matches dev
- Test critical functionality

---

## 5. Syncing Data from Dev to Prod

### When to Sync Data

- ✅ New courses/content created in dev
- ✅ Updated course structures
- ✅ Reference data (tags, categories, etc.)
- ❌ User data (profiles, enrollments) - usually keep separate
- ❌ Production-specific data

### Data Sync Methods

**Method 1: Selective Data Export/Import (Recommended)**

Use scripts to export specific tables from dev and import to prod:

```bash
# Export courses from dev
npm run export:dev -- --table courses --output data/courses.json

# Import to prod (with validation)
npm run import:prod -- --file data/courses.json --table courses
```

**Method 2: SQL Dumps (For Full Tables)**

```bash
# Export from dev
pg_dump -h dev-db-host -U postgres -t courses > courses.sql

# Import to prod (carefully!)
# Review SQL first, then apply
```

**Method 3: Supabase Dashboard**

- Use Table Editor to export CSV/JSON
- Import via Table Editor (for small datasets)

### What NOT to Sync

- ❌ User accounts (`auth.users`, `profiles`)
- ❌ User enrollments
- ❌ Payment records
- ❌ User progress/attempts
- ❌ Production-specific configurations

---

## 6. Complete Deployment Checklist

### Before Deploying to Prod

- [ ] All code changes tested in dev
- [ ] All migrations tested in dev database
- [ ] Migration files committed to git
- [ ] Code merged to `main` branch
- [ ] Vercel deployment successful

### Database Deployment

- [ ] Migrations applied to prod database
- [ ] Schema verified (compare dev vs prod)
- [ ] Critical data synced (if needed)
- [ ] Production data integrity checked

### Post-Deployment

- [ ] Test production app functionality
- [ ] Verify database connections
- [ ] Monitor for errors
- [ ] Rollback plan ready (if needed)

---

## 7. Rollback Strategy

### Code Rollback

```bash
# Revert to previous commit
git checkout main
git revert HEAD
git push origin main
# Vercel will redeploy
```

### Database Rollback

1. **Create rollback migration:**
```sql
-- supabase/migrations/YYYYMMDDHHMMSS_rollback_feature.sql
DROP TABLE IF EXISTS new_table;
-- Or ALTER TABLE to revert changes
```

2. **Apply rollback:**
```bash
supabase db push
```

---

## 8. Best Practices

### Do's ✅

- Always test migrations in dev first
- Keep migration files in git
- Use descriptive migration names
- Backup prod database before major changes
- Sync data selectively (not everything)
- Document breaking changes

### Don'ts ❌

- Don't modify production schema directly (use migrations)
- Don't sync user data from dev to prod
- Don't skip testing in dev
- Don't delete migration files
- Don't apply migrations out of order

---

## 9. Helper Scripts

See `scripts/` directory for:
- `migrate-to-prod.ts` - Apply migrations to prod
- `export-dev-data.ts` - Export data from dev
- `import-prod-data.ts` - Import data to prod
- `compare-schemas.ts` - Compare dev vs prod schemas

---

## 10. Quick Reference

### Daily Dev
```bash
git checkout dev
npm run dev  # Uses dev database automatically
```

### Deploy Code
```bash
git checkout main
git merge dev
git push origin main
```

### Deploy Database
```bash
supabase link --project-ref prod-ref
supabase db push
```

### Export Data
```bash
npm run export:dev -- --table courses
```

---

## Troubleshooting

**Issue: Code works in dev but not prod**
- Check environment variables in Vercel
- Verify `NEXT_PUBLIC_ENVIRONMENT=prod` in prod
- Check database connection

**Issue: Schema mismatch**
- Compare migrations applied in dev vs prod
- Check migration order
- Verify all migrations committed to git

**Issue: Data not syncing**
- Check table permissions
- Verify foreign key constraints
- Check for data conflicts

---

## Related Docs

- [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) - Environment configuration
- [VERCEL_SETUP.md](./VERCEL_SETUP.md) - Vercel deployment

