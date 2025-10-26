"use client";

import { useState } from "react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Calculator } from "lucide-react";

type CalculationType = "exact" | "atMost" | "atLeast" | "between";

export function BinomialCalculator() {
  const [n, setN] = useState<string>("");
  const [p, setP] = useState<string>("");
  const [x1, setX1] = useState<string>("");
  const [x2, setX2] = useState<string>("");
  const [calcType, setCalcType] = useState<CalculationType>("exact");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  // Helper function to calculate binomial coefficient C(n, k)
  const binomialCoefficient = (n: number, k: number): number => {
    if (k > n - k) k = n - k; // Take advantage of symmetry
    let res = 1;
    for (let i = 0; i < k; i++) {
      res = (res * (n - i)) / (i + 1);
    }
    return res;
  };

  // Calculate P(X = k) for binomial distribution
  const probabilityMass = (n: number, p: number, k: number): number => {
    const coeff = binomialCoefficient(n, k);
    return coeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
  };

  const calculate = () => {
    setError("");
    setResult(null);

    // Validation
    const numN = parseInt(n);
    const numP = parseFloat(p);
    const numX1 = parseInt(x1);

    if (!n || !p || !x1) {
      setError("Please enter all required values");
      return;
    }

    if (isNaN(numN) || isNaN(numP) || isNaN(numX1)) {
      setError("All values must be valid numbers");
      return;
    }

    if (numN <= 0 || !Number.isInteger(numN)) {
      setError("Number of trials must be a positive integer");
      return;
    }

    if (numP < 0 || numP > 1) {
      setError("Probability must be between 0 and 1");
      return;
    }

    if (numX1 < 0 || numX1 > numN || !Number.isInteger(numX1)) {
      setError("Number of successes must be between 0 and n");
      return;
    }

    let probability = 0;

    switch (calcType) {
      case "exact":
        // P(X = x1)
        probability = probabilityMass(numN, numP, numX1);
        break;

      case "atMost":
        // P(X <= x1)
        for (let i = 0; i <= numX1; i++) {
          probability += probabilityMass(numN, numP, i);
        }
        break;

      case "atLeast":
        // P(X >= x1)
        for (let i = numX1; i <= numN; i++) {
          probability += probabilityMass(numN, numP, i);
        }
        break;

      case "between":
        const numX2 = parseInt(x2);
        if (!x2 || isNaN(numX2)) {
          setError("Please enter the upper bound");
          return;
        }
        if (numX2 < 0 || numX2 > numN || !Number.isInteger(numX2)) {
          setError("Upper bound must be between 0 and n");
          return;
        }
        if (numX2 < numX1) {
          setError("Upper bound must be greater than or equal to lower bound");
          return;
        }
        // P(x1 <= X <= x2)
        for (let i = numX1; i <= numX2; i++) {
          probability += probabilityMass(numN, numP, i);
        }
        break;
    }

    // Round to 6 decimal places to avoid floating point precision issues
    probability = Math.round(probability * 1000000) / 1000000;
    setResult(probability);
  };

  const handleReset = () => {
    setN("");
    setP("");
    setX1("");
    setX2("");
    setResult(null);
    setError("");
  };

  const getDescription = () => {
    switch (calcType) {
      case "exact":
        return "P(X = x)";
      case "atMost":
        return "P(X ≤ x)";
      case "atLeast":
        return "P(X ≥ x)";
      case "between":
        return "P(x ≤ X ≤ x₂)";
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Calculator className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-bold text-foreground">
            Binomial Distribution Calculator
          </h1>
        </div>
        <p className="text-muted-foreground">
          Calculate probabilities for binomial distributions with parameters n
          and p
        </p>
      </div>

      <div className="bg-card border border-border rounded-sm p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-foreground">
          Parameters
        </h2>

        {/* Calculation Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3 text-foreground">
            Calculation Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={() => {
                setCalcType("exact");
                setResult(null);
                setError("");
              }}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                calcType === "exact"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              P(X = x)
            </button>
            <button
              onClick={() => {
                setCalcType("atMost");
                setResult(null);
                setError("");
              }}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                calcType === "atMost"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              P(X ≤ x)
            </button>
            <button
              onClick={() => {
                setCalcType("atLeast");
                setResult(null);
                setError("");
              }}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                calcType === "atLeast"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              P(X ≥ x)
            </button>
            <button
              onClick={() => {
                setCalcType("between");
                setResult(null);
                setError("");
              }}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                calcType === "between"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              P(x ≤ X ≤ x₂)
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="n"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              Number of Trials (n)
            </label>
            <input
              id="n"
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              placeholder="e.g., 10"
              className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="p"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              Probability of Success (p)
            </label>
            <input
              id="p"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={p}
              onChange={(e) => setP(e.target.value)}
              placeholder="e.g., 0.5"
              className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="x1"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              {calcType === "between"
                ? "Lower Bound (x₁)"
                : "Number of Successes (x₁)"}
            </label>
            <input
              id="x1"
              type="number"
              value={x1}
              onChange={(e) => setX1(e.target.value)}
              placeholder="e.g., 5"
              className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          </div>

          {calcType === "between" && (
            <div>
              <label
                htmlFor="x2"
                className="block text-sm font-medium mb-2 text-foreground"
              >
                Upper Bound (x₂)
              </label>
              <input
                id="x2"
                type="number"
                value={x2}
                onChange={(e) => setX2(e.target.value)}
                placeholder="e.g., 7"
                className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>
          )}
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

        {result !== null && (
          <div className="mt-6 p-6 bg-muted rounded-sm border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Result
            </h3>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  {getDescription()} ={" "}
                </span>
                <span className="text-foreground font-mono text-2xl font-bold">
                  {result.toFixed(6)}
                </span>
              </div>

              <div className="pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  Percentage: {(result * 100).toFixed(4)}%
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-muted/50 rounded-sm">
          <p className="text-sm text-muted-foreground">
            <strong>Formula:</strong> P(X = k) = C(n, k) × pᵏ × (1-p)ⁿ⁻ᵏ
            <br />
            Where n is the number of trials, p is the probability of success,
            and k is the number of successes.
          </p>
        </div>
      </div>
    </div>
  );
}
