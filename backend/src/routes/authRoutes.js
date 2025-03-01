const express = require("express");
const twilio = require("twilio");
const passport = require("passport");

const {
  login,
  verifyEmail,
  verifyOtp,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  resendVerificationEmail,
  checkEmailVerification,
  googleAuth,
  googleAuthCallback,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/check-verification", checkEmailVerification);

router.post("/change-password", protect, changePassword);

router.get(
  "/google",
  googleAuth,
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/callback", googleAuthCallback);

// router.get("/login/success", loginSuccess);
// router.get("/logout", logout);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);

// ✅ Route to verify OTP
// router.post("/verify-otp", verifyOtp);

module.exports = router;
