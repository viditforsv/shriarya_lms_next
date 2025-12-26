/**
 * Image URL Conversion Utility
 * ===========================
 *
 * This utility helps convert LaTeX image references to CDN URLs
 * and provides functions to manage image URLs in question content.
 */

/**
 * Converts LaTeX \includegraphics references to CDN URLs
 * @param latexContent - The LaTeX content containing \includegraphics commands
 * @param imageUrl - The CDN URL to replace the image reference with
 * @returns Updated LaTeX content with CDN URL
 */
export function convertLatexImageToCDN(
  latexContent: string,
  imageUrl: string
): string {
  // Pattern to match \includegraphics commands
  const includegraphicsPattern = /\\includegraphics(?:\[[^\]]*\])?\\{[^}]+\\}/g;

  return latexContent.replace(includegraphicsPattern, (match) => {
    // Replace with CDN URL, preserving any options
    const optionsMatch = match.match(/\\includegraphics(\\[[^\\]]*\\])?/);
    const options = optionsMatch ? optionsMatch[1] : "";

    return `\\includegraphics${options}{${imageUrl}}`;
  });
}

/**
 * Extracts image filenames from LaTeX \includegraphics commands
 * @param latexContent - The LaTeX content to search
 * @returns Array of image filenames found in \includegraphics commands
 */
export function extractImageFilenames(latexContent: string): string[] {
  const includegraphicsPattern = /\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}/g;
  const filenames: string[] = [];
  let match;

  while ((match = includegraphicsPattern.exec(latexContent)) !== null) {
    filenames.push(match[1]);
  }

  return filenames;
}

/**
 * Checks if LaTeX content contains image references
 * @param latexContent - The LaTeX content to check
 * @returns True if content contains \includegraphics commands
 */
export function hasImageReferences(latexContent: string): boolean {
  return /\\includegraphics(?:\[[^\]]*\])?\{[^}]+\}/.test(latexContent);
}

/**
 * Generates a CDN URL for question images
 * @param filename - The original filename
 * @param questionId - The question ID (optional)
 * @returns CDN URL for the image
 */
export function generateQuestionImageCDNUrl(
  filename: string,
  questionId?: string
): string {
  const cdnBaseUrl =
    process.env.NEXT_PUBLIC_BUNNY_CDN_URL ||
    "https://shrividhyaclasses.b-cdn.net";

  // Clean filename and add timestamp for uniqueness
  const cleanFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  const timestamp = Date.now();

  if (questionId) {
    return `${cdnBaseUrl}/question-images/${questionId}/${timestamp}-${cleanFilename}`;
  } else {
    return `${cdnBaseUrl}/question-images/${timestamp}-${cleanFilename}`;
  }
}

/**
 * Example usage for your specific question:
 *
 * Original LaTeX:
 * \includegraphics[width=0.4\textwidth]{IBDP_QB_AA SL_Practice Question_Moodle_Integral Calculus_2.png}
 *
 * After conversion:
 * \includegraphics[width=0.4\textwidth]{https://your-cdn.com/question-images/1234567890-IBDP_QB_AA_SL_Practice_Question_Moodle_Integral_Calculus_2.png}
 */
