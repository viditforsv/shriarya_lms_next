#!/usr/bin/env python3
"""
Generate SQL INSERT statements for IBDP lessons from CSV
Usage: python3 generate_lesson_inserts.py > import_all_lessons.sql
"""

import csv
import re

# Course ID
COURSE_ID = '492e363b-423c-4467-96fd-a89abafa5017'

# Topic to Chapter mapping
TOPIC_TO_CHAPTER = {
    # Number and Algebra
    'SL 1.1': 'Exponents and Logarithms',
    'SL 1.2': 'Sequences and Series',
    'SL 1.3': 'Sequences and Series',
    'SL 1.4': 'Sequences and Series',
    'SL 1.5': 'Exponents and Logarithms',
    'SL 1.6': 'Mathematical Proof',
    'SL 1.7': 'Exponents and Logarithms',
    'SL 1.8': 'Sequences and Series',
    'SL 1.9': 'Binomial Theorem and Counting',
    'AHL 1.10': 'Binomial Theorem and Counting',
    'AHL 1.11': 'Complex Numbers',
    'AHL 1.12': 'Complex Numbers',
    'AHL 1.13': 'Complex Numbers',
    'AHL 1.14': 'Complex Numbers',
    'AHL 1.15': 'Mathematical Proof',
    'AHL 1.16': 'Vectors and Linear Systems',
    
    # Functions
    'SL 2.1': 'Linear Functions',
    'SL 2.2': 'Concept of a Function',
    'SL 2.3': 'Concept of a Function',
    'SL 2.4': 'Concept of a Function',
    'SL 2.5': 'Composite and Inverse Functions',
    'SL 2.6': 'Quadratic Functions and Equations',
    'SL 2.7': 'Quadratic Functions and Equations',
    'SL 2.8': 'Rational and Reciprocal Functions and Inequalities',
    'SL 2.9': 'Exponents and Logarithms',
    'SL 2.10': 'Exponents and Logarithms',
    'SL 2.11': 'Functions Transformations and Graphs',
    'AHL 2.12': 'Polynomial and Factor Theorems',
    'AHL 2.13': 'Rational and Reciprocal Functions and Inequalities',
    'AHL 2.14': 'Composite and Inverse Functions',
    'AHL 2.15': 'Rational and Reciprocal Functions and Inequalities',
    'AHL 2.16': 'Functions Transformations and Graphs',
    
    # Geometry and Trigonometry
    'SL 3.1': 'Three-Dimensional Geometry',
    'SL 3.2': 'Trigonometric Ratios and Unit Circles',
    'SL 3.3': 'Trigonometric Ratios and Unit Circles',
    'SL 3.4': 'Trigonometric Ratios and Unit Circles',
    'SL 3.5': 'Circular Functions and Graphs',
    'SL 3.6': 'Circular Functions and Graphs',
    'SL 3.7': 'Circular Functions and Graphs',
    'SL 3.8': 'Reciprocal and Inverse Trigonometric Functions',
    'AHL 3.9': 'Reciprocal and Inverse Trigonometric Functions',
    'AHL 3.10': 'Compound Angles and Symmetry',
    'AHL 3.11': 'Compound Angles and Symmetry',
    'AHL 3.12': 'Vectors and Linear Systems',
    'AHL 3.13': 'Vectors and Linear Systems',
    'AHL 3.14': 'Vectors and Linear Systems',
    'AHL 3.15': 'Vectors and Linear Systems',
    'AHL 3.16': 'Vectors and Linear Systems',
    'AHL 3.17': 'Three-Dimensional Geometry',
    'AHL 3.18': 'Three-Dimensional Geometry',
    
    # Statistics and Probability
    'SL 4.1': 'Data and Sampling',
    'SL 4.2': 'Data and Sampling',
    'SL 4.3': 'Data and Sampling',
    'SL 4.4': 'Correlation and Regression',
    'SL 4.5': 'Probability Basics',
    'SL 4.6': 'Combined and Conditional Probability',
    'SL 4.7': 'Discrete and Continuous Random Variables',
    'SL 4.8': 'Binomial Distribution',
    'SL 4.9': 'Normal Distribution and Standardization',
    'SL 4.10': 'Correlation and Regression',
    'SL 4.11': 'Combined and Conditional Probability',
    'SL 4.12': 'Normal Distribution and Standardization',
    'AHL 4.13': 'Combined and Conditional Probability',
    'AHL 4.14': 'Discrete and Continuous Random Variables',
    
    # Calculus
    'SL 5.1': 'Limits and Introduction to Differentiation',
    'SL 5.2': 'Basic Differentiation and Tangents',
    'SL 5.3': 'Basic Differentiation and Tangents',
    'SL 5.4': 'Differentiation Rules and Applications',
    'SL 5.5': 'Integration Basics and Applications',
    'SL 5.6': 'Integration Basics and Applications',
    'SL 5.7': 'Integration Techniques and Definite Integrals',
    'SL 5.8': 'Integration Techniques and Definite Integrals',
    'SL 5.9': 'Integration Basics and Applications',
    'SL 5.10': 'Integration Basics and Applications',
    'SL 5.11': 'Integration Techniques and Definite Integrals',
    'AHL 5.12': 'Limits and Introduction to Differentiation',
    'AHL 5.13': 'Limits and Introduction to Differentiation',
    'AHL 5.14': 'Differentiation Rules and Applications',
    'AHL 5.15': 'Integration Techniques and Definite Integrals',
    'AHL 5.16': 'Integration Techniques and Definite Integrals',
    'AHL 5.17': 'Integration Techniques and Definite Integrals',
    'AHL 5.18': 'Differential Equations',
    'AHL 5.19': 'Limits and Introduction to Differentiation',
}

def make_slug(title):
    """Convert title to URL-friendly slug"""
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug

def escape_sql(text):
    """Escape single quotes for SQL"""
    if text is None:
        return 'NULL'
    return "'" + text.replace("'", "''") + "'"

def extract_difficulty(difficulty_str):
    """Extract integer from 'X / 10' format"""
    match = re.match(r'(\d+)\s*/\s*10', difficulty_str)
    if match:
        return int(match.group(1))
    return None

# Read CSV and generate SQL
print("-- Generated SQL INSERT statements for IBDP Lessons")
print("-- Course ID:", COURSE_ID)
print("-- Run this in Supabase SQL Editor\n")
print("DO $$")
print("DECLARE")
print(f"  v_course_id UUID := '{COURSE_ID}';")
print("  v_chapter_id UUID;")
print("BEGIN\n")

print("-- Create temporary chapter lookup")
print("CREATE TEMP TABLE IF NOT EXISTS chapter_lookup AS")
print("SELECT c.id, c.chapter_name")
print("FROM courses_chapters c")
print("JOIN courses_units u ON u.id = c.unit_id")
print("WHERE u.course_id = v_course_id;\n")

with open('docs/Shriarya _ IBDP Maths AA-HL_SL - topic_lesson_map.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    
    current_chapter = None
    
    for row in reader:
        sl_no = int(row['Sl. No.'])
        topic_number = row['topic_number']
        lesson_code = row['lesson_code']
        lesson_title = row['lesson_title']
        conceptual_focus = row['conceptual_focus']
        lesson_description = row['lesson_description']
        skill_emphasis = row['skill_emphasis']
        assessment_context = row['assessment_context']
        difficulty_level = extract_difficulty(row['difficulty_level'])
        learning_outcome = row['learning_outcome']
        
        # Get chapter name from mapping
        chapter_name = TOPIC_TO_CHAPTER.get(topic_number, None)
        
        if chapter_name is None:
            print(f"-- WARNING: No chapter mapping for {topic_number} - {lesson_title}")
            continue
        
        # Only fetch chapter_id when chapter changes
        if chapter_name != current_chapter:
            print(f"\n-- {chapter_name}")
            print(f"SELECT id INTO v_chapter_id FROM chapter_lookup WHERE chapter_name = {escape_sql(chapter_name)};")
            current_chapter = chapter_name
        
        # Generate slug with lesson_code prefix for uniqueness
        slug = make_slug(f"{lesson_code}-{lesson_title}")
        
        # First 5 lessons as preview
        is_preview = 'true' if sl_no <= 5 else 'false'
        
        # Generate INSERT
        print(f"INSERT INTO courses_lessons (course_id, chapter_id, title, slug, lesson_order, topic_number, lesson_code, conceptual_focus, lesson_description, skill_emphasis, assessment_context, difficulty_level, learning_outcome, is_preview)")
        print(f"VALUES (v_course_id, v_chapter_id, {escape_sql(lesson_title)}, {escape_sql(slug)}, {sl_no}, {escape_sql(topic_number)}, {escape_sql(lesson_code)}, {escape_sql(conceptual_focus)}, {escape_sql(lesson_description)}, {escape_sql(skill_emphasis)}, {escape_sql(assessment_context)}, {difficulty_level if difficulty_level else 'NULL'}, {escape_sql(learning_outcome)}, {is_preview});")

print("\nRAISE NOTICE 'All lessons imported successfully';")
print("DROP TABLE IF EXISTS chapter_lookup;")
print("END $$;\n")

# Verification queries
print("-- Verification: Lessons per chapter")
print("SELECT ")
print("  c.chapter_name,")
print("  u.unit_name,")
print("  COUNT(l.id) as lesson_count,")
print("  MIN(l.difficulty_level) as min_difficulty,")
print("  MAX(l.difficulty_level) as max_difficulty")
print("FROM courses_chapters c")
print("JOIN courses_units u ON u.id = c.unit_id")
print("LEFT JOIN courses_lessons l ON l.chapter_id = c.id")
print(f"WHERE u.course_id = '{COURSE_ID}'")
print("GROUP BY c.id, c.chapter_name, u.unit_name, c.chapter_order")
print("ORDER BY c.chapter_order;")

