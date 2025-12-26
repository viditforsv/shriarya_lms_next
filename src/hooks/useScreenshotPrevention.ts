"use client";

import { useEffect, useRef } from "react";

/**
 * Hook to prevent screenshots and screen recording on a specific element
 * Note: Complete prevention is not possible on all platforms, but this makes it harder
 */
export function useScreenshotPrevention(enabled: boolean = true) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;

    // Prevent common screenshot shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Windows/Linux: Win+Shift+S, Print Screen, Alt+Print Screen
      // Mac: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
      if (
        (e.key === "PrintScreen") ||
        (e.altKey && e.key === "PrintScreen") ||
        ((e.metaKey || e.ctrlKey) && e.shiftKey && ["3", "4", "5", "S"].includes(e.key)) ||
        (e.metaKey && e.shiftKey && e.key === "S")
      ) {
        e.preventDefault();
        e.stopPropagation();
        // Show warning
        const warning = document.createElement("div");
        warning.textContent = "Screenshots are not allowed on this content";
        warning.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 20px 30px;
          border-radius: 8px;
          z-index: 10000;
          font-size: 16px;
        `;
        document.body.appendChild(warning);
        setTimeout(() => warning.remove(), 2000);
        return false;
      }
    };

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Prevent text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Prevent drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Prevent copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    // Prevent cut
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    // Add CSS to prevent selection and touch callouts (only if not already added)
    let style = document.getElementById("screenshot-prevention-styles") as HTMLStyleElement;
    if (!style) {
      style = document.createElement("style");
      style.id = "screenshot-prevention-styles";
      style.textContent = `
        [data-screenshot-protected] {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
          -webkit-tap-highlight-color: transparent !important;
          pointer-events: auto !important;
        }
        [data-screenshot-protected] * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
        }
        [data-screenshot-protected] iframe {
          pointer-events: auto !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Add data attribute to container
    container.setAttribute("data-screenshot-protected", "true");

    // Add event listeners to container
    container.addEventListener("keydown", handleKeyDown, true);
    container.addEventListener("contextmenu", handleContextMenu, true);
    container.addEventListener("selectstart", handleSelectStart, true);
    container.addEventListener("dragstart", handleDragStart, true);
    container.addEventListener("copy", handleCopy, true);
    container.addEventListener("cut", handleCut, true);

    // Also add to window for global shortcuts
    window.addEventListener("keydown", handleKeyDown, true);

    // Cleanup
    return () => {
      container.removeEventListener("keydown", handleKeyDown, true);
      container.removeEventListener("contextmenu", handleContextMenu, true);
      container.removeEventListener("selectstart", handleSelectStart, true);
      container.removeEventListener("dragstart", handleDragStart, true);
      container.removeEventListener("copy", handleCopy, true);
      container.removeEventListener("cut", handleCut, true);
      window.removeEventListener("keydown", handleKeyDown, true);
      
      container.removeAttribute("data-screenshot-protected");
      
      // Only remove style if no other protected elements exist
      const protectedElements = document.querySelectorAll("[data-screenshot-protected]");
      if (protectedElements.length === 0) {
        const existingStyle = document.getElementById("screenshot-prevention-styles");
        if (existingStyle) {
          existingStyle.remove();
        }
      }
    };
  }, [enabled]);

  return containerRef;
}

