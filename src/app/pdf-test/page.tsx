"use client"

import { PDFViewer } from "@/components/ui/pdf-viewer"

export default function PDFTestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">PDF Viewer Test</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Local PDF Test (Secure)</h2>
          <PDFViewer 
            url="/sample.pdf"
            title="Local PDF with Security"
            height="500px"
          />
        </div>
        <iframe src="https://shrividhyaclasses.b-cdn.net/past_year_paper/CBSE/CBSE10/Maths/Maths/2022/compartment/Maths_Basic/430-6-1mathsbasic.pdf" title="W3Schools Free Online Web Tutorials"></iframe>
      </div>
    </div>
  )
}
