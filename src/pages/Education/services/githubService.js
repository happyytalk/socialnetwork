const GITHUB_PAT = import.meta.env.VITE_GITHUB_PAT;
// Use local proxy to avoid CORS
const BASE_URL = "/api/github/chat/completions";

export const chatWithGitHubAI = async (message, history = [], systemPrompt = null) => {
  if (!GITHUB_PAT) {
    return "Error: VITE_GITHUB_PAT is missing in .env file.";
  }

  const messages = [
    { role: "system", content: systemPrompt || "You are a helpful language learning assistant." },
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
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("GitHub AI API Error:", error);
    return `Error: ${error.message}. Please check your connection and API key.`;
  }
};
