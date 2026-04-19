const { AppError } = require("./AppError");

class LlmProviderError extends AppError {
  constructor(message, details = null) {
    super(message, {
      statusCode: 502,
      code: "LLM_PROVIDER_ERROR",
      details
    });
  }
}

module.exports = { LlmProviderError };
