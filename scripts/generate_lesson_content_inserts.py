#!/usr/bin/env python3
"""
Generate SQL INSERT statements for course_lesson_content table
Maps lesson content from CSV to lessons based on topic_number and lesson_code
"""

import csv
import json
from pathlib import Path

def escape_sql_string(text):
    """Escape single quotes for SQL"""
    if text is None:
        return 'NULL'
    return text.replace("'", "''")

def generate_insert_statements():
    """Generate SQL INSERT statements from lesson_content.csv"""
    
    csv_path = Path(__file__).parent.parent / 'docs' / 'lesson_content.csv'
    output_path = Path(__file__).parent / 'populate_lesson_content.sql'
    
    print(f"Reading CSV from: {csv_path}")
    
    sql_statements = []
    
    # Add header comment
    sql_statements.append("-- Populate course_lesson_content table")
    sql_statements.append("-- Generated from lesson_content.csv")
    sql_statements.append("-- Maps content to lessons based on topic_number and lesson_code\n")
    
    # Add BEGIN transaction
    sql_statements.append("BEGIN;\n")
    
    with open(csv_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        row_count = 0
        for row in reader:
            row_count += 1
            
            topic_number = row.get('topic_number', '').strip()
            lesson_code = row.get('lesson_code', '').strip()
            content_type = row.get('content_type', '').strip()
            title = row.get('title', '').strip()
            content = row.get('content', '').strip()
            
            # Map 'concept' to 'concepts' to match DB constraint
            if content_type == 'concept':
                content_type = 'concepts'
            
            # Skip if missing required fields
            if not all([topic_number, lesson_code, content_type, title]):
                print(f"Skipping row {row_count}: missing required fields")
                continue
            
            # Escape SQL strings
            title_escaped = escape_sql_string(title)
            content_escaped = escape_sql_string(content)
            
            # Generate INSERT statement with subquery to find lesson_id
            insert_sql = f"""
-- Row {row_count}: {topic_number} - {lesson_code} - {content_type}
INSERT INTO public.course_lesson_content (lesson_id, content_type, title, content, order_index)
SELECT 
    id,
    '{content_type}',
    '{title_escaped}',
    '{content_escaped}',
    0
FROM public.courses_lessons
WHERE topic_number = '{topic_number}' 
  AND lesson_code = '{lesson_code}'
  AND id NOT IN (
    SELECT lesson_id 
    FROM public.course_lesson_content 
    WHERE content_type = '{content_type}'
  )
LIMIT 1;
"""
            sql_statements.append(insert_sql)
    
    # Add COMMIT transaction
    sql_statements.append("\nCOMMIT;")
    
    # Add verification query
    sql_statements.append("""
-- Verification: Count inserted records
SELECT 
    content_type,
    COUNT(*) as count
FROM public.course_lesson_content
GROUP BY content_type
ORDER BY content_type;

-- Check lessons without content
SELECT 
    l.id,
    l.topic_number,
    l.lesson_code,
    l.title,
    COUNT(clc.id) as content_count
FROM public.courses_lessons l
LEFT JOIN public.course_lesson_content clc ON l.id = clc.lesson_id
GROUP BY l.id, l.topic_number, l.lesson_code, l.title
HAVING COUNT(clc.id) = 0
ORDER BY l.topic_number, l.lesson_code;
""")
    
    # Write to output file
    output_content = '\n'.join(sql_statements)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(output_content)
    
    print(f"\nGenerated SQL file: {output_path}")
    print(f"Total rows processed: {row_count}")
    print(f"SQL statements generated: {len([s for s in sql_statements if 'INSERT INTO' in s])}")
    
    return output_path

if __name__ == '__main__':
    output_file = generate_insert_statements()
    print(f"\nNext steps:")
    print(f"1. Review the generated SQL file: {output_file}")
    print(f"2. Run it against your Supabase database")
    print(f"3. Check the verification queries at the end of the file")

