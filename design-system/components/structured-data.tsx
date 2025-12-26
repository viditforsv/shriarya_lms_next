/**
 * Component to render JSON-LD structured data
 */

import { structuredDataToJsonLd } from "@/lib/structured-data";
import type { StructuredData } from "@/lib/structured-data";

interface StructuredDataProps {
  data: StructuredData | StructuredData[];
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: structuredDataToJsonLd(data) }}
    />
  );
}

