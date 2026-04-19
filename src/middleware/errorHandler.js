const { AppError } = require("../errors/AppError");
const { logger } = require("../config/logger");

function errorHandler(err, req, res, next) {
  if (next) {
    void next;
  }

  const isOperational = err instanceof AppError;
  const statusCode = isOperational ? err.statusCode : 500;
  const code = isOperational ? err.code : "INTERNAL_ERROR";

  logger.error(
    {
      err,
      requestId: req.id,
      path: req.originalUrl,
      method: req.method
    },
    "Request failed"
  );

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message: isOperational ? err.message : "Something went wrong",
      details: isOperational ? err.details : null
    },
    requestId: req.id
  });
}

module.exports = { errorHandler };
