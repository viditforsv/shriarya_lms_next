"use client";

import { useState, useEffect } from "react";
import { QueryBuilder, formatQuery } from "react-querybuilder";
import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";

// Field definitions for question bank
const fields = [
  {
    name: "difficulty",
    label: "Difficulty",
    value: "difficulty",
  },
  {
    name: "boards",
    label: "Boards",
    value: "boards",
  },
  {
    name: "course_types",
    label: "Course Types",
    value: "course_types",
  },
  {
    name: "levels",
    label: "Levels",
    value: "levels",
  },
  {
    name: "relevance",
    label: "Relevance",
    value: "relevance",
  },
  { name: "tags", label: "Tags", value: "tags" },
  {
    name: "subject",
    label: "Subject",
    value: "subject",
  },
  {
    name: "question_type",
    label: "Question Type",
    value: "question_type",
  },
  { name: "is_pyq", label: "Is PYQ", value: "is_pyq" },
  { name: "pyq_year", label: "PYQ Year", value: "pyq_year" },
  {
    name: "total_marks",
    label: "Total Marks",
    value: "total_marks",
  },
  {
    name: "qa_status",
    label: "QA Status",
    value: "qa_status",
  },
  {
    name: "priority_level",
    label: "Priority Level",
    value: "priority_level",
  },
  {
    name: "is_flagged",
    label: "Is Flagged",
    value: "is_flagged",
  },
];

// Operators
const operators = [
  { name: "=", label: "Equals" },
  { name: "!=", label: "Not Equals" },
  { name: ">", label: "Greater Than" },
  { name: "<", label: "Less Than" },
  { name: ">=", label: "Greater Than or Equal" },
  { name: "<=", label: "Less Than or Equal" },
  { name: "between", label: "Between" },
  { name: "notBetween", label: "Not Between" },
  { name: "contains", label: "Contains" },
  { name: "notContains", label: "Not Contains" },
  { name: "in", label: "In" },
  { name: "notIn", label: "Not In" },
  { name: "isNull", label: "Is Null" },
  { name: "isNotNull", label: "Is Not Null" },
  { name: "beginsWith", label: "Begins With" },
  { name: "endsWith", label: "Ends With" },
];

// Combinators (logical operators)
const combinators = [
  { name: "and", label: "AND" },
  { name: "or", label: "OR" },
];

// Query structure types for react-querybuilder
interface QueryRule {
  field: string;
  operator: string;
  value: string | number | boolean | null;
}

interface QueryGroup {
  combinator: string;
  rules: (QueryRule | QueryGroup)[];
  not?: boolean;
}

type Query = QueryGroup;

interface QuestionBankQueryBuilderProps {
  onQueryChange: (query: Query) => void;
  initialQuery?: Query;
}

export default function QuestionBankQueryBuilder({
  onQueryChange,
  initialQuery,
}: QuestionBankQueryBuilderProps) {
  const [query, setQuery] = useState(
    initialQuery || {
      combinator: "and",
      rules: [
        {
          field: "difficulty",
          operator: ">=",
          value: 1,
        },
      ],
    }
  );
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQueryChange = (newQuery: Query) => {
    setQuery(newQuery);
    onQueryChange(newQuery);
  };

  const formatOutput = (format: string) => {
    try {
      switch (format) {
        case "sql":
          return String(formatQuery(query, "sql"));
        case "parameterized":
          return JSON.stringify(formatQuery(query, "parameterized"), null, 2);
        case "json":
          return formatQuery(query, "json");
        case "mongodb":
          return formatQuery(query, "mongodb");
        default:
          return JSON.stringify(query, null, 2);
      }
    } catch (error) {
      return `Error formatting query: ${error}`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Query Builder</CardTitle>
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
                  fields: "fields-custom",
                  operators: "operators-custom",
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
                getOperators={() => {
                  // Return all operators for all fields
                  return operators;
                }}
                getValues={() => {
                  // Return empty array for all fields
                  return [];
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
                      handleQueryChange(newQuery);
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
                      handleQueryChange(newQuery);
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
                        handleQueryChange(newQuery);
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
                        handleQueryChange(newQuery);
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
                  variant="outline"
                  onClick={() => {
                    const clearedQuery = { combinator: "and", rules: [] };
                    handleQueryChange(clearedQuery);
                  }}
                >
                  Clear Query
                </Button>
              </div>

              {/* Query Preview */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Query Preview:
                </h4>
                <div className="bg-gray-100 p-3 rounded-sm">
                  <pre className="text-xs overflow-auto">
                    {formatOutput("sql")}
                  </pre>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
