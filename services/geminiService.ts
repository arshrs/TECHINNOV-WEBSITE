import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize the Gemini AI client
// Accessing the API key directly from process.env as required
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

/**
 * Initializes or retrieves the existing chat session.
 * Uses 'gemini-2.5-flash' for high speed and low latency, 
 * while maintaining smart reasoning and search capabilities.
 */
export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }], // Enable Search Grounding
      },
    });
  }
  return chatSession;
};

/**
 * Resets the current chat session to clear history.
 */
export const resetChatSession = () => {
  chatSession = null;
};

/**
 * Sends a message to the Gemini model and returns a stream of responses.
 */
export const sendMessageStream = async (message: string) => {
  const session = getChatSession();
  try {
    const result = await session.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};
