const multer = require("multer");
const { env } = require("../config/env");
const { ValidationError } = require("../errors/ValidationError");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024
  },
  fileFilter(req, file, cb) {
    if (!env.ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      return cb(new ValidationError("Uploaded file type is not allowed", { mimetype: file.mimetype }));
    }

    cb(null, true);
  }
});

module.exports = { upload };
