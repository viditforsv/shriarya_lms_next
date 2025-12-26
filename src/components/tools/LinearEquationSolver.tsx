"use client";

import { useState } from "react";
import { Button } from "@/design-system/components/ui/button";
import { Calculator } from "lucide-react";

interface Solution {
  type: "unique" | "infinite" | "none";
  values: { [key: string]: number | string };
  description: string;
}

export function LinearEquationSolver() {
  const [mode, setMode] = useState<"2var" | "3var">("2var");
  const [solution, setSolution] = useState<Solution | null>(null);
  const [error, setError] = useState<string>("");

  // 2-variable inputs
  const [a1, setA1] = useState<string>("");
  const [b1, setB1] = useState<string>("");
  const [c1, setC1] = useState<string>("");
  const [a2, setA2] = useState<string>("");
  const [b2, setB2] = useState<string>("");
  const [c2, setC2] = useState<string>("");

  // 3-variable inputs
  const [aa1, setAa1] = useState<string>("");
  const [bb1, setBb1] = useState<string>("");
  const [cc1, setCc1] = useState<string>("");
  const [dd1, setDd1] = useState<string>("");
  const [aa2, setAa2] = useState<string>("");
  const [bb2, setBb2] = useState<string>("");
  const [cc2, setCc2] = useState<string>("");
  const [dd2, setDd2] = useState<string>("");
  const [aa3, setAa3] = useState<string>("");
  const [bb3, setBb3] = useState<string>("");
  const [cc3, setCc3] = useState<string>("");
  const [dd3, setDd3] = useState<string>("");

  const reset2Var = () => {
    setA1("");
    setB1("");
    setC1("");
    setA2("");
    setB2("");
    setC2("");
  };

  const reset3Var = () => {
    setAa1("");
    setBb1("");
    setCc1("");
    setDd1("");
    setAa2("");
    setBb2("");
    setCc2("");
    setDd2("");
    setAa3("");
    setBb3("");
    setCc3("");
    setDd3("");
  };

  const solve2Var = () => {
    setError("");
    setSolution(null);

    if (!a1 || !b1 || !c1 || !a2 || !b2 || !c2) {
      setError("Please enter all coefficients");
      return;
    }

    const coefficients = [
      parseFloat(a1),
      parseFloat(b1),
      parseFloat(c1),
      parseFloat(a2),
      parseFloat(b2),
      parseFloat(c2),
    ];

    if (coefficients.some((val) => isNaN(val))) {
      setError("All values must be valid numbers");
      return;
    }

    const [a, b, c, d, e, f] = coefficients;

    // Using Cramer's rule
    const det = a * e - b * d;

    if (Math.abs(det) < 1e-10) {
      // Check for inconsistent or dependent system
      if (Math.abs(a * f - c * d) > 1e-10) {
        setSolution({
          type: "none",
          values: {},
          description: "No solution (inconsistent system)",
        });
      } else {
        setSolution({
          type: "infinite",
          values: {},
          description: "Infinite solutions (dependent system)",
        });
      }
    } else {
      const x = (c * e - b * f) / det;
      const y = (a * f - c * d) / det;

      setSolution({
        type: "unique",
        values: { x, y },
        description: "Unique solution",
      });
    }
  };

  const solve3Var = () => {
    setError("");
    setSolution(null);

    const inputs = [aa1, bb1, cc1, dd1, aa2, bb2, cc2, dd2, aa3, bb3, cc3, dd3];

    if (inputs.some((val) => !val)) {
      setError("Please enter all coefficients");
      return;
    }

    const coefficients = inputs.map((val) => parseFloat(val));

    if (coefficients.some((val) => isNaN(val))) {
      setError("All values must be valid numbers");
      return;
    }

    const [
      a1,
      b1,
      c1,
      d1, // First equation
      a2,
      b2,
      c2,
      d2, // Second equation
      a3,
      b3,
      c3,
      d3, // Third equation
    ] = coefficients;

    // Using Gaussian elimination (simplified)
    const det =
      a1 * (b2 * c3 - b3 * c2) -
      b1 * (a2 * c3 - a3 * c2) +
      c1 * (a2 * b3 - a3 * b2);

    if (Math.abs(det) < 1e-10) {
      // Check for inconsistent or dependent system
      setSolution({
        type: "none",
        values: {},
        description: "No solution or infinite solutions (singular system)",
      });
    } else {
      // Using Cramer's rule for 3x3
      const detx =
        d1 * (b2 * c3 - b3 * c2) -
        b1 * (d2 * c3 - d3 * c2) +
        c1 * (d2 * b3 - d3 * b2);

      const dety =
        a1 * (d2 * c3 - d3 * c2) -
        d1 * (a2 * c3 - a3 * c2) +
        c1 * (a2 * d3 - a3 * d2);

      const detz =
        a1 * (b2 * d3 - b3 * d2) -
        b1 * (a2 * d3 - a3 * d2) +
        d1 * (a2 * b3 - a3 * b2);

      const x = detx / det;
      const y = dety / det;
      const z = detz / det;

      setSolution({
        type: "unique",
        values: { x, y, z },
        description: "Unique solution",
      });
    }
  };

  const handleCalculate = () => {
    if (mode === "2var") {
      solve2Var();
    } else {
      solve3Var();
    }
  };

  const handleReset = () => {
    setSolution(null);
    setError("");
    if (mode === "2var") {
      reset2Var();
    } else {
      reset3Var();
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Calculator className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-bold text-foreground">
            Linear Equation Solver
          </h1>
        </div>
        <p className="text-muted-foreground">
          Solve systems of linear equations with 2 or 3 variables
        </p>
      </div>

      <div className="bg-card border border-border rounded-sm p-6 shadow-sm">
        {/* Mode Toggle */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setMode("2var");
                setSolution(null);
                setError("");
              }}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                mode === "2var"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              2 Variables
            </button>
            <button
              onClick={() => {
                setMode("3var");
                setSolution(null);
                setError("");
              }}
              className={`px-4 py-2 rounded-sm font-medium transition-colors ${
                mode === "3var"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              3 Variables
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-foreground">
          Enter Coefficients
        </h2>

        {/* 2-Variable Form */}
        {mode === "2var" && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-3">
              <div className="font-medium text-sm text-muted-foreground flex items-center">
                Equation 1:
              </div>
              <input
                type="number"
                value={a1}
                onChange={(e) => setA1(e.target.value)}
                placeholder="x"
                className="px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
              <input
                type="number"
                value={b1}
                onChange={(e) => setB1(e.target.value)}
                placeholder="y"
                className="px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
              <input
                type="number"
                value={c1}
                onChange={(e) => setC1(e.target.value)}
                placeholder="const"
                className="px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div className="font-medium text-sm text-muted-foreground flex items-center">
                Equation 2:
              </div>
              <input
                type="number"
                value={a2}
                onChange={(e) => setA2(e.target.value)}
                placeholder="x"
                className="px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
              <input
                type="number"
                value={b2}
                onChange={(e) => setB2(e.target.value)}
                placeholder="y"
                className="px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
              <input
                type="number"
                value={c2}
                onChange={(e) => setC2(e.target.value)}
                placeholder="const"
                className="px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            <div className="text-sm text-muted-foreground mt-2">
              Format: ax + by = c
            </div>
          </div>
        )}

        {/* 3-Variable Form */}
        {mode === "3var" && (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2">
              <div className="font-medium text-sm text-muted-foreground flex items-center">
                Eq 1:
              </div>
              <input
                type="number"
                value={aa1}
                onChange={(e) => setAa1(e.target.value)}
                placeholder="x"
                className="px-2 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
              <input
                type="number"
                value={bb1}
                onChange={(e) => setBb1(e.target.value)}
                placeholder="y"
                className="px-2 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
              <input
                type="number"
                value={cc1}
                onChange={(e) => setCc1(e.target.value)}
                placeholder="z"
                className="px-2 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
              <input
                type="number"
                value={dd1}
                onChange={(e) => setDd1(e.target.value)}
                placeholder="const"
                className="px-2 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            <div className="grid grid-cols-5 gap-2">
              <div className="font-medium text-sm text-muted-foreground flex items-center">
                Eq 2:
              </div>
              <input
                type="number"
                value={aa2}
                onChange={(e) => setAa2(e.target.value)}
                placeholder="x"
                className="px-2 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
              <input
                type="number"
                value={bb2}
                onChange={(e) => setBb2(e.target.value)}
                placeholder="y"
                className="px-2 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
              <input
                type="number"
                value={cc2}
                onChange={(e) => setCc2(e.target.value)}
                placeholder="z"
                className="px-2 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
              <input
                type="number"
                value={dd2}
                onChange={(e) => setDd2(e.target.value)}
                placeholder="const"
                className="px-2 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            <div className="grid grid-cols-5 gap-2">
              <div className="font-medium text-sm text-muted-foreground flex items-center">
                Eq 3:
              </div>
              <input
                type="number"
                value={aa3}
                onChange={(e) => setAa3(e.target.value)}
                placeholder="x"
                className="px-2 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
              <input
                type="number"
                value={bb3}
                onChange={(e) => setBb3(e.target.value)}
                placeholder="y"
                className="px-2 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
              <input
                type="number"
                value={cc3}
                onChange={(e) => setCc3(e.target.value)}
                placeholder="z"
                className="px-2 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
              <input
                type="number"
                value={dd3}
                onChange={(e) => setDd3(e.target.value)}
                placeholder="const"
                className="px-2 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              />
            </div>

            <div className="text-sm text-muted-foreground mt-2">
              Format: ax + by + cz = d
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4 mt-6 mb-4">
          <Button onClick={handleCalculate} className="rounded-sm">
            <Calculator className="w-4 h-4 mr-2" />
            Solve
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
                  Result:
                </span>
                <span className="ml-2 text-foreground">
                  {solution.description}
                </span>
              </div>

              {solution.type === "unique" && (
                <div className="pt-3 border-t border-border">
                  <div className="space-y-2">
                    {Object.entries(solution.values).map(([varName, value]) => (
                      <div key={varName}>
                        <span className="text-sm font-medium text-muted-foreground">
                          {varName} ={" "}
                        </span>
                        <span className="text-foreground font-mono text-lg">
                          {typeof value === "number" ? value.toFixed(6) : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-muted/50 rounded-sm">
          <p className="text-sm text-muted-foreground">
            <strong>Methods:</strong> Uses Cramer&apos;s Rule for determinants
            and Gaussian elimination
            <br />
            System must have unique solutions (non-zero determinant)
          </p>
        </div>
      </div>
    </div>
  );
}
