"use client";

import { renderMixedContent } from "@/components/MathRenderer";

export default function LaTeXEnvironmentTest() {
  const testContent = `
    Here's a simple equation: $x^2 + y^2 = z^2$
    
    And here's a display equation:
    $$\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$$
    
    Now let's test enumerate environment:
    \\begin{enumerate}
    \\item First item with math: $a + b = c$
    \\item Second item with display math: $$\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$$
    \\item Third item with inline math: $\\alpha + \\beta = \\gamma$
    \\end{enumerate}
    
    And itemize environment:
    \\begin{itemize}
    \\item Bullet point one: $x = 5$
    \\item Bullet point two: $$y = mx + b$$
    \\item Bullet point three: $z = \\sqrt{x^2 + y^2}$
    \\end{itemize}
    
    Align environment:
    \\begin{align}
    f(x) &= x^2 + 2x + 1 \\\\
    &= (x + 1)^2 \\\\
    &= (x + 1)(x + 1)
    \\end{align}
    
    Cases environment:
    \\begin{cases}
    x + 1 & \\text{if } x \\geq 0 \\\\
    -x + 1 & \\text{if } x < 0
    \\end{cases}
    
    Matrix environment:
    \\begin{pmatrix}
    a & b \\\\
    c & d
    \\end{pmatrix}
  `;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">LaTeX Environment Test</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Rendered Content:</h2>
        <div className="prose max-w-none">
          {renderMixedContent(testContent)}
        </div>
      </div>
      
      <div className="mt-8 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Raw LaTeX:</h2>
        <pre className="whitespace-pre-wrap text-sm bg-white p-4 rounded border">
          {testContent}
        </pre>
      </div>
    </div>
  );
}
