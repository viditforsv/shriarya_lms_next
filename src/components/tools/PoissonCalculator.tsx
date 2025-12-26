"use client";

import { useState } from "react";
import { Button } from "@/design-system/components/ui/button";
import { Calculator } from "lucide-react";

type CalculationType = "exact" | "atMost" | "atLeast";

export function PoissonCalculator() {
  const [lambda, setLambda] = useState<string>("");
  const [k, setK] = useState<string>("");
  const [calcType, setCalcType] = useState<CalculationType>("exact");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  // Calculate factorial
  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  // Calculate P(X = k) for Poisson distribution
  const probabilityMass = (lambda: number, k: number): number => {
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
  };

  const calculate = () => {
    setError("");
    setResult(null);

    if (!lambda || !k) {
      setError("Please enter all required values");
      return;
    }

    const numLambda = parseFloat(lambda);
    const numK = parseInt(k);

    if (isNaN(numLambda) || isNaN(numK)) {
      setError("All values must be valid numbers");
      return;
    }

    if (numLambda <= 0) {
      setError("Lambda must be greater than 0");
      return;
    }

    if (numK < 0 || !Number.isInteger(numK)) {
      setError("Number of events (k) must be a non-negative integer");
      return;
    }

    let probability = 0;

    switch (calcType) {
      case "exact":
        // P(X = k)
        probability = probabilityMass(numLambda, numK);
        break;

      case "atMost":
        // P(X <= k)
        for (let i = 0; i <= numK; i++) {
          probability += probabilityMass(numLambda, i);
        }
        break;

      case "atLeast":
        // P(X >= k)
        for (let i = numK; i <= Math.min(numK + 100, numLambda * 10); i++) {
          probability += probabilityMass(numLambda, i);
        }
        // For atLeast, subtract the tail that was approximated
        break;
    }

    // Round to 6 decimal places
    probability = Math.min(1, Math.max(0, probability));
    probability = Math.round(probability * 1000000) / 1000000;
    setResult(probability);
  };

  const handleReset = () => {
    setLambda("");
    setK("");
    setResult(null);
    setError("");
  };

  const getDescription = () => {
    switch (calcType) {
      case "exact":
        return "P(X = k)";
      case "atMost":
        return "P(X ≤ k)";
      case "atLeast":
        return "P(X ≥ k)";
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Calculator className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-bold text-foreground">
            Poisson Distribution Calculator
          </h1>
        </div>
        <p className="text-muted-foreground">
          Calculate probabilities for Poisson distributions with parameter λ
          (lambda)
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
          <div className="grid grid-cols-3 gap-2">
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
              P(X = k)
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
              P(X ≤ k)
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
              P(X ≥ k)
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="lambda"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              Average Rate (λ)
            </label>
            <input
              id="lambda"
              type="number"
              step="0.01"
              min="0"
              value={lambda}
              onChange={(e) => setLambda(e.target.value)}
              placeholder="e.g., 3.5"
              className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="k"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              Number of Events (k)
            </label>
            <input
              id="k"
              type="number"
              value={k}
              onChange={(e) => setK(e.target.value)}
              placeholder="e.g., 5"
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
            <strong>Formula:</strong> P(X = k) = (λᵏ × e⁻λ) / k!
            <br />
            Where λ is the average rate of occurrence and k is the number of
            events.
          </p>
        </div>
      </div>
    </div>
  );
}
