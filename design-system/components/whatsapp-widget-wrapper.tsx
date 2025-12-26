"use client"

import dynamic from "next/dynamic"

const WhatsAppWidget = dynamic(() => import("@/design-system/components/whatsapp-widget").then(mod => ({ default: mod.WhatsAppWidget })), {
  ssr: false,
  loading: () => null,
})

export function WhatsAppWidgetWrapper() {
  return <WhatsAppWidget />
}

