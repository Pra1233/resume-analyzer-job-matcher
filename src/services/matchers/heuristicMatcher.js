const { extractKeywords } = require("../../utils/extractKeywords");

function buildHeuristicMatch({ resumeText, jobDescription }) {
  const resumeKeywords = extractKeywords(resumeText);
  const jobKeywords = extractKeywords(jobDescription);

  const jobSet = new Set(jobKeywords);
  const matchingSkills = resumeKeywords.filter((item) => jobSet.has(item));
  const missingSkills = jobKeywords.filter((item) => !resumeKeywords.includes(item)).slice(0, 15);

  const denominator = Math.max(jobKeywords.length, 1);
  const matchScore = Math.min(100, Math.round((matchingSkills.length / denominator) * 100));

  return {
    summary: "Generated with heuristic keyword overlap because LLM analysis was unavailable.",
    matchScore,
    recommendation:
      matchScore >= 85 ? "strong_match" : matchScore >= 70 ? "match" : matchScore >= 50 ? "possible_match" : "weak_match",
    requiredSkillsMatched: matchingSkills.slice(0, 20),
    requiredSkillsMissing: missingSkills.slice(0, 10),
    unverifiedRequirements: [],
    niceToHaveMatched: [],
    niceToHaveMissing: [],
    dateWarnings: [],
    scoreBreakdown: [
      "Heuristic mode used keyword overlap instead of a cloud or local LLM.",
      "The score is based on overlap between resume keywords and job-description keywords."
    ],
    suggestions: [
      "Improve project descriptions to highlight directly matching skills.",
      "Add measurable outcomes to relevant experience bullets.",
      "Tailor the resume summary to the target job description."
    ],
    experienceAssessment:
      matchScore >= 70
        ? "Resume appears broadly aligned with the role based on keyword overlap."
        : "Resume may need stronger alignment with the role's expected skills and experience."
  };
}

module.exports = { buildHeuristicMatch };
