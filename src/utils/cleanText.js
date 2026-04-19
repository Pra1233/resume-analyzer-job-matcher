function cleanText(text) {
  return String(text || "")
    .replace(/\r/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, " ")
    .trim();
}

module.exports = { cleanText };
