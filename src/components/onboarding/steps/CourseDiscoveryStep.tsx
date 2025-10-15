"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  ArrowRight,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { OnboardingStepProps } from "../../OnboardingFlow";

interface Course {
  id: string;
  title: string;
  description: string;
  slug: string | null;
  price: number;
  difficulty: string;
  estimated_duration: number;
  student_count: number;
  rating: number;
  thumbnail_url?: string;
  board?: string;
  exam?: string;
}

export function CourseDiscoveryStep({ onNext }: OnboardingStepProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [educationalBackground, setEducationalBackground] =
    useState<string>("");
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<string>("");

  // All available courses
  const allCourses: Course[] = [
    // CBSE Courses
    {
      id: "1",
      title: "CBSE Mathematics Class 10",
      description: "Complete CBSE Mathematics curriculum for Class 10 students",
      slug: "cbse-mathematics-class-10",
      price: 0,
      difficulty: "intermediate",
      estimated_duration: 120,
      student_count: 1250,
      rating: 4.8,
      board: "CBSE",
    },
    {
      id: "4",
      title: "CBSE Mathematics Class 12",
      description: "Advanced Mathematics for CBSE Class 12 students",
      slug: "cbse-mathematics-class-12",
      price: 2999,
      difficulty: "advanced",
      estimated_duration: 200,
      student_count: 320,
      rating: 4.6,
      board: "CBSE",
    },
    {
      id: "6",
      title: "CBSE Mathematics Class 11",
      description: "Intermediate Mathematics for CBSE Class 11 students",
      slug: "cbse-mathematics-class-11",
      price: 2499,
      difficulty: "intermediate",
      estimated_duration: 160,
      student_count: 420,
      rating: 4.5,
      board: "CBSE",
    },
    {
      id: "7",
      title: "CBSE Physics Class 12",
      description: "Complete CBSE Physics curriculum for Class 12 students",
      slug: "cbse-physics-class-12",
      price: 2999,
      difficulty: "advanced",
      estimated_duration: 180,
      student_count: 380,
      rating: 4.7,
      board: "CBSE",
    },
    // ICSE Courses
    {
      id: "3",
      title: "ICSE Mathematics Class 9",
      description: "Foundation Mathematics for ICSE Class 9 students",
      slug: "icse-mathematics-class-9",
      price: 0,
      difficulty: "beginner",
      estimated_duration: 90,
      student_count: 890,
      rating: 4.7,
      board: "ICSE",
    },
    {
      id: "8",
      title: "ICSE Mathematics Class 10",
      description: "Complete ICSE Mathematics curriculum for Class 10 students",
      slug: "icse-mathematics-class-10",
      price: 2299,
      difficulty: "intermediate",
      estimated_duration: 140,
      student_count: 650,
      rating: 4.6,
      board: "ICSE",
    },
    // IBDP Courses
    {
      id: "2",
      title: "IBDP Mathematics HL",
      description: "Advanced Mathematics for IBDP Higher Level students",
      slug: "ibdp-mathematics-hl",
      price: 3999,
      difficulty: "advanced",
      estimated_duration: 180,
      student_count: 450,
      rating: 4.9,
      board: "IBDP",
    },
    {
      id: "9",
      title: "IBDP Mathematics SL",
      description: "Standard Level Mathematics for IBDP students",
      slug: "ibdp-mathematics-sl",
      price: 3499,
      difficulty: "intermediate",
      estimated_duration: 160,
      student_count: 520,
      rating: 4.8,
      board: "IBDP",
    },
    // IGCSE Courses
    {
      id: "5",
      title: "IGCSE Mathematics",
      description: "International Mathematics curriculum for IGCSE students",
      slug: "igcse-mathematics",
      price: 2799,
      difficulty: "intermediate",
      estimated_duration: 150,
      student_count: 680,
      rating: 4.8,
      board: "IGCSE",
    },
    {
      id: "10",
      title: "IGCSE Physics",
      description: "International Physics curriculum for IGCSE students",
      slug: "igcse-physics",
      price: 2799,
      difficulty: "intermediate",
      estimated_duration: 140,
      student_count: 420,
      rating: 4.5,
      board: "IGCSE",
    },
    // Professional Exam Courses
    {
      id: "11",
      title: "SAT Mathematics",
      description: "Complete SAT Mathematics preparation course",
      slug: "sat-mathematics",
      price: 4999,
      difficulty: "advanced",
      estimated_duration: 100,
      student_count: 1200,
      rating: 4.9,
      exam: "SAT",
    },
    {
      id: "12",
      title: "SAT English",
      description: "Complete SAT English preparation course",
      slug: "sat-english",
      price: 4499,
      difficulty: "advanced",
      estimated_duration: 80,
      student_count: 980,
      rating: 4.7,
      exam: "SAT",
    },
    {
      id: "13",
      title: "GMAT Quantitative",
      description: "Complete GMAT Quantitative reasoning preparation",
      slug: "gmat-quantitative",
      price: 5999,
      difficulty: "advanced",
      estimated_duration: 120,
      student_count: 750,
      rating: 4.8,
      exam: "GMAT",
    },
    {
      id: "14",
      title: "GMAT Verbal",
      description: "Complete GMAT Verbal reasoning preparation",
      slug: "gmat-verbal",
      price: 5499,
      difficulty: "advanced",
      estimated_duration: 100,
      student_count: 680,
      rating: 4.6,
      exam: "GMAT",
    },
    {
      id: "15",
      title: "GRE Mathematics",
      description: "Complete GRE Mathematics preparation course",
      slug: "gre-mathematics",
      price: 5499,
      difficulty: "advanced",
      estimated_duration: 140,
      student_count: 920,
      rating: 4.7,
      exam: "GRE",
    },
    {
      id: "16",
      title: "GRE Verbal",
      description: "Complete GRE Verbal reasoning preparation",
      slug: "gre-verbal",
      price: 4999,
      difficulty: "advanced",
      estimated_duration: 120,
      student_count: 850,
      rating: 4.5,
      exam: "GRE",
    },
  ];

  // Filter courses based on selection
  const getFilteredCourses = () => {
    if (!educationalBackground) return [];

    if (educationalBackground === "school") {
      if (!selectedBoard) return [];
      return allCourses.filter((course) => course.board === selectedBoard);
    } else {
      if (!selectedExam) return [];
      return allCourses.filter((course) => course.exam === selectedExam);
    }
  };

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCourseSelect = async (courseId: string) => {
    const newSelectedCourses = selectedCourses.includes(courseId)
      ? selectedCourses.filter((id) => id !== courseId)
      : [...selectedCourses, courseId];

    setSelectedCourses(newSelectedCourses);

    // Save to Supabase immediately
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentStep: 3, // Course discovery step
          preferences: {
            educationalBackground,
            selectedBoard,
            selectedExam,
            selectedCourses: newSelectedCourses,
          },
          educationalBackground: {
            background: educationalBackground,
            board: selectedBoard,
            exam: selectedExam,
          },
          selectedCourses: newSelectedCourses,
        }),
      });
    } catch (error) {
      console.error("Error saving course selection:", error);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCourses = getFilteredCourses();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-[#e27447]/10 rounded-full flex items-center justify-center mx-auto">
          <BookOpen className="w-6 h-6 text-[#e27447]" />
        </div>
        <h2 className="text-lg font-semibold">What do you want to study?</h2>
        <p className="text-sm text-muted-foreground">
          Tell us about your educational background so we can show you relevant
          courses.
        </p>
      </div>

      {/* Educational Background Selection */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground mb-4">
            Are you currently in school or a working professional?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={async () => {
                setEducationalBackground("school");
                setSelectedBoard("");
                setSelectedExam("");
                setSelectedCourses([]);

                // Save to Supabase
                try {
                  await fetch("/api/onboarding", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      currentStep: 3,
                      educationalBackground: { background: "school" },
                      preferences: { educationalBackground: "school" },
                    }),
                  });
                } catch (error) {
                  console.error("Error saving educational background:", error);
                }
              }}
              className={`p-4 rounded-sm border text-left transition-all duration-200 ${
                educationalBackground === "school"
                  ? "border-[#e27447] bg-[#e27447]/5"
                  : "border-border hover:border-[#e27447]/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-[#e27447]" />
                <div>
                  <p className="font-medium text-sm">In School</p>
                  <p className="text-xs text-muted-foreground">
                    High school or secondary education
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={async () => {
                setEducationalBackground("professional");
                setSelectedBoard("");
                setSelectedExam("");
                setSelectedCourses([]);

                // Save to Supabase
                try {
                  await fetch("/api/onboarding", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      currentStep: 3,
                      educationalBackground: { background: "professional" },
                      preferences: { educationalBackground: "professional" },
                    }),
                  });
                } catch (error) {
                  console.error("Error saving educational background:", error);
                }
              }}
              className={`p-4 rounded-sm border text-left transition-all duration-200 ${
                educationalBackground === "professional"
                  ? "border-[#e27447] bg-[#e27447]/5"
                  : "border-border hover:border-[#e27447]/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-[#e27447]" />
                <div>
                  <p className="font-medium text-sm">Working Professional</p>
                  <p className="text-xs text-muted-foreground">
                    College graduate or working professional
                  </p>
                </div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Board/Exam Selection */}
      {educationalBackground === "school" && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-foreground mb-4">
              Which board are you studying under?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["CBSE", "ICSE", "IBDP", "IGCSE"].map((board) => (
                <button
                  key={board}
                  onClick={async () => {
                    setSelectedBoard(board);
                    setSelectedCourses([]);

                    // Save to Supabase
                    try {
                      await fetch("/api/onboarding", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          currentStep: 3,
                          educationalBackground: {
                            background: "school",
                            board: board,
                          },
                          preferences: {
                            educationalBackground: "school",
                            selectedBoard: board,
                          },
                        }),
                      });
                    } catch (error) {
                      console.error("Error saving board selection:", error);
                    }
                  }}
                  className={`p-3 rounded-sm border text-center transition-all duration-200 ${
                    selectedBoard === board
                      ? "border-[#e27447] bg-[#e27447]/5"
                      : "border-border hover:border-[#e27447]/50"
                  }`}
                >
                  <p className="font-medium text-sm">{board}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {educationalBackground === "professional" && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-foreground mb-4">
              Which exam are you preparing for?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {["SAT", "GMAT", "GRE"].map((exam) => (
                <button
                  key={exam}
                  onClick={async () => {
                    setSelectedExam(exam);
                    setSelectedCourses([]);

                    // Save to Supabase
                    try {
                      await fetch("/api/onboarding", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          currentStep: 3,
                          educationalBackground: {
                            background: "professional",
                            exam: exam,
                          },
                          preferences: {
                            educationalBackground: "professional",
                            selectedExam: exam,
                          },
                        }),
                      });
                    } catch (error) {
                      console.error("Error saving exam selection:", error);
                    }
                  }}
                  className={`p-3 rounded-sm border text-center transition-all duration-200 ${
                    selectedExam === exam
                      ? "border-[#e27447] bg-[#e27447]/5"
                      : "border-border hover:border-[#e27447]/50"
                  }`}
                >
                  <p className="font-medium text-sm">{exam}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Course Selection */}
      {filteredCourses.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-foreground mb-4">
              Select courses that interest you:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md border rounded-sm p-4 ${
                    selectedCourses.includes(course.id)
                      ? "ring-2 ring-[#e27447] bg-[#e27447]/5 border-[#e27447]"
                      : "border-border hover:border-[#e27447]/50"
                  }`}
                  onClick={() => handleCourseSelect(course.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {course.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {course.description}
                      </p>
                    </div>
                    <Badge
                      variant={
                        (course.price || 0) === 0 ? "outline" : "default"
                      }
                      className="ml-2 text-xs"
                    >
                      {(course.price || 0) === 0 ? "Free" : "Paid"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {formatDuration(course.estimated_duration || 0)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{course.student_count || 0}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating || 0}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${getDifficultyColor(
                        course.difficulty
                      )}`}
                    >
                      {course.difficulty}
                    </Badge>

                    {selectedCourses.includes(course.id) && (
                      <div className="flex items-center text-[#e27447] text-xs font-medium">
                        <div className="w-3 h-3 bg-[#e27447] rounded-full flex items-center justify-center mr-1">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        Selected
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Courses Message */}
      {educationalBackground &&
        ((educationalBackground === "school" && !selectedBoard) ||
          (educationalBackground === "professional" && !selectedExam)) && (
          <Card>
            <CardContent className="p-4">
              <div className="text-center py-6">
                <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Please select a{" "}
                  {educationalBackground === "school" ? "board" : "exam"} to see
                  available courses.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-muted-foreground">
          {selectedCourses.length} course
          {selectedCourses.length !== 1 ? "s" : ""} selected
        </p>

        <Button
          onClick={onNext}
          className="bg-[#e27447] hover:bg-[#e27447]/90"
          disabled={!educationalBackground}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Help Text */}
      <p className="text-xs text-muted-foreground text-center">
        You can always browse and enroll in additional courses later from the
        main course catalog.
      </p>
    </div>
  );
}
