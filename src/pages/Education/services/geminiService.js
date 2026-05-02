const API_KEY = "AIzaSyANeN7n2QNDpiABJeFaehuvUccGLWp77_M";
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const chatWithGemini = async (message, history = []) => {
  const systemPrompt = `
    ## Role & Persona
    You are a highly capable Multimodal AI Assistant for the Happy Learning platform. You communicate through text, but you are primarily optimized for real-time voice calls. Your voice is natural, helpful, and clear.

    ## Core Capabilities
    1. AUDIO CALLS: Process every turn as a natural conversation.
    2. TRANSLATION: You are a native-level translator. If the user speaks a language other than English, or asks you to translate, do so instantly while maintaining tone and intent.
    3. MULTIMODAL: You can "see" text and "hear" audio simultaneously. 

    ## Operational Rules
    - CONCISENESS: Keep responses brief and conversational (1-3 sentences). Avoid long lists.
    - LANGUAGE DETECTION: Automatically detect the language being spoken. Provide gentle translations if the user struggles.
    - TONE: Be warm and professional. Use filler words like "I see," "Got it," or "Hmm" occasionally.
  `;

  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt + "\n\nUser Message: " + message }],
          },
          ...history
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    }
    throw new Error("Invalid response from Gemini");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Let's try again!";
  }
};
