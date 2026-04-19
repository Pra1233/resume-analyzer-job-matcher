const structuredAnalysisSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    summary: {
      type: "string"
    },
    matchScore: {
      type: "number",
      minimum: 0,
      maximum: 100
    },
    recommendation: {
      type: "string",
      enum: ["strong_match", "match", "possible_match", "weak_match"]
    },
    requiredSkillsMatched: {
      type: "array",
      items: {
        type: "string"
      }
    },
    requiredSkillsMissing: {
      type: "array",
      items: {
        type: "string"
      }
    },
    unverifiedRequirements: {
      type: "array",
      items: {
        type: "string"
      }
    },
    niceToHaveMatched: {
      type: "array",
      items: {
        type: "string"
      }
    },
    niceToHaveMissing: {
      type: "array",
      items: {
        type: "string"
      }
    },
    dateWarnings: {
      type: "array",
      items: {
        type: "string"
      }
    },
    scoreBreakdown: {
      type: "array",
      items: {
        type: "string"
      }
    },
    suggestions: {
      type: "array",
      items: {
        type: "string"
      }
    },
    experienceAssessment: {
      type: "string"
    }
  },
  required: [
    "summary",
    "matchScore",
    "recommendation",
    "requiredSkillsMatched",
    "requiredSkillsMissing",
    "unverifiedRequirements",
    "niceToHaveMatched",
    "niceToHaveMissing",
    "dateWarnings",
    "scoreBreakdown",
    "suggestions",
    "experienceAssessment"
  ]
};

function toGeminiSchema(schema) {
  if (Array.isArray(schema)) {
    return schema.map(toGeminiSchema);
  }

  if (!schema || typeof schema !== "object") {
    return schema;
  }

  const transformed = {};

  for (const [key, value] of Object.entries(schema)) {
    if (key === "additionalProperties") {
      continue;
    }

    transformed[key] = toGeminiSchema(value);
  }

  return transformed;
}

const geminiAnalysisSchema = toGeminiSchema(structuredAnalysisSchema);

module.exports = { structuredAnalysisSchema, geminiAnalysisSchema };
