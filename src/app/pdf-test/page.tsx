"use client"

import { useEffect } from "react"

export default function PDFTestPage() {
  useEffect(() => {
    // Global security event listeners
    const preventDownload = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      if (e.key === 'F12' || e.key === 'F5') {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    const preventDrag = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    const preventSelection = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    // Disable developer tools and inspect
    const disableDevTools = () => {
      // Disable F12
      document.onkeydown = function(e) {
        if (e.keyCode === 123) {
          return false
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
          return false
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
          return false
        }
        if (e.ctrlKey && e.keyCode === 85) {
          return false
        }
      }

      // Disable right click
      document.oncontextmenu = function() {
        return false
      }

      // Disable drag
      document.ondragstart = function() {
        return false
      }

      // Disable selection
      document.onselectstart = function() {
        return false
      }
    }

    // Override console methods to hide sensitive info
    const originalLog = console.log
    const originalWarn = console.warn
    const originalError = console.error
    const originalInfo = console.info

    // Temporarily enable console for debugging
    console.log = originalLog
    console.warn = originalWarn
    console.error = originalError
    console.info = originalInfo

    // Disable view source
    document.onkeydown = function(e) {
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
        return false
      }
    }

    // Attach event listeners
    document.addEventListener('keydown', preventDownload, true)
    document.addEventListener('contextmenu', preventRightClick, true)
    document.addEventListener('dragstart', preventDrag, true)
    document.addEventListener('selectstart', preventSelection, true)

    // Apply dev tools protection
    disableDevTools()

    // Cleanup
    return () => {
      document.removeEventListener('keydown', preventDownload, true)
      document.removeEventListener('contextmenu', preventRightClick, true)
      document.removeEventListener('dragstart', preventDrag, true)
      document.removeEventListener('selectstart', preventSelection, true)
      
      // Restore console methods
      console.log = originalLog
      console.warn = originalWarn
      console.error = originalError
      console.info = originalInfo
    }
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">PDF Viewer Test</h1>
      <div className="relative">
        <iframe 
          src="/api/pdf-proxy#toolbar=0&navpanes=0&scrollbar=0&download=0&print=0&view=FitH"
          title="CBSE Math PDF"
          className="w-full h-[600px] border border-gray-300 rounded-sm"
          sandbox="allow-same-origin allow-scripts"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onLoad={() => console.log('PDF iframe loaded successfully')}
          onError={(e) => console.error('PDF iframe error:', e)}
          style={{ userSelect: 'none' }}
        />
        
        {/* Security Watermark Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{
            background: 'transparent',
            zIndex: 10
          }}
        >
          <div 
            className="text-gray-400 text-lg font-bold opacity-20 transform -rotate-45"
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'rgba(156, 163, 175, 0.2)',
              transform: 'rotate(-45deg)',
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          >
            SECURE VIEW ONLY
          </div>
        </div>
      </div>
    </div>
  )
}
