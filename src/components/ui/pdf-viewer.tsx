"use client"

import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

interface PDFViewerProps {
  url: string
  title?: string
  className?: string
  height?: string
}

export function PDFViewer({ url, title = "PDF Document", className = "", height = "600px" }: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scale, setScale] = useState(1.5)

  useEffect(() => {
    let pdfDoc: pdfjsLib.PDFDocumentProxy | null = null

    const loadPDF = async () => {
      try {
        setLoading(true)
        setError(null)

        const loadingTask = pdfjsLib.getDocument(url)
        pdfDoc = await loadingTask.promise
        setTotalPages(pdfDoc.numPages)
        
        await renderPage(pdfDoc, 1)
        setLoading(false)
      } catch (err) {
        console.error('Error loading PDF:', err)
        setError('Failed to load PDF document')
        setLoading(false)
      }
    }

    const renderPage = async (pdf: pdfjsLib.PDFDocumentProxy, pageNum: number) => {
      const page = await pdf.getPage(pageNum)
      const canvas = canvasRef.current
      if (!canvas) return

      const viewport = page.getViewport({ scale })
      const context = canvas.getContext('2d')

      canvas.height = viewport.height
      canvas.width = viewport.width

      const renderContext = {
        canvasContext: context!,
        viewport: viewport,
        canvas: canvas
      }

      await page.render(renderContext).promise
    }

    loadPDF()

    return () => {
      if (pdfDoc) {
        pdfDoc.destroy()
      }
    }
  }, [url, scale])

  const changePage = async (delta: number) => {
    const newPage = currentPage + delta
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      try {
        const pdf = await pdfjsLib.getDocument(url).promise
        await renderPage(pdf, newPage)
      } catch (err) {
        console.error('Error changing page:', err)
      }
    }
  }

  const changeScale = (newScale: number) => {
    setScale(Math.max(0.5, Math.min(3, newScale)))
  }

  const renderPage = async (pdf: pdfjsLib.PDFDocumentProxy, pageNum: number) => {
    const page = await pdf.getPage(pageNum)
    const canvas = canvasRef.current
    if (!canvas) return

    const viewport = page.getViewport({ scale })
    const context = canvas.getContext('2d')

    canvas.height = viewport.height
    canvas.width = viewport.width

    const renderContext = {
      canvasContext: context!,
      viewport: viewport,
      canvas: canvas
    }

    await page.render(renderContext).promise
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
          <p className="text-sm text-muted-foreground">Unable to load PDF document</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`border rounded-sm bg-white ${className}`} style={{ height }}>
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
      <div className="flex justify-center p-4 overflow-auto" style={{ height: `calc(${height} - 120px)` }}>
        <canvas
          ref={canvasRef}
          className="border rounded-sm shadow-sm"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
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
