// Course Registry - Dynamic Course Loading System
// This file manages the loading of course-specific data

export interface CourseData {
  syllabus: unknown[]
  lessons: unknown[]
  mapping: Record<string, string>
}

// Course Registry - Maps course slugs to their data loaders
export const COURSE_REGISTRY: Record<string, () => Promise<CourseData>> = {
  'cbse-mathematics-class-10': async () => {
    const courseModule = await import('./courses/cbse-mathematics-class-10')
    return {
      syllabus: courseModule.syllabus,
      lessons: courseModule.lessons,
      mapping: courseModule.mapping
    }
  },
  'ibdp-mathematics-aa-hl': async () => {
    const courseModule = await import('./courses/ibdp-mathematics-aa-hl')
    return {
      syllabus: courseModule.syllabus,
      lessons: courseModule.lessons,
      mapping: courseModule.mapping
    }
  }
  // Future courses will be added here:
  // 'cbse-mathematics-class-11': async () => { ... },
  // 'cbse-physics-class-10': async () => { ... },
  // etc.
}

// Helper function to get course data dynamically
export async function getCourseData(courseSlug: string): Promise<CourseData> {
  const courseLoader = COURSE_REGISTRY[courseSlug]
  
  if (!courseLoader) {
    throw new Error(`Course '${courseSlug}' not found in registry`)
  }
  
  try {
    return await courseLoader()
  } catch (error) {
    console.error(`Failed to load course data for '${courseSlug}':`, error)
    throw new Error(`Failed to load course data for '${courseSlug}'`)
  }
}

// Helper function to check if a course exists
export function courseExists(courseSlug: string): boolean {
  return courseSlug in COURSE_REGISTRY
}

// Helper function to get all available course slugs
export function getAllCourseSlugs(): string[] {
  return Object.keys(COURSE_REGISTRY)
}
