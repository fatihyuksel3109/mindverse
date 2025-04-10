// client/utils/ai.ts
const API_URL = 'http://localhost:3000'; // Match your backend URL

export async function interpretDream(dreamText: string, language: string, token: string): Promise<string> {
  try {
    console.log('Calling interpret API with:', { dreamText, language, token }); // Debug log
    const response = await fetch(`${API_URL}/api/interpret`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dreamText, language }),
    });

    const data = await response.json();
    console.log('Interpret API response:', data); // Debug log

    if (!response.ok) {
      throw new Error(data.error || 'Failed to interpret dream');
    }

    return data.interpretation; // Backend returns interpretation
  } catch (error) {
    console.error('Error in interpretDream:', error);
    throw error; // Propagate error to caller
  }
}