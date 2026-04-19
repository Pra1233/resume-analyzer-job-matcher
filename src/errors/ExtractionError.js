const { AppError } = require("./AppError");

class ExtractionError extends AppError {
  constructor(message, details = null) {
    super(message, {
      statusCode: 422,
      code: "EXTRACTION_FAILED",
      details
    });
  }
}

module.exports = { ExtractionError };
