"use client"

import { useEffect } from "react"
import Script from "next/script"

declare global {
  interface Window {
    fbq: (
      command: "init" | "track" | "trackCustom",
      eventName: string,
      params?: Record<string, unknown>
    ) => void
  }
}

interface MetaPixelProps {
  pixelId?: string
  trackLead?: boolean
}

/**
 * Meta Pixel component for Facebook tracking
 * Place on landing page and thank you page
 * Set trackLead=true only on thank you page
 */
export function MetaPixel({ pixelId, trackLead = false }: MetaPixelProps) {
  const pixelIdValue = pixelId || process.env.NEXT_PUBLIC_META_PIXEL_ID

  useEffect(() => {
    if (trackLead && typeof window !== "undefined" && window.fbq) {
      // Fire Lead event only on thank you page
      window.fbq("track", "Lead")
    }
  }, [trackLead])

  if (!pixelIdValue) {
    return null
  }

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelIdValue}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelIdValue}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

