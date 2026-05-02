const GITHUB_PAT = import.meta.env.VITE_GITHUB_PAT;
// Use local proxy to avoid CORS
const BASE_URL = "/api/github/chat/completions";

const SYSTEM_PROMPT = `You are a highly capable AI tutor for the Happy Learning platform — an educational app for Indian languages.
Your role is to help students learn Indian languages, their scripts, grammar, pronunciation, and culture.

## Rules
- Keep responses brief (1–3 sentences) during voice mode.
- If the user asks in Hindi, Telugu, Tamil or any Indian language, respond in that language.
- Explain scripts (Devanagari, Gurmukhi, Odia, etc.) clearly and enthusiastically.
- Be warm, encouraging, and fun — you are teaching kids and adults alike.
- When asked about a letter or word, show the native script, the romanization, and an example.`;

export const chatWithOpenAI = async (message, history = []) => {
  if (!GITHUB_PAT) {
    return "Error: VITE_GITHUB_PAT is missing.";
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: message }
  ];

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GITHUB_PAT}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", 
        messages,
        temperature: 0.75,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
       const errorData = await response.json().catch(() => ({}));
       throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content;
    }
    throw new Error("Invalid response from AI");
  } catch (error) {
    console.error("AI API Error:", error);
    return `I'm having trouble connecting right now (${error.message}). Please try again in a moment!`;
  }
};
