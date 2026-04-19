const axios = require("axios");
const { env } = require("../../config/env");
const { geminiAnalysisSchema } = require("../../constants/analysisSchema");
const { LlmProviderError } = require("../../errors/LlmProviderError");

function extractTextFromGemini(data) {
  const candidates = Array.isArray(data.candidates) ? data.candidates : [];

  for (const candidate of candidates) {
    const parts = candidate?.content?.parts;
    if (!Array.isArray(parts)) {
      continue;
    }

    for (const part of parts) {
      if (typeof part.text === "string" && part.text.trim()) {
        return part.text;
      }
    }
  }

  return "";
}

async function generateStructuredJsonFromGemini(prompt) {
  if (!env.GEMINI_API_KEY) {
    throw new LlmProviderError("GEMINI_API_KEY is not configured");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${env.GEMINI_MODEL}:generateContent`;

  try {
    const response = await axios.post(
      url,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: geminiAnalysisSchema
        }
      },
      {
        timeout: 60000,
        params: {
          key: env.GEMINI_API_KEY
        }
      }
    );

    const text = extractTextFromGemini(response.data);

    if (!text) {
      throw new LlmProviderError("Gemini returned an empty response body");
    }

    return JSON.parse(text);
  } catch (error) {
    const details =
      error.response && error.response.data
        ? error.response.data
        : {
            reason: error.message
          };

    throw new LlmProviderError("Failed to generate LLM response from Gemini", details);
  }
}

module.exports = { generateStructuredJsonFromGemini };
