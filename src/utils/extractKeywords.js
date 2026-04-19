const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "you",
  "your",
  "have",
  "from",
  "that",
  "this",
  "will",
  "are",
  "our",
  "about",
  "into",
  "using",
  "years",
  "year",
  "role",
  "work",
  "team",
  "good",
  "strong"
]);

function extractKeywords(text) {
  const normalized = String(text || "").toLowerCase();
  const tokens = normalized.match(/[a-z0-9.+#-]{2,}/g) || [];
  const unique = new Set();

  for (const token of tokens) {
    if (!STOP_WORDS.has(token)) {
      unique.add(token);
    }
  }

  return Array.from(unique);
}

module.exports = { extractKeywords };
