"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  lesson_order: number;
  unit_name?: string;
  chapter_name?: string;
  is_preview: boolean;
}

export default function LessonMapperPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseSlug, setCourseSlug] = useState("cbse-mathematics-class-9");
  const [editingLesson, setEditingLesson] = useState<string | null>(null);
  const [tempMappings, setTempMappings] = useState<
    Record<string, { unit: string; chapter: string }>
  >({});

  const fetchLessons = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/lessons?course_slug=${courseSlug}`);
      const data = await response.json();
      setLessons(data.lessons || []);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseSlug]);

  const generateCodeMapping = () => {
    const mapping: Record<number, { section: string; chapter: string }> = {};
    lessons.forEach((lesson) => {
      if (lesson.unit_name && lesson.chapter_name) {
        mapping[lesson.lesson_order] = {
          section: lesson.unit_name,
          chapter: lesson.chapter_name,
        };
      }
    });
    return mapping;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const updateLessonMapping = async (
    lessonId: string,
    unitName: string,
    chapterName: string
  ) => {
    try {
      const response = await fetch("/api/lessons", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lessonId,
          unit_name: unitName,
          chapter_name: chapterName,
        }),
      });

      if (response.ok) {
        alert("Lesson mapping updated successfully!");
        fetchLessons(); // Refresh the data
      } else {
        alert("Failed to update lesson mapping");
      }
    } catch (error) {
      console.error("Error updating lesson:", error);
      alert("Error updating lesson mapping");
    }
  };

  const bulkUpdateMappings = async () => {
    const mappings = [
      { order: 1, unit: "Number Systems", chapter: "Real Numbers" },
      { order: 2, unit: "Algebra", chapter: "Polynomials" },
      { order: 3, unit: "Coordinate Geometry", chapter: "Coordinate Geometry" },
      {
        order: 4,
        unit: "Algebra",
        chapter: "Linear Equations in Two Variables",
      },
      {
        order: 5,
        unit: "Geometry",
        chapter: "Introduction to Euclid Geometry",
      },
      { order: 6, unit: "Geometry", chapter: "Lines and Angles" },
      { order: 7, unit: "Geometry", chapter: "Triangles" },
      { order: 8, unit: "Geometry", chapter: "Quadrilaterals" },
      {
        order: 9,
        unit: "Geometry",
        chapter: "Areas of Parallelograms and Triangles",
      },
      { order: 10, unit: "Geometry", chapter: "Circles" },
      { order: 11, unit: "Geometry", chapter: "Constructions" },
      {
        order: 12,
        unit: "Mensuration",
        chapter: "Areas of a triangle using Heron's Formula",
      },
      { order: 13, unit: "Mensuration", chapter: "Surface Areas and Volumes" },
      { order: 14, unit: "Statistics", chapter: "Statistics" },
      { order: 15, unit: "Statistics", chapter: "Probability" },
    ];

    for (const mapping of mappings) {
      const lesson = lessons.find((l) => l.lesson_order === mapping.order);
      if (lesson) {
        await updateLessonMapping(lesson.id, mapping.unit, mapping.chapter);
        // Small delay to avoid overwhelming the server
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  };

  const startEditing = (lessonId: string) => {
    setEditingLesson(lessonId);
    const lesson = lessons.find((l) => l.id === lessonId);
    if (lesson) {
      setTempMappings((prev) => ({
        ...prev,
        [lessonId]: {
          unit: lesson.unit_name || "",
          chapter: lesson.chapter_name || "",
        },
      }));
    }
  };

  const saveMapping = (lessonId: string) => {
    setEditingLesson(null);
    // The temp mapping is now saved, ready for SQL generation
  };

  const cancelEditing = () => {
    setEditingLesson(null);
  };

  const updateTempMapping = (
    lessonId: string,
    field: "unit" | "chapter",
    value: string
  ) => {
    setTempMappings((prev) => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        [field]: value,
      },
    }));
  };

  const generateSQLScript = () => {
    const courseId = "a7b20541-acbf-4406-a1fc-9a030378b608"; // CBSE Class 9 course ID

    let sql = `-- Update lesson mappings for CBSE Class 9 Mathematics\n`;
    sql += `-- Generated on ${new Date().toLocaleDateString()}\n\n`;

    Object.entries(tempMappings).forEach(([lessonId, mapping]) => {
      const lesson = lessons.find((l) => l.id === lessonId);
      if (lesson && mapping.unit && mapping.chapter) {
        sql += `UPDATE courses_lessons \n`;
        sql += `SET \n`;
        sql += `  unit_name = '${mapping.unit.replace(/'/g, "''")}',\n`;
        sql += `  chapter_name = '${mapping.chapter.replace(/'/g, "''")}'\n`;
        sql += `WHERE course_id = '${courseId}' \n`;
        sql += `  AND lesson_order = ${lesson.lesson_order};\n\n`;
      }
    });

    return sql;
  };

  const copySQLToClipboard = () => {
    const sql = generateSQLScript();
    navigator.clipboard.writeText(sql);
    alert("SQL script copied to clipboard!");
  };

  const generateCodeSnippet = () => {
    const mapping = generateCodeMapping();
    let code = "// CBSE Class 9 Mapping - Based on actual database\n";
    code += 'if (courseSlug === "cbse-mathematics-class-9") {\n';

    Object.entries(mapping).forEach(([order, { section, chapter }]) => {
      code += `  if (lessonOrder === ${order}) {\n`;
      code += `    return { section: "${section}", chapter: "${chapter}" };\n`;
      code += `  }\n`;
    });

    code += '  return { section: "General", chapter: "Other Topics" };\n';
    code += "}\n";

    return code;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lesson Mapper - View & Fix Database Mappings</CardTitle>
          <p className="text-sm text-muted-foreground">
            This page shows the actual lesson mappings from the database. Use
            this to verify and fix the code mappings.
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <select
              value={courseSlug}
              onChange={(e) => setCourseSlug(e.target.value)}
              className="border rounded-sm px-3 py-2"
            >
              <option value="cbse-mathematics-class-9">CBSE Class 9</option>
              <option value="cbse-mathematics-class-10">CBSE Class 10</option>
              <option value="ibdp-mathematics-aa-hl">IBDP AA HL</option>
            </select>
            <Button
              onClick={fetchLessons}
              variant="outline"
              className="rounded-sm"
            >
              Refresh
            </Button>
            <Button
              onClick={bulkUpdateMappings}
              className="rounded-sm bg-[#e27447] hover:bg-[#d1653a] text-white"
            >
              Bulk Update Mappings
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Current Database Mappings</CardTitle>
            <Badge variant="secondary">{lessons.length} lessons</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Order</th>
                  <th className="text-left p-2">Title</th>
                  <th className="text-left p-2">Unit (Section)</th>
                  <th className="text-left p-2">Chapter</th>
                  <th className="text-left p-2">Slug</th>
                  <th className="text-left p-2">Preview</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson) => (
                  <tr key={lesson.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono">{lesson.lesson_order}</td>
                    <td className="p-2">{lesson.title}</td>
                    <td className="p-2">
                      {editingLesson === lesson.id ? (
                        <select
                          value={tempMappings[lesson.id]?.unit || ""}
                          onChange={(e) =>
                            updateTempMapping(lesson.id, "unit", e.target.value)
                          }
                          className="border rounded-sm px-2 py-1 text-xs w-full"
                        >
                          <option value="">Select Unit</option>
                          <option value="Number Systems">Number Systems</option>
                          <option value="Algebra">Algebra</option>
                          <option value="Coordinate Geometry">
                            Coordinate Geometry
                          </option>
                          <option value="Geometry">Geometry</option>
                          <option value="Mensuration">Mensuration</option>
                          <option value="Statistics">Statistics</option>
                        </select>
                      ) : (
                        <Badge variant="outline">
                          {lesson.unit_name || "N/A"}
                        </Badge>
                      )}
                    </td>
                    <td className="p-2">
                      {editingLesson === lesson.id ? (
                        <select
                          value={tempMappings[lesson.id]?.chapter || ""}
                          onChange={(e) =>
                            updateTempMapping(
                              lesson.id,
                              "chapter",
                              e.target.value
                            )
                          }
                          className="border rounded-sm px-2 py-1 text-xs w-full"
                        >
                          <option value="">Select Chapter</option>
                          {tempMappings[lesson.id]?.unit ===
                            "Number Systems" && (
                            <option value="Real Numbers">Real Numbers</option>
                          )}
                          {tempMappings[lesson.id]?.unit === "Algebra" && (
                            <>
                              <option value="Polynomials">Polynomials</option>
                              <option value="Linear Equations in Two Variables">
                                Linear Equations in Two Variables
                              </option>
                            </>
                          )}
                          {tempMappings[lesson.id]?.unit ===
                            "Coordinate Geometry" && (
                            <option value="Coordinate Geometry">
                              Coordinate Geometry
                            </option>
                          )}
                          {tempMappings[lesson.id]?.unit === "Geometry" && (
                            <>
                              <option value="Introduction to Euclid Geometry">
                                Introduction to Euclid Geometry
                              </option>
                              <option value="Lines and Angles">
                                Lines and Angles
                              </option>
                              <option value="Triangles">Triangles</option>
                              <option value="Quadrilaterals">
                                Quadrilaterals
                              </option>
                              <option value="Areas of Parallelograms and Triangles">
                                Areas of Parallelograms and Triangles
                              </option>
                              <option value="Circles">Circles</option>
                              <option value="Constructions">
                                Constructions
                              </option>
                            </>
                          )}
                          {tempMappings[lesson.id]?.unit === "Mensuration" && (
                            <>
                              <option value="Areas of a triangle using Heron's Formula">
                                Areas of a triangle using Heron's Formula
                              </option>
                              <option value="Surface Areas and Volumes">
                                Surface Areas and Volumes
                              </option>
                            </>
                          )}
                          {tempMappings[lesson.id]?.unit === "Statistics" && (
                            <>
                              <option value="Statistics">Statistics</option>
                              <option value="Probability">Probability</option>
                            </>
                          )}
                        </select>
                      ) : (
                        <Badge variant="outline">
                          {lesson.chapter_name || "N/A"}
                        </Badge>
                      )}
                    </td>
                    <td className="p-2 font-mono text-xs">{lesson.slug}</td>
                    <td className="p-2">
                      {lesson.is_preview ? (
                        <Badge className="bg-green-100 text-green-800">
                          Yes
                        </Badge>
                      ) : (
                        <Badge variant="secondary">No</Badge>
                      )}
                    </td>
                    <td className="p-2">
                      {editingLesson === lesson.id ? (
                        <div className="flex gap-1">
                          <Button
                            onClick={() => saveMapping(lesson.id)}
                            size="sm"
                            className="rounded-sm bg-green-600 hover:bg-green-700 text-white text-xs"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={cancelEditing}
                            size="sm"
                            variant="outline"
                            className="rounded-sm text-xs"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => startEditing(lesson.id)}
                          size="sm"
                          variant="outline"
                          className="rounded-sm text-xs"
                        >
                          Edit
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Generated SQL Script</CardTitle>
            <Button
              onClick={copySQLToClipboard}
              variant="outline"
              className="rounded-sm"
            >
              Copy SQL
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Copy this SQL script and run it in your Supabase SQL editor
          </p>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-50 p-4 rounded-sm overflow-x-auto text-xs">
            <code>{generateSQLScript()}</code>
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Generated Code Mapping</CardTitle>
            <Button
              onClick={() => copyToClipboard(generateCodeSnippet())}
              variant="outline"
              className="rounded-sm"
            >
              Copy Code
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Copy this code and replace it in the collapsible-sidebar.tsx file
            (after running SQL)
          </p>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-50 p-4 rounded-sm overflow-x-auto text-xs">
            <code>{generateCodeSnippet()}</code>
          </pre>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Click <strong>"Edit"</strong> on each lesson row to assign Unit
              and Chapter
            </li>
            <li>
              Select the correct <strong>Unit</strong> from the dropdown (Number
              Systems, Algebra, etc.)
            </li>
            <li>
              Select the correct <strong>Chapter</strong> from the dropdown
              (changes based on Unit selected)
            </li>
            <li>
              Click <strong>"Save"</strong> to confirm your selection
            </li>
            <li>Repeat for all lessons until all are properly mapped</li>
            <li>
              Click <strong>"Copy SQL"</strong> to copy the generated SQL script
            </li>
            <li>Run the SQL script in your Supabase SQL editor</li>
            <li>Refresh this page to see the updated mappings</li>
            <li>
              Click <strong>"Copy Code"</strong> to get the TypeScript mapping
              code
            </li>
            <li>
              Replace the mapping in{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">
                src/app/components-demo/ui/layout-components/collapsible-sidebar.tsx
              </code>
            </li>
            <li>Save and refresh to see the updated mappings in the sidebar</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
