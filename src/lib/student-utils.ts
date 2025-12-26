import crypto from "crypto";

/**
 * Create a secure hash from student email for URL usage
 * @param email - Student email address
 * @returns Hashed string for URL usage
 */
export function createStudentHash(email: string): string {
  // Create a hash using SHA-256 and take first 12 characters
  const hash = crypto
    .createHash("sha256")
    .update(email.toLowerCase().trim())
    .digest("hex");
  return hash.substring(0, 12);
}

/**
 * Find student by email hash
 * @param emailHash - The hashed email from URL
 * @param students - Array of students to search through
 * @returns Student object if found, null otherwise
 */
export function findStudentByHash<T extends { email: string }>(
  emailHash: string,
  students: T[]
): T | null {
  return (
    students.find(
      (student) => createStudentHash(student.email) === emailHash
    ) || null
  );
}

/**
 * Validate student hash format (12 character hex string)
 * @param hash - Hash to validate
 * @returns True if valid format
 */
export function isValidStudentHash(hash: string): boolean {
  return /^[a-f0-9]{12}$/i.test(hash);
}
