export const STORAGE_KEY = 'gemini_api_key';

export const getApiKey = () => localStorage.getItem(STORAGE_KEY);
export const setApiKey = (key: string) => localStorage.setItem(STORAGE_KEY, key);

export const generateContent = async (prompt: string): Promise<string> => {
  const key = getApiKey();
  if (!key) throw new Error('API Key missing');

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
        }
      })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'API Request failed');
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
      console.error("AI Generation Error:", error);
      throw error;
  }
};
