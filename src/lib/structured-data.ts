/**
 * Structured data utilities for JSON-LD
 */

export interface StructuredData {
  "@context"?: string;
  "@type": string;
  [key: string]: unknown;
}

/**
 * Converts structured data object(s) to JSON-LD string
 */
export function structuredDataToJsonLd(
  data: StructuredData | StructuredData[]
): string {
  const jsonLd = Array.isArray(data) ? data : [data];
  return JSON.stringify(jsonLd, null, 2);
}

