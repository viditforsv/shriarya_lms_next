"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

// Set up PDF.js worker - use a more reliable CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`

interface PDFViewerProps {
  url: string
  title?: string
  className?: string
  height?: string
  useIframeFallback?: boolean
  useAdobeEmbed?: boolean
  clientId?: string
}

export function PDFViewer({ url, title = "PDF Document", className = "", height = "600px", useIframeFallback = false, useAdobeEmbed = false, clientId = "eb33596eed8b4ad0b50e4a287ce12fbc" }: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scale, setScale] = useState(1.5)
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null)
  const [useIframe, setUseIframe] = useState(useIframeFallback)
  const [adobeViewerReady, setAdobeViewerReady] = useState(false)
  const adobeContainerRef = useRef<HTMLDivElement>(null)

  // Security: Prevent common download methods
  useEffect(() => {
    const preventDownload = (e: KeyboardEvent) => {
      // Prevent Ctrl+S, Ctrl+P, F12, Ctrl+Shift+I, Ctrl+U
      if (
        (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I')
      ) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    const preventDrag = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    const preventSelection = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Add event listeners
    document.addEventListener('keydown', preventDownload, true)
    document.addEventListener('contextmenu', preventRightClick, true)
    document.addEventListener('dragstart', preventDrag, true)
    document.addEventListener('selectstart', preventSelection, true)

    // Cleanup
    return () => {
      document.removeEventListener('keydown', preventDownload, true)
      document.removeEventListener('contextmenu', preventRightClick, true)
      document.removeEventListener('dragstart', preventDrag, true)
      document.removeEventListener('selectstart', preventSelection, true)
    }
  }, [])

  // Adobe PDF Embed API initialization
  useEffect(() => {
    if (!useAdobeEmbed) return

    // Load Adobe PDF Embed API script
    const script = document.createElement('script')
    script.src = 'https://acrobatservices.adobe.com/view-sdk/viewer.js'
    script.async = true
    document.head.appendChild(script)

    // Listen for Adobe DC View SDK ready event
    const handleAdobeReady = () => {
      setAdobeViewerReady(true)
    }

    document.addEventListener('adobe_dc_view_sdk.ready', handleAdobeReady)

    return () => {
      document.removeEventListener('adobe_dc_view_sdk.ready', handleAdobeReady)
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [useAdobeEmbed])

  // Initialize Adobe PDF viewer
  useEffect(() => {
    if (!useAdobeEmbed || !adobeViewerReady || !adobeContainerRef.current) return

    try {
      const adobeDCView = new window.AdobeDC.View({ 
        clientId,
        divId: adobeContainerRef.current?.id || 'adobe-pdf-viewer'
      })
      
      adobeDCView.previewFile({
        content: { location: { url } },
        metaData: { fileName: title }
      }, {
        embedMode: 'IN_LINE',
        showDownloadPDF: false,
        showPrintPDF: false,
        showLeftHandPanel: false,
        showAnnotationTools: false
      })
    } catch (error) {
      console.error('Error initializing Adobe PDF viewer:', error)
      setError('Failed to load Adobe PDF viewer')
    }
  }, [useAdobeEmbed, adobeViewerReady, url, title, clientId])

  const renderPage = useCallback(async (pdf: pdfjsLib.PDFDocumentProxy, pageNum: number) => {
    try {
      console.log('Rendering page:', pageNum)
      const page = await pdf.getPage(pageNum)
      const canvas = canvasRef.current
      if (!canvas) {
        throw new Error('Canvas element not found')
      }

      const viewport = page.getViewport({ scale })
      const context = canvas.getContext('2d')

      if (!context) {
        throw new Error('Could not get canvas context')
      }

      canvas.height = viewport.height
      canvas.width = viewport.width

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        canvas: canvas
      }

      console.log('Starting page render...')
      await page.render(renderContext).promise
      console.log('Page rendered successfully')
    } catch (err) {
      console.error('Error rendering page:', err)
      setError('Failed to render PDF page')
    }
  }, [scale])

  useEffect(() => {
    let isMounted = true

    const loadPDF = async () => {
      try {
        setLoading(true)
        setError(null)
        console.log('Loading PDF from:', url)

        // For local PDFs, we don't need to check CORS
        const isLocalUrl = url.startsWith('/') || url.startsWith('./')
        
        if (!isLocalUrl) {
          // For external URLs, try to fetch first to check accessibility
          try {
            const response = await fetch(url, { 
              method: 'HEAD',
              mode: 'cors'
            })
            
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }
          } catch (fetchError) {
            console.warn('CORS check failed, trying direct PDF loading:', fetchError)
          }
        }

        console.log('Creating PDF loading task...')
        const loadingTask = pdfjsLib.getDocument(url)
        const doc = await loadingTask.promise
        
        if (!isMounted) return
        
        console.log('PDF loaded successfully, pages:', doc.numPages)
        setPdfDoc(doc)
        setTotalPages(doc.numPages)
        
        await renderPage(doc, 1)
        setLoading(false)
      } catch (err) {
        console.error('Error loading PDF:', err)
        if (isMounted) {
          // For external URLs, try iframe fallback
          const isExternalUrl = !url.startsWith('/') && !url.startsWith('./')
          if (isExternalUrl && !useIframe) {
            console.log('Trying iframe fallback for external PDF')
            setUseIframe(true)
            setLoading(false)
            return
          }
          setError(err instanceof Error ? err.message : 'Failed to load PDF document')
          setLoading(false)
        }
      }
    }

    loadPDF()

    return () => {
      isMounted = false
      if (pdfDoc) {
        pdfDoc.destroy()
      }
    }
  }, [url, renderPage, pdfDoc, useIframe])

  const changePage = async (delta: number) => {
    if (!pdfDoc) return
    
    const newPage = currentPage + delta
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      try {
        await renderPage(pdfDoc, newPage)
      } catch (err) {
        console.error('Error changing page:', err)
      }
    }
  }

  const changeScale = async (newScale: number) => {
    const clampedScale = Math.max(0.5, Math.min(3, newScale))
    setScale(clampedScale)
    
    if (pdfDoc) {
      try {
        await renderPage(pdfDoc, currentPage)
      } catch (err) {
        console.error('Error changing scale:', err)
      }
    }
  }

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading PDF...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-sm text-muted-foreground mb-4">Unable to load PDF document</p>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </a>
        </div>
      </div>
    )
  }

  // Adobe PDF Embed API viewer
  if (useAdobeEmbed) {
    return (
      <div className={`border rounded-sm bg-white ${className}`} style={{ height }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Adobe PDF Viewer</span>
          </div>
        </div>

        {/* Adobe PDF Container */}
        <div className="flex justify-center p-4 overflow-auto" style={{ height: `calc(${height} - 60px)` }}>
          <div
            ref={adobeContainerRef}
            id="adobe-pdf-viewer"
            className="border rounded-sm shadow-sm w-full"
            style={{ height: '100%', minHeight: '500px' }}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            PDF viewing powered by Adobe PDF Embed API
          </p>
        </div>
      </div>
    )
  }

  // Iframe fallback for external PDFs
  if (useIframe) {
    return (
      <div className={`border rounded-sm bg-white ${className}`} style={{ height }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>External PDF Viewer</span>
          </div>
        </div>

        {/* PDF iframe */}
        <div className="flex justify-center p-4 overflow-auto" style={{ height: `calc(${height} - 60px)` }}>
          <iframe
            src={`${url}#toolbar=0&navpanes=0&scrollbar=0&download=0&print=0`}
            className="border rounded-sm shadow-sm w-full"
            style={{ height: '100%', minHeight: '500px' }}
            title={title}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            sandbox="allow-same-origin allow-scripts"
          />
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            PDF viewing via iframe • External document
          </p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`border rounded-sm bg-white ${className}`} 
      style={{ height }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-3 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => changePage(-1)}
            disabled={currentPage <= 1}
            className="px-3 py-1 text-sm border rounded-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => changePage(1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-1 text-sm border rounded-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => changeScale(scale - 0.2)}
            className="px-2 py-1 text-sm border rounded-sm hover:bg-gray-100"
          >
            -
          </button>
          <span className="text-sm text-gray-600">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => changeScale(scale + 0.2)}
            className="px-2 py-1 text-sm border rounded-sm hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* PDF Canvas */}
      <div className="flex justify-center p-4 overflow-auto relative" style={{ height: `calc(${height} - 120px)` }}>
        <canvas
          ref={canvasRef}
          className="border rounded-sm shadow-sm"
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
        {/* Security Watermark */}
        <div 
          className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5"
          style={{ 
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'rgba(0,0,0,0.3)',
            transform: 'rotate(-45deg)',
            userSelect: 'none'
          }}
        >
          SECURE VIEW ONLY
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t bg-gray-50 text-center">
        <p className="text-xs text-gray-500">
          PDF viewing powered by PDF.js • Download disabled for security
        </p>
      </div>
    </div>
  )
}
