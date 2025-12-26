"use client"

import { useEffect } from "react"
import { logWebVitals, reportWebVitals } from "@/lib/performance"

/**
 * Web Vitals monitoring component
 * Tracks Core Web Vitals metrics for performance monitoring
 * 
 * To enable: npm install web-vitals
 */
export function WebVitals() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return

    // Dynamically import web-vitals to avoid blocking if not installed
    import("web-vitals")
      .then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
        // Track Core Web Vitals
        onCLS((metric) => {
          logWebVitals(metric)
          reportWebVitals(metric)
        })

        onFCP((metric) => {
          logWebVitals(metric)
          reportWebVitals(metric)
        })

        onINP((metric) => {
          logWebVitals(metric)
          reportWebVitals(metric)
        })

        onLCP((metric) => {
          logWebVitals(metric)
          reportWebVitals(metric)
        })

        onTTFB((metric) => {
          logWebVitals(metric)
          reportWebVitals(metric)
        })
      })
      .catch(() => {
        // web-vitals not installed, skip monitoring
        if (process.env.NODE_ENV === "development") {
          console.log("[Web Vitals] Install 'web-vitals' package to enable monitoring")
        }
      })
  }, [])

  return null
}

