const express = require("express");
const twilio = require("twilio");

const {
  login,
  verifyEmail,
  verifyOtp,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  resendVerificationEmail,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/change-password", protect, changePassword);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);

// ✅ Route to verify OTP
// router.post("/verify-otp", verifyOtp);

module.exports = router;
