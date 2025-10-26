"use client";

import { useState } from "react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Calculator } from "lucide-react";

type CalculationType = "lessThan" | "greaterThan" | "between";

export function NormalCalculator() {
  const [mean, setMean] = useState<string>("");
  const [stdDev, setStdDev] = useState<string>("");
  const [x1, setX1] = useState<string>("");
  const [x2, setX2] = useState<string>("");
  const [calcType, setCalcType] = useState<CalculationType>("lessThan");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  // Calculate standard normal CDF using approximation
  const standardNormalCDF = (z: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp((-z * z) / 2);
    const prob =
      d *
      t *
      (0.3193815 +
        t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));

    return z > 0 ? 1 - prob : prob;
  };

  const calculate = () => {
    setError("");
    setResult(null);

    if (!mean || !stdDev || !x1) {
      setError("Please enter all required values");
      return;
    }

    const numMean = parseFloat(mean);
    const numStdDev = parseFloat(stdDev);
    const numX1 = parseFloat(x1);

    if (isNaN(numMean) || isNaN(numStdDev) || isNaN(numX1)) {
      setError("All values must be valid numbers");
      return;
    }

    if (numStdDev <= 0) {
      setError("Standard deviation must be greater than 0");
      return;
    }

    let probability = 0;
    let z1 = (numX1 - numMean) / numStdDev;

    switch (calcType) {
      case "lessThan":
        // P(X < x1)
        probability = standardNormalCDF(z1);
        break;

      case "greaterThan":
        // P(X > x1)
        probability = 1 - standardNormalCDF(z1);
        break;

      case "between":
        if (!x2) {
          setError("Please enter the upper bound");
          return;
        }
        const numX2 = parseFloat(x2);
        if (isNaN(numX2)) {
          setError("Upper bound must be a valid number");
          return;
        }
        if (numX2 < numX1) {
          setError("Upper bound must be greater than or equal to lower bound");
          return;
        }
        // P(x1 < X < x2)
        let z2 = (numX2 - numMean) / numStdDev;
        probability = standardNormalCDF(z2) - standardNormalCDF(z1);
        break;
    }

    // Ensure probability is between 0 and 1
    probability = Math.max(0, Math.min(1, probability));
    probability = Math.round(probability * 1000000) / 1000000;
    setResult(probability);
  };

  const handleReset = () => {
    setMean("");
    setStdDev("");
    setX1("");
    setX2("");
    setResult(null);
    setError("");
  };

  const getDescription = () => {
    switch (calcType) {
      case "lessThan":
        return `P(X < ${x1})`;
      case "greaterThan":
        return `P(X > ${x1})`;
      case "between":
        return `P(${x1} < X < ${x2})`;
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Calculator className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-bold text-foreground">
            Normal Distribution Calculator
          </h1>
        </div>
        <p className="text-muted-foreground">
          Calculate probabilities for normal distributions with mean μ and
          standard deviation σ
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <button
              onClick={() => {
                setCalcType("lessThan");
                setResult(null);
                setError("");
              }}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                calcType === "lessThan"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              P(X &lt; x₁)
            </button>
            <button
              onClick={() => {
                setCalcType("greaterThan");
                setResult(null);
                setError("");
              }}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                calcType === "greaterThan"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              P(X &gt; x₁)
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
              P(x₁ &lt; X &lt; x₂)
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="mean"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              Mean (μ)
            </label>
            <input
              id="mean"
              type="number"
              step="0.01"
              value={mean}
              onChange={(e) => setMean(e.target.value)}
              placeholder="e.g., 0"
              className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="stdDev"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              Standard Deviation (σ)
            </label>
            <input
              id="stdDev"
              type="number"
              step="0.01"
              value={stdDev}
              onChange={(e) => setStdDev(e.target.value)}
              placeholder="e.g., 1"
              className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
          </div>

          <div>
            <label
              htmlFor="x1"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              {calcType === "between" ? "Lower Bound (x₁)" : "Value (x₁)"}
            </label>
            <input
              id="x1"
              type="number"
              step="0.01"
              value={x1}
              onChange={(e) => setX1(e.target.value)}
              placeholder="e.g., 1.5"
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
                step="0.01"
                value={x2}
                onChange={(e) => setX2(e.target.value)}
                placeholder="e.g., 2.5"
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
            <strong>Formula:</strong> Z = (X - μ) / σ ~ N(0, 1)
            <br />
            The calculator uses the standard normal distribution to compute
            probabilities.
          </p>
        </div>
      </div>
    </div>
  );
}
