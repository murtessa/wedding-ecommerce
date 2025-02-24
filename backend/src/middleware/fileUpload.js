const multer = require("multer");
const path = require("path");
const AppError = require("../utils/appError");

// Storage configuration for general uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.path.includes("upload-profile-picture")) {
      cb(null, "uploads/profile-pictures/"); // Store profile pictures separately
    } else {
      cb(null, "uploads/vendor-verification/"); // Store vendor documents separately
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let fileType = "";

    // Determine file type prefix
    if (file.mimetype.startsWith("image/jpeg")) {
      fileType = "image-jpg";
    } else if (file.mimetype.startsWith("image/png")) {
      fileType = "image-png";
    } else if (
      file.mimetype === "application/pdf" &&
      !req.path.includes("upload-profile-picture")
    ) {
      fileType = "pdf";
    } else {
      return cb(
        new AppError(
          "Only JPG, PNG (for profile), and PDF (for documents) are allowed!",
          400
        ),
        false
      );
    }

    // Generate filename
    cb(null, `${fileType}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter for different upload types
const fileFilter = (req, file, cb) => {
  const allowedImages = ["image/jpeg", "image/png"];
  const allowedDocs = ["image/jpeg", "image/png", "application/pdf"];

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
    // General file uploads (vendor verification documents)
    if (allowedDocs.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError("Only JPEG, PNG, and PDF files are allowed!", 400),
        false
      );
    }
  }
};

// **Multer middleware for vendor verification documents**
const uploadVendorVerificationDocs = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).fields([
  { name: "businessLicense", maxCount: 1 },
  { name: "taxIdentificationNumber", maxCount: 1 },
  { name: "additionalDocs", maxCount: 5 },
]);

// **Multer middleware for profile picture upload**
const uploadProfilePicture = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit for profile picture
}).single("profilePicture");

module.exports = { uploadVendorVerificationDocs, uploadProfilePicture };
