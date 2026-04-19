const pino = require("pino");
const { env } = require("./env");

const logger = pino({
  level: env.LOG_LEVEL,
  base: {
    service: "resume-analyzer-api",
    env: env.NODE_ENV
  },
  redact: {
    paths: ["req.headers.authorization"],
    remove: true
  },
  transport:
    env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            singleLine: false
          }
        }
      : undefined
});

module.exports = { logger };
