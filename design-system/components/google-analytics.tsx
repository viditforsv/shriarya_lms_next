"use client"

import { useEffect } from "react"

// Type definition for gtag
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (
      command: string,
      targetId: string | Date | Record<string, string>,
      config?: Record<string, string | boolean>
    ) => void
  }
}

/**
 * Google Analytics component that manages consent mode
 * Script is loaded in head, but tracking is disabled until consent is given
 */
export function GoogleAnalyticsComponent() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag === "undefined") {
      return
    }

    // Check if user has accepted cookies
    const checkConsent = () => {
      const consent = localStorage.getItem("cookieConsent") === "accepted"
      
      if (consent) {
        // Update consent mode to allow analytics
        window.gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "granted",
        })
      } else {
        // Ensure consent is denied
        window.gtag("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied",
        })
      }
    }

    // Check on mount
    checkConsent()

    // Listen for consent changes (when user accepts cookies)
    const handleStorageChange = () => {
      checkConsent()
    }

    // Listen for storage events (from other tabs/windows)
    window.addEventListener("storage", handleStorageChange)

    // Also check periodically in case consent was set in same window
    const interval = setInterval(checkConsent, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // Component doesn't render anything - it just manages consent mode
  return null
}

