import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Helper functions to prevent React linting errors with special characters
 */

/**
 * Escapes apostrophes in text to prevent React linting errors
 * @param text - Text that may contain apostrophes
 * @returns Text with apostrophes properly escaped as &apos;
 */
export function escapeApostrophes(text: string): string {
  return text.replace(/'/g, '&apos;')
}

/**
 * Escapes quotes in text to prevent React linting errors
 * @param text - Text that may contain quotes
 * @returns Text with quotes properly escaped
 */
export function escapeQuotes(text: string): string {
  return text.replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

/**
 * Escapes common HTML entities in text
 * @param text - Text that may contain special characters
 * @returns Text with special characters properly escaped
 */
export function escapeHtmlEntities(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Safe text function that automatically escapes problematic characters
 * Use this for any text that will be rendered in JSX
 * @param text - Text that may contain special characters
 * @returns Safely escaped text for JSX rendering
 */
export function safeText(text: string): string {
  return escapeHtmlEntities(text)
}

/**
 * Safe text function specifically for text that only needs apostrophe escaping
 * Use this for simple text content that may contain apostrophes
 * @param text - Text that may contain apostrophes
 * @returns Text with apostrophes safely escaped
 */
export function safeApostropheText(text: string): string {
  return escapeApostrophes(text)
}
