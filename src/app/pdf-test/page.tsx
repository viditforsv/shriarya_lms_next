"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    AdobeDC: any
  }
}

export default function PDFTestPage() {
  useEffect(() => {
    // 1. Load Adobe SDK only once
    const scriptId = "adobe-dc-sdk"
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.id = scriptId
      script.src = "https://acrobatservices.adobe.com/view-sdk/viewer.js"
      script.async = true
      script.onload = () => {
        initAdobeViewer()
      }
      document.body.appendChild(script)
    } else {
      initAdobeViewer()
    }

    // 2. Function to init viewer
    function initAdobeViewer() {
      if (window.AdobeDC) {
        const adobeDCView = new window.AdobeDC.View({
          clientId: "5cbce8a79d014658854c05273a5b7514", // replace with your key
          divId: "adobe-dc-view",
        })

        adobeDCView.previewFile(
          {
            content: {
              location: {
                url: "https://shrividhyaclasses.b-cdn.net/ibdp_previous_year_questions/AAHL/2021/November/sv_ibdp_maths_pyqs_marking_scheme_aahl_november2021_paper1_tz0.pdf",
              },
            },
            metaData: {
              fileName:
                "IBDP_aahl_2021_tz0_nov_paper1_Solutions by Shrividhya Classes",
            },
          },
          {
            showAnnotationTools: false,
            showDownloadPDF: false,
            showPrintPDF: false,
          }
        )
      }
    }
  }, [])

  return (
    <div className="w-full h-screen">
      {/* Container for Adobe Embed */}
      <div id="adobe-dc-view" className="w-full h-full" />
    </div>
  )
}
