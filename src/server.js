const { app } = require("./app");
const { env } = require("./config/env");
const { logger } = require("./config/logger");

const server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, "Resume analyzer API started");
});

function shutdown(signal) {
  logger.info({ signal }, "Shutting down server");
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
