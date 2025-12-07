require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); 
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from 'public' folder. 
// If index.html exists in root, express might prefer root, but we encourage using public/
app.use(express.static(path.join(__dirname, 'public')));

// Check for API Key
if (!process.env.API_KEY) {
  console.error("❌ ERROR: API_KEY is missing in environment variables.");
}

// Initialize Gemini
let ai;
try {
    ai = new GoogleGenerativeAI(process.env.API_KEY);
} catch (e) {
    console.warn("⚠️ GoogleGenAI not initialized (Missing API Key)");
}

// --- KNOWLEDGE BASE ---
const KNOWLEDGE_BASE = `
CITIZEN PROPERTIES — KNOWLEDGE FILE (MUMBAI & THANE)
VERSION: 1.0

1) QUICK MARKET OVERVIEW
• Mumbai: premium, high-demand pockets (South Mumbai, Bandra, Juhu, Andheri, Powai, Chembur) and fast-moving suburban clusters (Goregaon, Malad, Kandivali, Kharghar).
• Thane: strong growth corridor, family-focused suburbs (Thane West, Majiwada, Ghodbunder Road, Kalyan).
• Key takeaways for agents: emphasize locality (schools, hospitals, transit), clarity on carpet vs built-up area, and possession timelines.

2) PROPERTY TYPES & CONFIGURATIONS
• Apartment: 1 BHK (450-650 sqft carpet), 2 BHK (650-900 sqft), 3 BHK (900-1400 sqft).
• Pricing (Mumbai): Prime (₹3.5 Cr+), Upper-Mid (₹1.5-3.5 Cr), Mid (₹80L-1.5 Cr), Affordable (₹35L-80L).
• Pricing (Thane): Premium (₹1.5 Cr+), Upper-Mid (₹80L-1.5 Cr), Mid (₹40L-80L), Affordable (₹20L-40L).

3) SAMPLE LISTINGS (REALISTIC DUMMY DATA)
• "Seaview Serenity" (Bandra West): 2 BHK, 900 sqft, ₹2.40 Cr. Sea-facing, ready-to-move.
• "Urban Nest" (Andheri West): 1 BHK, 520 sqft, ₹78 L. Gated, near metro.
• "Powai Park Towers - 3B" (Powai): 3 BHK, 1250 sqft, ₹3.10 Cr. Lake view, poss 2026.
• "Link Road Studio" (Malad West): Studio, 320 sqft, Rent ₹18k/mo. Furnished.
• "Family Haven" (Thane West - Majiwada): 2 BHK, 780 sqft, ₹95 L. Near school.
• "Ghodbunder Greens" (Thane): 2 BHK, 820 sqft, ₹62 L. New project (2025).
• "Kalyan Budget Home" (Kalyan): 1 BHK, 420 sqft, ₹21 L. Investor friendly.
• "Pali Hills Villa" (Juhu Edge): 4 BHK Villa, 2500 sqft, ₹9.25 Cr. Private garden.

4) PROCESS & CHECKLISTS
• Buyer Documents: ID, PAN, Income Proof, Loan Pre-approval.
• Seller Documents: Title deed, EC, Tax receipts, NOC, Loan closure.
• Sales Flow: Lead -> Qualification -> Site Visit -> Negotiation -> Token -> Due Diligence -> Registration -> Handover.
`;

const WEBSITE_LINK = "https://citizen-properties.lovable.app/";

const SYSTEM_INSTRUCTION = `
You are Aarini, the AI Lead Qualification Assistant for "Citizen Properties".
Use the Internal Knowledge Base and Google Search to answer.

Knowledge Base: "${KNOWLEDGE_BASE}"
Website: ${WEBSITE_LINK}

Rules:
1. Prioritize the Knowledge Base.
2. Use Google Search to verify external facts or browse ${WEBSITE_LINK}.
3. Be concise, professional, and friendly.
4. Only suggest listings from the Knowledge Base unless found via Search on the official site.

IMPORTANT: End every response with exactly 3 short follow-up questions in this format:
---SUGGESTIONS---
Question 1
Question 2
Question 3
`;

// --- API ENDPOINT ---
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!ai) {
    return res.status(500).json({ error: "Server missing API Key" });
  }

  try {
    const formattedHistory = history ? history.map(msg => ({
      role: msg.sender === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    })) : [];

    const model = ai.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
    });

    const chat = model.startChat({
      history: formattedHistory,
      history: history || [],
    });

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');

    const result = await chat.sendMessageStream(message);

    for await (const chunk of result.stream) {
      const responseChunk = { text: chunk.text() };
      if (chunk.candidates?.[0]?.groundingMetadata?.groundingChunks) {
        responseChunk.grounding = chunk.candidates[0].groundingMetadata.groundingChunks;
      }
      
      if (responseChunk.text || responseChunk.grounding) {
        res.write(JSON.stringify(responseChunk) + '\n');
      }
    }
    res.end();

  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
