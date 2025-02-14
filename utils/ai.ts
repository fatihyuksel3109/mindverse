import OpenAI from 'openai';
import { Dream } from '../types/dream';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are a skilled dream interpreter with deep knowledge of psychology, symbolism, and cultural interpretations of dreams. 
Analyze the dream and provide an insightful interpretation that considers:
1. The symbolic meaning of key elements
2. Possible emotional significance
3. Cultural context if relevant
4. Potential connections to the dreamer's life

Keep the interpretation concise but meaningful, around 2-3 paragraphs.`;

export async function interpretDream(dreamText: string, language: string): Promise<string> {
  try {
    // Adjust the instruction for language dynamically
    const languageInstruction = {
      en: `Please interpret this dream in English: ${dreamText}`,
      fr: `Veuillez interpréter ce rêve en français : ${dreamText}`,
      tr: `Lütfen bu rüyayı Türkçe olarak yorumlayın: ${dreamText}`,
      de: `Bitte interpretieren Sie diesen Traum auf Deutsch: ${dreamText}`,
      ar: `يرجى تفسير هذا الحلم بالعربية: ${dreamText}`
    }[language] || `Please interpret this dream in ${language}: ${dreamText}`; // default fallback

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: languageInstruction }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content || 'No interpretation available';
  } catch (error) {
    console.error('Error interpreting dream:', error);
    throw new Error('Failed to interpret dream');
  }
}
