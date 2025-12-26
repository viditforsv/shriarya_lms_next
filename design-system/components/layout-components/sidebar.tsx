'use client'

import { ReactNode, useState, useEffect } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  collapsible?: boolean
  defaultCollapsed?: boolean
}

export function Sidebar({
  title,
  subtitle,
  items,
  activeItem,
  onItemClick,
  className,
  showNumbers = false,
  collapsible = false,
  defaultCollapsed = false
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  
  // Keyboard shortcut support
  useEffect(() => {
    if (!collapsible) return
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + \ to toggle sidebar
      if ((event.metaKey || event.ctrlKey) && event.key === '\\') {
        event.preventDefault()
        setIsCollapsed(!isCollapsed)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [collapsible, isCollapsed])
  
  const handleItemClick = (item: SidebarItem) => {
    if (onItemClick) {
      onItemClick(item)
    }
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  if (isCollapsed) {
    return (
      <div className={cn("w-16 bg-white border-r border-[#4a6f73] min-h-screen transition-all duration-300", className)}>
        <div className="p-4">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <Badge variant="secondary" className="text-xs">SA</Badge>
            </div>
            {collapsible && (
              <div className="flex justify-center mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleCollapse}
                  className="rounded-sm p-2"
                  title="Expand sidebar (⌘\)"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          
          <nav className="space-y-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={cn(
                  "w-full flex items-center justify-center p-3 rounded-sm transition-all duration-200",
                  activeItem === item.id
                    ? "bg-[#81c3c9]/20 text-[#1b4a56] border border-[#4a6f73]"
                    : "text-[#4a6f73] hover:bg-[#81c3c9]/10 hover:text-[#1b4a56]"
                )}
                title={item.label}
              >
                <span className="flex-shrink-0">{item.icon}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-64 bg-white border-r border-[#4a6f73] min-h-screen transition-all duration-300", className)}>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">ShriArya LMS</Badge>
            {collapsible && (
              <Button
                variant="outline"
                size="sm"
                onClick={toggleCollapse}
                className="rounded-sm p-2"
                title="Close sidebar (⌘\)"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
          </div>
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
