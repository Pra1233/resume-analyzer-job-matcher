function uniqueStrings(items) {
  const seen = new Set();
  const normalized = [];

  for (const item of Array.isArray(items) ? items : []) {
    const value = String(item || "").trim();
    if (!value) {
      continue;
    }

    const key = value.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      normalized.push(value);
    }
  }

  return normalized;
}

function removeIfMatched(items, matchedItems, aliases = []) {
  const matchedKeys = new Set(
    uniqueStrings([...(matchedItems || []), ...aliases]).map((item) => item.toLowerCase())
  );

  return uniqueStrings(items).filter((item) => !matchedKeys.has(item.toLowerCase()));
}

function moveUnverifiedEnglish(analysis) {
  const missing = [];
  const unverified = [...analysis.unverifiedRequirements];

  for (const item of analysis.requiredSkillsMissing) {
    if (item.toLowerCase().includes("english")) {
      if (!unverified.some((entry) => entry.toLowerCase() === item.toLowerCase())) {
        unverified.push(item);
      }
    } else {
      missing.push(item);
    }
  }

  analysis.requiredSkillsMissing = uniqueStrings(missing);
  analysis.unverifiedRequirements = uniqueStrings(unverified);
}

function calculateRecommendation(score) {
  if (score >= 85) {
    return "strong_match";
  }
  if (score >= 70) {
    return "match";
  }
  if (score >= 50) {
    return "possible_match";
  }
  return "weak_match";
}

function normalizeAnalysisPayload(payload) {
  const analysis = {
    summary: payload.summary || "No summary provided",
    matchScore: Math.max(0, Math.min(100, Number(payload.matchScore || 0))),
    recommendation: payload.recommendation || "possible_match",
    requiredSkillsMatched: uniqueStrings(payload.requiredSkillsMatched),
    requiredSkillsMissing: uniqueStrings(payload.requiredSkillsMissing),
    unverifiedRequirements: uniqueStrings(payload.unverifiedRequirements),
    niceToHaveMatched: uniqueStrings(payload.niceToHaveMatched),
    niceToHaveMissing: uniqueStrings(payload.niceToHaveMissing),
    dateWarnings: uniqueStrings(payload.dateWarnings),
    scoreBreakdown: uniqueStrings(payload.scoreBreakdown),
    suggestions: uniqueStrings(payload.suggestions),
    experienceAssessment: payload.experienceAssessment || "No assessment provided"
  };

  analysis.requiredSkillsMissing = removeIfMatched(analysis.requiredSkillsMissing, analysis.requiredSkillsMatched, [
    "redux",
    "redux or context api",
    "state management solutions (redux/context api)",
    "context api"
  ]);

  analysis.niceToHaveMissing = removeIfMatched(analysis.niceToHaveMissing, analysis.niceToHaveMatched);
  moveUnverifiedEnglish(analysis);
  analysis.recommendation = calculateRecommendation(analysis.matchScore);

  return analysis;
}

module.exports = { normalizeAnalysisPayload };
