const { AppError } = require("./AppError");

class UnsupportedFileError extends AppError {
  constructor(mimeType) {
    super(`Unsupported file type: ${mimeType}`, {
      statusCode: 415,
      code: "UNSUPPORTED_FILE_TYPE",
      details: { mimeType }
    });
  }
}

module.exports = { UnsupportedFileError };
