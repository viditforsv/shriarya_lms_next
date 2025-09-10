import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST /api/migrate-course-templates - Set up database schema and migrate existing course
export async function POST() {
  try {
    const supabase = await createClient()
    
    // First, let's check if the course_templates table exists
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'course_templates')
    
    if (tablesError) {
      return NextResponse.json({ 
        error: 'Failed to check database schema',
        details: tablesError.message 
      }, { status: 500 })
    }
    
    if (!tables || tables.length === 0) {
      return NextResponse.json({ 
        error: 'Course templates table does not exist. Please run the SQL migration first.',
        instructions: 'Run the SQL in database/course_templates.sql in your Supabase SQL editor'
      }, { status: 400 })
    }
    
    // Check if we already have the CBSE Mathematics template
    const { data: existingTemplate } = await supabase
      .from('course_templates')
      .select('id')
      .eq('slug', 'cbse-mathematics-template')
      .single()
    
    if (existingTemplate) {
      return NextResponse.json({ 
        message: 'Template already exists',
        templateId: existingTemplate.id
      })
    }
    
    // Create the CBSE Mathematics template
    const { data: template, error: templateError } = await supabase
      .from('course_templates')
      .insert({
        name: 'CBSE Mathematics Template',
        slug: 'cbse-mathematics-template',
        description: 'Template for CBSE Mathematics courses with comprehensive structure',
        curriculum: 'CBSE',
        subject: 'Mathematics',
        grade: 'Class 10',
        structure: {
          sections: [
            {
              id: 'overview',
              title: 'Course Overview',
              type: 'overview',
              fields: ['description', 'features', 'prerequisites', 'learningOutcomes'],
              order: 1,
              visible: true
            },
            {
              id: 'syllabus',
              title: 'Complete Syllabus',
              type: 'syllabus',
              fields: ['syllabusContent'],
              order: 2,
              visible: true
            },
            {
              id: 'content',
              title: 'Course Content',
              type: 'lessons',
              fields: ['lessons'],
              order: 3,
              visible: true
            },
            {
              id: 'facts',
              title: 'Course Facts',
              type: 'facts',
              fields: ['duration', 'lessons', 'curriculum', 'grade'],
              order: 4,
              visible: true
            }
          ],
          layout: {
            sidebar: true,
            tabs: ['overview', 'content'],
            gridColumns: 3
          }
        },
        fields: [
          {
            key: 'title',
            type: 'text',
            label: 'Course Title',
            required: true,
            placeholder: 'e.g., CBSE Mathematics Class 10'
          },
          {
            key: 'description',
            type: 'textarea',
            label: 'Course Description',
            required: true,
            placeholder: 'Comprehensive course description...'
          },
          {
            key: 'features',
            type: 'array',
            label: 'Course Features',
            required: true,
            itemType: 'text',
            placeholder: 'Add course features...'
          },
          {
            key: 'prerequisites',
            type: 'array',
            label: 'Prerequisites',
            required: false,
            itemType: 'text',
            placeholder: 'Add prerequisites...'
          },
          {
            key: 'learningOutcomes',
            type: 'array',
            label: 'Learning Outcomes',
            required: true,
            itemType: 'text',
            placeholder: 'Add learning outcomes...'
          },
          {
            key: 'duration',
            type: 'text',
            label: 'Duration',
            required: true,
            placeholder: 'e.g., 120 hours'
          },
          {
            key: 'lessons',
            type: 'number',
            label: 'Number of Lessons',
            required: true,
            min: 1
          },
          {
            key: 'thumbnail',
            type: 'text',
            label: 'Thumbnail URL',
            required: false,
            placeholder: '/images/courses/...'
          },
          {
            key: 'tags',
            type: 'array',
            label: 'Tags',
            required: false,
            itemType: 'text',
            placeholder: 'Add tags...'
          },
          {
            key: 'syllabusContent',
            type: 'object',
            label: 'Syllabus Content',
            required: true,
            structure: {
              chapters: [
                {
                  title: 'Chapter Title',
                  units: [
                    {
                      title: 'Unit Title',
                      description: 'Unit Description'
                    }
                  ]
                }
              ]
            }
          }
        ],
        settings: {
          defaultValues: {
            isFree: true,
            status: 'published',
            instructor: 'Shri Arya Education',
            curriculum: 'CBSE',
            subject: 'Mathematics'
          },
          ui: {
            showProgress: true,
            showEnrollment: true,
            showFacts: true,
            showSyllabus: true,
            showTags: true
          },
          layout: {
            sidebar: true,
            tabs: ['overview', 'content'],
            gridColumns: 3
          },
          behavior: {
            autoEnroll: false,
            requirePayment: false,
            showPreview: true
          }
        }
      })
      .select()
      .single()
    
    if (templateError) {
      return NextResponse.json({ 
        error: 'Failed to create template',
        details: templateError.message 
      }, { status: 500 })
    }
    
    // Now migrate the existing CBSE Mathematics Class 10 course
    const { data: existingCourse } = await supabase
      .from('courses')
      .select('*')
      .eq('slug', 'cbse-mathematics-class-10')
      .single()
    
    if (existingCourse) {
      // Update the course to use the template
      const { error: updateError } = await supabase
        .from('courses')
        .update({
          template_id: template.id,
          template_data: {
            instructor: 'Shri Arya Education',
            duration: '120 hours',
            lessons: 45,
            thumbnail: '/images/courses/cbse-math-10.jpg',
            features: [
              'Complete NCERT syllabus coverage',
              'Board exam focused preparation',
              'Step-by-step problem solving',
              'Practice tests and mock exams',
              'Doubt clearing sessions'
            ],
            prerequisites: [
              'Basic understanding of Class 9 Mathematics',
              'Knowledge of fundamental arithmetic operations'
            ],
            learningOutcomes: [
              'Master all CBSE Class 10 Mathematics concepts',
              'Solve complex problems with confidence',
              'Excel in board examinations',
              'Develop strong mathematical reasoning'
            ],
            tags: ['CBSE', 'Mathematics', 'Class 10', 'Board Exam', 'NCERT'],
            syllabusContent: {
              chapters: [
                {
                  title: 'Unit I: Number Systems',
                  units: [
                    {
                      title: 'Real Numbers',
                      description: 'Fundamental Theorem of Arithmetic, proofs of irrationality for √2, √3, √5'
                    }
                  ]
                },
                {
                  title: 'Unit II: Algebra',
                  units: [
                    {
                      title: 'Polynomials',
                      description: 'Polynomials, Pair of Linear Equations, Quadratic Equations, Arithmetic Progressions'
                    }
                  ]
                },
                {
                  title: 'Unit III: Coordinate Geometry',
                  units: [
                    {
                      title: 'Distance Formula',
                      description: 'Distance Formula and Section (Internal Division) Formula'
                    }
                  ]
                },
                {
                  title: 'Unit IV: Geometry',
                  units: [
                    {
                      title: 'Triangles',
                      description: 'Triangles (similarity), Circles (tangent properties)'
                    }
                  ]
                },
                {
                  title: 'Unit V: Trigonometry',
                  units: [
                    {
                      title: 'Trigonometric Ratios',
                      description: 'Trigonometric ratios, Identities, Heights and Distances'
                    }
                  ]
                },
                {
                  title: 'Unit VI: Mensuration',
                  units: [
                    {
                      title: 'Areas Related to Circles',
                      description: 'Areas Related to Circles, Surface Areas and Volumes'
                    }
                  ]
                },
                {
                  title: 'Unit VII: Statistics & Probability',
                  units: [
                    {
                      title: 'Data Analysis',
                      description: 'Mean, Median, Mode of grouped data, Probability'
                    }
                  ]
                }
              ]
            }
          }
        })
        .eq('slug', 'cbse-mathematics-class-10')
      
      if (updateError) {
        return NextResponse.json({ 
          error: 'Failed to migrate existing course',
          details: updateError.message 
        }, { status: 500 })
      }
    }
    
    return NextResponse.json({ 
      message: 'Migration completed successfully',
      template: template,
      migratedCourse: existingCourse?.slug || 'cbse-mathematics-class-10'
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Migration failed' },
      { status: 500 }
    )
  }
}
