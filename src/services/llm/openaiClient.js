const axios = require("axios");
const { env } = require("../../config/env");
const { structuredAnalysisSchema } = require("../../constants/analysisSchema");
const { LlmProviderError } = require("../../errors/LlmProviderError");

function extractTextFromResponsePayload(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text;
  }

  const outputs = Array.isArray(data.output) ? data.output : [];

  for (const item of outputs) {
    const contents = Array.isArray(item.content) ? item.content : [];
    for (const content of contents) {
      if (typeof content.text === "string" && content.text.trim()) {
        return content.text;
      }
    }
  }

  return "";
}

async function generateStructuredJsonFromOpenAI(prompt) {
  if (!env.OPENAI_API_KEY) {
    throw new LlmProviderError("OPENAI_API_KEY is not configured");
  }

  try {
    const response = await axios.post(
      `${env.OPENAI_BASE_URL}/responses`,
      {
        model: env.OPENAI_MODEL,
        input: [
          {
            role: "developer",
            content: [
              {
                type: "input_text",
                text: "Return strict JSON matching the required schema."
              }
            ]
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: prompt
              }
            ]
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "resume_analysis",
            strict: true,
            schema: structuredAnalysisSchema
          }
        }
      },
      {
        timeout: 60000,
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = extractTextFromResponsePayload(response.data);

    if (!text) {
      throw new LlmProviderError("OpenAI returned an empty response body");
    }

    return JSON.parse(text);
  } catch (error) {
    const details =
      error.response && error.response.data
        ? error.response.data
        : {
            reason: error.message
          };

    throw new LlmProviderError("Failed to generate LLM response from OpenAI", details);
  }
}

module.exports = { generateStructuredJsonFromOpenAI };
