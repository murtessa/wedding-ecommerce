require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");
const asyncWrapper = require("../middleware/asyncWrapper");
const sendSuccessResponse = require("../utils/appHelper");
const AppError = require("../utils/appError");
const { sendResetPasswordEmail } = require("../utils/emailService");
const { sendVerificationEmail } = require("../utils/emailService");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// console.log(process.env.JWT_SECRET);

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      tokenVersion: user.tokenVersion,
    },
    JWT_SECRET,

    { expiresIn: "3h" } // Access token expires in 3 hour
  );
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // Refresh token valid for 7 days
  );
};

const verifyEmail = asyncWrapper(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    throw new AppError("Invalid or missing token.", 400);
  }

  // Find user with matching token
  const user = await User.findOne({ emailVerificationToken: token });

  if (!user) {
    throw new AppError("Invalid or expired token.", 400);
  }

  // Update user record
  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  await user.save();

  sendSuccessResponse(res, 200, "Email verified successfully.");
});

const checkEmailVerification = asyncWrapper(async (req, res) => {
  const { email } = req.query; // Get email from query params

  if (!email) {
    throw new AppError("The Email is Required.", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not Found.", 404);
  }

  if (!user.isEmailVerified) {
    throw new AppError("Email is not Verified", 400);
  }

  sendSuccessResponse(res, 200, "Email verified  successfully.");
});

const resendVerificationEmail = asyncWrapper(async (req, res) => {
  const { email } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found. Register first.", 404);
  }

  // Check if the user is already verified
  if (user.isEmailVerified) {
    throw new AppError("Email is already verified", 400);
  }

  // Generate a new verification token
  const newVerificationToken = crypto.randomBytes(32).toString("hex");
  // Update the user's verification token
  user.emailVerificationToken = newVerificationToken;
  await user.save();

  // Resend verification email
  await sendVerificationEmail(email, newVerificationToken);

  sendSuccessResponse(res, 200, "Verification email resent successfully.");
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  // Check if the email is verified
  if (!user.isEmailVerified) {
    throw new AppError("Please verify your email before logging in.", 403);
  }

  // Compare the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password.", 401);
  }

  if (!user.isActive) {
    const reactivationToken = jwt.sign(
      { userId: user._id, type: "reactivation" },
      process.env.JWT_SECRET,
      { expiresIn: "10m" } // Expires in 10 minutes
    );

    return sendSuccessResponse(res, 200, "Account is deactivated.", {
      reactivationRequired: true,
      reactivationToken,
    });
  }

  // Generate JWT and Refresh Token
  const accessToken = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  // Update last login time
  user.lastLogin = new Date();
  await user.save();

  return sendSuccessResponse(res, 200, "Login Successful!", {
    id: user._id,
    email: user.email,
    role: user.role,
    fullName: user.fullName,
    accessToken,
    refreshToken,
  });
});

// Refresh Token Function -> refresh access token with refresh token
const refreshToken = asyncWrapper(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new AppError("Refresh token is required.", 401);
  }

  const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("Invalid refresh token.", 401);
  }

  const newAccessToken = generateToken(user);
  res.status(200).json({ accessToken: newAccessToken });
});

const forgotPassword = asyncWrapper(async (req, res) => {
  const { email } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User with this email does not exist.", 404);
  }

  await user.save();

  // Generate JWT token for password reset link
  const resetToken = jwt.sign(
    { id: user._id, version: user.tokenVersion },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  // Send password reset email
  await sendResetPasswordEmail(user.email, resetToken);

  // Send Success Response
  sendSuccessResponse(res, 200, "Password reset link sent to your email.");
});

const resetPassword = asyncWrapper(async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.query;

  if (!token || !newPassword) {
    throw new AppError("Token and new password are required.", 400);
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user and check token version
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    // Ensure token version matches the latest one in the database
    if (decoded.version !== user.tokenVersion) {
      throw new AppError("Invalid or expired token.", 400);
    }

    // Hash and update new password
    user.password = await bcrypt.hash(newPassword, 10);

    // Invalidate token by incrementing reset token version
    user.tokenVersion += 1;
    await user.save();
    sendSuccessResponse(
      res,
      200,
      "Password reset successful! You can now log in."
    );
  } catch (error) {
    throw new AppError("Invalid or expired token.", 400);
  }
});

const changePassword = asyncWrapper(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError("Current and new password are required.", 400);
  }

  // Find the authenticated user
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  // Compare current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new AppError("Incorrect current password.", 401);
  }

  // Hash and update new password
  user.password = await bcrypt.hash(newPassword, 10);

  // Invalidate all previous tokens
  user.tokenVersion += 1;
  await user.save();

  sendSuccessResponse(
    res,
    200,
    "Password changed successfully. Please log in again."
  );
});

module.exports = {
  verifyEmail,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  resendVerificationEmail,
  checkEmailVerification,
};
