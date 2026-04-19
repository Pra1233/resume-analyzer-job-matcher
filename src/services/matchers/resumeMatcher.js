const { env } = require("../../config/env");
const { logger } = require("../../config/logger");
const { buildResumeAnalysisPrompt } = require("../llm/buildPrompt");
const { generateStructuredJsonFromGemini } = require("../llm/geminiClient");
const { generateStructuredJsonFromOpenAI } = require("../llm/openaiClient");
const { generateJson } = require("../llm/ollamaClient");
const { buildHeuristicMatch } = require("./heuristicMatcher");
const { normalizeAnalysisPayload } = require("./normalizeAnalysis");

async function analyzeResumeMatch({ resumeText, jobDescription, jobTitle }) {
  if (env.ENABLE_LLM) {
    try {
      const prompt = buildResumeAnalysisPrompt({ resumeText, jobDescription, jobTitle });
      let provider = env.LLM_PROVIDER;
      let llmResult;

      if (env.LLM_PROVIDER === "gemini") {
        llmResult = await generateStructuredJsonFromGemini(prompt);
      } else if (env.LLM_PROVIDER === "openai") {
        llmResult = await generateStructuredJsonFromOpenAI(prompt);
      } else {
        llmResult = await generateJson(prompt);
      }

      return {
        provider,
        analysis: normalizeAnalysisPayload(llmResult)
      };
    } catch (error) {
      logger.warn({ err: error, providerTried: env.LLM_PROVIDER }, "LLM analysis failed, evaluating fallback");
    }
  }

  if (env.ENABLE_HEURISTIC_FALLBACK) {
    return {
      provider: "heuristic",
      analysis: buildHeuristicMatch({ resumeText, jobDescription })
    };
  }

  throw new Error("No analysis provider available");
}

module.exports = { analyzeResumeMatch };
