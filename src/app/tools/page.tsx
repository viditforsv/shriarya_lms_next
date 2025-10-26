"use client";

import { useState } from "react";
import { ToolsSidebar } from "@/components/ToolsSidebar";
import { QuadraticCalculator } from "@/components/tools/QuadraticCalculator";
import { LinearEquationSolver } from "@/components/tools/LinearEquationSolver";
import { BinomialCalculator } from "@/components/tools/BinomialCalculator";
import { NormalCalculator } from "@/components/tools/NormalCalculator";
import { InverseNormalCalculator } from "@/components/tools/InverseNormalCalculator";
import { PoissonCalculator } from "@/components/tools/PoissonCalculator";

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<string>("binomial");

  const renderTool = () => {
    switch (selectedTool) {
      case "quadratic":
        return <QuadraticCalculator />;
      case "linear":
        return <LinearEquationSolver />;
      case "binomial":
        return <BinomialCalculator />;
      case "normal":
        return <NormalCalculator />;
      case "inverse-normal":
        return <InverseNormalCalculator />;
      case "poisson":
        return <PoissonCalculator />;
      default:
        return <BinomialCalculator />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <ToolsSidebar
        selectedTool={selectedTool}
        onSelectTool={setSelectedTool}
      />
      <main className="flex-1 p-8 overflow-auto">{renderTool()}</main>
    </div>
  );
}
