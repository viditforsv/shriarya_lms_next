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

// Helper function to render LaTeX strings with mixed content and environments
export function renderMixedContent(content: string) {
  // First, handle LaTeX environments (enumerate, itemize, align, etc.)
  const environmentRegex = /\\begin\{(\w+)\}(.*?)\\end\{\1\}/g;
  const parts = content.split(environmentRegex);
  
  return parts.map((part, index) => {
    // Check if this part is an environment
    if (index % 3 === 1) {
      const environmentName = part;
      const environmentContent = parts[index + 1];
      
      switch (environmentName) {
        case 'enumerate':
          return <EnumerateRenderer key={index} content={environmentContent} />;
        case 'itemize':
          return <ItemizeRenderer key={index} content={environmentContent} />;
        case 'align':
        case 'alignat':
        case 'eqnarray':
          return <AlignRenderer key={index} content={environmentContent} />;
        case 'cases':
          return <CasesRenderer key={index} content={environmentContent} />;
        case 'matrix':
        case 'pmatrix':
        case 'bmatrix':
        case 'vmatrix':
        case 'Vmatrix':
          return <MatrixRenderer key={index} content={environmentContent} type={environmentName} />;
        default:
          // For other environments, render as display math
          return (
            <MathRenderer
              key={index}
              latex={`\\begin{${environmentName}}${environmentContent}\\end{${environmentName}}`}
              displayMode={true}
              className="block my-4"
            />
          );
      }
    } else if (index % 3 === 2) {
      // Skip the environment content as it's handled above
      return null;
    } else {
      // Regular content - handle math delimiters
      return renderMathContent(part, index);
    }
  }).filter(Boolean);
}

// Helper function to render math content within regular text
function renderMathContent(content: string, baseIndex: number) {
  const parts = content.split(/(\$[^$]+\$|\$\$[^$]+\$\$)/);
  
  return parts.map((part, index) => {
    if (part.startsWith("$$") && part.endsWith("$$")) {
      // Display math
      return (
        <MathRenderer
          key={`${baseIndex}-${index}`}
          latex={part.slice(2, -2)}
          displayMode={true}
          className="block my-4 text-center"
        />
      );
    } else if (part.startsWith("$") && part.endsWith("$")) {
      // Inline math
      return (
        <MathRenderer
          key={`${baseIndex}-${index}`}
          latex={part.slice(1, -1)}
          displayMode={false}
          className="inline"
        />
      );
    } else {
      // Regular text
      return <span key={`${baseIndex}-${index}`}>{part}</span>;
    }
  });
}

// Enumerate environment renderer
function EnumerateRenderer({ content }: { content: string }) {
  const items = content.split('\\item').filter(item => item.trim());
  
  return (
    <ol className="list-decimal list-inside my-4 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="prose max-w-none">
          {renderMathContent(item.trim(), index)}
        </li>
      ))}
    </ol>
  );
}

// Itemize environment renderer
function ItemizeRenderer({ content }: { content: string }) {
  const items = content.split('\\item').filter(item => item.trim());
  
  return (
    <ul className="list-disc list-inside my-4 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="prose max-w-none">
          {renderMathContent(item.trim(), index)}
        </li>
      ))}
    </ul>
  );
}

// Align environment renderer
function AlignRenderer({ content }: { content: string }) {
  return (
    <MathRenderer
      latex={`\\begin{align}${content}\\end{align}`}
      displayMode={true}
      className="block my-4 text-center"
    />
  );
}

// Cases environment renderer
function CasesRenderer({ content }: { content: string }) {
  return (
    <MathRenderer
      latex={`\\begin{cases}${content}\\end{cases}`}
      displayMode={true}
      className="block my-4 text-center"
    />
  );
}

// Matrix environment renderer
function MatrixRenderer({ content, type }: { content: string; type: string }) {
  return (
    <MathRenderer
      latex={`\\begin{${type}}${content}\\end{${type}}`}
      displayMode={true}
      className="block my-4 text-center"
    />
  );
}
