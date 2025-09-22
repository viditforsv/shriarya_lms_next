"use client";

import { useState } from "react";
import {
  renderMultiPartQuestion,
  renderMixedContent,
} from "@/components/MathRenderer";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Textarea } from "@/app/components-demo/ui/textarea";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";

export default function MathRendererTestPage() {
  const [testContent, setTestContent] =
    useState(`In the following Argand diagram, the points $Z_1$, $O$ and $Z_2$ are the vertices of triangle $Z_1 O Z_2$ described anticlockwise.

[IMAGE: Argand diagram]

The point $Z_1$ represents the complex number $z_1 = r_1 e^{i\\alpha}$, where $r_1 > 0$. The point $Z_2$ represents the complex number $z_2 = r_2 e^{i\\theta}$, where $r_2 > 0$.

Angles $\\alpha$, $\\theta$ are measured anticlockwise from the positive direction of the real axis such that $0 \\leq \\alpha, \\theta < 2\\pi$ and $0 < \\alpha - \\theta < \\pi$.

**Part (a) [2 marks]**

Show that $z_1 z_2^* = r_1 r_2 e^{i(\\alpha - \\theta)}$ where $z_2^*$ is the complex conjugate of $z_2$.

**Part (b) [2 marks]**

Given that $\\text{Re}(z_1 z_2^*) = 0$, show that $Z_1 O Z_2$ is a right-angled triangle.

In parts (c), (d) and (e), consider the case where $Z_1 O Z_2$ is an equilateral triangle.

**Part (c) [6 marks]**

(i) Express $z_1$ in terms of $z_2$.

(ii) Hence show that $z_1^2 + z_2^2 = z_1 z_2$.

Let $z_1$ and $z_2$ be the distinct roots of the equation $z^2 + az + b = 0$ where $z \\in \\mathbb{C}$ and $a, b \\in \\mathbb{R}$.

**Part (d) [5 marks]**

Use the result from part (c)(ii) to show that $a^2 - 3b = 0$.

Consider the equation $z^2 + az + 12 = 0$, where $z \\in \\mathbb{C}$ and $a \\in \\mathbb{R}$.

**Part (e) [3 marks]**

Given that $0 < \\alpha - \\theta < \\pi$, deduce that only one equilateral triangle $Z_1 O Z_2$ can be formed from the point $O$ and the roots of this equation.`);

  const [selectedTest, setSelectedTest] = useState("multipart");

  const testCases = {
    multipart: {
      name: "Multi-Part Question",
      description: "Complex multi-part question with parts (a) through (e)",
      content: testContent,
    },
    simple: {
      name: "Simple Math Question",
      description: "Basic math question without parts",
      content: `Find the derivative of $f(x) = x^2 + 3x + 2$.

Show your working clearly.

**Answer:** $f'(x) = 2x + 3$`,
    },
    enumerate: {
      name: "Enumerate Environment",
      description: "Question with enumerate environment",
      content: `Solve the following system of equations:

\\begin{enumerate}
\\item $x + y = 5$
\\item $2x - y = 1$
\\end{enumerate}

Find the values of $x$ and $y$.`,
    },
    displayMath: {
      name: "Display Math",
      description: "Question with display math blocks",
      content: `Prove the following identity:

$$\\sin^2(x) + \\cos^2(x) = 1$$

Use the Pythagorean theorem to show this result.`,
    },
    mixed: {
      name: "Mixed Content",
      description: "Question with various LaTeX elements",
      content: `Consider the function $f(x) = \\frac{x^2 - 1}{x - 1}$.

\\begin{enumerate}
\\item Find $\\lim_{x \\to 1} f(x)$
\\item Is $f(x)$ continuous at $x = 1$?
\\end{enumerate}

**Solution:**

$$\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1} = \\lim_{x \\to 1} \\frac{(x-1)(x+1)}{x-1} = \\lim_{x \\to 1} (x+1) = 2$$`,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Math Renderer Test Page
          </h1>
          <p className="text-gray-600">
            Test different types of math content rendering including multi-part
            questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(testCases).map(([key, testCase]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{testCase.name}</h3>
                      <p className="text-sm text-gray-600">
                        {testCase.description}
                      </p>
                    </div>
                    <Button
                      variant={selectedTest === key ? "primary" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedTest(key);
                        setTestContent(testCase.content);
                      }}
                    >
                      {selectedTest === key ? "Active" : "Select"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={testContent}
                  onChange={(e) => setTestContent(e.target.value)}
                  placeholder="Enter your test content here..."
                  className="min-h-[300px] font-mono text-sm"
                />
                <div className="mt-4 flex gap-2">
                  <Badge variant="secondary">Multi-Part Renderer</Badge>
                  <Badge variant="outline">Mixed Content Renderer</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Rendering */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Part Question Renderer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-4 min-h-[400px]">
                  {renderMultiPartQuestion(testContent)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mixed Content Renderer (Fallback)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-4 min-h-[400px]">
                  {renderMixedContent(testContent)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Debug Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Content Analysis</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Length:</strong> {testContent.length} characters
                  </p>
                  <p>
                    <strong>Has Parts:</strong>{" "}
                    {testContent.includes("**Part (") ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Has Math:</strong>{" "}
                    {testContent.includes("$") ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Has Enumerate:</strong>{" "}
                    {testContent.includes("\\begin{enumerate}") ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Has Display Math:</strong>{" "}
                    {testContent.includes("$$") ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Renderer Selection</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Multi-Part:</strong>{" "}
                    {testContent.includes("**Part (")
                      ? "✅ Active"
                      : "❌ Fallback"}
                  </p>
                  <p>
                    <strong>Mixed Content:</strong> Always active
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
