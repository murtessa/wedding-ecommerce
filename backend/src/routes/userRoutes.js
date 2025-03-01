const express = require("express");
const passport = require("passport");
const {
  registerCustomer,
  uploadVerificationDocs,
  googleAuth,
  googleAuthCallback,
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

router.get(
  "/google",
  googleAuth,
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/callback", googleAuthCallback);

// router.get("/login/success", loginSuccess);
// router.get("/logout", logout);

module.exports = router;
