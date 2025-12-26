"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface TypewriterProps {
  words: string[]
  className?: string
  prefix?: string
  suffix?: string
  typeSpeed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export function Typewriter({
  words,
  className,
  prefix = "",
  suffix = "",
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
}: TypewriterProps) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Pause after completing a word
    if (subIndex === words[index]?.length && !deleting) {
      timeoutRef.current = setTimeout(() => {
        setDeleting(true)
      }, pauseTime)
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }

    // Switch to next word after deleting
    if (subIndex === 0 && deleting) {
      timeoutRef.current = setTimeout(() => {
        setDeleting(false)
        setIndex((prev) => (prev + 1) % words.length)
      }, 0)
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }

    // Calculate dynamic speed for smoother effect
    const currentWord = words[index]
    if (!currentWord) return

    const progress = deleting 
      ? (currentWord.length - subIndex) / currentWord.length 
      : subIndex / currentWord.length
    
    // Variable speed: faster in middle, slower at edges for natural feel
    const speedMultiplier = 0.7 + (progress * 0.6)
    const currentSpeed = deleting 
      ? deleteSpeed * speedMultiplier 
      : typeSpeed * speedMultiplier

    timeoutRef.current = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1))
    }, currentSpeed)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [subIndex, deleting, index, words, typeSpeed, deleteSpeed, pauseTime])

  // Derive pause state instead of setting it
  const isPaused = subIndex === words[index]?.length && !deleting

  return (
    <span className={cn("inline-block", className)}>
      {prefix}
      <span className="text-primary transition-all duration-75 ease-in-out">
        {words[index]?.substring(0, subIndex) || ""}
        <span 
          className="inline-block w-0.5 h-[1em] align-middle ml-1 bg-primary"
          style={{
            animation: isPaused ? "none" : "blink 1s infinite",
          }}
        />
      </span>
      {suffix}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  )
}
