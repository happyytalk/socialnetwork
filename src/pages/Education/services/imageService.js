const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
// Use local proxy to avoid CORS
const BASE_URL = "/api/unsplash/search/photos";

export const fetchUnsplashImage = async (query) => {
  if (!UNSPLASH_KEY) return null;
  try {
    const response = await fetch(`${BASE_URL}?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_KEY}`
      }
    });
    
    if (!response.ok) {
       console.warn("Unsplash API response not OK:", response.status);
       return null;
    }

    const data = await response.json();
    return data.results[0]?.urls?.regular || null;
  } catch (error) {
    console.error("Unsplash API Error:", error);
    return null;
  }
};
