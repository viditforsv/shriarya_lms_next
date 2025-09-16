"use client";

import { OnboardingFlow } from "@/components/OnboardingFlow";
import { OnboardingProvider } from "@/contexts/OnboardingContext";

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingFlow />
    </OnboardingProvider>
  );
}
