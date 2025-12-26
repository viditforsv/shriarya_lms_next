"use client"

import dynamic from "next/dynamic"
import { GoogleAnalyticsComponent } from "@/design-system/components/google-analytics"

// Defer non-critical components to reduce initial bundle size and improve TTI
const Toaster = dynamic(() => import("@/design-system/components/ui/sonner").then(mod => ({ default: mod.Toaster })), {
  ssr: false,
})

const WebVitals = dynamic(() => import("@/design-system/components/web-vitals").then(mod => ({ default: mod.WebVitals })), {
  ssr: false,
})

export function DeferredComponents() {
  return (
    <>
      <Toaster />
      <WebVitals />
      <GoogleAnalyticsComponent />
    </>
  )
}

