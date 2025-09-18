"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Progress } from "@/app/components-demo/ui/ui-components/progress";
import { ArrowLeft, ArrowRight, X, CheckCircle } from "lucide-react";
import Image from "next/image";

// Import step components
import { WelcomeStep } from "./onboarding/steps/WelcomeStep";
import { ProfileCompletionStep } from "./onboarding/steps/ProfileCompletionStep";
import { CourseDiscoveryStep } from "./onboarding/steps/CourseDiscoveryStep";
import { PreferencesStep } from "./onboarding/steps/PreferencesStep";
// import { CompletionStep } from "./onboarding/steps/CompletionStep";

export interface OnboardingStepProps {
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

const steps = [
  {
    id: "welcome",
    title: "Welcome to ShriArya LMS",
    description: "Let's get you started on your learning journey",
    component: WelcomeStep,
    isRequired: false,
  },
  {
    id: "profile",
    title: "Complete Your Profile",
    description: "Help us personalize your experience",
    component: ProfileCompletionStep,
    isRequired: true,
  },
  {
    id: "discovery",
    title: "Discover Courses",
    description: "Find courses that match your interests",
    component: CourseDiscoveryStep,
    isRequired: false,
  },
  {
    id: "preferences",
    title: "Set Your Preferences",
    description: "Customize your learning experience",
    component: PreferencesStep,
    isRequired: false,
  },
  {
    id: "completion",
    title: "You're All Set!",
    description: "Ready to start learning",
    component: function CompletionStep({ onComplete }: OnboardingStepProps) {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                🎉 Welcome to ShriArya LMS!
              </h2>
              <p className="text-muted-foreground">
                You&apos;ve successfully completed the setup process. Your
                personalized learning experience is ready to begin!
              </p>
            </div>
          </div>

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
        </div>
      );
    },
    isRequired: false,
  },
];

export function OnboardingFlow() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const {
    data,
    isLoading,
    updateStep,
    completeStep,
    skipStep,
    completeOnboarding,
  } = useOnboarding();

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      const stepIndex = steps.findIndex((step) => step.id === hash);
      if (stepIndex !== -1 && stepIndex !== data.currentStep) {
        updateStep(stepIndex);
      }
    };

    // Set initial hash from current step
    const currentStepId = steps[data.currentStep]?.id;
    if (currentStepId && window.location.hash !== `#${currentStepId}`) {
      window.history.replaceState(null, "", `#${currentStepId}`);
    }

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [data.currentStep, updateStep]);

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth");
    }
  }, [user, isLoading, router]);

  // Redirect if onboarding is already completed
  useEffect(() => {
    if (!isLoading && user && data.isCompleted) {
      router.push("/dashboard");
    }
  }, [user, data.isCompleted, isLoading, router]);

  const handleNext = async () => {
    if (data.currentStep < steps.length - 1) {
      setIsTransitioning(true);
      await new Promise((resolve) => setTimeout(resolve, 300)); // Smooth transition
      const nextStep = data.currentStep + 1;
      updateStep(nextStep);
      // Update URL hash
      window.history.pushState(null, "", `#${steps[nextStep].id}`);
      setIsTransitioning(false);
    }
  };

  const handlePrevious = async () => {
    if (data.currentStep > 0) {
      setIsTransitioning(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const prevStep = data.currentStep - 1;
      updateStep(prevStep);
      // Update URL hash
      window.history.pushState(null, "", `#${steps[prevStep].id}`);
      setIsTransitioning(false);
    }
  };

  const handleSkip = async () => {
    const currentStep = steps[data.currentStep];
    skipStep(currentStep.id);
    await handleNext();
  };

  const handleComplete = async () => {
    await completeOnboarding();
    router.push("/dashboard");
  };

  const handleExit = () => {
    router.push("/dashboard");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#e27447] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading onboarding...</p>
        </div>
      </div>
    );
  }

  if (!user || data.isCompleted) {
    return null;
  }

  const currentStep = steps[data.currentStep];
  const StepComponent = currentStep.component;
  const progress = ((data.currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/main_logo.webp"
                  alt="ShriArya LMS Logo"
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold">ShriArya LMS</h1>
                <p className="text-sm text-muted-foreground">Getting Started</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("shriarya-onboarding");
                  window.location.reload();
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExit}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>
                Step {data.currentStep + 1} of {steps.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card
            className={`transition-all duration-300 ${
              isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{currentStep.title}</CardTitle>
              <CardDescription className="text-base">
                {currentStep.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <StepComponent
                onNext={handleNext}
                onPrevious={handlePrevious}
                onSkip={handleSkip}
                onComplete={handleComplete}
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={data.currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {/* Step Indicators */}
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= data.currentStep ? "bg-[#e27447]" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {!currentStep.isRequired && (
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Skip
                </Button>
              )}

              {data.currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleComplete}
                  className="bg-[#e27447] hover:bg-[#e27447]/90"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Setup
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-[#e27447] hover:bg-[#e27447]/90"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
