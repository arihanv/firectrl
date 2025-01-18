import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GOOGLE_API_KEY) {
  throw new Error('Missing GOOGLE_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const geminiVisionModel = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

export async function streamGeminiResponse(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  tools?: any[]
) {
  const formattedMessages = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : msg.role,
    parts: [{ text: msg.content }]
  }));

  const chat = geminiModel.startChat({
    history: formattedMessages.slice(1), // Skip system message as Gemini handles it differently
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
    },
  });

  const systemMessage = messages.find(msg => msg.role === 'system')?.content;
  const result = await chat.sendMessageStream(
    systemMessage 
      ? `${systemMessage}\n\nUser request: ${messages[messages.length - 1].content}`
      : messages[messages.length - 1].content
  );

  return result;
}
