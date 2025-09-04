"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function PDFTestPage() {
  useEffect(() => {
    // Sophisticated security that's harder to bypass
    const securityEnabled = true

    const preventDownload = (e: KeyboardEvent) => {
      if (!securityEnabled) return
      
      // Block all common download shortcuts
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
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      if (e.key === 'F12') {
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
      if (!securityEnabled) return
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    const preventDrag = (e: DragEvent) => {
      if (!securityEnabled) return
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    const preventSelection = (e: Event) => {
      if (!securityEnabled) return
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    const preventCopy = (e: ClipboardEvent) => {
      if (!securityEnabled) return
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    // Disable developer tools with fallback detection
    const disableDevTools = () => {
      // Override console methods
      const noop = () => {}
      console.log = noop
      console.warn = noop
      console.error = noop
      console.info = noop
      console.debug = noop
      console.trace = noop
      console.table = noop
      console.group = noop
      console.groupEnd = noop
      console.time = noop
      console.timeEnd = noop
      console.count = noop
      console.clear = noop
    }

    // Apply protections
    document.addEventListener('keydown', preventDownload, true)
    document.addEventListener('contextmenu', preventRightClick, true)
    document.addEventListener('dragstart', preventDrag, true)
    document.addEventListener('selectstart', preventSelection, true)
    document.addEventListener('copy', preventCopy, true)
    document.addEventListener('cut', preventCopy, true)
    document.addEventListener('paste', preventCopy, true)

    disableDevTools()

    // Cleanup
    return () => {
      document.removeEventListener('keydown', preventDownload, true)
      document.removeEventListener('contextmenu', preventRightClick, true)
      document.removeEventListener('dragstart', preventDrag, true)
      document.removeEventListener('selectstart', preventSelection, true)
      document.removeEventListener('copy', preventCopy, true)
      document.removeEventListener('cut', preventCopy, true)
      document.removeEventListener('paste', preventCopy, true)
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
          sandbox="allow-same-origin"
          onContextMenu={(e) => e.preventDefault()}
          onLoad={() => console.log('PDF iframe loaded successfully')}
          onError={(e) => console.error('PDF iframe error:', e)}
          style={{ 
            userSelect: 'none',
            pointerEvents: 'auto'
          }}
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

      <iframe src="https://shrividhyaclasses.b-cdn.net/html_for_pdf/IBDP_aahl_2021_tz0_nov_paper1_Solutions.html">
      </iframe>
    </div>
  )
}
