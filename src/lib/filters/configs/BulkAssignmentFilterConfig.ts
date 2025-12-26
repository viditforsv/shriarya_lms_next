import { FilterPluginConfig } from "../AdvancedFilterPlugin";

export const bulkAssignmentFilterConfig: FilterPluginConfig = {
  apiEndpoint: "/api/question-assignments/bulk",

  availableFields: [
    { value: "subject", label: "Subject", type: "select", options: ["HL"] },
    { value: "difficulty", label: "Difficulty", type: "number" },
    {
      value: "question_type",
      label: "Question Type",
      type: "select",
      options: ["MCQ", "Short Answer", "Long Answer", "Numerical"],
    },
    { value: "board", label: "Board", type: "select", options: ["IBDP"] },
    { value: "grade", label: "Grade", type: "select", options: ["12"] },
    { value: "topic", label: "Topic", type: "text" },
    { value: "is_pyq", label: "Is PYQ", type: "boolean" },
    { value: "pyq_year", label: "PYQ Year", type: "number" },
    { value: "month", label: "Month", type: "text" },
    { value: "paper_number", label: "Paper Number", type: "number" },
    {
      value: "qa_status",
      label: "QA Status",
      type: "select",
      options: ["pending", "reviewed", "approved", "rejected"],
    },
  ],

  legacyFilters: {
    subject: "",
    difficulty: "",
    question_type: "",
    board: "",
    grade: "",
    topic: "",
    is_pyq: "",
    pyq_year: "",
    month: "",
    paper_number: "",
    qa_status: "",
  },

  enablePreview: true, // Bulk assignments need preview functionality

  buildRequestParams: (advancedFilters, legacyFilters) => {
    const params: Record<string, string | number | boolean> = {
      preview: true,
      limit: 1,
    };

    if (advancedFilters.length > 0) {
      params.advanced_filters = JSON.stringify(advancedFilters);
    }

    if (Object.keys(legacyFilters).length > 0) {
      Object.assign(params, legacyFilters);
    }

    return params;
  },
};
