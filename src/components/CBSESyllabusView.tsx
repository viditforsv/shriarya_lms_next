import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Badge } from "@/design-system/components/ui/badge";
import { Progress } from "@/design-system/components/ui/progress";
import { BookOpen, Clock, CheckCircle } from "lucide-react";

interface CBSEUnit {
  unitNo: number;
  unitName: string;
  chapters: {
    chapterNo: number;
    chapterName: string;
    lessonCount: number;
  }[];
}

interface CBSEChapter {
  chapterNo: number;
  chapterName: string;
  unitNo: number;
  lessonCount: number;
}

interface CBSELesson {
  lessonNo: number;
  lessonName: string;
  slug: string;
  isPreview: boolean;
}

interface CBSESyllabusProps {
  units: CBSEUnit[];
  chapters: CBSEChapter[];
  lessons: CBSELesson[];
  completedLessons?: number;
  totalLessons: number;
}

export function CBSESyllabusView({
  units,
  chapters,
  lessons,
  completedLessons = 0,
  totalLessons,
}: CBSESyllabusProps) {
  const progressPercentage =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Course Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedLessons} / {totalLessons} lessons
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {units.length}
                </div>
                <div className="text-sm text-muted-foreground">Units</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {chapters.length}
                </div>
                <div className="text-sm text-muted-foreground">Chapters</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {lessons.length}
                </div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Units Structure */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Syllabus Structure</h3>
        {units.map((unit) => (
          <Card key={unit.unitNo}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="outline">Unit {unit.unitNo}</Badge>
                {unit.unitName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {unit.chapters.map((chapter) => (
                  <div
                    key={chapter.chapterNo}
                    className="border-l-2 border-primary/20 pl-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">
                          Chapter {chapter.chapterNo}: {chapter.chapterName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {chapter.lessonCount} lessons
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {chapter.lessonCount} lessons
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lessons List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            All Lessons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {lessons.map((lesson) => (
              <div
                key={lesson.lessonNo}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {lesson.lessonNo}
                    </Badge>
                    {lesson.isPreview && (
                      <Badge variant="secondary" className="text-xs">
                        Preview
                      </Badge>
                    )}
                  </div>
                  <span className="font-medium">{lesson.lessonName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>45 min</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface CBSEUnitViewProps {
  unit: CBSEUnit;
  chapters: CBSEChapter[];
  lessons: CBSELesson[];
  onLessonClick?: (lesson: CBSELesson) => void;
}

export function CBSEUnitView({
  unit,
  chapters,
  lessons,
  onLessonClick,
}: CBSEUnitViewProps) {
  const unitChapters = chapters.filter(
    (chapter) => chapter.unitNo === unit.unitNo
  );
  const unitLessons = lessons.filter((lesson) => {
    const chapter = chapters.find((c) => c.chapterNo === lesson.lessonNo);
    return chapter && chapter.unitNo === unit.unitNo;
  });

  return (
    <div className="space-y-6">
      {/* Unit Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline" className="text-lg px-3 py-1">
              Unit {unit.unitNo}
            </Badge>
            <span className="text-xl">{unit.unitName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {unitChapters.length}
              </div>
              <div className="text-sm text-muted-foreground">Chapters</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {unitLessons.length}
              </div>
              <div className="text-sm text-muted-foreground">Lessons</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {Math.round((unitLessons.length * 45) / 60)}h
              </div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">0%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chapters */}
      <div className="space-y-4">
        {unitChapters.map((chapter) => (
          <Card key={chapter.chapterNo}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">Chapter {chapter.chapterNo}</Badge>
                {chapter.chapterName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {unitLessons
                  .filter((lesson) => {
                    // This is a simplified mapping - in reality you'd need proper lesson-to-chapter mapping
                    return (
                      lesson.lessonNo >= chapter.chapterNo * 10 &&
                      lesson.lessonNo < (chapter.chapterNo + 1) * 10
                    );
                  })
                  .map((lesson) => (
                    <div
                      key={lesson.lessonNo}
                      className="flex items-center justify-between p-2 rounded border hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => onLessonClick?.(lesson)}
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {lesson.lessonNo}
                        </Badge>
                        {lesson.isPreview && (
                          <Badge variant="secondary" className="text-xs">
                            Preview
                          </Badge>
                        )}
                        <span className="text-sm">{lesson.lessonName}</span>
                      </div>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CBSESyllabusView;
