-- Fix tags column data in question_bank table
-- This script converts malformed tag data to proper PostgreSQL arrays

-- First, let's see what the current data looks like
SELECT id, tags, pg_typeof(tags) as tags_type 
FROM question_bank 
WHERE tags IS NOT NULL 
LIMIT 5;

-- Update tags that are stored as JSON strings to proper arrays
UPDATE question_bank 
SET tags = (
  CASE 
    -- If tags is a JSON string containing an array
    WHEN pg_typeof(tags) = 'jsonb'::regtype THEN
      -- Extract array elements and convert to text array
      ARRAY(
        SELECT jsonb_array_elements_text(tags)
      )
    -- If tags is already a text array, keep it as is
    WHEN pg_typeof(tags) = 'text[]'::regtype THEN
      tags
    -- If tags is a single text value, split it into array
    WHEN pg_typeof(tags) = 'text'::regtype THEN
      string_to_array(tags, ',')
    ELSE
      '{}'::text[]
  END
)
WHERE tags IS NOT NULL;

-- Alternative approach: If the above doesn't work, try this more explicit conversion
-- This handles the specific case where tags are stored as JSON with newline characters

UPDATE question_bank 
SET tags = (
  CASE 
    -- Handle JSON array with newline-separated values
    WHEN tags::text LIKE '[%]%' THEN
      ARRAY(
        SELECT trim(unnest(string_to_array(
          replace(replace(tags::text, '[', ''), ']', ''), 
          '\n'
        )))
        WHERE trim(unnest(string_to_array(
          replace(replace(tags::text, '[', ''), ']', ''), 
          '\n'
        ))) != ''
      )
    -- Handle comma-separated values
    WHEN tags::text LIKE '%,%' THEN
      string_to_array(tags::text, ',')
    -- Handle single values
    ELSE
      ARRAY[tags::text]
  END
)
WHERE tags IS NOT NULL AND tags::text != '[]';

-- Verify the results
SELECT id, tags, pg_typeof(tags) as tags_type 
FROM question_bank 
WHERE tags IS NOT NULL 
LIMIT 10;
