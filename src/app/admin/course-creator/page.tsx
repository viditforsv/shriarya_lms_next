"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import { Badge } from "@/design-system/components/ui/badge";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design-system/components/tabs";
import {
  Plus,
  BookOpen,
  FileText,
  Play,
  Save,
  Eye,
  GripVertical,
  Trash2,
  Edit3,
  ChevronDown,
  ChevronRight,
  Search,
  Layers,
  ArrowLeft,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TagInput } from "@/components/TagInput";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  contentUrl?: string;
  videoUrl?: string;
  documentUrl?: string;
  embedHtml?: string;
  duration?: string;
  type: "video" | "document" | "quiz" | "assignment";
  isPreview: boolean;
  order: number;
}

interface Chapter {
  id: string;
  title: string;
  slug: string;
  description?: string;
  lessons: Lesson[];
  order: number;
}

interface Unit {
  id: string;
  title: string;
  slug: string;
  description?: string;
  chapters: Chapter[];
  order: number;
}

interface Course {
  id?: string;
  title: string;
  slug: string;
  description: string;
  curriculum: string;
  subject: string;
  grade: string;
  level?: string;
  price: number;
  isFree?: boolean;
  duration: string;
  validityDays: number;
  thumbnail?: string;
  units: Unit[];
  tags: string[];
  learningOutcomes: string[];
  prerequisites: string[];
  // Additional metadata for course display
  examBoard?: string;
  academicYear?: string;
  textbookName?: string;
}

// Small helper types used in this file to avoid `any`
type Primitive = string | number | boolean | null | undefined;

// DB row shapes returned by API endpoints (minimal fields used here)
type DBUnit = {
  id: string;
  unit_order: number;
  unit_name?: string;
  description?: string;
};
type DBChapter = {
  id: string;
  unit_id: string;
  chapter_order: number;
  chapter_name?: string;
  description?: string;
};
type DBLesson = {
  id: string;
  lesson_order: number;
  title?: string;
  slug?: string;
  topic_badge?: string;
  description?: string;
  content?: string;
  content_url?: string;
  video_url?: string;
  pdf_url?: string;
  duration?: string;
  is_preview?: boolean;
  chapter?: { id: string } | null;
  quiz_id?: string | null;
  solution_url?: string | null;
};

// Props types for sortable components
type SortableChapterProps = {
  chapter: Chapter;
  unit: Unit;
  chapterIndex: number;
  editingChapter: string | null;
  setEditingChapter: (id: string | null) => void;
  updateChapter: (
    unitId: string,
    chapterId: string,
    field: keyof Chapter,
    value: Primitive
  ) => void;
  addLesson: (unitId: string, chapterId: string) => void;
  deleteChapter: (unitId: string, chapterId: string) => void;
  collapsedChapters: Set<string>;
  toggleChapterCollapse: (chapterId: string) => void;
  allUnits: Unit[];
  moveChapterToUnit: (
    newUnitId: string,
    chapterId: string,
    oldUnitId: string
  ) => void;
  children?: React.ReactNode;
};

type SortableLessonProps = {
  lesson: Lesson;
  lessonIndex: number;
  unit: Unit;
  chapter: Chapter;
  setEditingLesson: (
    v: { unitId: string; chapterId: string; lessonId: string } | null
  ) => void;
  deleteLesson: (unitId: string, chapterId: string, lessonId: string) => void;
  allChapters: Chapter[];
  moveLessonToChapter: (
    unitId: string,
    newChapterId: string,
    lessonId: string,
    oldChapterId: string
  ) => void;
};

type ChapterLessonsProps = {
  chapter: Chapter;
  unit: Unit;
  collapsedChapters: Set<string>;
  setEditingLesson: (
    v: { unitId: string; chapterId: string; lessonId: string } | null
  ) => void;
  deleteLesson: (unitId: string, chapterId: string, lessonId: string) => void;
  allChapters: Chapter[];
  moveLessonToChapter: (
    unitId: string,
    newChapterId: string,
    lessonId: string,
    oldChapterId: string
  ) => void;
};

// Sortable Chapter Component
const SortableChapter = React.memo(function SortableChapter({
  chapter,
  unit,
  chapterIndex,
  editingChapter,
  setEditingChapter,
  updateChapter,
  addLesson,
  deleteChapter,
  collapsedChapters,
  toggleChapterCollapse,
  allUnits,
  moveChapterToUnit,
  children,
}: SortableChapterProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isCollapsed = collapsedChapters.has(chapter.id);

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <div {...attributes} {...listeners} className="cursor-grab">
                <GripVertical className="w-4 h-4 text-gray-400" />
              </div>
              <button
                onClick={() => toggleChapterCollapse(chapter.id)}
                className="p-1 hover:bg-gray-100 rounded-sm"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              <FileText className="w-4 h-4 text-blue-600" />
              <div className="flex-1">
                {editingChapter === chapter.id ? (
                  <Input
                    value={chapter.title}
                    onChange={(e) =>
                      updateChapter(
                        unit.id,
                        chapter.id,
                        "title",
                        e.target.value
                      )
                    }
                    className="rounded-sm"
                    onBlur={() => setEditingChapter(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setEditingChapter(null);
                    }}
                    autoFocus
                  />
                ) : (
                  <h4
                    className="font-medium cursor-pointer hover:bg-gray-50 p-1 rounded-sm -m-1"
                    onClick={() => setEditingChapter(chapter.id)}
                  >
                    Chapter {chapterIndex + 1}: {chapter.title}
                  </h4>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <select
                value={unit.id}
                onChange={(e) => {
                  const newUnitId = e.target.value;
                  if (newUnitId !== unit.id) {
                    moveChapterToUnit(newUnitId, chapter.id, unit.id);
                  }
                }}
                className="text-xs border rounded-sm px-2 py-1"
                onClick={(e) => e.stopPropagation()}
                title="Move to unit"
              >
                {allUnits.map((u: Unit) => (
                  <option key={u.id} value={u.id}>
                    Unit: {u.title}
                  </option>
                ))}
              </select>
              <Button
                onClick={() => addLesson(unit.id, chapter.id)}
                size="sm"
                variant="outline"
                className="rounded-sm text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                Lesson
              </Button>
              <Button
                onClick={() => deleteChapter(unit.id, chapter.id)}
                size="sm"
                variant="outline"
                className="rounded-sm text-red-600 hover:bg-red-50 text-xs"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        {!isCollapsed && <CardContent>{children}</CardContent>}
      </Card>
    </div>
  );
});

// Sortable Lesson Component
const SortableLesson = React.memo(function SortableLesson({
  lesson,
  lessonIndex,
  unit,
  chapter,
  setEditingLesson,
  deleteLesson,
  allChapters,
  moveLessonToChapter,
}: SortableLessonProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-2 bg-gray-50 rounded-sm"
    >
      <div className="flex items-center space-x-2 flex-1">
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="w-3 h-3 text-gray-400" />
        </div>
        <Play className="w-3 h-3 text-green-600" />
        <span className="text-sm">
          Lesson {lessonIndex + 1}: {lesson.title}
        </span>
        {lesson.isPreview && (
          <Badge className="bg-green-100 text-green-800 text-xs">Preview</Badge>
        )}
      </div>
      <div className="flex items-center space-x-1">
        <select
          value={chapter.id}
          onChange={(e) => {
            const newChapterId = e.target.value;
            if (newChapterId !== chapter.id) {
              moveLessonToChapter(unit.id, newChapterId, lesson.id, chapter.id);
            }
          }}
          className="text-xs border rounded-sm px-2 py-1"
          onClick={(e) => e.stopPropagation()}
          title="Move to chapter"
        >
          {allChapters.map((c: Chapter) => (
            <option key={c.id} value={c.id}>
              Ch: {c.title}
            </option>
          ))}
        </select>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            // Check if lesson has a real database ID (UUID format, not temporary ID)
            const isRealLesson = lesson.id && !lesson.id.startsWith("lesson-");
            if (isRealLesson) {
              // Open in new tab for existing lessons
              window.open(`/admin/lesson-editor/${lesson.id}`, "_blank");
            } else {
              // Use modal for new/unsaved lessons
              setEditingLesson({
                unitId: unit.id,
                chapterId: chapter.id,
                lessonId: lesson.id,
              });
            }
          }}
          size="sm"
          variant="outline"
          className="rounded-sm text-xs"
          title={
            lesson.id && !lesson.id.startsWith("lesson-")
              ? "Edit lesson in new tab"
              : "Edit lesson"
          }
        >
          <Edit3 className="w-3 h-3" />
        </Button>
        <Button
          onClick={() => deleteLesson(unit.id, chapter.id, lesson.id)}
          size="sm"
          variant="outline"
          className="rounded-sm text-red-600 hover:bg-red-50 text-xs"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
});

// Chapter Lessons Wrapper - renders lessons for a chapter
const ChapterLessons = React.memo(
  function ChapterLessons({
    chapter,
    unit,
    collapsedChapters,
    setEditingLesson,
    deleteLesson,
    allChapters,
    moveLessonToChapter,
  }: ChapterLessonsProps) {
    const isCollapsed = collapsedChapters.has(chapter.id);

    if (isCollapsed) return null;

    return (
      <div className="space-y-2 ml-6 mt-2">
        {chapter.lessons.map((lesson: Lesson, lessonIndex: number) => (
          <SortableLesson
            key={lesson.id}
            lesson={lesson}
            lessonIndex={lessonIndex}
            unit={unit}
            chapter={chapter}
            setEditingLesson={setEditingLesson}
            deleteLesson={deleteLesson}
            allChapters={allChapters}
            moveLessonToChapter={moveLessonToChapter}
          />
        ))}
        {chapter.lessons.length === 0 && (
          <p className="text-sm text-gray-500 italic">No lessons yet</p>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison to avoid unnecessary re-renders
    return (
      prevProps.chapter.id === nextProps.chapter.id &&
      prevProps.chapter.lessons.length === nextProps.chapter.lessons.length &&
      prevProps.collapsedChapters === nextProps.collapsedChapters &&
      prevProps.allChapters?.length === nextProps.allChapters?.length
    );
  }
);

export default function CourseCreatorPage() {
  const [course, setCourse] = useState<Course>({
    title: "",
    slug: "",
    description: "",
    curriculum: "CBSE",
    subject: "Mathematics",
    grade: "Class 9",
    level: "",
    price: 0,
    isFree: true,
    duration: "40 hours",
    validityDays: 365,
    units: [],
    tags: [],
    learningOutcomes: [],
    prerequisites: [],
    examBoard: "CBSE",
    academicYear: "2025-26",
    textbookName: "NCERT",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [courseStatus, setCourseStatus] = useState<"draft" | "published">(
    "draft"
  );
  const [, setExistingCourses] = useState<unknown[]>([]);
  const [, setSelectedCourseId] = useState<string>("");
  const [coursesWithStats, setCoursesWithStats] = useState<
    Array<{
      id: string;
      title: string;
      slug: string;
      created_at: string;
      hierarchy: {
        units: number;
        chapters: number;
        topics: number;
        lessons: number;
        tags: number;
      };
    }>
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const [activeTab, setActiveTab] = useState("basic-info");
  const [editingUnit, setEditingUnit] = useState<string | null>(null);
  const [editingChapter, setEditingChapter] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<{
    unitId: string;
    chapterId: string;
    lessonId: string;
  } | null>(null);

  // Collapsible state
  const [collapsedUnits, setCollapsedUnits] = useState<Set<string>>(new Set());
  const [collapsedChapters, setCollapsedChapters] = useState<Set<string>>(
    new Set()
  );

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const tabs = ["basic-info", "structure", "preview"];
  const currentTabIndex = tabs.indexOf(activeTab);

  const goToNextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1]);
    }
  };

  const goToPreviousTab = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1]);
    }
  };

  const canProceedToNext = () => {
    switch (activeTab) {
      case "basic-info":
        return course.title.trim() !== "" && course.slug.trim() !== "";
      case "structure":
        return course.units.length > 0;
      case "content":
        return true; // Content tab is optional
      case "preview":
        return true;
      default:
        return false;
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const addUnit = () => {
    const newUnit: Unit = {
      id: `unit-${Date.now()}`,
      title: "New Unit",
      slug: "new-unit",
      description: "",
      chapters: [],
      order: course.units.length + 1,
    };
    setCourse((prev) => ({
      ...prev,
      units: [...prev.units, newUnit],
    }));
    setEditingUnit(newUnit.id);
  };

  const addChapter = (unitId: string) => {
    const unit = course.units.find((u) => u.id === unitId);
    if (!unit) return;

    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      title: "New Chapter",
      slug: "new-chapter",
      description: "",
      lessons: [],
      order: unit.chapters.length + 1,
    };

    setCourse((prev) => ({
      ...prev,
      units: prev.units.map((u) =>
        u.id === unitId ? { ...u, chapters: [...u.chapters, newChapter] } : u
      ),
    }));
    setEditingChapter(newChapter.id);
  };

  const addLesson = (unitId: string, chapterId: string) => {
    const unit = course.units.find((u) => u.id === unitId);
    if (!unit) return;

    const chapter = unit.chapters.find((c) => c.id === chapterId);
    if (!chapter) return;

    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: "New Lesson",
      slug: "new-lesson",
      description: "",
      content: "",
      duration: "45 min",
      type: "video",
      isPreview: false,
      order: chapter.lessons.length + 1,
    };

    setCourse((prev) => ({
      ...prev,
      units: prev.units.map((u) =>
        u.id === unitId
          ? {
              ...u,
              chapters: u.chapters.map((c) =>
                c.id === chapterId
                  ? { ...c, lessons: [...c.lessons, newLesson] }
                  : c
              ),
            }
          : u
      ),
    }));
    setEditingLesson({ unitId, chapterId, lessonId: newLesson.id });
  };

  const updateUnit = (unitId: string, field: keyof Unit, value: Primitive) => {
    setCourse((prev) => ({
      ...prev,
      units: prev.units.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              [field]: value,
              ...(field === "title"
                ? { slug: generateSlug(String(value)) }
                : {}),
            }
          : unit
      ),
    }));
  };

  const updateChapter = (
    unitId: string,
    chapterId: string,
    field: keyof Chapter,
    value: Primitive
  ) => {
    setCourse((prev) => ({
      ...prev,
      units: prev.units.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              chapters: unit.chapters.map((chapter) =>
                chapter.id === chapterId
                  ? {
                      ...chapter,
                      [field]: value,
                      ...(field === "title"
                        ? { slug: generateSlug(String(value)) }
                        : {}),
                    }
                  : chapter
              ),
            }
          : unit
      ),
    }));
  };

  const updateLesson = (
    unitId: string,
    chapterId: string,
    lessonId: string,
    field: keyof Lesson,
    value: Primitive
  ) => {
    setCourse((prev) => ({
      ...prev,
      units: prev.units.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              chapters: unit.chapters.map((chapter) =>
                chapter.id === chapterId
                  ? {
                      ...chapter,
                      lessons: chapter.lessons.map((lesson) =>
                        lesson.id === lessonId
                          ? {
                              ...lesson,
                              [field]: value,
                              ...(field === "title"
                                ? { slug: generateSlug(String(value)) }
                                : {}),
                            }
                          : lesson
                      ),
                    }
                  : chapter
              ),
            }
          : unit
      ),
    }));
  };

  const deleteUnit = (unitId: string) => {
    setCourse((prev) => ({
      ...prev,
      units: prev.units.filter((u) => u.id !== unitId),
    }));
  };

  const deleteChapter = (unitId: string, chapterId: string) => {
    setCourse((prev) => ({
      ...prev,
      units: prev.units.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              chapters: unit.chapters.filter((c) => c.id !== chapterId),
            }
          : unit
      ),
    }));
  };

  const deleteLesson = (
    unitId: string,
    chapterId: string,
    lessonId: string
  ) => {
    setCourse((prev) => ({
      ...prev,
      units: prev.units.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              chapters: unit.chapters.map((chapter) =>
                chapter.id === chapterId
                  ? {
                      ...chapter,
                      lessons: chapter.lessons.filter((l) => l.id !== lessonId),
                    }
                  : chapter
              ),
            }
          : unit
      ),
    }));
  };

  // Collapsible helpers
  const toggleUnitCollapse = (unitId: string) => {
    setCollapsedUnits((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(unitId)) {
        newSet.delete(unitId);
      } else {
        newSet.add(unitId);
      }
      return newSet;
    });
  };

  const toggleChapterCollapse = (chapterId: string) => {
    setCollapsedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  // Drag and drop handlers
  const handleChapterDragEnd = (event: DragEndEvent, unitId: string) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCourse((prev) => ({
        ...prev,
        units: prev.units.map((unit) => {
          if (unit.id === unitId) {
            const oldIndex = unit.chapters.findIndex((c) => c.id === active.id);
            const newIndex = unit.chapters.findIndex((c) => c.id === over.id);
            return {
              ...unit,
              chapters: arrayMove(unit.chapters, oldIndex, newIndex).map(
                (chapter, idx) => ({
                  ...chapter,
                  order: idx + 1,
                })
              ),
            };
          }
          return unit;
        }),
      }));
    }
  };

  // Move chapter to different unit
  const moveChapterToUnit = (
    newUnitId: string,
    chapterId: string,
    oldUnitId: string
  ) => {
    setCourse((prev) => {
      const oldUnit = prev.units.find((u) => u.id === oldUnitId);
      const chapter = oldUnit?.chapters.find((c) => c.id === chapterId);

      if (!chapter || !oldUnit) return prev;

      return {
        ...prev,
        units: prev.units.map((unit) => {
          // Remove from old unit
          if (unit.id === oldUnitId) {
            return {
              ...unit,
              chapters: unit.chapters.filter((c) => c.id !== chapterId),
            };
          }
          // Add to new unit
          if (unit.id === newUnitId) {
            return {
              ...unit,
              chapters: [...unit.chapters, chapter],
            };
          }
          return unit;
        }),
      };
    });
  };

  // Move lesson to different chapter
  const moveLessonToChapter = (
    unitId: string,
    newChapterId: string,
    lessonId: string,
    oldChapterId: string
  ) => {
    setCourse((prev) => ({
      ...prev,
      units: prev.units.map((unit) => {
        if (unit.id !== unitId) return unit;

        const oldChapter = unit.chapters.find((c) => c.id === oldChapterId);
        const lesson = oldChapter?.lessons.find((l) => l.id === lessonId);

        if (!lesson || !oldChapter) return unit;

        return {
          ...unit,
          chapters: unit.chapters.map((chapter) => {
            // Remove from old chapter
            if (chapter.id === oldChapterId) {
              return {
                ...chapter,
                lessons: chapter.lessons
                  .filter((l) => l.id !== lessonId)
                  .map((l, idx) => ({ ...l, order: idx + 1 })),
              };
            }
            // Add to new chapter
            if (chapter.id === newChapterId) {
              return {
                ...chapter,
                lessons: [...chapter.lessons, lesson].map((l, idx) => ({
                  ...l,
                  order: idx + 1,
                })),
              };
            }
            return chapter;
          }),
        };
      }),
    }));
  };

  const handleLessonDragEnd = (event: DragEndEvent, unitId: string) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setCourse((prev) => ({
      ...prev,
      units: prev.units.map((unit) => {
        if (unit.id !== unitId) return unit;

        // Find source and destination chapters
        let sourceChapterId = "";
        let destChapterId = "";
        let draggedLesson: Lesson | null = null;

        // Find which chapter contains the dragged lesson
        unit.chapters.forEach((chapter) => {
          if (chapter.lessons.find((l) => l.id === active.id)) {
            sourceChapterId = chapter.id;
            draggedLesson = chapter.lessons.find((l) => l.id === active.id)!;
          }
          if (chapter.lessons.find((l) => l.id === over.id)) {
            destChapterId = chapter.id;
          }
        });

        if (!draggedLesson || !sourceChapterId || !destChapterId) return unit;

        // Same chapter - simple reorder
        if (sourceChapterId === destChapterId) {
          return {
            ...unit,
            chapters: unit.chapters.map((chapter) => {
              if (chapter.id === sourceChapterId) {
                const oldIndex = chapter.lessons.findIndex(
                  (l) => l.id === active.id
                );
                const newIndex = chapter.lessons.findIndex(
                  (l) => l.id === over.id
                );
                return {
                  ...chapter,
                  lessons: arrayMove(chapter.lessons, oldIndex, newIndex).map(
                    (lesson, idx) => ({
                      ...lesson,
                      order: idx + 1,
                    })
                  ),
                };
              }
              return chapter;
            }),
          };
        }

        // Cross-chapter - remove from source, add to destination
        return {
          ...unit,
          chapters: unit.chapters.map((chapter) => {
            // Remove from source chapter
            if (chapter.id === sourceChapterId) {
              return {
                ...chapter,
                lessons: chapter.lessons
                  .filter((l) => l.id !== active.id)
                  .map((lesson, idx) => ({
                    ...lesson,
                    order: idx + 1,
                  })),
              };
            }
            // Add to destination chapter
            if (chapter.id === destChapterId) {
              const destIndex = chapter.lessons.findIndex(
                (l) => l.id === over.id
              );
              const newLessons = [...chapter.lessons];
              newLessons.splice(destIndex + 1, 0, draggedLesson!);
              return {
                ...chapter,
                lessons: newLessons.map((lesson, idx) => ({
                  ...lesson,
                  order: idx + 1,
                })),
              };
            }
            return chapter;
          }),
        };
      }),
    }));
  };

  const saveCourse = async () => {
    try {
      // Transform course data to match API schema
      const coursePayload = {
        title: course.title,
        slug: course.slug,
        description: course.description,
        curriculum: course.curriculum,
        subject: course.subject,
        grade: course.grade,
        level: course.level || null,
        price: course.price,
        validity_days: course.validityDays,
        status: courseStatus,
        // Store structure as template_data
        template_data: {
          units: course.units,
          tags: course.tags,
          learningOutcomes: course.learningOutcomes,
          prerequisites: course.prerequisites,
          examBoard: course.examBoard,
          academicYear: course.academicYear,
          textbookName: course.textbookName,
          duration: course.duration,
        },
      };

      // If editing, include the course ID in the payload (for PUT)
      if (isEditing && course.id) {
        (coursePayload as { id?: string }).id = course.id;
      }

      // Create or update the course
      const url = "/api/courses";
      const method = isEditing ? "PUT" : "POST";

      console.log(`${method} ${url}`, coursePayload);

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coursePayload),
      });

      const data = await response.json();
      console.log("API response:", data);

      if (!response.ok) {
        const errorMessage = data.error || "Failed to save course";
        const details = data.details
          ? "\n\n" + JSON.stringify(data.details, null, 2)
          : "";
        alert(`Failed to save course: ${errorMessage}${details}`);
        console.error("Error details:", data);
        return;
      }

      // Get the course ID (from response or existing course)
      const courseId = data.course?.id || course.id;

      if (!courseId) {
        alert("Error: Course ID is missing from response");
        console.error("Response data:", data);
        return;
      }

      console.log("Course saved with ID:", courseId);

      // Handle lessons - either create new or update existing
      let lessonOrder = 0;
      const lessonPromises: Promise<Response>[] = [];

      // If editing, first delete all existing lessons for this course
      if (isEditing) {
        try {
          const deleteResponse = await fetch(
            `/api/lessons/bulk?course_id=${courseId}`,
            {
              method: "DELETE",
            }
          );
          if (!deleteResponse.ok) {
            console.warn(
              "Failed to delete existing lessons, continuing with creation..."
            );
          } else {
            console.log("Deleted existing lessons for course");
          }
        } catch (error) {
          console.warn("Error deleting existing lessons:", error);
        }
      }

      for (const unit of course.units) {
        for (const chapter of unit.chapters) {
          for (const lesson of chapter.lessons) {
            lessonOrder++;

            const lessonPayload = {
              course_id: courseId,
              title: lesson.title,
              slug: `${course.slug}-${lesson.slug}`,
              topic_badge: lesson.description || null,
              lesson_order: lessonOrder,
              is_preview: lesson.isPreview,
              content: lesson.content || lesson.embedHtml || null,
              video_url: lesson.videoUrl || null,
              video_thumbnail_url: null, // Can be added later
              pdf_url: lesson.documentUrl || null,
              unit_name: unit.title,
              chapter_name: chapter.title,
              quiz_id: null, // Can be linked later
            };

            console.log(`Creating lesson ${lessonOrder}:`, lessonPayload);

            lessonPromises.push(
              fetch("/api/lessons", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(lessonPayload),
              })
            );
          }
        }
      }

      // Wait for all lessons to be created
      const lessonResults = await Promise.all(lessonPromises);
      const failedLessons = lessonResults.filter((r) => !r.ok);

      if (failedLessons.length > 0) {
        // Get detailed error messages
        const errorDetails = await Promise.all(
          failedLessons.map(async (response) => {
            try {
              const errorData = await response.json();
              return errorData;
            } catch {
              return { error: "Failed to parse error response" };
            }
          })
        );

        console.error("Failed lessons:", errorDetails);
        alert(
          `Course created, but ${
            failedLessons.length
          } lesson(s) failed to save.\n\nError details:\n${JSON.stringify(
            errorDetails,
            null,
            2
          )}\n\nPlease check the console for more details.`
        );
      } else {
        const action = isEditing ? "updated" : "created";
        alert(
          `✅ Course ${action} successfully!\n\nCourse ID: ${courseId}\nLessons saved: ${lessonOrder}\n\nYou can now view it at /courses/${course.slug}`
        );
        // Refresh the courses list
        loadExistingCourses();
        // Optionally redirect to course page
        // window.location.href = `/courses/${course.slug}`;
      }
    } catch (error) {
      console.error("Error saving course:", error);
      alert(
        `Error saving course: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const getCurrentLesson = () => {
    if (!editingLesson) return null;

    const unit = course.units.find((u) => u.id === editingLesson.unitId);
    if (!unit) return null;

    const chapter = unit.chapters.find((c) => c.id === editingLesson.chapterId);
    if (!chapter) return null;

    return chapter.lessons.find((l) => l.id === editingLesson.lessonId);
  };

  const saveLessonEdits = () => {
    setEditingLesson(null);
  };

  const loadExistingCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      const data = await response.json();
      if (response.ok) {
        setExistingCourses(data.courses || []);
      }
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  // Load course structure dynamically from database
  const loadCourseStructure = async (courseSlug: string) => {
    try {
      // Fetch units
      const unitsResponse = await fetch(
        `/api/courses/units?course_slug=${courseSlug}`
      );
      if (!unitsResponse.ok) {
        throw new Error("Failed to fetch units");
      }
      const unitsData = await unitsResponse.json();
      const allUnits = unitsData.units || [];

      // Fetch chapters
      const chaptersResponse = await fetch(
        `/api/courses/chapters?course_slug=${courseSlug}`
      );
      if (!chaptersResponse.ok) {
        throw new Error("Failed to fetch chapters");
      }
      const chaptersData = await chaptersResponse.json();
      const allChapters = chaptersData.chapters || [];

      // Fetch lessons
      const lessonsResponse = await fetch(
        `/api/lessons?course_slug=${courseSlug}`
      );
      if (!lessonsResponse.ok) {
        throw new Error("Failed to fetch lessons");
      }
      const lessonsData = await lessonsResponse.json();
      const allLessons = lessonsData.lessons || [];

      // Transform database structure to component format
      const units = (allUnits as DBUnit[])
        .sort((a: DBUnit, b: DBUnit) => a.unit_order - b.unit_order)
        .map((unit: DBUnit) => {
          // Get chapters for this unit
          const unitChapters = (allChapters as DBChapter[])
            .filter((ch: DBChapter) => ch.unit_id === unit.id)
            .sort(
              (a: DBChapter, b: DBChapter) => a.chapter_order - b.chapter_order
            )
            .map((chapter: DBChapter) => {
              // Get lessons for this chapter
              const chapterLessons = (allLessons as DBLesson[])
                .filter((lesson: DBLesson) => lesson.chapter?.id === chapter.id)
                .sort(
                  (a: DBLesson, b: DBLesson) => a.lesson_order - b.lesson_order
                )
                .map((lesson: DBLesson) => {
                  // Determine lesson type based on content
                  let lessonType: "video" | "document" | "quiz" | "assignment" =
                    "video";
                  if (lesson.video_url) {
                    lessonType = "video";
                  } else if (lesson.quiz_id) {
                    lessonType = "quiz";
                  } else if (lesson.pdf_url && lesson.solution_url) {
                    lessonType = "assignment";
                  } else if (lesson.pdf_url || lesson.content) {
                    lessonType = "document";
                  }

                  return {
                    id: lesson.id,
                    title: lesson.title || "",
                    slug: lesson.slug || "",
                    description: lesson.topic_badge || lesson.description || "",
                    content: lesson.content || "",
                    contentUrl: lesson.content_url,
                    videoUrl: lesson.video_url,
                    documentUrl: lesson.pdf_url,
                    embedHtml: lesson.content,
                    duration: lesson.duration || "45 min",
                    type: lessonType,
                    isPreview: lesson.is_preview || false,
                    order: lesson.lesson_order,
                  };
                });

              return {
                id: chapter.id,
                title: chapter.chapter_name || "",
                slug:
                  chapter.chapter_name?.toLowerCase().replace(/\s+/g, "-") ||
                  "",
                description: chapter.description || "",
                lessons: chapterLessons,
                order: chapter.chapter_order,
              };
            });

          return {
            id: unit.id,
            title: unit.unit_name || "",
            slug: unit.unit_name?.toLowerCase().replace(/\s+/g, "-") || "",
            description: unit.description || "",
            chapters: unitChapters,
            order: unit.unit_order,
          };
        });

      setCourse((prev) => ({ ...prev, units }));
    } catch (error) {
      console.error("Error loading course structure:", error);
      alert(
        `Failed to load course structure: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const loadCourseForEditing = async (courseId: string) => {
    try {
      console.log("Loading course with ID:", courseId);
      const response = await fetch(`/api/courses?id=${courseId}`);
      const data = await response.json();

      console.log("Course API response:", { response: response.ok, data });

      if (response.ok && data.course) {
        const courseData = data.course;

        // Load course basic info
        const loadedPrice = courseData.price || 0;
        setCourse({
          id: courseData.id,
          title: courseData.title,
          slug: courseData.slug,
          description: courseData.description || "",
          curriculum: courseData.curriculum || "CBSE",
          subject: courseData.subject || "",
          grade: courseData.grade || "",
          level: courseData.level || "",
          price: loadedPrice,
          isFree: loadedPrice === 0,
          duration: courseData.duration || "",
          validityDays: courseData.validity_days || 365,
          units: [], // Will be loaded dynamically
          tags: courseData.template_data?.tags || [],
          learningOutcomes: courseData.template_data?.learningOutcomes || [],
          prerequisites: courseData.template_data?.prerequisites || [],
          examBoard: courseData.template_data?.examBoard || "",
          academicYear: courseData.template_data?.academicYear || "",
          textbookName: courseData.template_data?.textbookName || "",
        });

        // Load course structure dynamically from database
        await loadCourseStructure(courseData.slug);

        setCourseStatus(courseData.status || "draft");
        setIsEditing(true);
        setSelectedCourseId(courseId);
        alert("Course loaded for editing!");
      } else {
        console.error("Failed to load course:", data);
        alert(`Failed to load course: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error loading course:", error);
      alert(
        `Error loading course: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  // Load courses on component mount
  useEffect(() => {
    loadExistingCourses();
    loadCoursesWithStats();
  }, []);

  const loadCoursesWithStats = async () => {
    try {
      setIsLoadingStats(true);
      const response = await fetch("/api/courses/hierarchy-stats");
      if (response.ok) {
        const data = await response.json();
        setCoursesWithStats(data.courses || []);
      }
    } catch (error) {
      console.error("Error loading course hierarchy stats:", error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  // Filter courses based on search query
  const filteredCourses = coursesWithStats.filter((course) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      course.title.toLowerCase().includes(searchLower) ||
      course.slug.toLowerCase().includes(searchLower)
    );
  });

  // Auto-load course from URL parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const courseId = searchParams.get("courseId");
      if (courseId && !isEditing) {
        loadCourseForEditing(courseId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load course structure when Structure tab is active and course is loaded
  useEffect(() => {
    if (
      isEditing &&
      activeTab === "structure" &&
      course.slug &&
      course.units.length === 0
    ) {
      loadCourseStructure(course.slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isEditing, course.slug]);

  // If editing, show the editing interface
  if (isEditing) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Admin", href: "/admin/site-administration" },
              { label: "Course Creator", href: "/admin/course-creator" },
              { label: "Edit Course", isActive: true },
            ]}
          />
        </div>

        <div className="mb-6 flex items-center gap-4">
          <Button
            onClick={() => {
              setIsEditing(false);
              setSelectedCourseId("");
              setCourse({
                title: "",
                slug: "",
                description: "",
                curriculum: "CBSE",
                subject: "Mathematics",
                grade: "Class 9",
                level: "",
                price: 0,
                isFree: true,
                duration: "40 hours",
                validityDays: 365,
                units: [],
                tags: [],
                learningOutcomes: [],
                prerequisites: [],
                examBoard: "CBSE",
                academicYear: "2025-26",
                textbookName: "NCERT",
              });
            }}
            variant="outline"
            className="rounded-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
              Editing: {course.title}
            </h1>
            <p className="text-muted-foreground">
              Edit course content with an intuitive drag-and-drop interface
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-lg bg-gray-100 p-1">
            <TabsTrigger
              value="basic-info"
              className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
            >
              Basic Info
            </TabsTrigger>
            <TabsTrigger
              value="structure"
              className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
            >
              Structure & Content
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
            >
              Preview & Publish
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic-info" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Course Title
                    </label>
                    <Input
                      value={course.title}
                      onChange={(e) => {
                        setCourse((prev) => ({
                          ...prev,
                          title: e.target.value,
                          slug: generateSlug(e.target.value),
                        }));
                      }}
                      placeholder="e.g., CBSE Mathematics Class 9"
                      className="rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Course Slug
                    </label>
                    <Input
                      value={course.slug}
                      onChange={(e) =>
                        setCourse((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      placeholder="e.g., cbse-mathematics-class-9"
                      className="rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Description
                  </label>
                  <textarea
                    value={course.description}
                    onChange={(e) =>
                      setCourse((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe your course..."
                    className="w-full border rounded-sm px-3 py-2 min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Curriculum
                    </label>
                    <select
                      value={course.curriculum}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          curriculum: e.target.value,
                        }))
                      }
                      className="w-full border rounded-sm px-3 py-2"
                    >
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="IBDP">IBDP</option>
                      <option value="IGCSE">IGCSE</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Subject
                    </label>
                    <Input
                      value={course.subject}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      placeholder="Mathematics"
                      className="rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Grade
                    </label>
                    <Input
                      value={course.grade}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          grade: e.target.value,
                        }))
                      }
                      placeholder="Class 9"
                      className="rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Level
                    </label>
                    <Input
                      value={course.level || ""}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          level: e.target.value,
                        }))
                      }
                      placeholder="HL/SL (optional)"
                      className="rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Exam Board
                    </label>
                    <Input
                      value={course.examBoard || ""}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          examBoard: e.target.value,
                        }))
                      }
                      placeholder="e.g., CBSE, IBO, Cambridge"
                      className="rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Academic Year
                    </label>
                    <Input
                      value={course.academicYear || ""}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          academicYear: e.target.value,
                        }))
                      }
                      placeholder="e.g., 2025-26"
                      className="rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Textbook Name
                    </label>
                    <Input
                      value={course.textbookName || ""}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          textbookName: e.target.value,
                        }))
                      }
                      placeholder="e.g., NCERT, IB Textbook"
                      className="rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Price (₹)
                    </label>
                    <Input
                      type="number"
                      value={course.price}
                      onChange={(e) => {
                        const price = Number(e.target.value);
                        setCourse((prev) => ({
                          ...prev,
                          price: price,
                          isFree: price === 0,
                        }));
                      }}
                      placeholder="Enter price in Rupees"
                      className="rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Duration
                    </label>
                    <Input
                      value={course.duration}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          duration: e.target.value,
                        }))
                      }
                      placeholder="40 hours"
                      className="rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Validity (Days)
                    </label>
                    <Input
                      type="number"
                      value={course.validityDays}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          validityDays: Number(e.target.value),
                        }))
                      }
                      placeholder="365"
                      className="rounded-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {course.validityDays} days (
                      {Math.round(course.validityDays / 30)} months)
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Status
                    </label>
                    <select
                      value={courseStatus}
                      onChange={(e) =>
                        setCourseStatus(e.target.value as "draft" | "published")
                      }
                      className="w-full border rounded-sm px-3 py-2"
                    >
                      <option value="draft">📝 Draft</option>
                      <option value="published">🚀 Published</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={course.isFree ?? false}
                        onChange={(e) => {
                          const isFree = e.target.checked;
                          setCourse((prev) => ({
                            ...prev,
                            isFree: isFree,
                            price: isFree ? 0 : prev.price,
                          }));
                        }}
                      />
                      <span className="text-sm">Free Course</span>
                    </label>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Course Tags
                  </label>
                  <TagInput
                    tags={course.tags}
                    onChange={(tags) =>
                      setCourse((prev) => ({
                        ...prev,
                        tags: tags,
                      }))
                    }
                    placeholder="e.g., Board Preparation, Advanced, Problem Solving"
                    maxTags={8}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    These will appear as badges on the course page
                  </p>
                </div>

                {/* Learning Outcomes */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Learning Outcomes (one per line)
                  </label>
                  <textarea
                    value={course.learningOutcomes.join("\n")}
                    onChange={(e) =>
                      setCourse((prev) => ({
                        ...prev,
                        learningOutcomes: e.target.value
                          .split("\n")
                          .map((line) => line.trim())
                          .filter((line) => line.length > 0),
                      }))
                    }
                    placeholder="e.g.,&#10;Master all concepts thoroughly&#10;Solve complex problems with confidence&#10;Excel in board examinations"
                    className="w-full border rounded-sm px-3 py-2 min-h-[100px]"
                  />
                </div>

                {/* Prerequisites */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Prerequisites (one per line)
                  </label>
                  <textarea
                    value={course.prerequisites.join("\n")}
                    onChange={(e) =>
                      setCourse((prev) => ({
                        ...prev,
                        prerequisites: e.target.value
                          .split("\n")
                          .map((line) => line.trim())
                          .filter((line) => line.length > 0),
                      }))
                    }
                    placeholder="e.g.,&#10;Basic understanding of algebra&#10;Completed previous grade mathematics"
                    className="w-full border rounded-sm px-3 py-2 min-h-[100px]"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={goToPreviousTab}
                    variant="outline"
                    className="rounded-sm"
                    disabled={currentTabIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={goToNextTab}
                    className="rounded-sm bg-[#e27447] hover:bg-[#d1653a]"
                    disabled={
                      !canProceedToNext() || currentTabIndex === tabs.length - 1
                    }
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="structure" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Course Structure</CardTitle>
                  <div className="flex gap-2">
                    {course.slug && (
                      <Button
                        onClick={() => loadCourseStructure(course.slug)}
                        variant="outline"
                        className="rounded-sm"
                      >
                        🔄 Refresh from Database
                      </Button>
                    )}
                    <Button
                      onClick={addUnit}
                      className="rounded-sm bg-[#e27447] hover:bg-[#d1653a]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Unit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.units.map((unit, unitIndex) => (
                    <Card key={unit.id} className="border-2">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <GripVertical className="w-5 h-5 text-gray-400" />
                            <button
                              onClick={() => toggleUnitCollapse(unit.id)}
                              className="p-1 hover:bg-gray-100 rounded-sm"
                            >
                              {collapsedUnits.has(unit.id) ? (
                                <ChevronRight className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                            <div className="flex-1">
                              {editingUnit === unit.id ? (
                                <Input
                                  value={unit.title}
                                  onChange={(e) =>
                                    updateUnit(unit.id, "title", e.target.value)
                                  }
                                  className="rounded-sm font-medium"
                                  onBlur={() => setEditingUnit(null)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") setEditingUnit(null);
                                  }}
                                  autoFocus
                                />
                              ) : (
                                <h3
                                  className="text-lg font-medium cursor-pointer hover:bg-gray-50 p-2 rounded-sm -m-2"
                                  onClick={() => setEditingUnit(unit.id)}
                                >
                                  Unit {unitIndex + 1}: {unit.title}
                                </h3>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() => addChapter(unit.id)}
                              size="sm"
                              variant="outline"
                              className="rounded-sm"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Chapter
                            </Button>
                            <Button
                              onClick={() => deleteUnit(unit.id)}
                              size="sm"
                              variant="outline"
                              className="rounded-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {!collapsedUnits.has(unit.id) && (
                          <div className="space-y-3 ml-8">
                            {/* Lesson drag and drop context - at unit level for cross-chapter dragging */}
                            <DndContext
                              sensors={sensors}
                              collisionDetection={closestCenter}
                              onDragEnd={(e) => handleLessonDragEnd(e, unit.id)}
                            >
                              <SortableContext
                                items={unit.chapters.flatMap((c) =>
                                  c.lessons.map((l) => l.id)
                                )}
                                strategy={verticalListSortingStrategy}
                              >
                                {/* Chapter drag and drop context */}
                                <DndContext
                                  sensors={sensors}
                                  collisionDetection={closestCenter}
                                  onDragEnd={(e) =>
                                    handleChapterDragEnd(e, unit.id)
                                  }
                                >
                                  <SortableContext
                                    items={unit.chapters.map((c) => c.id)}
                                    strategy={verticalListSortingStrategy}
                                  >
                                    {unit.chapters.map(
                                      (chapter, chapterIndex) => (
                                        <SortableChapter
                                          key={chapter.id}
                                          chapter={chapter}
                                          unit={unit}
                                          chapterIndex={chapterIndex}
                                          editingChapter={editingChapter}
                                          setEditingChapter={setEditingChapter}
                                          updateChapter={updateChapter}
                                          addLesson={addLesson}
                                          deleteChapter={deleteChapter}
                                          collapsedChapters={collapsedChapters}
                                          toggleChapterCollapse={
                                            toggleChapterCollapse
                                          }
                                          allUnits={course.units}
                                          moveChapterToUnit={moveChapterToUnit}
                                        >
                                          <ChapterLessons
                                            chapter={chapter}
                                            unit={unit}
                                            collapsedChapters={
                                              collapsedChapters
                                            }
                                            setEditingLesson={setEditingLesson}
                                            deleteLesson={deleteLesson}
                                            allChapters={unit.chapters}
                                            moveLessonToChapter={
                                              moveLessonToChapter
                                            }
                                          />
                                        </SortableChapter>
                                      )
                                    )}
                                  </SortableContext>
                                </DndContext>
                              </SortableContext>
                            </DndContext>

                            {unit.chapters.length === 0 && (
                              <p className="text-sm text-gray-500 italic ml-8">
                                No chapters yet
                              </p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  {course.units.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No units created yet</p>
                      <Button
                        onClick={addUnit}
                        className="rounded-sm bg-[#e27447] hover:bg-[#d1653a]"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Unit
                      </Button>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={goToPreviousTab}
                    variant="outline"
                    className="rounded-sm"
                    disabled={currentTabIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={goToNextTab}
                    className="rounded-sm bg-[#e27447] hover:bg-[#d1653a]"
                    disabled={
                      !canProceedToNext() || currentTabIndex === tabs.length - 1
                    }
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Preview & Publish Course</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="rounded-sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      onClick={saveCourse}
                      className="rounded-sm bg-[#e27447] hover:bg-[#d1653a]"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Course
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Course Overview</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium">Title:</span>
                        <p className="text-sm">
                          {course.title || "Untitled Course"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Curriculum:</span>
                        <p className="text-sm">
                          {course.curriculum} {course.grade} {course.subject}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Duration:</span>
                        <p className="text-sm">{course.duration}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Price:</span>
                        <p className="text-sm">
                          {course.isFree ? "Free" : `₹${course.price}`}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Validity:</span>
                        <p className="text-sm">
                          {course.validityDays} days (
                          {Math.round(course.validityDays / 30)} months)
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Status:</span>
                        <p className="text-sm">
                          {courseStatus === "draft"
                            ? "📝 Draft"
                            : "🚀 Published"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Structure Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Units:</span>
                        <span className="text-sm font-medium">
                          {course.units.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Chapters:</span>
                        <span className="text-sm font-medium">
                          {course.units.reduce(
                            (sum, unit) => sum + unit.chapters.length,
                            0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Lessons:</span>
                        <span className="text-sm font-medium">
                          {course.units.reduce(
                            (sum, unit) =>
                              sum +
                              unit.chapters.reduce(
                                (chSum, chapter) =>
                                  chSum + chapter.lessons.length,
                                0
                              ),
                            0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={goToPreviousTab}
                    variant="outline"
                    className="rounded-sm"
                    disabled={currentTabIndex === 0}
                  >
                    Previous
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      onClick={goToNextTab}
                      className="rounded-sm bg-[#e27447] hover:bg-[#d1653a]"
                      disabled={
                        !canProceedToNext() ||
                        currentTabIndex === tabs.length - 1
                      }
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Lesson Editor Modal */}
        {editingLesson && getCurrentLesson() && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">Edit Lesson</h2>
                <Button
                  onClick={() => setEditingLesson(null)}
                  variant="outline"
                  className="rounded-sm"
                >
                  ✕
                </Button>
              </div>

              <div className="p-6 space-y-6">
                {/* Lesson Title */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Lesson Title
                  </label>
                  <Input
                    value={getCurrentLesson()?.title || ""}
                    onChange={(e) =>
                      updateLesson(
                        editingLesson.unitId,
                        editingLesson.chapterId,
                        editingLesson.lessonId,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="e.g., Introduction to Real Numbers"
                    className="rounded-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Slug: {getCurrentLesson()?.slug}
                  </p>
                </div>

                {/* Lesson Description */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Description
                  </label>
                  <textarea
                    value={getCurrentLesson()?.description || ""}
                    onChange={(e) =>
                      updateLesson(
                        editingLesson.unitId,
                        editingLesson.chapterId,
                        editingLesson.lessonId,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Brief description of the lesson..."
                    className="w-full border rounded-sm px-3 py-2 min-h-[80px]"
                  />
                </div>

                {/* Lesson Type and Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Lesson Type
                    </label>
                    <select
                      value={getCurrentLesson()?.type || "video"}
                      onChange={(e) =>
                        updateLesson(
                          editingLesson.unitId,
                          editingLesson.chapterId,
                          editingLesson.lessonId,
                          "type",
                          e.target.value as
                            | "video"
                            | "document"
                            | "quiz"
                            | "assignment"
                        )
                      }
                      className="w-full border rounded-sm px-3 py-2"
                    >
                      <option value="video">📹 Video Lesson</option>
                      <option value="document">📄 Document/Reading</option>
                      <option value="quiz">✅ Quiz/Assessment</option>
                      <option value="assignment">
                        📝 Assignment (Submit Work)
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Duration
                    </label>
                    <Input
                      value={getCurrentLesson()?.duration || ""}
                      onChange={(e) =>
                        updateLesson(
                          editingLesson.unitId,
                          editingLesson.chapterId,
                          editingLesson.lessonId,
                          "duration",
                          e.target.value
                        )
                      }
                      placeholder="e.g., 45 min"
                      className="rounded-sm"
                    />
                  </div>
                </div>

                {/* URL Fields based on type */}
                {getCurrentLesson()?.type === "video" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Video URL
                    </label>
                    <Input
                      value={getCurrentLesson()?.videoUrl || ""}
                      onChange={(e) =>
                        updateLesson(
                          editingLesson.unitId,
                          editingLesson.chapterId,
                          editingLesson.lessonId,
                          "videoUrl",
                          e.target.value
                        )
                      }
                      placeholder="e.g., https://www.youtube.com/watch?v=..."
                      className="rounded-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports: YouTube, Vimeo, Wistia, or direct video URLs
                    </p>
                  </div>
                )}

                {getCurrentLesson()?.type === "document" && (
                  <>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Document URL
                      </label>
                      <Input
                        value={getCurrentLesson()?.documentUrl || ""}
                        onChange={(e) =>
                          updateLesson(
                            editingLesson.unitId,
                            editingLesson.chapterId,
                            editingLesson.lessonId,
                            "documentUrl",
                            e.target.value
                          )
                        }
                        placeholder="e.g., https://drive.google.com/file/... or PDF URL"
                        className="rounded-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Supports: PDF URLs, Google Docs (public), or direct
                        document links
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium block">
                          Custom HTML Embed (Advanced)
                        </label>
                        <Badge variant="outline" className="text-xs">
                          Optional
                        </Badge>
                      </div>
                      <textarea
                        value={getCurrentLesson()?.embedHtml || ""}
                        onChange={(e) =>
                          updateLesson(
                            editingLesson.unitId,
                            editingLesson.chapterId,
                            editingLesson.lessonId,
                            "embedHtml",
                            e.target.value
                          )
                        }
                        placeholder="<div id='adobe-dc-view'></div>&#10;<script src='https://acrobatservices.adobe.com/...'></script>&#10;<script type='text/javascript'>&#10;  // Your Adobe PDF Embed code&#10;</script>"
                        className="w-full border rounded-sm px-3 py-2 min-h-[120px] font-mono text-xs"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        ✨ Paste HTML embed code (Adobe PDF Embed API, iframes,
                        etc.)
                        <br />
                        💡 If provided, this will be used instead of the URL
                        above
                      </p>
                    </div>
                  </>
                )}

                {(getCurrentLesson()?.type === "quiz" ||
                  getCurrentLesson()?.type === "assignment") && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      External Content URL (Optional)
                    </label>
                    <Input
                      value={getCurrentLesson()?.contentUrl || ""}
                      onChange={(e) =>
                        updateLesson(
                          editingLesson.unitId,
                          editingLesson.chapterId,
                          editingLesson.lessonId,
                          "contentUrl",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Google Forms, Typeform, external platform..."
                      className="rounded-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Link to external quiz/assignment platform (e.g., Google
                      Forms, Kahoot)
                    </p>
                  </div>
                )}

                {/* Preview Access */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPreview"
                    checked={getCurrentLesson()?.isPreview || false}
                    onChange={(e) =>
                      updateLesson(
                        editingLesson.unitId,
                        editingLesson.chapterId,
                        editingLesson.lessonId,
                        "isPreview",
                        e.target.checked
                      )
                    }
                    className="rounded"
                  />
                  <label htmlFor="isPreview" className="text-sm">
                    Allow preview access (free for non-enrolled users)
                  </label>
                </div>

                {/* Lesson Content */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Lesson Content
                  </label>
                  <textarea
                    value={getCurrentLesson()?.content || ""}
                    onChange={(e) =>
                      updateLesson(
                        editingLesson.unitId,
                        editingLesson.chapterId,
                        editingLesson.lessonId,
                        "content",
                        e.target.value
                      )
                    }
                    placeholder="Lesson content (markdown supported)..."
                    className="w-full border rounded-sm px-3 py-2 min-h-[200px] font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    You can use Markdown formatting
                  </p>
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 border-t p-6 flex justify-end space-x-2">
                <Button
                  onClick={() => setEditingLesson(null)}
                  variant="outline"
                  className="rounded-sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveLessonEdits}
                  className="rounded-sm bg-[#e27447] hover:bg-[#d1653a]"
                >
                  Save Lesson
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default view: Table of all courses with hierarchy stats
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Admin", href: "/admin/site-administration" },
            { label: "Course Creator", isActive: true },
          ]}
        />
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
              Course Creator
            </h1>
            <p className="text-muted-foreground">
              View and edit courses with 5-tier hierarchy structure
            </p>
          </div>
          <Button
            onClick={loadCoursesWithStats}
            variant="outline"
            className="rounded-sm"
            disabled={isLoadingStats}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6 rounded-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses by name or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* 5-Tier Hierarchy Summary Info */}
      <Card className="mb-6 rounded-sm bg-[#feefea]/30 border-[#e27447]/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#e27447]" />
            <CardTitle className="text-[#1e293b]">
              5-Tier Hierarchy Flow
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="rounded-sm">
              Units
            </Badge>
            <span>→</span>
            <Badge variant="outline" className="rounded-sm">
              Chapters
            </Badge>
            <span>→</span>
            <Badge variant="outline" className="rounded-sm">
              Topics
            </Badge>
            <span>→</span>
            <Badge variant="outline" className="rounded-sm">
              Lessons
            </Badge>
            <span>→</span>
            <Badge variant="outline" className="rounded-sm">
              Tags
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      {isLoadingStats ? (
        <Card className="rounded-sm">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Loading courses...</p>
          </CardContent>
        </Card>
      ) : filteredCourses.length === 0 ? (
        <Card className="rounded-sm">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search query"
                : "No courses available"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Course Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Slug
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                    Units
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                    Chapters
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                    Topics
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                    Lessons
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                    Tags
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((courseWithStats) => (
                  <tr
                    key={courseWithStats.id}
                    className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-sm">
                          {courseWithStats.title}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-sm">
                        {courseWithStats.slug}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="outline" className="rounded-sm">
                        {courseWithStats.hierarchy.units}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="outline" className="rounded-sm">
                        {courseWithStats.hierarchy.chapters}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="outline" className="rounded-sm">
                        {courseWithStats.hierarchy.topics}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="outline" className="rounded-sm">
                        {courseWithStats.hierarchy.lessons}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="outline" className="rounded-sm">
                        {courseWithStats.hierarchy.tags}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedCourseId(courseWithStats.id);
                          loadCourseForEditing(courseWithStats.id);
                        }}
                        className="rounded-sm"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
