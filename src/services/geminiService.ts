import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from '../constants';

// 1. Get Key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ API Key missing. Please check .env file");
}

// 2. Initialize Client
const genAI = new GoogleGenerativeAI(apiKey || "");

console.log("DEBUG: Initializing Gemini Client");
console.log("DEBUG: API Key Present:", !!apiKey);
if (apiKey) console.log("DEBUG: API Key First 4 chars:", apiKey.substring(0, 4));

// Models to try in order
const MODELS_TO_TRY = ["gemini-1.5-flash-latest", "gemini-1.5-flash", "gemini-pro"];

let currentModelIndex = 0;
let chatSession: any = null;

const createSession = (modelName: string) => {
  console.log(`Initializing Chat with model: ${modelName}`);
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  return model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });
};

export const getChatSession = () => {
  if (!chatSession) {
    chatSession = createSession(MODELS_TO_TRY[currentModelIndex]);
  }
  return chatSession;
};

export const resetChatSession = () => {
  chatSession = null;
  currentModelIndex = 0; // Reset fallback logic too
  console.log("Chat session reset");
};

// 4. Real Streaming Function with Fallback
export const sendMessageStream = async (message: string): Promise<any> => {
  try {
    const session = getChatSession();
    const result = await session.sendMessageStream(message);

    // Convert Google stream to UI format
    return (async function* () {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        yield {
          text: text,
          candidates: []
        };
      }
    })();

  } catch (error: any) {
    console.error(`Gemini API Error (${MODELS_TO_TRY[currentModelIndex]}):`, error);

    // Check for 404 (Model not found) or 503 (Overloaded) and if we have fallback models left
    if (currentModelIndex < MODELS_TO_TRY.length - 1) {
      console.warn(`⚠️ Model ${MODELS_TO_TRY[currentModelIndex]} failed. Switching to fallback...`);
      currentModelIndex++;
      chatSession = null; // Force new session creation
      return sendMessageStream(message); // Retry recursively
    }

    // If completely failed or other error
    let userMessage = "\n\n(Connection Error. Please try again.)";

    if (error.message.includes("404") || error.message.includes("not found")) {
      userMessage = "\n\n🔴 **API Error**: The model was not found. This usually means the **'Generative Language API'** is not enabled in your Google Cloud Console for this API Key.";
    }

    return (async function* () {
      yield { text: userMessage, candidates: [] };
    })();
  }
};