function buildResumeAnalysisPrompt({ resumeText, jobDescription, jobTitle }) {
  return `
You are a resume analysis system.

Task:
1. Read the resume text.
2. Compare it against the job description.
3. Return strict JSON only.
4. Be conservative and evidence-based. Do not assume a skill is present unless the resume supports it.
5. Separate required requirements, nice-to-have items, and unverified items.
6. Detect date inconsistencies, future-dated roles, overlapping dates, and unclear tenure.

Output schema:
{
  "summary": "short summary grounded in evidence",
  "matchScore": 0,
  "recommendation": "strong_match | match | possible_match | weak_match",
  "requiredSkillsMatched": [],
  "requiredSkillsMissing": [],
  "unverifiedRequirements": [],
  "niceToHaveMatched": [],
  "niceToHaveMissing": [],
  "dateWarnings": [],
  "scoreBreakdown": [],
  "suggestions": [],
  "experienceAssessment": "short assessment"
}

Rules:
- If the job description says "A or B", do not mark the requirement missing if either A or B is clearly present.
- If the requirement is not stated in the resume, prefer "unverifiedRequirements" instead of "requiredSkillsMissing".
- Put English proficiency in "unverifiedRequirements" unless the resume explicitly states the level.
- Put AWS, Docker, Bedrock, Infrastructure as Code, and similar extras into nice-to-have sections when the job description frames them as optional.
- The score must reflect mostly required criteria, not optional criteria.
- Penalize true missing required skills more than unverified items.
- If dates appear inconsistent or future-dated relative to the provided resume, mention that in "dateWarnings".
- Keep arrays concise and deduplicated.
- "scoreBreakdown" should explain the score in short bullet-like strings.

Job title:
${jobTitle}

Job description:
${jobDescription}

Resume text:
${resumeText}
  `.trim();
}

module.exports = { buildResumeAnalysisPrompt };
