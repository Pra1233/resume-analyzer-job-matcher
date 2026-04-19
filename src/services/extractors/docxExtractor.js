const mammoth = require("mammoth");

async function extractTextFromDocx(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return {
    text: result.value || "",
    metadata: {
      warnings: result.messages || []
    }
  };
}

module.exports = { extractTextFromDocx };
