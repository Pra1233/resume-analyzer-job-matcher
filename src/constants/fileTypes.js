const FILE_TYPES = {
  PDF: "application/pdf",
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  PNG: "image/png",
  JPEG: "image/jpeg",
  JPG: "image/jpg"
};

const IMAGE_MIME_TYPES = [FILE_TYPES.PNG, FILE_TYPES.JPEG, FILE_TYPES.JPG];

module.exports = { FILE_TYPES, IMAGE_MIME_TYPES };
