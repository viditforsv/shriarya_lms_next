const fs = require("fs");

function reorderCSVColumns(inputFile, outputFile, newColumnOrder) {
  try {
    console.log(`📖 Reading CSV file: ${inputFile}`);

    // Read the CSV file
    const csvContent = fs.readFileSync(inputFile, "utf8");
    const lines = csvContent.split("\n");

    if (lines.length === 0) {
      console.error("❌ Empty CSV file");
      return;
    }

    // Parse header
    const headers = lines[0].split(",");
    console.log(`📋 Original columns (${headers.length}):`, headers);

    // Validate that all new columns exist in original headers
    const missingColumns = newColumnOrder.filter(
      (col) => !headers.includes(col)
    );
    if (missingColumns.length > 0) {
      console.error("❌ Missing columns:", missingColumns);
      return;
    }

    // Create column mapping
    const columnMap = newColumnOrder.map((col) => headers.indexOf(col));
    console.log(`🔄 Reordering to:`, newColumnOrder);

    // Process each line
    const reorderedLines = lines.map((line, index) => {
      if (index === 0) {
        // Header line
        return newColumnOrder.join(",");
      }

      if (line.trim() === "") {
        return line; // Empty line
      }

      // Parse CSV line (handle quoted values)
      const values = parseCSVLine(line);

      // Reorder values according to new column order
      const reorderedValues = columnMap.map((index) => values[index] || "");

      return reorderedValues.join(",");
    });

    // Write the reordered CSV
    const reorderedContent = reorderedLines.join("\n");
    fs.writeFileSync(outputFile, reorderedContent, "utf8");

    console.log(`✅ Reordered CSV saved to: ${outputFile}`);
    console.log(`📊 Processed ${lines.length - 1} data rows`);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

function parseCSVLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      // End of field
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  // Add the last field
  values.push(current);

  return values;
}

// Example usage
const inputFile = "ibdp-mathematics-aa-hl-lessons-2025-09-13T04-57-04.csv";
const outputFile = "ibdp-mathematics-aa-hl-lessons-reordered.csv";

// Define your desired column order (using existing columns)
const newColumnOrder = [
  "id",
  "title",
  "lesson_order",
  "slug",
  "is_preview",
  "notes",
  "content",
  "content_html",
  "video_url",
  "video_thumbnail",
  "pdf_url",
  "quiz_id",
  "key_points",
  "created_at",
];

console.log("🔄 Reordering CSV columns...");
reorderCSVColumns(inputFile, outputFile, newColumnOrder);
