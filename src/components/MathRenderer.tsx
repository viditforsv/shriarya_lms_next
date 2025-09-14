"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathRendererProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export function MathRenderer({
  latex,
  displayMode = false,
  className = "",
}: MathRendererProps) {
  const mathRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (mathRef.current && latex) {
      try {
        katex.render(latex, mathRef.current, {
          throwOnError: false,
          displayMode,
          strict: false,
          trust: true,
        });
      } catch (error) {
        console.error("KaTeX rendering error:", error);
        mathRef.current.innerHTML = latex; // Fallback to raw LaTeX
      }
    }
  }, [latex, displayMode]);

  return <span ref={mathRef} className={className} />;
}

// Helper function to render LaTeX strings with mixed content
export function renderMixedContent(content: string) {
  // Split content by LaTeX math delimiters
  const parts = content.split(/(\$[^$]+\$|\$\$[^$]+\$\$)/);

  return parts.map((part, index) => {
    if (part.startsWith("$$") && part.endsWith("$$")) {
      // Display math
      return (
        <MathRenderer
          key={index}
          latex={part.slice(2, -2)}
          displayMode={true}
          className="block my-4 text-center"
        />
      );
    } else if (part.startsWith("$") && part.endsWith("$")) {
      // Inline math
      return (
        <MathRenderer
          key={index}
          latex={part.slice(1, -1)}
          displayMode={false}
          className="inline"
        />
      );
    } else {
      // Regular text
      return <span key={index}>{part}</span>;
    }
  });
}
