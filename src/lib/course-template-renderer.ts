// Course Template Rendering Utilities
// This handles the conversion from database data + template to rendered course

import {
  CourseTemplate,
  CourseData,
  RenderedCourse,
  TemplateStructure,
} from "@/types/course-templates";

/**
 * Renders a course using its template
 * Combines database course data with template structure to create a rendered course
 */
export function renderCourseWithTemplate(
  courseData: CourseData,
  template: CourseTemplate
): RenderedCourse {
  // Merge template data with course data
  const templateData = courseData.template_data || {};

  // Apply template default values
  const defaultValues = template.settings?.defaultValues || {};

  // Create the rendered course object
  const rendered: RenderedCourse = {
    id: courseData.id,
    title: courseData.title,
    slug: courseData.slug,
    description: courseData.description,
    curriculum: (courseData.curriculum ||
      templateData.curriculum ||
      defaultValues.curriculum) as string,
    subject: (courseData.subject ||
      templateData.subject ||
      defaultValues.subject) as string,
    grade: (courseData.grade ||
      templateData.grade ||
      defaultValues.grade) as string,
    level: (courseData.level ||
      templateData.level ||
      defaultValues.level) as string,
    isFree: (courseData.price || 0) === 0,
    price: courseData.price,
    status: courseData.status,
    instructor: String(
      templateData.instructor ||
        defaultValues.instructor ||
        "Shri Arya Education"
    ),
    duration: String(
      courseData.duration ||
        templateData.duration ||
        defaultValues.duration ||
        "120 hours"
    ),
    lessons: Number(templateData.lessons || defaultValues.lessons || 0),
    thumbnail: String(
      courseData.thumbnail_url ||
        templateData.thumbnail ||
        defaultValues.thumbnail ||
        "/images/courses/default.jpg"
    ),
    features:
      (templateData.features as string[]) ||
      (defaultValues.features as string[]) ||
      [],
    prerequisites:
      (templateData.prerequisites as string[]) ||
      (defaultValues.prerequisites as string[]) ||
      [],
    learningOutcomes:
      (templateData.learningOutcomes as string[]) ||
      (defaultValues.learningOutcomes as string[]) ||
      [],
    tags:
      (templateData.tags as string[]) || (defaultValues.tags as string[]) || [],

    // Template-specific data
    templateData: templateData,

    // Template structure for rendering
    templateStructure: template.structure,

    // Metadata
    createdAt: courseData.created_at,
    updatedAt: courseData.updated_at,
  };

  return rendered;
}

/**
 * Gets course data with template information
 * Fetches course from database and applies template
 */
export async function getCourseWithTemplate(): Promise<RenderedCourse | null> {
  try {
    // This would typically fetch from your database
    // For now, we'll return null and implement the actual fetching later
    return null;
  } catch (error) {
    console.error("Error fetching course with template:", error);
    return null;
  }
}

/**
 * Validates course data against template fields
 * Ensures all required fields are present and valid
 */
export function validateCourseDataAgainstTemplate(
  courseData: Record<string, unknown>,
  template: CourseTemplate
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required fields
  for (const field of template.fields) {
    if (field.required && !courseData[field.key]) {
      errors.push(`Required field '${field.label}' is missing`);
    }
  }

  // Validate field types
  for (const field of template.fields) {
    const value = courseData[field.key];
    if (value !== undefined && value !== null) {
      switch (field.type) {
        case "number":
          if (typeof value !== "number") {
            errors.push(`Field '${field.label}' must be a number`);
          }
          break;
        case "boolean":
          if (typeof value !== "boolean") {
            errors.push(`Field '${field.label}' must be a boolean`);
          }
          break;
        case "array":
          if (!Array.isArray(value)) {
            errors.push(`Field '${field.label}' must be an array`);
          }
          break;
        case "object":
          if (typeof value !== "object" || Array.isArray(value)) {
            errors.push(`Field '${field.label}' must be an object`);
          }
          break;
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generates default course data based on template
 * Creates a course data object with template defaults
 */
export function generateDefaultCourseData(
  template: CourseTemplate
): Record<string, unknown> {
  const defaultData: Record<string, unknown> = {};

  // Apply template default values
  if (template.settings?.defaultValues) {
    Object.assign(defaultData, template.settings.defaultValues);
  }

  // Apply field default values
  for (const field of template.fields) {
    if (field.default_value !== undefined) {
      defaultData[field.key] = field.default_value;
    }
  }

  return defaultData;
}

/**
 * Renders template sections for UI
 * Converts template structure into UI-friendly format
 */
export function renderTemplateSections(
  template: CourseTemplate
): TemplateStructure["sections"] {
  return template.structure.sections.map((section) => ({
    ...section,
    visible: section.visible !== false, // Default to visible unless explicitly hidden
  }));
}

/**
 * Gets template field configuration for forms
 * Converts template fields to form field configuration
 */
export function getTemplateFieldConfigs(template: CourseTemplate) {
  return template.fields.map((field) => ({
    key: field.key,
    type: field.type,
    label: field.label,
    required: field.required || false,
    placeholder: field.placeholder,
    options: field.options,
    validation: field.validation_rules,
  }));
}
