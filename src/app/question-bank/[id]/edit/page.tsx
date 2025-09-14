"use client";

import { useEffect, useState } from "react";
import QuestionDetailPage from "../page";

export default function EditQuestionPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Force edit mode by modifying the URL
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (!currentPath.includes("/edit")) {
        window.history.replaceState(null, "", `${currentPath}/edit`);
      }
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return <QuestionDetailPage />;
}
