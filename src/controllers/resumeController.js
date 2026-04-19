const { runResumeAnalysis } = require("../services/resumeAnalysisService");

async function analyzeResume(req, res) {
  const result = await runResumeAnalysis({
    file: req.file,
    body: req.body
  });

  req.log.info(
    {
      fileName: result.file.originalName,
      strategy: result.extraction.strategy,
      provider: result.match.provider
    },
    "Resume analyzed successfully"
  );

  res.status(200).json({
    success: true,
    data: result,
    requestId: req.id
  });
}

module.exports = { analyzeResume };
