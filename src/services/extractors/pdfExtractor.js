const pdfParse = require("pdf-parse");

async function extractTextFromPdf(buffer) {
  const result = await pdfParse(buffer);
  return {
    text: result.text || "",
    metadata: {
      pages: result.numpages || 0,
      info: result.info || {}
    }
  };
}

module.exports = { extractTextFromPdf };
