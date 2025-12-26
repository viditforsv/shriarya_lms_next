"use client";

import { Button } from "@/design-system/components/ui/button";
import { Card, CardContent } from "@/design-system/components/ui/card";
import { BookOpen, Users, Award, Clock, ArrowRight } from "lucide-react";
import { OnboardingStepProps } from "../../OnboardingFlow";

export function WelcomeStep({ onNext }: OnboardingStepProps) {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Courses",
      description: "Engage with multimedia content and hands-on exercises",
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Collaborate with peers and learn together",
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn certificates upon course completion",
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Learn at your own pace, anytime, anywhere",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-[#e27447]/10 rounded-full flex items-center justify-center mx-auto">
          <BookOpen className="w-8 h-8 text-[#e27447]" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Welcome to Preppeo LMS!
          </h2>
          <p className="text-muted-foreground">
            We&apos;re excited to have you join our learning community.
            Let&apos;s take a quick tour to help you get the most out of your
            learning experience.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="p-4">
            <CardContent className="p-0">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#e27447]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-[#e27447]" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          This setup will only take a few minutes and will help us personalize
          your experience.
        </p>

        <Button
          onClick={onNext}
          className="w-full bg-[#e27447] hover:bg-[#e27447]/90"
          size="lg"
        >
          Let&apos;s Get Started
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
