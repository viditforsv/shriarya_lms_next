"use client";

import { useState, useEffect } from "react";
import { QueryBuilder, formatQuery } from "react-querybuilder";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Skeleton } from "@/app/components-demo/ui/ui-components/skeleton";

// Field definitions for your question bank
const fields = [
  { name: "difficulty", label: "Difficulty", type: "number" },
  {
    name: "boards",
    label: "Boards",
    type: "multiselect",
    values: ["IBDP", "CBSE", "ICSE", "IGCSE", "A-Levels", "SAT", "ACT"],
  },
  {
    name: "course_types",
    label: "Course Types",
    type: "multiselect",
    values: ["AA", "AI"],
  },
  {
    name: "levels",
    label: "Levels",
    type: "multiselect",
    values: ["SL", "HL"],
  },
  {
    name: "relevance",
    label: "Relevance",
    type: "multiselect",
    values: [
      "Practice",
      "Exam Style",
      "Homework",
      "Quiz",
      "Assessment",
      "Review",
      "Challenge",
    ],
  },
  { name: "tags", label: "Tags", type: "text" },
  {
    name: "subject",
    label: "Subject",
    type: "select",
    values: ["Mathematics", "mathematics"],
  },
  {
    name: "question_type",
    label: "Question Type",
    type: "select",
    values: ["mcq", "subjective", "true_false", "fill_blank"],
  },
  { name: "is_pyq", label: "Is PYQ", type: "boolean" },
  { name: "pyq_year", label: "PYQ Year", type: "number" },
  { name: "total_marks", label: "Total Marks", type: "number" },
];

// Operators available
const operators = [
  { name: "=", label: "Equals" },
  { name: "!=", label: "Not Equals" },
  { name: ">", label: "Greater Than" },
  { name: "<", label: "Less Than" },
  { name: ">=", label: "Greater Than or Equal" },
  { name: "<=", label: "Less Than or Equal" },
  { name: "contains", label: "Contains" },
  { name: "notContains", label: "Does Not Contain" },
  { name: "in", label: "In" },
  { name: "notIn", label: "Not In" },
  { name: "between", label: "Between" },
  { name: "notBetween", label: "Not Between" },
  { name: "isNull", label: "Is Null" },
  { name: "isNotNull", label: "Is Not Null" },
];

// Combinators (logical operators)
const combinators = [
  { name: "and", label: "AND" },
  { name: "or", label: "OR" },
];

// Question interface matching your API
interface Question {
  id: string;
  question_text: string;
  difficulty: number;
  question_type: string;
  subject: string;
  boards: string[];
  course_types: string[];
  levels: string[];
  relevance: string[];
  tags: string[];
  is_pyq: boolean;
  pyq_year?: number;
  total_marks?: number;
  created_at: string;
}

interface QueryResult {
  questions: Question[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function QueryBuilderTestPage() {
  const [query, setQuery] = useState({
    combinator: "and",
    rules: [
      {
        field: "difficulty",
        operator: ">=",
        value: 7,
      },
    ],
  });

  const [outputFormat, setOutputFormat] = useState("sql");
  const [results, setResults] = useState<QueryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQueryChange = (newQuery: any) => {
    setQuery(newQuery);
  };

  const formatOutput = (format: string) => {
    try {
      switch (format) {
        case "sql":
          return formatQuery(query, "sql");
        case "json":
          return JSON.stringify(query, null, 2);
        case "mongodb":
          return formatQuery(query, "mongodb");
        case "parameterized":
          return formatQuery(query, "sql", { parameterized: true });
        default:
          return formatQuery(query, "sql");
      }
    } catch (error) {
      return `Error formatting query: ${error}`;
    }
  };

  // Convert React Query Builder query to API parameters
  const convertQueryToApiParams = (query: any): Record<string, string> => {
    const params: Record<string, string> = {};

    try {
      // For now, we'll use the JSON format and send it as advanced_filters
      params.advanced_filters = JSON.stringify(query);
      params.limit = "20"; // Limit results for testing

      return params;
    } catch (error) {
      console.error("Error converting query:", error);
      return {};
    }
  };

  const testQuery = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Generated Query:", query);
      console.log("Formatted Query:", formatOutput(outputFormat));

      // Convert query to API parameters
      const apiParams = convertQueryToApiParams(query);

      // Build URL with parameters
      const url = new URL("/api/question-bank", window.location.origin);
      Object.entries(apiParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });

      console.log("API URL:", url.toString());

      // Fetch results
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data: QueryResult = await response.json();
      setResults(data);

      console.log("API Results:", data);
    } catch (err) {
      console.error("Query error:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            React Query Builder Test
          </h1>
          <p className="text-gray-600">
            Test the visual query builder for your question bank filters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Query Builder */}
          <Card>
            <CardHeader>
              <CardTitle>Build Your Query</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!isClient ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mb-2"></div>
                      <p className="text-gray-600">Loading Query Builder...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <QueryBuilder
                      fields={fields}
                      operators={operators}
                      combinators={combinators}
                      query={query}
                      onQueryChange={handleQueryChange}
                      showCombinatorsBetweenRules={false}
                      showNotToggle={false}
                      showCloneButtons={false}
                      showLockButtons={false}
                      addRuleToNewGroups={false}
                      enableDragAndDrop={false}
                      resetOnFieldChange={false}
                      resetOnOperatorChange={false}
                      autoSelectField={true}
                      autoSelectOperator={true}
                      controlClassnames={{
                        queryBuilder: "queryBuilder-custom",
                        ruleGroup: "ruleGroup-custom",
                        rule: "rule-custom",
                        field: "field-custom",
                        operator: "operator-custom",
                        value: "value-custom",
                        addRule: "addRule-custom",
                        addGroup: "addGroup-custom",
                        removeGroup: "removeGroup-custom",
                        removeRule: "removeRule-custom",
                        cloneRule: "cloneRule-custom",
                        lockRule: "lockRule-custom",
                        notToggle: "notToggle-custom",
                        combinators: "combinators-custom",
                      }}
                      getOperators={(field) => {
                        // Customize operators based on field type
                        const fieldConfig = fields.find(
                          (f) => f.name === field
                        );
                        if (fieldConfig?.type === "number") {
                          return operators.filter((op) =>
                            [
                              "=",
                              "!=",
                              ">",
                              "<",
                              ">=",
                              "<=",
                              "between",
                              "notBetween",
                              "isNull",
                              "isNotNull",
                            ].includes(op.name)
                          );
                        }
                        if (fieldConfig?.type === "boolean") {
                          return operators.filter((op) =>
                            ["=", "!=", "isNull", "isNotNull"].includes(op.name)
                          );
                        }
                        if (fieldConfig?.type === "multiselect") {
                          return operators.filter((op) =>
                            [
                              "contains",
                              "notContains",
                              "in",
                              "notIn",
                              "isNull",
                              "isNotNull",
                            ].includes(op.name)
                          );
                        }
                        return operators;
                      }}
                      getValues={(field, operator) => {
                        // Provide values for select/multiselect fields
                        const fieldConfig = fields.find(
                          (f) => f.name === field
                        );
                        return fieldConfig?.values || [];
                      }}
                    />

                    {/* Custom Control Buttons - More Intuitive */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-sm font-medium text-gray-700 mr-2">
                          Add:
                        </span>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newQuery = {
                              ...query,
                              rules: [
                                ...query.rules,
                                {
                                  field: "difficulty",
                                  operator: ">=",
                                  value: 1,
                                },
                              ],
                            };
                            setQuery(newQuery);
                          }}
                          className="text-gray-700 border-gray-300 hover:bg-gray-50"
                        >
                          + Rule
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newQuery = {
                              ...query,
                              rules: [
                                ...query.rules,
                                {
                                  combinator: "and",
                                  rules: [
                                    {
                                      field: "difficulty",
                                      operator: ">=",
                                      value: 1,
                                    },
                                  ],
                                },
                              ],
                            };
                            setQuery(newQuery);
                          }}
                          className="text-orange-700 border-orange-300 hover:bg-orange-50"
                        >
                          + Group
                        </Button>

                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-sm font-medium text-gray-700">
                            Logic:
                          </span>
                          <select
                            value={query.combinator}
                            onChange={(e) => {
                              const newQuery = {
                                ...query,
                                combinator: e.target.value,
                              };
                              setQuery(newQuery);
                            }}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-sm bg-white"
                          >
                            <option value="and">AND</option>
                            <option value="or">OR</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-sm font-medium text-gray-700">
                            Negate:
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newQuery = {
                                ...query,
                                not: !query.not,
                              };
                              setQuery(newQuery);
                            }}
                            className={`${
                              query.not
                                ? "bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
                                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                            }`}
                          >
                            {query.not ? "NOT" : "Normal"}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={testQuery}
                        disabled={loading}
                        className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
                      >
                        {loading ? "Querying..." : "Test Query"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setQuery({ combinator: "and", rules: [] });
                          setResults(null);
                          setError(null);
                        }}
                      >
                        Clear All
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Query</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-sm"
                  >
                    <option value="sql">SQL</option>
                    <option value="parameterized">SQL (Parameterized)</option>
                    <option value="json">JSON</option>
                    <option value="mongodb">MongoDB</option>
                  </select>
                </div>

                <div className="bg-gray-100 p-4 rounded-sm">
                  <pre className="text-sm overflow-auto max-h-96">
                    {formatOutput(outputFormat)}
                  </pre>
                </div>

                {/* Sample Queries */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Sample Queries to Try:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-blue-50 rounded-sm">
                      <strong>High Difficulty IBDP:</strong>
                      <br />
                      Difficulty ≥ 8 AND Boards contains IBDP
                    </div>
                    <div className="p-2 bg-green-50 rounded-sm">
                      <strong>AA or AI Practice Questions:</strong>
                      <br />
                      (Course Types contains AA OR Course Types contains AI) AND
                      Relevance contains Practice
                    </div>
                    <div className="p-2 bg-yellow-50 rounded-sm">
                      <strong>PYQ with Specific Year:</strong>
                      <br />
                      Is PYQ = true AND PYQ Year = 2023
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {(results || loading || error) && (
          <Card>
            <CardHeader>
              <CardTitle>
                Query Results
                {results && (
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    ({results.total} questions found)
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading && (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                    <p className="mt-2 text-gray-600">
                      Querying your question bank...
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-sm p-4">
                  <h4 className="font-semibold text-red-800 mb-2">
                    Query Error
                  </h4>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {results && !loading && (
                <div className="space-y-4">
                  {results.questions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No questions found matching your criteria.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {results.questions.map((question, index) => (
                        <div
                          key={question.id}
                          className="border border-gray-200 rounded-sm p-4 hover:bg-gray-50"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {question.difficulty}/10
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {question.question_type}
                                </Badge>
                                {question.is_pyq && (
                                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                                    PYQ {question.pyq_year || "N/A"}
                                  </Badge>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-1 mb-2">
                                {question.boards &&
                                  question.boards.length > 0 && (
                                    <Badge className="bg-gray-100 text-gray-800 text-xs">
                                      {question.boards.join(", ")}
                                    </Badge>
                                  )}
                                {question.course_types &&
                                  question.course_types.length > 0 && (
                                    <Badge className="bg-purple-100 text-purple-800 text-xs">
                                      {question.course_types.join(", ")}
                                    </Badge>
                                  )}
                                {question.levels &&
                                  question.levels.length > 0 && (
                                    <Badge className="bg-indigo-100 text-indigo-800 text-xs">
                                      {question.levels.join(", ")}
                                    </Badge>
                                  )}
                                {question.relevance &&
                                  question.relevance.length > 0 && (
                                    <Badge className="bg-orange-100 text-orange-800 text-xs">
                                      {question.relevance.join(", ")}
                                    </Badge>
                                  )}
                              </div>
                            </div>
                          </div>

                          <div className="text-sm text-gray-700">
                            <p className="line-clamp-3">
                              {question.question_text.length > 200
                                ? question.question_text.substring(0, 200) +
                                  "..."
                                : question.question_text}
                            </p>
                          </div>

                          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                            <span>ID: {question.id.slice(0, 8)}...</span>
                            <span>
                              {new Date(
                                question.created_at
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <strong>1. Add Rules:</strong> Click "Add Rule" to create filter
                conditions
              </p>
              <p>
                <strong>2. Add Groups:</strong> Click "Add Group" to create
                nested logic with AND/OR
              </p>
              <p>
                <strong>3. Field Types:</strong> Different fields support
                different operators
              </p>
              <ul className="ml-4 space-y-1">
                <li>
                  • <strong>Number fields:</strong> =, !=, &gt;, &lt;, between,
                  etc.
                </li>
                <li>
                  • <strong>Multiselect fields:</strong> contains, in, not in
                </li>
                <li>
                  • <strong>Boolean fields:</strong> =, !=, is null
                </li>
              </ul>
              <p>
                <strong>4. Test:</strong> Click "Test Query" to see the
                generated query
              </p>
              <p>
                <strong>5. Format:</strong> Choose different output formats
                (SQL, JSON, MongoDB)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
