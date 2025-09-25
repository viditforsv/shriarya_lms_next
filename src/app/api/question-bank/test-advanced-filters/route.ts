import { NextRequest, NextResponse } from "next/server";

// Test endpoint to demonstrate advanced filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const testType = searchParams.get("test") || "example";

    let exampleFilters: Record<string, unknown>[] = [];

    switch (testType) {
      case "difficulty-or-not":
        // Example: Difficulty of 9 OR difficulty of not 8
        exampleFilters = [
          { field: "difficulty", operator: "eq", value: 9 },
          { field: "difficulty", operator: "neq", value: 8 },
        ];
        break;

      case "range":
        // Example: Difficulty between 5 and 8 (inclusive)
        exampleFilters = [
          { field: "difficulty", operator: "gte", value: 5 },
          { field: "difficulty", operator: "lte", value: 8 },
        ];
        break;

      case "pyq-years":
        // Example: PYQ from specific years
        exampleFilters = [
          { field: "is_pyq", operator: "eq", value: true },
          {
            field: "pyq_year",
            operator: "in",
            value: [2020, 2021, 2022, 2023],
          },
        ];
        break;

      case "complex":
        // Example: Complex query - High difficulty PYQ or medium difficulty practice questions
        exampleFilters = [
          {
            field: "difficulty",
            operator: "gte",
            value: 7,
            logic: "AND",
          },
          {
            field: "is_pyq",
            operator: "eq",
            value: true,
            logic: "AND",
          },
        ];
        break;

      default:
        // Default example
        exampleFilters = [
          { field: "difficulty", operator: "eq", value: 9 },
          { field: "difficulty", operator: "neq", value: 8 },
        ];
    }

    // Create test URL with the filters
    const filterParam = encodeURIComponent(JSON.stringify(exampleFilters));
    const testUrl = `/api/question-bank?advanced_filters=${filterParam}&limit=5`;

    return NextResponse.json({
      message: "Advanced filter test examples",
      testType,
      filters: exampleFilters,
      testUrl,
      description: getTestDescription(testType),
      usage: {
        frontend: "Use the Advanced Filter Builder in the question bank page",
        api: "Send GET request to /api/question-bank with advanced_filters parameter",
        example: `fetch('/api/question-bank?advanced_filters=${filterParam}')`,
      },
    });
  } catch (error) {
    console.error("Error in test endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getTestDescription(testType: string): string {
  switch (testType) {
    case "difficulty-or-not":
      return "Questions with difficulty of 9 OR difficulty not equal to 8";
    case "range":
      return "Questions with difficulty between 5 and 8 (inclusive)";
    case "pyq-years":
      return "Past Year Questions from years 2020-2023";
    case "complex":
      return "High difficulty (≥7) PYQ questions";
    default:
      return "Basic example: difficulty equals 9 OR not equals 8";
  }
}
