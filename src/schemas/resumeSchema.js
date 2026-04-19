const { z } = require("zod");

const analyzeResumeSchema = z.object({
  jobDescription: z.string().min(20, "jobDescription must be at least 20 characters"),
  jobTitle: z.string().trim().optional().default("Unknown Role")
});

module.exports = { analyzeResumeSchema };
