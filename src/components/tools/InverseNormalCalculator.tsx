"use client";

import { useState } from "react";
import { Button } from "@/design-system/components/ui/button";
import { Calculator } from "lucide-react";

type ProbabilityType = "centralTail" | "leftTail" | "rightTail";

export function InverseNormalCalculator() {
  const [mean, setMean] = useState<string>("");
  const [stdDev, setStdDev] = useState<string>("");
  const [probability, setProbability] = useState<string>("");
  const [probType, setProbType] = useState<ProbabilityType>("centralTail");
  const [result, setResult] = useState<number | number[] | null>(null);
  const [error, setError] = useState<string>("");

  // Calculate inverse standard normal CDF using approximation (Beasley-Springer-Moro algorithm)
  const inverseStandardNormalCDF = (p: number): number => {
    if (p <= 0) return -Infinity;
    if (p >= 1) return Infinity;

    const c0 = 2.515517;
    const c1 = 0.802853;
    const c2 = 0.010328;
    const d1 = 1.432788;
    const d2 = 0.189269;
    const d3 = 0.001308;

    let t: number;
    let z: number;

    if (p > 0.5) {
      t = Math.sqrt(-2 * Math.log(1 - p));
      z =
        t -
        (c0 + c1 * t + c2 * t * t) / (1 + d1 * t + d2 * t * t + d3 * t * t * t);
    } else {
      t = Math.sqrt(-2 * Math.log(p));
      z = -(
        t -
        (c0 + c1 * t + c2 * t * t) / (1 + d1 * t + d2 * t * t + d3 * t * t * t)
      );
    }

    return z;
  };

  const calculate = () => {
    setError("");
    setResult(null);

    if (!mean || !stdDev || !probability) {
      setError("Please enter all required values");
      return;
    }

    const numMean = parseFloat(mean);
    const numStdDev = parseFloat(stdDev);
    const numProb = parseFloat(probability);

    if (isNaN(numMean) || isNaN(numStdDev) || isNaN(numProb)) {
      setError("All values must be valid numbers");
      return;
    }

    if (numStdDev <= 0) {
      setError("Standard deviation must be greater than 0");
      return;
    }

    let probValue = numProb;

    // Convert probability based on type
    switch (probType) {
      case "leftTail":
        // Already cumulative from left (P(X < x))
        if (probValue <= 0 || probValue >= 1) {
          setError("Area must be between 0 and 1 (exclusive)");
          return;
        }
        break;
      case "rightTail":
        // Convert right tail to left tail
        probValue = 1 - numProb;
        if (probValue <= 0 || probValue >= 1) {
          setError("Area must be between 0 and 1 (exclusive)");
          return;
        }
        break;
      case "centralTail": {
        // Central area (area in the middle)
        // For central area, we need to find x1 and x2 such that P(x1 < X < x2) = probValue
        // This means each tail has area = (1 - probValue) / 2
        if (probValue <= 0 || probValue >= 1) {
          setError("Area must be between 0 and 1 (exclusive)");
          return;
        }
        const tailArea = (1 - numProb) / 2;

        // Calculate z-scores for both tails
        const z1 = inverseStandardNormalCDF(tailArea);
        const z2 = inverseStandardNormalCDF(1 - tailArea);

        // Convert to original scale
        const x1 = numMean + numStdDev * z1;
        const x2 = numMean + numStdDev * z2;

        // Store as array [lower, upper]
        setResult([x1, x2]);
        return;
      }
    }

    // Calculate inverse standard normal
    const z = inverseStandardNormalCDF(probValue);

    // Convert to original scale: x = μ + σ * z
    const x = numMean + numStdDev * z;

    setResult(x);
  };

  const handleReset = () => {
    setMean("");
    setStdDev("");
    setProbability("");
    setResult(null);
    setError("");
  };

  const getDescription = () => {
    switch (probType) {
      case "centralTail":
        return `Central Area = ${probability}`;
      case "leftTail":
        return `Area = ${probability}`;
      case "rightTail":
        return `Area = ${probability}`;
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Calculator className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-bold text-foreground">
            Inverse Normal Distribution Calculator
          </h1>
        </div>
        <p className="text-muted-foreground">
          Find the x-value given a cumulative probability for normal
          distributions
        </p>
      </div>

      <div className="bg-card border border-border rounded-sm p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-foreground">
          Parameters
        </h2>

        {/* Probability Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3 text-foreground">
            Area Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <button
              onClick={() => {
                setProbType("centralTail");
                setResult(null);
                setError("");
              }}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                probType === "centralTail"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Central Tail
            </button>
            <button
              onClick={() => {
                setProbType("leftTail");
                setResult(null);
                setError("");
              }}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                probType === "leftTail"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Left of Value
            </button>
            <button
              onClick={() => {
                setProbType("rightTail");
                setResult(null);
                setError("");
              }}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                probType === "rightTail"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Right of Value
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

          <div className="md:col-span-2">
            <label
              htmlFor="probability"
              className="block text-sm font-medium mb-2 text-foreground"
            >
              Area (0-1)
            </label>
            <input
              id="probability"
              type="number"
              step="0.001"
              min="0"
              max="1"
              value={probability}
              onChange={(e) => setProbability(e.target.value)}
              placeholder="e.g., 0.95"
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
              {Array.isArray(result) ? (
                // Central area result (two values)
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {getDescription()} → Lower bound (x₁) ={" "}
                    </span>
                    <span className="text-foreground font-mono text-2xl font-bold">
                      {result[0].toFixed(6)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Upper bound (x₂) ={" "}
                    </span>
                    <span className="text-foreground font-mono text-2xl font-bold">
                      {result[1].toFixed(6)}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Z-scores:</span>{" "}
                      {(
                        (result[0] - parseFloat(mean)) /
                        parseFloat(stdDev)
                      ).toFixed(6)}
                      ,{" "}
                      {(
                        (result[1] - parseFloat(mean)) /
                        parseFloat(stdDev)
                      ).toFixed(6)}
                    </div>
                  </div>
                </div>
              ) : (
                // Single value result
                <div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {getDescription()} → x ={" "}
                    </span>
                    <span className="text-foreground font-mono text-2xl font-bold">
                      {result.toFixed(6)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Z-score:</span>{" "}
                      {(
                        (result - parseFloat(mean)) /
                        parseFloat(stdDev)
                      ).toFixed(6)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-muted/50 rounded-sm">
          <p className="text-sm text-muted-foreground">
            <strong>Formula:</strong> x = μ + σ × z
            <br />
            Where z is the standard normal deviate corresponding to the given
            probability.
          </p>
        </div>
      </div>
    </div>
  );
}
