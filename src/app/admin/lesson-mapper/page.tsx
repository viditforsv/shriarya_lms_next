"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/design-system/components/ui/card";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { createClient } from "@/lib/supabase/client";
import { Save } from "lucide-react";

interface Course {
  id: string;
  title: string;
  slug: string;
}

interface Unit {
  id: string;
  unit_name: string;
  unit_order: number;
}

interface Chapter {
  id: string;
  unit_id: string;
  chapter_name: string;
  chapter_order: number;
}

interface Lesson {
  id: string;
  title: string;
  slug: string;
  lesson_order: number;
  chapter_id?: string;
  is_preview: boolean;
  chapter?: {
    id: string;
    chapter_name: string;
    unit: {
      id: string;
      unit_name: string;
    };
  };
}

export default function LessonMapperPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [units, setUnits] = useState<Unit[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Track edits for all lessons
  const [lessonEdits, setLessonEdits] = useState<
    Record<string, { chapter_id: string; lesson_order: number }>
  >({});

  const supabase = createClient();

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, slug")
        .order("title");

      if (!error && data) {
        setCourses(data);
        // Auto-select first course
        if (data.length > 0 && !selectedCourseId) {
          setSelectedCourseId(data[0].id);
        }
      }
    };

    fetchCourses();
  }, [selectedCourseId, supabase]);

  // Fetch units, chapters, and lessons when course changes
  useEffect(() => {
    if (!selectedCourseId) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        // Fetch units
        const { data: unitsData } = await supabase
          .from("courses_units")
          .select("*")
          .eq("course_id", selectedCourseId)
          .order("unit_order");

        if (unitsData) setUnits(unitsData);

        // Fetch chapters
        const { data: chaptersData } = await supabase
          .from("courses_chapters")
          .select("*")
          .in("unit_id", unitsData?.map((u) => u.id) || [])
          .order("chapter_order");

        if (chaptersData) setChapters(chaptersData);

        // Fetch lessons with chapter and unit info
        const { data: lessonsData } = await supabase
          .from("courses_lessons")
          .select(
            `
            id,
            title,
            slug,
            lesson_order,
            chapter_id,
            is_preview,
            chapter:courses_chapters(
              id,
              chapter_name,
              unit:courses_units(
                id,
                unit_name
              )
            )
          `
          )
          .eq("course_id", selectedCourseId)
          .order("lesson_order");

        if (lessonsData) setLessons(lessonsData as unknown as Lesson[]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCourseId, supabase]);

  const updateLessonEdit = (
    lessonId: string,
    field: "chapter_id" | "lesson_order",
    value: string | number
  ) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    setLessonEdits((prev) => ({
      ...prev,
      [lessonId]: {
        chapter_id:
          field === "chapter_id"
            ? (value as string)
            : prev[lessonId]?.chapter_id || lesson.chapter_id || "",
        lesson_order:
          field === "lesson_order"
            ? (value as number)
            : prev[lessonId]?.lesson_order || lesson.lesson_order,
      },
    }));
  };

  const saveAllMappings = async () => {
    if (Object.keys(lessonEdits).length === 0) {
      alert("⚠️ No changes to save");
      return;
    }

    setIsSaving(true);
    try {
      // Update all edited lessons
      const updates = Object.entries(lessonEdits).map(([lessonId, edit]) =>
        supabase
          .from("courses_lessons")
          .update({
            chapter_id: edit.chapter_id || null,
            lesson_order: edit.lesson_order,
          })
          .eq("id", lessonId)
      );

      await Promise.all(updates);

      alert(
        `✅ ${Object.keys(lessonEdits).length} lessons updated successfully!`
      );

      // Refresh lessons
      const { data: lessonsData } = await supabase
        .from("courses_lessons")
        .select(
          `
          id,
          title,
          slug,
          lesson_order,
          chapter_id,
          is_preview,
          chapter:courses_chapters(
            id,
            chapter_name,
            unit:courses_units(
              id,
              unit_name
            )
          )
        `
        )
        .eq("course_id", selectedCourseId)
        .order("lesson_order");

      if (lessonsData) {
        setLessons(lessonsData as unknown as Lesson[]);
        setLessonEdits({}); // Clear edits
      }
    } catch (error) {
      console.error("Error updating lessons:", error);
      alert("❌ Failed to update lesson mappings");
    } finally {
      setIsSaving(false);
    }
  };

  const resetChanges = () => {
    setLessonEdits({});
  };

  const getChaptersByUnit = (unitId: string) => {
    return chapters.filter((ch) => ch.unit_id === unitId);
  };

  const getUnitByChapterId = (chapterId: string) => {
    const chapter = chapters.find((ch) => ch.id === chapterId);
    if (!chapter) return null;
    return units.find((u) => u.id === chapter.unit_id);
  };

  const getCurrentValue = (
    lessonId: string,
    field: "chapter_id" | "lesson_order"
  ) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) return field === "chapter_id" ? "" : 0;

    return (
      lessonEdits[lessonId]?.[field] ||
      (field === "chapter_id" ? lesson.chapter_id : lesson.lesson_order) ||
      (field === "chapter_id" ? "" : 0)
    );
  };

  const hasChanges = Object.keys(lessonEdits).length > 0;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Admin", href: "/admin/site-administration" },
            { label: "Lesson Mapper", isActive: true },
          ]}
        />
      </div>

      {/* Header Card */}
      <Card className="mb-6 rounded-sm">
        <CardHeader>
          <CardTitle>Lesson Mapper - Map Lessons to Chapters</CardTitle>
          <CardDescription>
            Select a course, then map each lesson to a chapter and set its
            display order.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Course Selector */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Select Course:
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full border rounded-sm px-3 py-2"
              >
                <option value="">-- Select a course --</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Stats */}
            {selectedCourseId && (
              <div className="flex gap-4 text-sm">
                <Badge variant="secondary" className="rounded-sm">
                  {units.length} Units
                </Badge>
                <Badge variant="secondary" className="rounded-sm">
                  {chapters.length} Chapters
                </Badge>
                <Badge variant="secondary" className="rounded-sm">
                  {lessons.length} Lessons
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lessons Table */}
      {selectedCourseId && lessons.length > 0 && (
        <Card className="rounded-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Lesson Mappings</CardTitle>
                <CardDescription>
                  Edit all lessons at once, then save changes
                </CardDescription>
              </div>
              {hasChanges && (
                <Badge variant="secondary" className="rounded-sm">
                  {Object.keys(lessonEdits).length} unsaved changes
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 w-24">Order</th>
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2 w-32">Unit</th>
                    <th className="text-left p-2 w-64">Chapter</th>
                    <th className="text-left p-2 w-24">Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map((lesson) => {
                    const currentChapterId = getCurrentValue(
                      lesson.id,
                      "chapter_id"
                    ) as string;
                    const currentOrder = getCurrentValue(
                      lesson.id,
                      "lesson_order"
                    ) as number;
                    const selectedUnit = currentChapterId
                      ? getUnitByChapterId(currentChapterId)
                      : null;
                    const isModified = !!lessonEdits[lesson.id];

                    return (
                      <tr
                        key={lesson.id}
                        className={`border-b ${
                          isModified ? "bg-yellow-50" : "hover:bg-gray-50"
                        }`}
                      >
                        {/* Order */}
                        <td className="p-2">
                          <input
                            type="number"
                            value={currentOrder}
                            onChange={(e) =>
                              updateLessonEdit(
                                lesson.id,
                                "lesson_order",
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-16 border rounded-sm px-2 py-1 text-center"
                            min="1"
                          />
                        </td>

                        {/* Title */}
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{lesson.title}</div>
                            <div className="text-xs text-gray-500">
                              {lesson.slug}
                            </div>
                          </div>
                        </td>

                        {/* Unit (read-only, derived from chapter) */}
                        <td className="p-2">
                          <Badge variant="outline" className="rounded-sm">
                            {selectedUnit?.unit_name ||
                              lesson.chapter?.unit?.unit_name ||
                              "—"}
                          </Badge>
                        </td>

                        {/* Chapter */}
                        <td className="p-2">
                          <select
                            value={currentChapterId}
                            onChange={(e) =>
                              updateLessonEdit(
                                lesson.id,
                                "chapter_id",
                                e.target.value
                              )
                            }
                            className="w-full border rounded-sm px-2 py-1 text-sm"
                          >
                            <option value="">-- Select Chapter --</option>
                            {units.map((unit) => (
                              <optgroup key={unit.id} label={unit.unit_name}>
                                {getChaptersByUnit(unit.id).map((chapter) => (
                                  <option key={chapter.id} value={chapter.id}>
                                    {chapter.chapter_name}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        </td>

                        {/* Preview */}
                        <td className="p-2">
                          {lesson.is_preview ? (
                            <Badge className="bg-green-100 text-green-800 rounded-sm">
                              Yes
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="rounded-sm">
                              No
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Save Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <Button
                onClick={resetChanges}
                variant="outline"
                disabled={!hasChanges || isSaving}
                className="rounded-sm"
              >
                Reset Changes
              </Button>
              <Button
                onClick={saveAllMappings}
                disabled={!hasChanges || isSaving}
                className="rounded-sm bg-[#e27447] hover:bg-[#d1653a] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving
                  ? "Saving..."
                  : `Save All Changes (${Object.keys(lessonEdits).length})`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No course selected */}
      {!selectedCourseId && (
        <Card className="rounded-sm">
          <CardContent className="py-12 text-center text-muted-foreground">
            Please select a course to view and map lessons
          </CardContent>
        </Card>
      )}

      {/* No lessons found */}
      {selectedCourseId && lessons.length === 0 && !isLoading && (
        <Card className="rounded-sm">
          <CardContent className="py-12 text-center text-muted-foreground">
            No lessons found for this course
          </CardContent>
        </Card>
      )}
    </div>
  );
}
