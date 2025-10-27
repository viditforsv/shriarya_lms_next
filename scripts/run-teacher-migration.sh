#!/bin/bash

# Script to run teacher assignment system migration
# Usage: ./scripts/run-teacher-migration.sh

echo "Running teacher assignment system migration..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Supabase CLI is not installed. Please install it first:"
    echo "npm install -g supabase"
    exit 1
fi

# Check if we're linked to a project
if [ ! -f ".supabase/project-ref" ]; then
    echo "Not linked to a Supabase project. Please run:"
    echo "supabase link --project-ref YOUR_PROJECT_REF"
    exit 1
fi

# Run the migration
echo "Executing migration..."
supabase db execute --file database_migrations/teacher_assignment_system.sql

if [ $? -eq 0 ]; then
    echo "Migration completed successfully!"
else
    echo "Migration failed. Please check the error messages above."
    exit 1
fi

