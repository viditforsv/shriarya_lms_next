"use client";

import { useState } from "react";
import { Button } from "@/design-system/components/ui/button";
import { Card, CardContent } from "@/design-system/components/ui/card";
import { Settings, Target, Clock, BookOpen, ArrowRight } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { OnboardingStepProps } from "../../OnboardingFlow";

const learningGoals = [
  { id: "career_advancement", label: "Career Advancement", icon: Target },
  { id: "skill_development", label: "Skill Development", icon: BookOpen },
  { id: "personal_growth", label: "Personal Growth", icon: Target },
  { id: "certification", label: "Get Certified", icon: Target },
  { id: "hobby", label: "Hobby Learning", icon: BookOpen },
  { id: "academic", label: "Academic Support", icon: BookOpen },
];

const interests = [
  {
    id: "mathematics",
    label: "Mathematics",
    color: "bg-blue-100 text-blue-800",
  },
  { id: "science", label: "Science", color: "bg-green-100 text-green-800" },
  {
    id: "programming",
    label: "Programming",
    color: "bg-purple-100 text-purple-800",
  },
  { id: "business", label: "Business", color: "bg-orange-100 text-orange-800" },
  { id: "design", label: "Design", color: "bg-pink-100 text-pink-800" },
  {
    id: "languages",
    label: "Languages",
    color: "bg-yellow-100 text-yellow-800",
  },
  { id: "history", label: "History", color: "bg-gray-100 text-gray-800" },
  {
    id: "literature",
    label: "Literature",
    color: "bg-indigo-100 text-indigo-800",
  },
];

const experienceLevels = [
  { id: "beginner", label: "Beginner", description: "New to the subject" },
  { id: "intermediate", label: "Intermediate", description: "Some experience" },
  { id: "advanced", label: "Advanced", description: "Experienced learner" },
];

const studySchedules = [
  {
    id: "flexible",
    label: "Flexible",
    description: "Learn when I have time",
    icon: Clock,
  },
  {
    id: "structured",
    label: "Structured",
    description: "Follow a set schedule",
    icon: Clock,
  },
  {
    id: "intensive",
    label: "Intensive",
    description: "Fast-paced learning",
    icon: Clock,
  },
];

export function PreferencesStep({ onNext }: OnboardingStepProps) {
  const { data, updatePreferences } = useOnboarding();
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    data.preferences.learningGoals
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    data.preferences.interests
  );
  const [experienceLevel, setExperienceLevel] = useState(
    data.preferences.experienceLevel
  );
  const [studySchedule, setStudySchedule] = useState(
    data.preferences.studySchedule
  );

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSaveAndContinue = () => {
    updatePreferences({
      learningGoals: selectedGoals,
      interests: selectedInterests,
      experienceLevel,
      studySchedule,
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-[#e27447]/10 rounded-full flex items-center justify-center mx-auto">
          <Settings className="w-6 h-6 text-[#e27447]" />
        </div>
        <h2 className="text-lg font-semibold">Set Your Preferences</h2>
        <p className="text-sm text-muted-foreground">
          Help us customize your learning experience by telling us about your
          goals and interests.
        </p>
      </div>

      {/* Learning Goals */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2 text-[#e27447]" />
            Learning Goals
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            What do you hope to achieve through learning? (Select all that
            apply)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {learningGoals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => handleGoalToggle(goal.id)}
                className={`p-3 rounded-sm border text-left transition-all duration-200 ${
                  selectedGoals.includes(goal.id)
                    ? "border-[#e27447] bg-[#e27447]/5"
                    : "border-border hover:border-[#e27447]/50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <goal.icon className="w-4 h-4 text-[#e27447]" />
                  <span className="text-sm font-medium">{goal.label}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground mb-3 flex items-center">
            <BookOpen className="w-4 h-4 mr-2 text-[#e27447]" />
            Subject Interests
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Which subjects interest you most? (Select all that apply)
          </p>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <button
                key={interest.id}
                onClick={() => handleInterestToggle(interest.id)}
                className={`px-3 py-2 rounded-sm text-sm font-medium transition-all duration-200 ${
                  selectedInterests.includes(interest.id)
                    ? `${interest.color} ring-2 ring-[#e27447]`
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {interest.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Level */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground mb-3">Experience Level</h3>
          <p className="text-sm text-muted-foreground mb-4">
            How would you describe your overall learning experience?
          </p>
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setExperienceLevel(level.id as "beginner" | "intermediate" | "advanced")}
                className={`w-full p-3 rounded-sm border text-left transition-all duration-200 ${
                  experienceLevel === level.id
                    ? "border-[#e27447] bg-[#e27447]/5"
                    : "border-border hover:border-[#e27447]/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{level.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {level.description}
                    </p>
                  </div>
                  {experienceLevel === level.id && (
                    <div className="w-4 h-4 bg-[#e27447] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Schedule */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground mb-3 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-[#e27447]" />
            Study Schedule Preference
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            How do you prefer to structure your learning time?
          </p>
          <div className="space-y-2">
            {studySchedules.map((schedule) => (
              <button
                key={schedule.id}
                onClick={() => setStudySchedule(schedule.id as "flexible" | "structured" | "intensive")}
                className={`w-full p-3 rounded-sm border text-left transition-all duration-200 ${
                  studySchedule === schedule.id
                    ? "border-[#e27447] bg-[#e27447]/5"
                    : "border-border hover:border-[#e27447]/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <schedule.icon className="w-4 h-4 text-[#e27447]" />
                    <div>
                      <p className="font-medium text-sm">{schedule.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {schedule.description}
                      </p>
                    </div>
                  </div>
                  {studySchedule === schedule.id && (
                    <div className="w-4 h-4 bg-[#e27447] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <Button
        onClick={handleSaveAndContinue}
        className="w-full bg-[#e27447] hover:bg-[#e27447]/90"
        size="lg"
      >
        Save Preferences & Continue
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>

      {/* Help Text */}
      <p className="text-xs text-muted-foreground text-center">
        You can always update these preferences later in your profile settings.
      </p>
    </div>
  );
}
