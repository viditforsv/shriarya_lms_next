import { FilterPluginConfig } from "../AdvancedFilterPlugin";

export const questionBankFilterConfig: FilterPluginConfig = {
  apiEndpoint: "/api/question-bank",

  availableFields: [
    { value: "difficulty", label: "Difficulty", type: "number" },
    {
      value: "subject",
      label: "Subject",
      type: "select",
      options: ["Mathematics", "mathematics"],
    },
    {
      value: "question_type",
      label: "Question Type",
      type: "select",
      options: ["mcq", "subjective", "true_false", "fill_blank"],
    },
    {
      value: "boards",
      label: "Boards",
      type: "select",
      options: ["IBDP", "CBSE", "ICSE", "IGCSE", "A-Levels", "SAT", "ACT"],
    },
    {
      value: "course_types",
      label: "Course Types",
      type: "select",
      options: ["AA", "AI"],
    },
    {
      value: "levels",
      label: "Levels",
      type: "select",
      options: ["SL", "HL"],
    },
    {
      value: "relevance",
      label: "Relevance",
      type: "select",
      options: [
        "Practice",
        "Exam Style",
        "Homework",
        "Quiz",
        "Assessment",
        "Review",
        "Challenge",
      ],
    },
    {
      value: "grade",
      label: "Grade",
      type: "select",
      options: ["9", "10", "11", "12", "13"],
    },
    { value: "topic", label: "Topic", type: "text" },
    { value: "is_pyq", label: "Is PYQ", type: "boolean" },
    { value: "pyq_year", label: "PYQ Year", type: "number" },
    {
      value: "month",
      label: "Month",
      type: "select",
      options: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    { value: "paper_number", label: "Paper Number", type: "number" },
    { value: "total_marks", label: "Total Marks", type: "number" },
  ],

  legacyFilters: {
    subject: "",
    difficulty: "",
    question_type: "",
    boards: "",
    course_types: "",
    levels: "",
    relevance: "",
    grade: "",
    topic: "",
    is_pyq: "",
    qa_status: "",
    pyq_year: "",
    month: "",
    paper_number: "",
  },

  enablePreview: false, // Question bank doesn't need preview in the same way

  buildRequestParams: (
    advancedFilters,
    legacyFilters,
    additionalParams = {}
  ) => ({
    ...(advancedFilters.length > 0 && {
      advanced_filters: JSON.stringify(advancedFilters),
    }),
    ...legacyFilters,
    ...additionalParams,
  }),
};
