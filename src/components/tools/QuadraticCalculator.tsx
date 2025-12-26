"use client";

import { useState } from "react";
import { Button } from "@/design-system/components/ui/button";
import { Calculator } from "lucide-react";

interface Solution {
  type: "real" | "complex" | "none";
  x1: number | string;
  x2: number | string;
  discriminant: number;
  description: string;
}

export function QuadraticCalculator() {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [c, setC] = useState<string>("");
  const [solution, setSolution] = useState<Solution | null>(null);
  const [error, setError] = useState<string>("");

  const calculate = () => {
    setError("");
    setSolution(null);

    // Validation
    if (!a || !b || !c) {
      setError("Please enter all coefficients");
      return;
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
      setError("All values must be valid numbers");
      return;
    }

    if (numA === 0) {
      setError("Coefficient 'a' cannot be zero (not a quadratic equation)");
      return;
    }

    // Calculate discriminant
    const discriminant = numB * numB - 4 * numA * numC;

    let result: Solution;

    if (discriminant > 0) {
      // Two real solutions
      const sqrtDiscriminant = Math.sqrt(discriminant);
      const x1 = (-numB + sqrtDiscriminant) / (2 * numA);
      const x2 = (-numB - sqrtDiscriminant) / (2 * numA);
      result = {
        type: "real",
        x1: x1,
        x2: x2,
        discriminant,
        description: "Two distinct real solutions",
      };
    } else if (discriminant === 0) {
      // One real solution
      const x = -numB / (2 * numA);
      result = {
        type: "real",
        x1: x,
        x2: x,
        discriminant,
        description: "One real solution (repeated root)",
      };
    } else {
      // Complex solutions
      const realPart = -numB / (2 * numA);
      const imaginaryPart = Math.sqrt(-discriminant) / (2 * numA);
      result = {
        type: "complex",
        x1: `${realPart} + ${imaginaryPart}i`,
        x2: `${realPart} - ${imaginaryPart}i`,
        discriminant,
        description: "Two complex solutions",
      };
    }

    setSolution(result);
  };

  const handleReset = () => {
    setA("");
    setB("");
    setC("");
    setSolution(null);
    setError("");
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Calculator className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-bold text-foreground">
            Quadratic Equation Calculator
          </h1>
        </div>
        <p className="text-muted-foreground">
          Solve quadratic equations of the form ax² + bx + c = 0
        </p>
      </div>

      <div className="bg-card border border-border rounded-sm p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-foreground">
          Enter Coefficients
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label
              htmlFor="coeff-a"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              Coefficient a (x²)
            </label>
            <input
              id="coeff-a"
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="Enter a"
              className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="coeff-b"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              Coefficient b (x)
            </label>
            <input
              id="coeff-b"
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="Enter b"
              className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="coeff-c"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              Coefficient c (constant)
            </label>
            <input
              id="coeff-c"
              type="number"
              value={c}
              onChange={(e) => setC(e.target.value)}
              placeholder="Enter c"
              className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <Button onClick={calculate} className="rounded-sm">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="rounded-sm"
          >
            Reset
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-sm">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {solution && (
          <div className="mt-6 p-6 bg-muted rounded-sm border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Solution
            </h3>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Discriminant (Δ):
                </span>
                <span className="ml-2 text-foreground font-mono">
                  {solution.discriminant.toFixed(4)}
                </span>
              </div>

              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Type:
                </span>
                <span className="ml-2 text-foreground">{solution.description}</span>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      x₁ ={" "}
                    </span>
                    <span className="text-foreground font-mono text-lg">
                      {typeof solution.x1 === "number"
                        ? solution.x1.toFixed(6)
                        : solution.x1}
                    </span>
                  </div>

                  {solution.x1 !== solution.x2 && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">
                        x₂ ={" "}
                      </span>
                      <span className="text-foreground font-mono text-lg">
                        {typeof solution.x2 === "number"
                          ? solution.x2.toFixed(6)
                          : solution.x2}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-muted/50 rounded-sm">
          <p className="text-sm text-muted-foreground">
            <strong>Equation:</strong> ax² + bx + c = 0, where a ≠ 0
            <br />
            <strong>Quadratic Formula:</strong> x = (-b ± √(b² - 4ac)) / 2a
          </p>
        </div>
      </div>
    </div>
  );
}
