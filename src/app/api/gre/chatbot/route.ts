import { NextRequest, NextResponse } from 'next/server';
import { Question } from '@/types/gre-test';

interface ChatbotContext {
  question?: Question;
  sectionType?: 'verbal' | 'quantitative';
  userAnswer?: string | number | string[] | null;
  questionPrompt?: string;
  correctAnswer?: string | string[];
}

interface ChatbotRequestBody {
  message: string;
  context?: ChatbotContext;
}

/**
 * POST /api/gre/chatbot
 * AI chatbot endpoint for Study Mode
 * Provides context-aware explanations and help for GRE questions using Google Gemini
 */
export async function POST(request: NextRequest) {
  let body: ChatbotRequestBody;
  let message: string = '';
  let context: ChatbotContext | undefined;
  
  try {
    body = await request.json();
    message = body.message;
    context = body.context;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get Gemini API key from environment
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_GEMINI_API_KEY is not set');
      // Fallback to mock response if API key is not configured
      const mockResponse = generateMockResponse(message, context);
      return NextResponse.json({
        response: mockResponse,
        success: true,
        warning: 'Using mock response - API key not configured'
      });
    }

    // Extract context
    const {
      sectionType,
      userAnswer,
      questionPrompt,
      correctAnswer
    } = context || {};

    // Build system instruction with context
    const systemInstruction = `You are a helpful GRE tutor AI assistant. Your role is to help students understand GRE questions and improve their test-taking skills.

Context:
- Section Type: ${sectionType || 'Unknown'}
- Current Question: ${questionPrompt ? questionPrompt.substring(0, 1000) : 'Not available'}
- Correct Answer: ${correctAnswer || 'Not available'}
- User's Answer: ${userAnswer !== null && userAnswer !== undefined ? userAnswer : 'Not answered yet'}

Guidelines:
1. Provide clear, educational explanations
2. For math questions, show step-by-step solutions with LaTeX formatting
3. For verbal questions, explain reasoning and vocabulary
4. Be encouraging and supportive
5. Use LaTeX format for math expressions (e.g., $x^2$ for inline, $$x^2$$ for display)
6. Keep responses concise but thorough
7. If the user asks about the current question, reference the question details provided
8. Always format mathematical expressions using LaTeX syntax`;

    // Call Google Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemInstruction}\n\nUser's question: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${geminiResponse.status} ${geminiResponse.statusText}`);
    }

    const geminiData = await geminiResponse.json();
    
    // Extract the response text from Gemini's response structure
    const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      console.error('Unexpected Gemini response structure:', geminiData);
      // Fallback to mock response
      const mockResponse = generateMockResponse(message, context);
      return NextResponse.json({
        response: mockResponse,
        success: true,
        warning: 'Using mock response - Unexpected API response format'
      });
    }

    return NextResponse.json({
      response: responseText,
      success: true
    });
  } catch (error) {
    console.error('Error in chatbot API:', error);
    
    // Fallback to mock response on error
    if (message) {
      const mockResponse = generateMockResponse(message, context);
      return NextResponse.json({
        response: mockResponse,
        success: true,
        warning: 'Using mock response due to API error'
      });
    }
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
        success: false
      },
      { status: 500 }
    );
  }
}

/**
 * Generate a mock AI response based on the user's message and context
 * This should be replaced with actual AI service integration
 */
function generateMockResponse(message: string, context?: ChatbotContext): string {
  const lowerMessage = message.toLowerCase();
  const { question, sectionType, userAnswer, correctAnswer } = context || {};

  // Check if asking about the current question
  if (lowerMessage.includes('explain') || lowerMessage.includes('why') || lowerMessage.includes('how')) {
    if (sectionType === 'quantitative') {
      return `To solve this quantitative question, let's break it down step by step:

1. **Understand the problem**: ${question?.prompt ? question.prompt.substring(0, 200) + '...' : 'Review the question carefully'}

2. **Identify what's being asked**: Look for key mathematical concepts and relationships.

3. **Apply the appropriate method**: 
   - For algebra problems, set up equations
   - For geometry, use formulas and properties
   - For data interpretation, analyze the given information

4. **Check your work**: Verify that your answer makes sense in context.

The correct answer is: ${correctAnswer || 'Not available'}

Would you like me to explain any specific step in more detail?`;
    } else {
      return `For this verbal reasoning question, here's how to approach it:

1. **Read carefully**: Pay attention to the passage and question details.

2. **Identify key information**: Look for main ideas, supporting details, and relationships.

3. **Eliminate wrong answers**: Cross out options that don't match the passage or question.

4. **Choose the best answer**: Select the option that most accurately answers the question.

The correct answer is: ${correctAnswer || 'Not available'}

${userAnswer && userAnswer !== correctAnswer 
  ? `Your answer was: ${userAnswer}. Let me explain why the correct answer is better...` 
  : 'Would you like me to explain any specific part of the question or passage?'}`;
    }
  }

  // General GRE strategy questions
  if (lowerMessage.includes('strategy') || lowerMessage.includes('tip') || lowerMessage.includes('advice')) {
    return `Here are some effective GRE strategies:

**Time Management:**
- Allocate about 1.5-2 minutes per question
- Don't spend too long on any single question
- Flag difficult questions and return to them

**Quantitative Reasoning:**
- Show your work step by step
- Check your calculations
- Use the calculator for complex arithmetic

**Verbal Reasoning:**
- Read passages actively, looking for main ideas
- Pay attention to transition words
- Eliminate obviously wrong answers first

**General Tips:**
- Practice regularly to build familiarity
- Review your mistakes to learn from them
- Stay calm and focused during the test

Is there a specific area you'd like more help with?`;
  }

  // Default response
  return `I understand you're asking: "${message}"

${question 
  ? `I can help you with the current question. Would you like me to:
- Explain why the correct answer is right?
- Show you step-by-step how to solve it?
- Help you understand any confusing parts?

Just let me know what you need!`
  : 'I\'m here to help you with GRE questions, explanations, and strategies. What would you like to know?'}`;
}

