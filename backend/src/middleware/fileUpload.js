const multer = require("multer");
const path = require("path");

const AppError = require("../utils/appError");

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let fileType = "";

    // Determine file type prefix
    if (file.mimetype.startsWith("image/jpeg")) {
      fileType = "image-jpg";
    } else if (file.mimetype.startsWith("image/png")) {
      fileType = "image-png";
    } else if (file.mimetype === "application/pdf") {
      fileType = "pdf";
    } else {
      fileType = "unknown";
    }

    // Special case for profile pictures
    if (req.path.includes("upload-profile-picture")) {
      fileType = "profile";
    }

    // Generate filename
    cb(null, `${fileType}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// Dynamic file filter based on route
const fileFilter = (req, file, cb) => {
  // Allowed file types for user verifications uploads (PDF, JPEG, PNG)
  const allowedDocs = ["image/jpeg", "image/png", "application/pdf"];

  // Allowed file types for profile pictures (Only JPEG, PNG)
  const allowedImages = ["image/jpeg", "image/png"];

  if (req.path.includes("upload-profile-picture")) {
    // Profile pictures should only be images
    if (allowedImages.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          "Only JPEG and PNG images are allowed for profile pictures!",
          400
        ),
        false
      );
    }
  } else {
    // General file uploads (verification documents)
    if (allowedDocs.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("Only JPEG, PNG, and PDF files are allowed!"), false);
    }
  }
};

const uploadVerificationDocsMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).fields([
  // NGO DOCUMENTS
  { name: "registrationCertificate", maxCount: 1 },
  { name: "authorizationLetter", maxCount: 1 },
  { name: "additionalDocs", maxCount: 5 },

  // ORGANIZATION DONOR DOCUMENTS
  { name: "licenseCertificate", maxCount: 1 },
  { name: "taxCertificate", maxCount: 1 },
  { name: "additionalDocs", maxCount: 5 },

  // VOLUNTEER DOCUMENTS
  { name: "idCard", maxCount: 1 },
  { name: "trainingCertificate", maxCount: 1 },
  { name: "additionalDocs", maxCount: 5 },
]);

module.exports = uploadVerificationDocsMiddleware;