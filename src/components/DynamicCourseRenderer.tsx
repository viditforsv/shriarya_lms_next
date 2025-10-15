// Dynamic Course Template Renderer
// This component renders course pages based on template structure

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import {
  RenderedCourse,
  CourseTemplate,
  TemplateSection,
} from "@/types/course-templates";

interface DynamicCourseRendererProps {
  course: RenderedCourse;
  template: CourseTemplate;
}

export function DynamicCourseRenderer({
  course,
  template,
}: DynamicCourseRendererProps) {
  // Check if template has the expected structure
  if (!template || !template.structure || !template.structure.sections) {
    // Fallback to render course overview with template data
    return renderCourseOverview(course, template);
  }

  // Render sections based on template structure
  const renderSection = (section: TemplateSection) => {
    switch (section.type) {
      case "overview":
        return renderOverviewSection(section, course);
      case "syllabus":
        return renderSyllabusSection(section, course);
      case "facts":
        return renderFactsSection(section, course);
      case "lessons":
        return renderLessonsSection(section, course);
      case "badges":
        return renderBadgesSection(section, course);
      default:
        return renderGenericSection(section, course);
    }
  };

  return (
    <div className="space-y-6">
      {template.structure.sections.map((section) => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>{renderSection(section)}</CardContent>
        </Card>
      ))}
    </div>
  );
}

// Fallback function to render course overview when template structure is not available
/* eslint-disable @typescript-eslint/no-explicit-any */
function renderCourseOverview(course: RenderedCourse, template: any) {
  return (
    <div className="space-y-6">
      {/* Course Description */}
      <Card>
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            {course?.description ||
              template?.description ||
              "This course provides comprehensive learning materials and practical exercises."}
          </p>

          {/* Course Highlights */}
          {template?.courseHighlights && (
            <div className="mb-6">
              <h4 className="font-semibold mb-4 text-[#1e293b]">
                Course Highlights
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {template?.courseHighlights?.map(
                  (highlight: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#e27447] rounded-full"></div>
                      <span className="text-sm text-muted-foreground">
                        {highlight}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Course Features */}
          {template?.features && (
            <div className="mb-6">
              <h4 className="font-semibold mb-4 text-[#1e293b]">
                What You&apos;ll Get
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {template?.features?.map((feature: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 border rounded-sm"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h5 className="font-medium text-[#1e293b]">
                        {feature.title}
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Syllabus Overview */}
      {template?.syllabusContent && (
        <Card>
          <CardHeader>
            <CardTitle>Complete Syllabus Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h4 className="font-semibold text-[#1e293b]">
                {template?.syllabusContent?.board} -{" "}
                {template?.syllabusContent?.grade}{" "}
                {template?.syllabusContent?.subject}
              </h4>
              <p className="text-sm text-muted-foreground">
                {template?.syllabusContent?.totalUnits} Units •{" "}
                {template?.syllabusContent?.totalChapters} Chapters •{" "}
                {template?.syllabusContent?.totalLessons} Lessons
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {template?.syllabusContent?.units?.map(
                (unit: any, index: number) => (
                  <div key={index} className="border-l-4 border-[#e27447] pl-3">
                    <h5 className="font-medium text-[#1e293b]">
                      Unit {unit.unitNo}: {unit.unitName}
                    </h5>
                    <div className="mt-2 space-y-1">
                      {unit.chapters?.map((chapter: any, chIndex: number) => (
                        <div
                          key={chIndex}
                          className="text-sm text-muted-foreground"
                        >
                          Chapter {chapter.chapterNo}: {chapter.chapterName} (
                          {chapter.lessonCount} lessons)
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Outcomes */}
      {template?.learningOutcomes && (
        <Card>
          <CardHeader>
            <CardTitle>Learning Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {template?.learningOutcomes?.map(
                (outcome: any, index: number) => {
                  // Handle both data structures: array of strings or array of objects
                  if (typeof outcome === "string") {
                    // Simple string array format
                    return (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 bg-[#e27447] rounded-full mt-2 flex-shrink-0"></div>
                        <span>{outcome}</span>
                      </li>
                    );
                  } else if (outcome.category && outcome.outcomes) {
                    // Complex object format with categories
                    return (
                      <div key={index}>
                        <h5 className="font-medium text-[#1e293b] mb-2">
                          {outcome.category}
                        </h5>
                        <ul className="space-y-1">
                          {outcome.outcomes.map(
                            (item: string, itemIndex: number) => (
                              <li
                                key={itemIndex}
                                className="flex items-start space-x-2 text-sm text-muted-foreground"
                              >
                                <div className="w-1.5 h-1.5 bg-[#e27447] rounded-full mt-2 flex-shrink-0"></div>
                                <span>{item}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    );
                  }
                  return null;
                }
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Render Overview Section
function renderOverviewSection(
  section: TemplateSection,
  course: RenderedCourse
) {
  return (
    <div className="space-y-6">
      {/* Description */}
      {section.fields.includes("description") && (
        <p className="text-muted-foreground">
          {course.description ||
            "This course provides comprehensive learning materials and practical exercises."}
        </p>
      )}

      {/* Official CBSE Syllabus Link */}
      {(course.slug === "cbse-mathematics-class-9" ||
        course.slug === "cbse-mathematics-class-10") && (
        <div className="p-4 bg-[#feefea] border border-[#e27447] rounded-sm">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-[#e27447]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-[#1e293b] mb-1">
                Official CBSE Syllabus 2025-26
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                View the complete official CBSE Mathematics syllabus document
                for detailed curriculum information, learning objectives, and
                examination guidelines.
              </p>
              <a
                href="https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/Maths_Sec_2025-26.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#e27447] hover:text-[#d1653a] font-medium text-sm"
              >
                <span>Download Official Syllabus PDF</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      {section.fields.includes("features") && course.features && (
        <div>
          <h4 className="font-semibold mb-4 text-[#1e293b]">Course Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#e27447] rounded-full"></div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prerequisites */}
      {section.fields.includes("prerequisites") && course.prerequisites && (
        <div>
          <h4 className="font-semibold mb-4 text-[#1e293b]">Prerequisites</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {course.prerequisites.map((prereq, index) => (
              <li key={index}>• {prereq}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Learning Outcomes */}
      {section.fields.includes("learningOutcomes") &&
        course.learningOutcomes && (
          <div>
            <h4 className="font-semibold mb-4 text-[#1e293b]">
              What you&apos;ll learn
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {course.learningOutcomes.map((outcome, index) => (
                <li key={index}>• {outcome}</li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}

// Render Syllabus Section
function renderSyllabusSection(
  section: TemplateSection,
  course: RenderedCourse
) {
  if (
    !section.fields.includes("syllabusContent") ||
    !course.templateData?.syllabusContent
  ) {
    return (
      <p className="text-muted-foreground">Syllabus content not available.</p>
    );
  }

  const syllabus = course.templateData.syllabusContent as Record<
    string,
    unknown
  >;

  return (
    <div>
      <h4 className="font-semibold mb-4 text-[#1e293b]">Complete Syllabus</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {(syllabus.chapters as unknown[])?.map(
          (chapter: unknown, index: number) => {
            const c = chapter as Record<string, unknown>;
            return (
              <div key={index} className="space-y-3">
                {(c.units as unknown[])?.map(
                  (unit: unknown, unitIndex: number) => {
                    const u = unit as Record<string, unknown>;
                    return (
                      <div
                        key={unitIndex}
                        className="border-l-4 border-[#e27447] pl-3"
                      >
                        <h5 className="font-medium text-[#1e293b]">
                          {String(u.title)}
                        </h5>
                        <p className="text-muted-foreground">
                          {String(u.description)}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

// Render Facts Section
function renderFactsSection(section: TemplateSection, course: RenderedCourse) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {section.fields.includes("duration") && (
        <div>
          <h4 className="font-semibold mb-2">Duration</h4>
          <p className="text-sm text-muted-foreground">{course.duration}</p>
        </div>
      )}

      {section.fields.includes("lessons") && (
        <div>
          <h4 className="font-semibold mb-2">Lessons</h4>
          <p className="text-sm text-muted-foreground">
            {course.lessons} lessons
          </p>
        </div>
      )}

      {section.fields.includes("curriculum") && (
        <div>
          <h4 className="font-semibold mb-2">Curriculum</h4>
          <p className="text-sm text-muted-foreground">{course.curriculum}</p>
        </div>
      )}

      {section.fields.includes("grade") && (
        <div>
          <h4 className="font-semibold mb-2">Grade</h4>
          <p className="text-sm text-muted-foreground">{course.grade}</p>
        </div>
      )}
    </div>
  );
}

// Render Lessons Section
function renderLessonsSection(
  section: TemplateSection,
  course: RenderedCourse
) {
  return (
    <div>
      <h4 className="font-semibold mb-4 text-[#1e293b]">Course Content</h4>
      <p className="text-sm text-muted-foreground">{course.lessons} lessons</p>
      {/* This would be populated with actual lessons */}
    </div>
  );
}

// Render Badges Section
function renderBadgesSection(section: TemplateSection, course: RenderedCourse) {
  const badgeConfigs = [
    // Course Info Badges (Priority - show these first)
    ...(course.curriculum
      ? [
          {
            text: course.curriculum,
            variant: "outline" as const,
            className:
              "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors",
          },
        ]
      : []),

    ...(course.subject
      ? [
          {
            text: course.subject,
            variant: "outline" as const,
            className:
              "border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors",
          },
        ]
      : []),

    ...(course.grade
      ? [
          {
            text: course.grade,
            variant: "outline" as const,
            className:
              "border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors",
          },
        ]
      : []),

    ...(course.level
      ? [
          {
            text: course.level,
            variant: "outline" as const,
            className:
              "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors",
          },
        ]
      : []),

    // Additional Tags - Only show tags that aren't already displayed above
    ...(course.tags
      ?.filter((tag) => {
        // Filter out tags that are already shown as individual badges
        const lowerTag = tag.toLowerCase();
        const unwantedTags = [
          "board preparation",
          "geometric constructions",
          "algebra",
          "geometry",
          "statistics",
          "probability",
        ];

        return !(
          lowerTag === course.curriculum?.toLowerCase() ||
          lowerTag === course.subject?.toLowerCase() ||
          lowerTag === course.grade?.toLowerCase() ||
          lowerTag === course.level?.toLowerCase() ||
          unwantedTags.includes(lowerTag)
        );
      })
      .map((tag) => ({
        text: tag,
        variant: "outline" as const,
        className:
          "border-[#e27447] text-[#e27447] hover:bg-[#e27447] hover:text-white transition-colors",
      })) || []),
  ];

  return (
    <div>
      <h4 className="font-semibold mb-4 text-[#1e293b]">Course Information</h4>
      <div className="flex items-center flex-wrap gap-2">
        {badgeConfigs.map((badge, index) => (
          <Badge
            key={index}
            variant={badge.variant}
            className={badge.className}
          >
            {badge.text}
          </Badge>
        ))}
      </div>
    </div>
  );
}

// Render Generic Section
function renderGenericSection(
  section: TemplateSection,
  course: RenderedCourse
) {
  return (
    <div>
      <p className="text-muted-foreground">
        Content for {section.title} section would be rendered here based on
        template fields.
      </p>
      {section.fields.map((field, index) => (
        <div key={index} className="mb-2">
          <span className="font-medium">{field}:</span>{" "}
          {String(course.templateData?.[field] || "Not available")}
        </div>
      ))}
    </div>
  );
}
