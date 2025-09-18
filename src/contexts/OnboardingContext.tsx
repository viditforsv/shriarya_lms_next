"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<Record<string, unknown>>;
  isRequired: boolean;
  isCompleted: boolean;
}

export interface OnboardingPreferences {
  learningGoals: string[];
  interests: string[];
  experienceLevel: "beginner" | "intermediate" | "advanced";
  preferredSubjects: string[];
  studySchedule: "flexible" | "structured" | "intensive";
  educationalBackground?: "school" | "professional";
  selectedBoard?: string;
  selectedExam?: string;
  selectedCourses?: string[];
}

export interface OnboardingData {
  currentStep: number;
  isCompleted: boolean;
  preferences: OnboardingPreferences;
  skippedSteps: string[];
  completedAt?: string;
}

interface OnboardingContextType {
  data: OnboardingData;
  isLoading: boolean;
  updateStep: (step: number) => void;
  completeStep: (stepId: string) => void;
  skipStep: (stepId: string) => void;
  updatePreferences: (preferences: Partial<OnboardingPreferences>) => void;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  hasCompletedOnboarding: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

const defaultPreferences: OnboardingPreferences = {
  learningGoals: [],
  interests: [],
  experienceLevel: "beginner",
  preferredSubjects: [],
  studySchedule: "flexible",
  educationalBackground: undefined,
  selectedBoard: undefined,
  selectedExam: undefined,
  selectedCourses: [],
};

const defaultData: OnboardingData = {
  currentStep: 0,
  isCompleted: false,
  preferences: defaultPreferences,
  skippedSteps: [],
};

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Load onboarding data from Supabase
  useEffect(() => {
    const loadOnboardingData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // Fetch onboarding data from API
        const response = await fetch("/api/onboarding");
        const result = await response.json();

        if (response.ok && result.data) {
          const onboardingData = {
            currentStep: result.data.current_step || 0,
            isCompleted: result.data.is_completed || false,
            preferences: {
              ...defaultPreferences,
              ...result.data.preferences,
              educationalBackground:
                result.data.educational_background?.background,
              selectedBoard: result.data.educational_background?.board,
              selectedExam: result.data.educational_background?.exam,
              selectedCourses: result.data.selected_courses || [],
            },
            skippedSteps: result.data.skipped_steps || [],
            completedAt: result.data.completed_at,
          };

          setData(onboardingData);
          setHasCompletedOnboarding(result.data.is_completed || false);
        } else {
          // Initialize with default data for new users
          setData(defaultData);
          setHasCompletedOnboarding(false);
        }
      } catch (error) {
        console.error("Error loading onboarding data:", error);
        // Fallback to default data
        setData(defaultData);
        setHasCompletedOnboarding(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadOnboardingData();
  }, [user]);

  const updateStep = useCallback(
    async (step: number) => {
      setData((prev) => ({ ...prev, currentStep: step }));

      try {
        await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentStep: step,
            preferences: data.preferences,
            skippedSteps: data.skippedSteps,
            isCompleted: data.isCompleted,
          }),
        });
      } catch (error) {
        console.error("Error updating step:", error);
      }
    },
    [data.preferences, data.skippedSteps, data.isCompleted]
  );

  const completeStep = useCallback(
    async (stepId: string) => {
      const newSkippedSteps = data.skippedSteps.filter((id) => id !== stepId);
      setData((prev) => ({ ...prev, skippedSteps: newSkippedSteps }));

      try {
        await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentStep: data.currentStep,
            preferences: data.preferences,
            skippedSteps: newSkippedSteps,
            isCompleted: data.isCompleted,
          }),
        });
      } catch (error) {
        console.error("Error completing step:", error);
      }
    },
    [data.currentStep, data.preferences, data.skippedSteps, data.isCompleted]
  );

  const skipStep = useCallback(
    async (stepId: string) => {
      const newSkippedSteps = [...data.skippedSteps, stepId];
      setData((prev) => ({ ...prev, skippedSteps: newSkippedSteps }));

      try {
        await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentStep: data.currentStep,
            preferences: data.preferences,
            skippedSteps: newSkippedSteps,
            isCompleted: data.isCompleted,
          }),
        });
      } catch (error) {
        console.error("Error skipping step:", error);
      }
    },
    [data.currentStep, data.preferences, data.skippedSteps, data.isCompleted]
  );

  const updatePreferences = useCallback(
    async (preferences: Partial<OnboardingPreferences>) => {
      const newPreferences = { ...data.preferences, ...preferences };
      setData((prev) => ({
        ...prev,
        preferences: newPreferences,
      }));

      try {
        // Save educational background and course selections separately
        const educationalBackground = preferences.educationalBackground
          ? {
              background: preferences.educationalBackground,
              board: preferences.selectedBoard,
              exam: preferences.selectedExam,
            }
          : data.preferences.educationalBackground
          ? {
              background: data.preferences.educationalBackground,
              board: data.preferences.selectedBoard,
              exam: data.preferences.selectedExam,
            }
          : null;

        await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentStep: data.currentStep,
            preferences: newPreferences,
            educationalBackground,
            selectedCourses:
              preferences.selectedCourses ||
              data.preferences.selectedCourses ||
              [],
            skippedSteps: data.skippedSteps,
            isCompleted: data.isCompleted,
          }),
        });
      } catch (error) {
        console.error("Error updating preferences:", error);
      }
    },
    [data.currentStep, data.preferences, data.skippedSteps, data.isCompleted]
  );

  const completeOnboarding = useCallback(async () => {
    if (!user) return;

    try {
      const onboardingData = {
        ...data,
        isCompleted: true,
        completedAt: new Date().toISOString(),
      };

      // Update local state
      setData(onboardingData);
      setHasCompletedOnboarding(true);

      // Save to Supabase
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentStep: data.currentStep,
          preferences: data.preferences,
          educationalBackground: data.preferences.educationalBackground
            ? {
                background: data.preferences.educationalBackground,
                board: data.preferences.selectedBoard,
                exam: data.preferences.selectedExam,
              }
            : null,
          selectedCourses: data.preferences.selectedCourses || [],
          skippedSteps: data.skippedSteps,
          isCompleted: true,
        }),
      });

      console.log("Onboarding completed successfully");
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  }, [user, data]);

  const resetOnboarding = useCallback(async () => {
    if (!user) return;

    try {
      // Reset local state
      setData(defaultData);
      setHasCompletedOnboarding(false);

      // Delete from Supabase
      await fetch("/api/onboarding", {
        method: "DELETE",
      });

      console.log("Onboarding reset successfully");
    } catch (error) {
      console.error("Error resetting onboarding:", error);
    }
  }, [user]);

  const value: OnboardingContextType = {
    data,
    isLoading,
    updateStep,
    completeStep,
    skipStep,
    updatePreferences,
    completeOnboarding,
    resetOnboarding,
    hasCompletedOnboarding,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
