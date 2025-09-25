import { GoogleGenAI } from "@google/genai";
import type { FullAnalysis, WebAnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getWebPrompt = (problem: string): string => `
  You are a world-class market research analyst specializing in web search data. Your primary task is to use Google Search to analyze search volume, competition, and existing solutions to find potential niche markets.

  For the given problem: "${problem}"

  **Execution Plan:**
  1.  **Stream Thinking Process (Japanese):** First, stream your thinking process step-by-step as plain text in JAPANESE. Detail your keyword generation strategy, your assessment of search results (SERPs), and how you are evaluating the strength and relevance of competing websites.
  2.  **Output Separator:** After you are completely done with your analysis, output a unique separator token on its own line: \`---JSON_SEPARATOR---\`
  3.  **Output Final JSON:** After the separator, output a single, valid JSON object. This must be the final part of your output.

  **JSON Structure Details:**
  
  - **"results"**: An array of 7 objects, each representing a potential niche market. Each object must have:
    - "keyword": A specific keyword representing the niche.
    - "searchVolume": Your assessment of the monthly search volume ('High', 'Medium', 'Low').
    - "competitionLevel": Your assessment of the strength and number of direct competitors in the search results ('High', 'Medium', 'Low'). Low competition is ideal.
    - "nichePotential": A score from 1-10, indicating potential based on a combination of high search volume and low competition.
    - "justification": A brief explanation (under 25 words) in Japanese, based on your web search findings.

  - **"references"**: An array of up to 15 reference objects, linking to top-ranking articles, forums, or competitor pages that informed your analysis. Each object must have:
    - "url": The direct URL to the source. Verify it's live, public, not a paywall, and error-free.
    - "title": A concise, one-sentence summary of the page's content in Japanese.

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
    const prompt = getWebPrompt(problem);

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: prompt,
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

    const results: WebAnalysisResult[] = parsedJson.results;

    return {
        results: results,
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