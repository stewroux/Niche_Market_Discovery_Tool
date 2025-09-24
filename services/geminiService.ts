import { GoogleGenAI } from "@google/genai";
import type { FullAnalysis } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getPrompt = (problem: string): string => `
  You are a world-class market research analyst. Your task is to use Google Search to analyze potential niche markets related to a 'customer problem' provided by the user. Your analysis must now include social media sentiment.

  For the given problem: "${problem}"

  **Execution Plan:**
  1.  **Stream Thinking Process (Japanese):** First, stream your thinking process step-by-step as plain text in JAPANESE. This should include your search queries for general web content AND social media platforms (like X, Reddit), and your interpretation of the results.
  2.  **Output Separator:** After you are completely done with your analysis and thinking process, output a unique separator token on its own line: \`---JSON_SEPARATOR---\`
  3.  **Output Final JSON:** After the separator, output a single, valid JSON object. This must be the final part of your output.

  **JSON Structure Details:**
  
  - **"results"**: An array of 7 objects, each representing a potential niche market. Each object must have:
    - "keyword": A highly relevant, specific keyword for the niche.
    - "marketSize": Your assessment of the market size ('High', 'Medium', 'Low').
    - "competition": Your assessment of the competition level ('High', 'Medium', 'Low').
    - "socialSentiment": Your assessment of the public sentiment on social media ('Positive', 'Negative', 'Neutral', 'Mixed'). This must be based on search results from sites like X and Reddit.
    - "nichePotential": A score from 1-10 indicating its potential as a niche market.
    - "justification": A brief explanation (under 25 words) of your reasoning in Japanese, incorporating web and social media findings.

  - **"references"**: An array of up to 15 reference objects. Each object must have:
    - "url": The direct URL to a source. You must verify that it is live, publicly accessible, not a paywall/login, and does not contain error messages like "404".
    - "title": A concise, one-sentence summary of the article's content in Japanese.

  - **"thinkingProcess"**: An object containing your detailed thinking process in two languages.
    - "ja": Your full thinking process, written in Japanese.
    - "en": Your full thinking process, translated into English.

  Your final output must strictly follow the sequence: [Japanese Thinking Stream] -> [Separator] -> [JSON Object].
`;

export const analyzeNicheMarket = async (
  problem: string,
  onThinkingUpdate: (thought: string) => void
): Promise<FullAnalysis> => {
  try {
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: getPrompt(problem),
      config: {
        tools: [{googleSearch: {}}],
        temperature: 0.2,
      },
    });

    let thinkingBuffer = '';
    let jsonBuffer = '';
    let separatorFound = false;
    const separator = '---JSON_SEPARATOR---';

    for await (const chunk of responseStream) {
      const chunkText = chunk.text;
      
      if (separatorFound) {
        jsonBuffer += chunkText;
      } else {
        if (chunkText.includes(separator)) {
          separatorFound = true;
          const parts = chunkText.split(separator);
          const thinkingPart = parts[0];
          const jsonPart = parts[1] || '';
          
          thinkingBuffer += thinkingPart;
          onThinkingUpdate(thinkingPart);
          jsonBuffer += jsonPart;
        } else {
          thinkingBuffer += chunkText;
          onThinkingUpdate(chunkText);
        }
      }
    }
    
    // Clean the JSON response to remove markdown fences if they exist.
    let cleanJson = jsonBuffer.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.substring(7);
    }
    if (cleanJson.endsWith('```')) {
      cleanJson = cleanJson.substring(0, cleanJson.length - 3);
    }
    cleanJson = cleanJson.trim();

    if (!cleanJson) {
      throw new Error("No valid JSON data received from the API after the separator.");
    }
    
    const parsedJson = JSON.parse(cleanJson);

    if (!parsedJson.results || !Array.isArray(parsedJson.results) || !parsedJson.references || !Array.isArray(parsedJson.references) || !parsedJson.thinkingProcess || !parsedJson.thinkingProcess.ja || !parsedJson.thinkingProcess.en) {
        throw new Error("Invalid analysis format in API response's JSON part");
    }

    // The streamed Japanese thinking process is the most "live" one, use it for the JA property.
    // The EN property will come from the final JSON object.
    return {
        results: parsedJson.results,
        references: parsedJson.references,
        thinkingProcess: {
          ja: thinkingBuffer.trim(),
          en: parsedJson.thinkingProcess.en
        },
    };

  } catch (error) {
    console.error("Error calling Gemini API or processing stream:", error);
    throw new Error("Failed to analyze market data. Please check the API response and your connection.");
  }
};