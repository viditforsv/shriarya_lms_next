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

// Helper function to parse and render multi-part questions
export function renderMultiPartQuestion(content: string) {
  // Check if this looks like a multi-part question
  const hasParts =
    content.includes("**Part (") ||
    content.includes("Part (a)") ||
    content.includes("Part (b)");

  if (!hasParts) {
    return renderMixedContent(content);
  }

  // Split content into main question and parts
  const parts = [];
  const partRegex = /\*\*Part \([a-e]\) \[\d+ marks\]\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = partRegex.exec(content)) !== null) {
    // Add content before this part
    if (match.index > lastIndex) {
      const beforePart = content.slice(lastIndex, match.index).trim();
      if (beforePart) {
        parts.push({
          type: "main",
          content: beforePart,
        });
      }
    }

    // Extract part details
    const partMatch = match[0].match(
      /\*\*Part \(([a-e])\) \[(\d+) marks\]\*\*/
    );
    if (partMatch) {
      const partLetter = partMatch[1];
      const marks = parseInt(partMatch[2]);

      // Find the content of this part (until next part or end)
      const nextPartIndex = content.indexOf(
        "**Part (",
        match.index + match[0].length
      );
      const partContent =
        nextPartIndex === -1
          ? content.slice(match.index + match[0].length).trim()
          : content.slice(match.index + match[0].length, nextPartIndex).trim();

      parts.push({
        type: "part",
        letter: partLetter,
        marks: marks,
        content: partContent,
      });
    }

    lastIndex = match.index + match[0].length;
  }

  // If no parts were found, fall back to regular rendering
  if (parts.length === 0) {
    return renderMixedContent(content);
  }

  return (
    <div className="space-y-6">
      {parts.map((part, index) => {
        if (part.type === "main") {
          return (
            <div key={index} className="prose max-w-none">
              {renderMixedContent(part.content)}
            </div>
          );
        } else if (part.type === "part") {
          return (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-blue-700">
                  Part ({part.letter})
                </span>
                <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {part.marks} marks
                </span>
              </div>
              <div className="prose max-w-none">
                {renderMixedContent(part.content)}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

// Helper function to render LaTeX strings with mixed content and environments
export function renderMixedContent(content: string) {
  // First, handle LaTeX environments (enumerate, itemize, align, etc.)
  // Use a more robust approach to handle multiline environments
  const environmentRegex = /\\begin\{(\w+)\}([\s\S]*?)\\end\{\1\}/g;
  const parts: (string | { type: string; content: string })[] = [];
  let lastIndex = 0;
  let match;

  while ((match = environmentRegex.exec(content)) !== null) {
    // Add text before the environment
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }

    // Add the environment
    parts.push({
      type: match[1],
      content: match[2],
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return parts.map((part, index) => {
    if (typeof part === "object") {
      // This is an environment
      const { type, content } = part;

      switch (type) {
        case "enumerate":
          return <EnumerateRenderer key={index} content={content} />;
        case "itemize":
          return <ItemizeRenderer key={index} content={content} />;
        case "align":
        case "alignat":
        case "eqnarray":
        case "align*":
        case "alignat*":
        case "eqnarray*":
          return <AlignRenderer key={index} content={content} />;
        case "cases":
          return <CasesRenderer key={index} content={content} />;
        case "matrix":
        case "pmatrix":
        case "bmatrix":
        case "vmatrix":
        case "Vmatrix":
          return <MatrixRenderer key={index} content={content} type={type} />;
        default:
          // For other environments, render as display math
          return (
            <MathRenderer
              key={index}
              latex={`\\begin{${type}}${content}\\end{${type}}`}
              displayMode={true}
              className="block my-4"
            />
          );
      }
    } else {
      // Regular content - handle math delimiters
      return renderMathContent(part, index);
    }
  });
}

// Helper function to render math content within regular text
function renderMathContent(content: string, baseIndex: number) {
  // First, handle LaTeX line breaks
  const processedContent = content
    .replace(/\\\\/g, "<br>")
    .replace(/\\newline/g, "<br>")
    .replace(/\\par/g, "<br><br>");

  const parts = processedContent.split(/(\$[^$]+\$|\$\$[^$]+\$\$)/);

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
      // Regular text - handle HTML line breaks
      return (
        <span
          key={`${baseIndex}-${index}`}
          dangerouslySetInnerHTML={{ __html: part }}
        />
      );
    }
  });
}

// Enumerate environment renderer
function EnumerateRenderer({ content }: { content: string }) {
  // Split by \item and filter out empty items
  const items = content
    .split("\\item")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return (
    <ol className="list-decimal list-inside my-4 space-y-2 ml-4">
      {items.map((item, index) => (
        <li key={index} className="prose max-w-none">
          {renderMathContent(item, index)}
        </li>
      ))}
    </ol>
  );
}

// Itemize environment renderer
function ItemizeRenderer({ content }: { content: string }) {
  // Split by \item and filter out empty items
  const items = content
    .split("\\item")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return (
    <ul className="list-disc list-inside my-4 space-y-2 ml-4">
      {items.map((item, index) => (
        <li key={index} className="prose max-w-none">
          {renderMathContent(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Align environment renderer
function AlignRenderer({ content }: { content: string }) {
  // The content should already have proper LaTeX formatting
  // Just pass it through to KaTeX with the correct environment
  return (
    <MathRenderer
      latex={`\\begin{align*}${content}\\end{align*}`}
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
