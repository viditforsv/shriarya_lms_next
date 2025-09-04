declare global {
  interface Window {
    AdobeDC: {
      View: new (config: { clientId: string; divId?: string }) => {
        previewFile: (
          fileConfig: {
            content: { location: { url: string } }
            metaData?: { fileName?: string }
          },
          options: {
            embedMode?: string
            showAnnotationTools?: boolean
            showDownloadPDF?: boolean
            showPrintPDF?: boolean
            showLeftHandPanel?: boolean
          }
        ) => void
      }
    }
  }
}

export {}
