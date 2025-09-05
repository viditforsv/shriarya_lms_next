import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from "lucide-react"

interface SocialIconProps {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'github'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled' | 'minimal'
  className?: string
  onClick?: () => void
}

const iconMap = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  github: Github
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12'
}

const iconSizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
}

export function SocialIcon({ 
  platform, 
  size = 'md', 
  variant = 'outline', 
  className = '',
  onClick 
}: SocialIconProps) {
  const IconComponent = iconMap[platform]
  const containerSize = sizeMap[size]
  const iconSize = iconSizeMap[size]

  const baseClasses = `${containerSize} rounded-full flex items-center justify-center transition-colors cursor-pointer`
  
  const variantClasses = {
    outline: 'border border-[#feefea] hover:bg-[#feefea] text-[#1e293b]',
    filled: 'bg-[#1e293b] text-white hover:bg-[#1e293b]/90',
    minimal: 'text-[#1e293b] hover:text-[#e27447]'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      aria-label={`${platform} social media link`}
    >
      <IconComponent className={iconSize} strokeWidth={1.5} />
    </button>
  )
}

// Convenience components for common use cases
export function SocialIconsRow({ 
  platforms = ['facebook', 'twitter', 'instagram', 'linkedin'], 
  size = 'md',
  variant = 'outline',
  className = ''
}: {
  platforms?: Array<'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'github'>
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled' | 'minimal'
  className?: string
}) {
  return (
    <div className={`flex space-x-3 ${className}`}>
      {platforms.map((platform) => (
        <SocialIcon
          key={platform}
          platform={platform}
          size={size}
          variant={variant}
        />
      ))}
    </div>
  )
}
