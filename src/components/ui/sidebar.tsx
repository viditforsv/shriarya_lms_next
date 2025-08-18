'use client'

import { ReactNode } from 'react'
import { Badge } from './badge'
import { cn } from '@/lib/utils'

export interface SidebarItem {
  id: string
  label: string
  icon: ReactNode
  href?: string
  onClick?: () => void
  badge?: string
  isActive?: boolean
  children?: SidebarItem[]
}

export interface SidebarProps {
  title: string
  subtitle?: string
  items: SidebarItem[]
  activeItem?: string
  onItemClick?: (item: SidebarItem) => void
  className?: string
  showNumbers?: boolean
}

export function Sidebar({
  title,
  subtitle,
  items,
  activeItem,
  onItemClick,
  className,
  showNumbers = false
}: SidebarProps) {
  const handleItemClick = (item: SidebarItem) => {
    if (onItemClick) {
      onItemClick(item)
    }
  }

  return (
    <div className={cn("w-64 bg-white border-r border-[#4a6f73] min-h-screen", className)}>
      <div className="p-6">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-2">ShriArya LMS</Badge>
          <h1 className="text-xl font-bold text-[#1b4a56] font-cardo">{title}</h1>
          {subtitle && (
            <p className="text-sm text-[#4a6f73] mt-2 font-dm-sans">
              {subtitle}
            </p>
          )}
        </div>
        
        <nav className="space-y-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-sm text-left transition-all duration-200 font-dm-sans",
                activeItem === item.id
                  ? "bg-[#81c3c9]/20 text-[#1b4a56] border border-[#4a6f73]"
                  : "text-[#4a6f73] hover:bg-[#81c3c9]/10 hover:text-[#1b4a56]"
              )}
            >
              {showNumbers && (
                <span className="flex-shrink-0 text-sm font-bold text-[#e27447] w-6 text-center">
                  {index + 1}
                </span>
              )}
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="font-medium flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="outline" className="ml-auto text-xs">
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
