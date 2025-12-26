"use client";

import { Button } from "@/design-system/components/ui/button";
import { Card, CardContent } from "@/design-system/components/ui/card";
import { CheckCircle, BookOpen, Target, Users, ArrowRight } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { OnboardingStepProps } from "../../OnboardingFlow";

export function CompletionStep({ onComplete }: OnboardingStepProps) {
  const { data } = useOnboarding();

  const getCompletionStats = () => {
    const totalSteps = 5;
    const completedSteps = totalSteps - data.skippedSteps.length;
    const completionPercentage = Math.round(
      (completedSteps / totalSteps) * 100
    );

    return {
      completedSteps,
      totalSteps,
      completionPercentage,
    };
  };

  const stats = getCompletionStats();

  const nextActions = [
    {
      icon: BookOpen,
      title: "Browse Courses",
      description:
        "Explore our course catalog and find your next learning adventure",
      action: "Browse Courses",
    },
    {
      icon: Target,
      title: "Set Learning Goals",
      description: "Define specific learning objectives to track your progress",
      action: "Set Goals",
    },
    {
      icon: Users,
      title: "Join Study Groups",
      description: "Connect with other learners and collaborate on projects",
      action: "Find Groups",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            🎉 Welcome to Preppeo LMS!
          </h2>
          <p className="text-muted-foreground">
            You&apos;ve successfully completed the setup process. Your
            personalized learning experience is ready to begin!
          </p>
        </div>
      </div>

      {/* Completion Stats */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-600">
              {stats.completionPercentage}%
            </div>
            <p className="text-sm text-green-700">
              Setup Complete ({stats.completedSteps}/{stats.totalSteps} steps)
            </p>
            <p className="text-xs text-green-600">
              {data.skippedSteps.length > 0
                ? `${data.skippedSteps.length} optional steps skipped`
                : "All steps completed"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Summary */}
      {data.preferences.learningGoals.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-foreground mb-3">
              Your Preferences
            </h3>
            <div className="space-y-2">
              {data.preferences.learningGoals.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Learning Goals:
                  </p>
                  <p className="text-sm text-foreground">
                    {data.preferences.learningGoals.join(", ")}
                  </p>
                </div>
              )}
              {data.preferences.interests.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Interests:
                  </p>
                  <p className="text-sm text-foreground">
                    {data.preferences.interests.join(", ")}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Experience Level:
                </p>
                <p className="text-sm text-foreground capitalize">
                  {data.preferences.experienceLevel}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Study Schedule:
                </p>
                <p className="text-sm text-foreground capitalize">
                  {data.preferences.studySchedule}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">What&apos;s Next?</h3>
        <div className="grid grid-cols-1 gap-3">
          {nextActions.map((action, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#e27447]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <action.icon className="w-5 h-5 text-[#e27447]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">
                      {action.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {action.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Final Action */}
      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Ready to start your learning journey? Let&apos;s explore your
          dashboard!
        </p>

        <Button
          onClick={onComplete}
          className="w-full bg-[#e27447] hover:bg-[#e27447]/90"
          size="lg"
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Help Text */}
      <p className="text-xs text-muted-foreground text-center">
        You can always revisit the onboarding process or update your preferences
        from your profile settings.
      </p>
    </div>
  );
}
