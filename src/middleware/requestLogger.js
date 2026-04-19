const pinoHttp = require("pino-http");
const { logger } = require("../config/logger");

const requestLogger = pinoHttp({
  logger,
  genReqId(req) {
    return req.headers["x-request-id"] || `req_${Date.now()}`;
  }
});

module.exports = { requestLogger };
