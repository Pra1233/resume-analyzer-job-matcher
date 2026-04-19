const express = require("express");
const { asyncHandler } = require("../lib/asyncHandler");
const { analyzeResume } = require("../controllers/resumeController");
const { upload } = require("../middleware/upload");

const router = express.Router();

router.post("/analyze", upload.single("resume"), asyncHandler(analyzeResume));

module.exports = { resumeRouter: router };
