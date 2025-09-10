// Course Template System Types
// This defines the structure for our hybrid template system

export interface CourseTemplate {
  id: string
  name: string
  slug: string
  description?: string
  curriculum: 'CBSE' | 'ICSE' | 'IBDP' | 'IGCSE'
  subject: string
  grade?: string
  level?: string
  
  // Template Structure (defines how the course is organized)
  structure: TemplateStructure
  
  // Template Fields (defines what data fields are available)
  fields: TemplateField[]
  
  // Template Settings (defines behavior and UI)
  settings: TemplateSettings
  
  // Metadata
  is_active: boolean
  created_at: string
  updated_at: string
  created_by?: string
}

export interface TemplateStructure {
  sections: TemplateSection[]
  layout?: {
    sidebar?: boolean
    tabs?: string[]
    gridColumns?: number
  }
}

export interface TemplateSection {
  id: string
  title: string
  type: 'overview' | 'syllabus' | 'lessons' | 'facts' | 'custom'
  fields: string[]
  order?: number
  visible?: boolean
}

export interface TemplateField {
  key: string
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'array' | 'object' | 'select'
  label: string
  description?: string
  required?: boolean
  placeholder?: string
  default_value?: any
  validation_rules?: ValidationRules
  options?: string[] // For select fields
  itemType?: string // For array fields
  structure?: any // For object fields
}

export interface ValidationRules {
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: string
  custom?: string
}

export interface TemplateSettings {
  defaultValues?: Record<string, any>
  ui?: {
    showProgress?: boolean
    showEnrollment?: boolean
    showFacts?: boolean
    showSyllabus?: boolean
    showTags?: boolean
  }
  layout?: {
    sidebar?: boolean
    tabs?: string[]
    gridColumns?: number
  }
  behavior?: {
    autoEnroll?: boolean
    requirePayment?: boolean
    showPreview?: boolean
  }
}

// Course Data Interface (what gets stored in the database)
export interface CourseData {
  id: string
  template_id: string
  title: string
  slug: string
  description: string
  curriculum: string
  subject: string
  grade?: string
  level?: string
  is_free: boolean
  price?: number
  status: 'published' | 'draft' | 'archived'
  instructor_id?: string
  
  // Template-specific data (JSON)
  template_data: Record<string, any>
  
  // Metadata
  created_at: string
  updated_at: string
}

// Rendered Course Interface (what the UI consumes)
export interface RenderedCourse {
  id: string
  title: string
  slug: string
  description: string
  curriculum: string
  subject: string
  grade?: string
  level?: string
  isFree: boolean
  price?: number
  status: string
  instructor: string
  duration: string
  lessons: number
  thumbnail: string
  features: string[]
  prerequisites: string[]
  learningOutcomes: string[]
  tags: string[]
  
  // Template-specific rendered data
  templateData: Record<string, any>
  
  // Template structure for rendering
  templateStructure: TemplateStructure
  
  // Metadata
  createdAt: string
  updatedAt: string
}

// Template Field Types for Form Generation
export interface TemplateFieldConfig {
  key: string
  type: string
  label: string
  required: boolean
  placeholder?: string
  options?: string[]
  validation?: ValidationRules
}

// Course Template API Response
export interface CourseTemplateResponse {
  template: CourseTemplate
  fields: TemplateFieldConfig[]
  settings: TemplateSettings
}

// Course with Template Response
export interface CourseWithTemplateResponse {
  course: CourseData
  template: CourseTemplate
  rendered: RenderedCourse
}
