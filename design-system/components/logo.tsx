import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "color" | "horizontal" | "mascot" | "icon"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showBackground?: boolean
}

const logoVariants = {
  color: {
    sm: { width: 120, height: 40 },
    md: { width: 180, height: 60 },
    lg: { width: 240, height: 80 },
    xl: { width: 300, height: 100 },
  },
  horizontal: {
    sm: { width: 140, height: 40 },
    md: { width: 210, height: 60 },
    lg: { width: 280, height: 80 },
    xl: { width: 350, height: 100 },
  },
  mascot: {
    sm: { width: 120, height: 40 },
    md: { width: 180, height: 60 },
    lg: { width: 240, height: 80 },
    xl: { width: 300, height: 100 },
  },
  icon: {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 80, height: 80 },
  },
}

export function Logo({
  variant = "color",
  size = "md",
  className,
  showBackground = true,
}: LogoProps) {
  const dimensions = logoVariants[variant][size]
  
  const getImagePath = () => {
    const bgSuffix = showBackground ? "" : "_wo_bg"
    
    switch (variant) {
      case "horizontal":
        return `/images/preppeo logo package/logo_horizontal_color${bgSuffix}.png`
      case "mascot":
        return `/images/preppeo logo package/logo_mascot_color${bgSuffix}.png`
      case "icon":
        return `/images/preppeo logo package/icon_yellow${bgSuffix}.png`
      case "color":
      default:
        return `/images/preppeo logo package/logo_color${bgSuffix}.png`
    }
  }

  const getAltText = () => {
    switch (variant) {
      case "horizontal":
        return "Preppeo logo - Test preparation and admissions consulting services"
      case "mascot":
        return "Preppeo mascot logo - Educational platform for test preparation and admissions consulting"
      case "icon":
        return "Preppeo icon - Test prep and admissions consulting"
      case "color":
      default:
        return "Preppeo logo - Test preparation and admissions consulting services"
    }
  }

  return (
    <Image
      src={getImagePath()}
      alt={getAltText()}
      width={dimensions.width}
      height={dimensions.height}
      className={cn("object-contain", className)}
      priority
    />
  )
}

