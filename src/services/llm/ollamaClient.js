const axios = require("axios");
const { env } = require("../../config/env");
const { LlmProviderError } = require("../../errors/LlmProviderError");

const client = axios.create({
  baseURL: env.OLLAMA_BASE_URL,
  timeout: 60000
});

async function generateJson(prompt) {
  try {
    const response = await client.post("/api/generate", {
      model: env.OLLAMA_MODEL,
      prompt,
      stream: false,
      format: "json"
    });

    const raw = response.data && response.data.response ? response.data.response : "{}";
    return JSON.parse(raw);
  } catch (error) {
    throw new LlmProviderError("Failed to generate LLM response from Ollama", {
      reason: error.message
    });
  }
}

module.exports = { generateJson };
