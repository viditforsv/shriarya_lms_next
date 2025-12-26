"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
} from "@/design-system/components/ui/card";
import {
  ArrowLeft,
  FileQuestion,
  CheckSquare,
  HelpCircle,
  Type,
} from "lucide-react";

const questionTypes = [
  {
    value: "mcq",
    label: "Multiple Choice Question",
    icon: CheckSquare,
    description: "Question with multiple options where one is correct",
    color: "from-blue-500 to-blue-600",
  },
  {
    value: "subjective",
    label: "Subjective Question",
    icon: FileQuestion,
    description: "Open-ended question requiring detailed written answer",
    color: "from-purple-500 to-purple-600",
  },
  {
    value: "true_false",
    label: "True or False",
    icon: HelpCircle,
    description: "Binary choice question with True or False answers",
    color: "from-green-500 to-green-600",
  },
  {
    value: "fill_blank",
    label: "Fill in the Blank",
    icon: Type,
    description: "Question with missing word or phrase to be filled",
    color: "from-amber-500 to-amber-600",
  },
];

export default function NewQuestionPage() {
  const router = useRouter();

  const handleSelectType = (type: string) => {
    router.push(`/question-bank/new/${type}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/question-bank")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Select Question Type
                </h1>
                <p className="text-muted-foreground mt-1">
                  Choose the type of question you want to create
                </p>
              </div>
            </div>
          </div>

          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Dashboard</span>
            <span>/</span>
            <button
              onClick={() => router.push("/question-bank")}
              className="hover:text-foreground"
            >
              Question Bank
            </button>
            <span>/</span>
            <span className="text-foreground font-medium">New Question</span>
          </nav>
        </div>

        {/* Question Type Selection */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questionTypes.map((type) => (
              <Card
                key={type.value}
                className="cursor-pointer "
                onClick={() => handleSelectType(type.value)}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <type.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {type.label}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {type.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
