const express = require("express");
const {
  registerCustomer,
  uploadVerificationDocs,
} = require("../controllers/userController");

const { uploadVendorVerificationDocs } = require("../middleware/fileUpload");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Customer Registration (One Step)
router.post("/register", registerCustomer);

// Vendor Registration (Step 1: Basic Info)
router.post(
  "/upload-verification-docs",
  protect,
  uploadVendorVerificationDocs,
  uploadVerificationDocs
);

module.exports = router;
