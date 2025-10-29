// Course Template System Types
// This defines the structure for our hybrid template system

export interface CourseTemplate {
  id: string;
  name: string;
  slug: string;
  description?: string;
  curriculum: "CBSE" | "ICSE" | "IBDP" | "IGCSE";
  subject: string;
  grade?: string;
  level?: string;

  // Template Structure (defines how the course is organized)
  structure: TemplateStructure;

  // Template Fields (defines what data fields are available)
  fields: TemplateField[];

  // Template Settings (defines behavior and UI)
  settings: TemplateSettings;

  // Metadata
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface TemplateStructure {
  sections: TemplateSection[];
  layout?: {
    sidebar?: boolean;
    tabs?: string[];
    gridColumns?: number;
  };
}

export interface TemplateSection {
  id: string;
  title: string;
  type: "overview" | "syllabus" | "lessons" | "facts" | "badges" | "custom";
  fields: string[];
  order?: number;
  visible?: boolean;
}

export interface TemplateField {
  key: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "boolean"
    | "array"
    | "object"
    | "select";
  label: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  default_value?: unknown;
  validation_rules?: ValidationRules;
  options?: string[]; // For select fields
  itemType?: string; // For array fields
  structure?: Record<string, unknown>; // For object fields
}

export interface ValidationRules {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  custom?: string;
}

export interface TemplateSettings {
  defaultValues?: Record<string, unknown>;
  rendering?: {
    hierarchy?: "5-tier"; // Units → Chapters → Topics → Lessons → Tags
    sidebarStructure?: "units-chapters-lessons"; // 3-level display
    showTopicNumber?: boolean; // Display topic number with lessons
    dynamicTabs?: boolean; // Show only tabs with content
  };
  lessonContent?: {
    supportedTypes?: string[]; // ["concepts", "formulas", "pdf-assignment", "pdf-solution", "video", "quiz"]
    tabOrder?: string[]; // Order of tabs to display
  };
  ui?: {
    showProgress?: boolean;
    showEnrollment?: boolean;
    showFacts?: boolean;
    showSyllabus?: boolean;
    showTags?: boolean;
    showParticipantsTab?: boolean; // Admin/Instructor feature
  };
  layout?: {
    sidebar?: boolean;
    tabs?: string[];
    gridColumns?: number;
  };
  behavior?: {
    autoEnroll?: boolean;
    requirePayment?: boolean;
    showPreview?: boolean;
  };
}

// Course Data Interface (what gets stored in the database)
export interface CourseData {
  id: string;
  template_id: string;
  title: string;
  slug: string;
  description: string;
  curriculum: string;
  subject: string;
  grade?: string;
  level?: string;
  price: number;
  status: "published" | "draft" | "archived";
  instructor_id?: string;
  duration?: string;
  validity_days?: number;
  thumbnail_url?: string;

  // Template-specific data (JSON)
  template_data: Record<string, unknown>;

  // Metadata
  created_at: string;
  updated_at: string;
}

// Rendered Course Interface (what the UI consumes)
export interface RenderedCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  curriculum: string;
  subject: string;
  grade?: string;
  level?: string;
  isFree: boolean;
  price?: number;
  status: string;
  instructor: string;
  duration: string;
  lessons: number;
  thumbnail: string;
  features: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  tags: string[];

  // Template-specific rendered data
  templateData: Record<string, unknown>;

  // Template structure for rendering
  templateStructure: TemplateStructure;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

// Template Field Types for Form Generation
export interface TemplateFieldConfig {
  key: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: ValidationRules;
}

// Course Template API Response
export interface CourseTemplateResponse {
  template: CourseTemplate;
  fields: TemplateFieldConfig[];
  settings: TemplateSettings;
}

// Course with Template Response
export interface CourseWithTemplateResponse {
  course: CourseData;
  template: CourseTemplate;
  rendered: RenderedCourse;
}
