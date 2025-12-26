"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Button } from "@/design-system/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  content,
  onChange,
  className = "",
}: RichTextEditorProps) {
  // Convert plain text with LaTeX to HTML for editing
  const convertTextToHtml = (text: string): string => {
    if (!text) return "";
    // If it looks like HTML, return as is
    if (text.trim().startsWith("<")) return text;
    
    // Convert plain text with LaTeX to HTML
    // Preserve LaTeX math: $...$ and $$...$$
    return text
      .replace(/\$\$([^$]+)\$\$/g, '<span class="latex-math">$$$1$$</span>')
      .replace(/\$([^$\n]+)\$/g, '<span class="latex-math">$$1$</span>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(.+)$/, '<p>$1</p>');
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
      Subscript,
      Superscript,
    ],
    content: convertTextToHtml(content || ""),
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Convert HTML to plain text with LaTeX preserved
      const html = editor.getHTML();
      const text = convertHtmlToLatex(html);
      onChange(text);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={`border rounded-lg ${className}`}>
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-gray-200" : ""}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-gray-200" : ""}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "bg-gray-200" : ""}
        >
          <UnderlineIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-gray-200" : ""}
        >
          <Strikethrough className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "bg-gray-200" : ""}
        >
          <Code className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={editor.isActive("subscript") ? "bg-gray-200" : ""}
        >
          <SubscriptIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={editor.isActive("superscript") ? "bg-gray-200" : ""}
        >
          <SuperscriptIcon className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const isDisplay = confirm(
              "Display math (centered)? Click OK for display, Cancel for inline."
            );
            const latex = prompt("Enter LaTeX math (e.g., x^2 + y^2 = r^2):");
            if (latex) {
              const delimiter = isDisplay ? "$$" : "$";
              editor
                .chain()
                .focus()
                .insertContent(
                  `<span class="latex-math">${delimiter}${latex}${delimiter}</span>`
                )
                .run();
            }
          }}
        >
          <span className="text-xs font-mono">LaTeX</span>
        </Button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Help text */}
      <div className="border-t p-2 bg-gray-50 text-xs text-gray-600">
        <p>
          <strong>LaTeX Math:</strong> Click the LaTeX button or type math
          directly using $ for inline (e.g., $x^2$) or $$ for display math
          (e.g., $$\\int_0^1 x dx$$)
        </p>
      </div>
    </div>
  );
}

// Convert HTML to plain text with LaTeX markers preserved
function convertHtmlToLatex(html: string): string {
  if (!html) return "";
  
  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Function to recursively convert nodes
  function convertNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();
      const children = Array.from(element.childNodes)
        .map(convertNode)
        .join("");

      // Handle LaTeX math spans - preserve the LaTeX content
      if (element.classList.contains("latex-math")) {
        // Extract LaTeX from the span content (should have $ markers)
        const latexContent = element.textContent || children;
        return latexContent;
      }

      // Handle formatting tags - convert to plain text
      switch (tagName) {
        case "p":
          return children + "\n\n";
        case "br":
          return "\n";
        case "strong":
        case "b":
          return children; // Just return text, no markdown
        case "em":
        case "i":
          return children;
        case "u":
          return children;
        case "code":
          return children;
        case "ul":
          return (
            "\n" +
            Array.from(element.children)
              .map((li) => `- ${convertNode(li)}`)
              .join("\n") +
            "\n"
          );
        case "ol":
          return (
            "\n" +
            Array.from(element.children)
              .map((li, i) => `${i + 1}. ${convertNode(li)}`)
              .join("\n") +
            "\n"
          );
        case "li":
          return children;
        case "h1":
        case "h2":
        case "h3":
          return children + "\n\n";
        default:
          return children;
      }
    }

    return "";
  }

  const result = Array.from(tempDiv.childNodes)
    .map(convertNode)
    .join("")
    .trim();
  
  return result;
}

