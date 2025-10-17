/**
 * Question Image Migration Script
 * ===============================
 * 
 * This script helps migrate existing questions with local image references
 * to use Bunny CDN URLs.
 */

import { convertLatexImageToCDN, extractImageFilenames } from '@/lib/imageUtils';

// Your specific question data
const questionId = '93155907-2ea3-4cfe-83b4-c8f0afdb604a';
const originalLatex = `The following diagram shows part of the graph of $y=\\sin x$ for $0 \\leq x \\leq 2 \\pi$.
% Diagram Begins
\\begin{center}
\\includegraphics[width=0.4\\textwidth]{IBDP_QB_AA SL_Practice Question_Moodle_Integral Calculus_2.png}
\\end{center}
% Diagram Ends
Calculate
\\begin{enumerate}[label=\\roman*)]
\\item $\\int_0^{\\pi} \\sin x dx$
\\item $\\int_{\\pi}^{\\frac{3 \\pi}{2}} \\sin x dx$
\\item $\\int_0^{2\\pi} \\sin x dx$
\\end{enumerate}`;

// Step 1: Extract the image filename
const imageFilenames = extractImageFilenames(originalLatex);
console.log('Found image filenames:', imageFilenames);

// Step 2: Replace with your CDN URL
const cdnUrl = 'https://shrividhyaclasses.b-cdn.net/question-images/1734567890-IBDP_QB_AA_SL_Practice_Question_Moodle_Integral_Calculus_2.png';

const updatedLatex = convertLatexImageToCDN(originalLatex, cdnUrl);
console.log('Updated LaTeX:', updatedLatex);

// Step 3: Update the question in the database
async function updateQuestionWithCDNImage() {
  try {
    const response = await fetch(`/api/question-bank/${questionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question_text: updatedLatex,
        image_url: cdnUrl, // Store the CDN URL in the image_url field
      }),
    });

    if (response.ok) {
      console.log('✅ Question updated successfully with CDN image URL');
    } else {
      console.error('❌ Failed to update question:', await response.text());
    }
  } catch (error) {
    console.error('❌ Error updating question:', error);
  }
}

// Uncomment to run the update
// updateQuestionWithCDNImage();

export { updatedLatex, cdnUrl };
