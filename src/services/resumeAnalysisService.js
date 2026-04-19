const { ValidationError } = require("../errors/ValidationError");
const { analyzeResumeSchema } = require("../schemas/resumeSchema");
const { extractResumeText } = require("./extractors/resumeExtractor");
const { analyzeResumeMatch } = require("./matchers/resumeMatcher");

async function runResumeAnalysis({ file, body }) {
  const validated = analyzeResumeSchema.safeParse(body);

  if (!validated.success) {
    throw new ValidationError("Invalid analyze resume request", validated.error.flatten().fieldErrors);
  }

  const extraction = await extractResumeText(file);
  const match = await analyzeResumeMatch({
    resumeText: extraction.text,
    jobDescription: validated.data.jobDescription,
    jobTitle: validated.data.jobTitle
  });

  return {
    extraction,
    match,
    file: {
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size
    }
  };
}

module.exports = { runResumeAnalysis };
