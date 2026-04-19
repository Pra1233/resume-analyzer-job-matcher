const { FILE_TYPES, IMAGE_MIME_TYPES } = require("../../constants/fileTypes");
const { ExtractionError } = require("../../errors/ExtractionError");
const { UnsupportedFileError } = require("../../errors/UnsupportedFileError");
const { cleanText } = require("../../utils/cleanText");
const { extractTextFromPdf } = require("./pdfExtractor");
const { extractTextFromDocx } = require("./docxExtractor");
const { extractTextWithOcr } = require("./ocrExtractor");

function isWeakExtraction(text) {
  return !text || cleanText(text).length < 80;
}

async function extractResumeText(file) {
  if (!file) {
    throw new ExtractionError("Resume file is required");
  }

  if (file.mimetype === FILE_TYPES.PDF) {
    const parsed = await extractTextFromPdf(file.buffer);
    const cleaned = cleanText(parsed.text);

    if (!isWeakExtraction(cleaned)) {
      return {
        text: cleaned,
        strategy: "pdf-parse",
        metadata: parsed.metadata
      };
    }

    throw new ExtractionError("PDF text extraction was too weak for reliable analysis", {
      filename: file.originalname,
      note:
        "This usually means the PDF is scanned or image-based. Add PDF rasterization before OCR for complete scanned-PDF support."
    });
  }

  if (file.mimetype === FILE_TYPES.DOCX) {
    const parsed = await extractTextFromDocx(file.buffer);
    const cleaned = cleanText(parsed.text);

    if (isWeakExtraction(cleaned)) {
      throw new ExtractionError("DOCX extraction returned too little text", {
        filename: file.originalname
      });
    }

    return {
      text: cleaned,
      strategy: "mammoth",
      metadata: parsed.metadata
    };
  }

  if (IMAGE_MIME_TYPES.includes(file.mimetype)) {
    const parsed = await extractTextWithOcr(file);
    const cleaned = cleanText(parsed.text);

    if (isWeakExtraction(cleaned)) {
      throw new ExtractionError("OCR extraction returned too little text", {
        filename: file.originalname
      });
    }

    return {
      text: cleaned,
      strategy: "ocr",
      metadata: parsed.metadata
    };
  }

  throw new UnsupportedFileError(file.mimetype);
}

module.exports = { extractResumeText };
