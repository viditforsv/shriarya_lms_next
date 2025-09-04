"use client"

import { useEffect } from "react"

export default function PDFTestPage() {
  useEffect(() => {
    // Simplified security event listeners
    const preventDownload = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault()
        return false
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault()
        return false
      }
    }

    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Attach event listeners
    document.addEventListener('keydown', preventDownload, true)
    document.addEventListener('contextmenu', preventRightClick, true)

    // Cleanup
    return () => {
      document.removeEventListener('keydown', preventDownload, true)
      document.removeEventListener('contextmenu', preventRightClick, true)
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
          onContextMenu={(e) => e.preventDefault()}
          onLoad={() => console.log('PDF iframe loaded successfully')}
          onError={(e) => console.error('PDF iframe error:', e)}
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
