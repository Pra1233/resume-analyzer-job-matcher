const Tesseract = require("tesseract.js");
const { ExtractionError } = require("../../errors/ExtractionError");

async function extractTextWithOcr(file) {
  try {
    const result = await Tesseract.recognize(file.buffer, "eng");
    return {
      text: result.data.text || "",
      metadata: {
        confidence: result.data.confidence || null,
        method: "tesseract"
      }
    };
  } catch (error) {
    throw new ExtractionError("OCR extraction failed", {
      filename: file.originalname,
      mimetype: file.mimetype,
      reason: error.message
    });
  }
}

module.exports = { extractTextWithOcr };
