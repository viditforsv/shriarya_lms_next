import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // The actual PDF URL is hidden in the server-side code
    const pdfUrl = 'https://shrividhyaclasses.b-cdn.net/past_year_paper/CBSE/CBSE10/Maths/Maths/2022/compartment/Maths_Basic/430-6-1mathsbasic.pdf'
    
    const response = await fetch(pdfUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://courses.shrividhya.in',
        'Origin': 'https://courses.shrividhya.in',
        'Host': 'shrividhyaclasses.b-cdn.net'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status}`)
    }

    const pdfBuffer = await response.arrayBuffer()
    
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="document.pdf"',
        'Cache-Control': 'no-cache, no-store, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0',
        // Security headers
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
        'Content-Security-Policy': "frame-ancestors 'self'",
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      }
    })
  } catch (error) {
    console.error('PDF proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to load PDF' },
      { status: 500 }
    )
  }
}
