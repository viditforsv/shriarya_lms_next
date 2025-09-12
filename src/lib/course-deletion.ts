interface CourseDeletionResult {
  message: string;
  deletedItems: {
    enrollments: boolean;
    resources: number;
    lessonSections: boolean;
    lessons: number;
    course: boolean;
  };
}

/**
 * Delete a course and all its related data
 * @param courseId - The ID of the course to delete
 * @param courseTitle - The title of the course (for user feedback)
 * @returns Promise<boolean> - true if deletion was successful
 */
export async function deleteCourse(
  courseId: string,
  courseTitle: string
): Promise<boolean> {
  try {
    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete "${courseTitle}"?\n\nThis will permanently delete:\n` +
        `• All lessons and content\n` +
        `• All student enrollments\n` +
        `• All student progress data\n` +
        `• All uploaded resources\n\n` +
        `This action cannot be undone.`
    );

    if (!confirmed) {
      return false;
    }

    console.log(`Deleting "${courseTitle}"...`);

    const response = await fetch(`/api/courses?id=${courseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication
    });

    const result: CourseDeletionResult = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete course");
    }

    console.log(`"${courseTitle}" deleted successfully!`);
    console.log(
      `Removed ${result.deletedItems.lessons} lessons and all related data`
    );

    return true;
  } catch (error) {
    console.error("Error deleting course:", error);
    alert(
      `Failed to delete course: ${
        error instanceof Error ? error.message : "An unexpected error occurred"
      }`
    );
    return false;
  }
}

/**
 * Delete a course with additional cleanup for frontend state
 * @param courseId - The ID of the course to delete
 * @param courseTitle - The title of the course
 * @param onSuccess - Callback function to run after successful deletion
 * @returns Promise<boolean> - true if deletion was successful
 */
export async function deleteCourseWithCleanup(
  courseId: string,
  courseTitle: string,
  onSuccess?: () => void
): Promise<boolean> {
  const success = await deleteCourse(courseId, courseTitle);

  if (success && onSuccess) {
    onSuccess();
  }

  return success;
}
