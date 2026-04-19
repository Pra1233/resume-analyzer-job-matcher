const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { env } = require("./config/env");
const { requestLogger } = require("./middleware/requestLogger");
const { errorHandler } = require("./middleware/errorHandler");
const { notFound } = require("./middleware/notFound");
const { healthRouter } = require("./routes/healthRoutes");
const { resumeRouter } = require("./routes/resumeRoutes");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: [env.CLIENT_URL, "http://localhost:3000", "http://localhost:5173"]
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/health", healthRouter);
app.use("/api/v1/resumes", resumeRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = { app };
