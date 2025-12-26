"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface MascotVideoProps {
  variant?: "celebration" | "explaining" | "thinking"
  className?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  priority?: boolean
}

const videoPaths = {
  celebration: "/mascot/Celebration.webm",
  explaining: "/mascot/Explaining.webm",
  thinking: "/mascot/thinking.webm",
}

const videoAltText = {
  celebration: "Preppeo mascot celebrating student success in test preparation",
  explaining: "Preppeo mascot explaining educational concepts and test prep strategies",
  thinking: "Preppeo mascot thinking about learning and academic success",
}

export function MascotVideo({
  variant = "thinking",
  className,
  autoplay = true,
  loop = true,
  muted = true,
  priority = false,
}: MascotVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && autoplay) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, user interaction required
      })
    }
  }, [autoplay])

  return (
    <video
      ref={videoRef}
      src={videoPaths[variant]}
      className={cn("object-contain", className)}
      autoPlay={autoplay}
      loop={loop}
      muted={muted}
      playsInline
      preload={priority ? "auto" : "metadata"}
      aria-label={videoAltText[variant]}
      // Optimize for LCP - prevent layout shift
      width={priority ? 400 : undefined}
      height={priority ? 400 : undefined}
    />
  )
}

