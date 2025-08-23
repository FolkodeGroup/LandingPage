import { GoogleGenAI, Chat, Content, Part, Type } from "@google/genai";
import { getSystemInstruction, getSummaryInstruction } from '../constants';
import { Language, Message, SummaryReport } from "../types";
import { locales } from "../i18n/locales";

// The API key is injected via environment variables.
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  // This will be visible in the console if the API_KEY is not set.
  // The app will continue to run but Gemini calls will fail.
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const getGeminiConnectionError = (lang: Language): string => {
    return locales.geminiConnectionError[lang] || locales.geminiConnectionError.en;
}

const fileToPart = (file: { dataUrl: string, mimeType: string }): Part | null => {
  // Only process files with a valid base64 data URL. Documents will have an empty dataUrl.
  if (!file.dataUrl || !file.dataUrl.includes(';base64,')) {
    return null;
  }
  return {
    inlineData: {
      data: file.dataUrl.split(',')[1],
      mimeType: file.mimeType,
    },
  };
};

export const geminiService = {
  messageToContent: (message: Message): Content => {
    const role = message.sender === 'user' ? 'user' : 'model';
    // Ensure text is not null/undefined
    const text = message.text || '';
    const parts: Part[] = [{ text }];
    if (message.file) {
      const filePart = fileToPart(message.file);
      if (filePart) {
        parts.push(filePart);
      }
    }
    return { role, parts };
  },

  startChat: (history: Content[], lang: Language, userName: string): Chat => {
    return ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(lang, userName),
      },
      history: history,
    });
  },

  sendMessageStream: async (
    chat: Chat, 
    message: Message, 
    personalityPrefix: string,
    onChunk: (chunk: string) => void,
    onComplete: (fullText: string) => void
  ): Promise<void> => {
    let fullText = '';
    try {
      const parts: Part[] = [{ text: personalityPrefix + message.text }];
      if (message.file) {
        const filePart = fileToPart(message.file);
        if (filePart) {
          parts.push(filePart);
        }
      }
      
      const result = await chat.sendMessageStream({ message: parts });
      
      for await (const chunk of result) {
        const chunkText = chunk.text ?? '';
        fullText += chunkText;
        onChunk(chunkText);
      }
      onComplete(fullText);

    } catch (error) {
      console.error("Gemini API Error:", error);
      const lang = (document.documentElement.lang as Language) || 'en';
      onChunk(getGeminiConnectionError(lang));
      onComplete(getGeminiConnectionError(lang));
    }
  },

  generateSummary: async (messages: Message[], lang: Language): Promise<SummaryReport> => {
    try {
      const transcript = messages
        .filter(m => m.text) // Filter out messages without text (e.g. only components)
        .map(m => `${m.sender === 'user' ? 'Client' : 'Assistant'}: ${m.text}`)
        .join('\n\n');

      const fullPrompt = `TRANSCRIPT:\n\n${transcript}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
          systemInstruction: getSummaryInstruction(lang),
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              tags: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              temperature: { type: Type.STRING },
              leadScore: { type: Type.NUMBER },
              painPoint: { type: Type.STRING },
              budgetMention: { type: Type.STRING },
              timelineMention: { type: Type.STRING }
            }
          }
        }
      });
      
      const textResponse = (response.text ?? '').trim();
      if (!textResponse) {
          throw new Error("Received empty summary response from API.");
      }
      
      const report = JSON.parse(textResponse);
      // Basic validation
      if (report && report.summary && report.tags && report.temperature) {
        return report;
      }
      throw new Error("Invalid summary format received");

    } catch (error) {
       console.error("Gemini Summary Error:", error);
       // Return a fallback error report
       return {
          summary: "An error occurred while generating the summary.",
          tags: ["Error"],
          temperature: "Cold"
       };
    }
  }
};