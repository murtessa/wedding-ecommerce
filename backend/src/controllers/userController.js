const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const crypto = require("crypto");

const sendSuccessResponse = require("../utils/appHelper");
const AppError = require("../utils/appError");
const asyncWrapper = require("../middleware/asyncWrapper");
const {
  sendVerificationEmail,
  sendEmailUpdateVerification,
} = require("../utils/emailService");

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleAuthCallback = passport.authenticate("google", {
  successRedirect: "http://localhost:3000/dashboard",
  failureRedirect: "http://localhost:3000/login",
});

// const loginSuccess = (req, res) => {
//   if (req.user) {
//     res.status(200).json({ message: "User logged in", user: req.user });
//   } else {
//     res.status(400).json({ message: "Not Authorized" });
//   }
// };

// const logout = (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("http://localhost:3000");
//   });
// };
// Generate JWT Token
const registerCustomer = asyncWrapper(async (req, res) => {
  const { role, fullName, email, phoneNumber, password } = req.body;

  // Check if the email is already registered
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError("User already exists", 400);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  let userData = {
    role,
    fullName,
    email,
    phoneNumber,
    password: hashedPassword,
  };

  switch (role) {
    case "vendor": {
      const { businessName } = req.body;
      userData = {
        ...userData,
        businessName,
        isVerified: false,
      };
      break;
    }
    case "customer": {
      userData = { ...userData, isVerified: true };
      break;
    }
    case "admin": {
      userData = { ...userData, isAdmin: true, isVerified: true };
      break;
    }
    default:
      throw new AppError("Invalid user role provided.", 400);
  }

  // Generate Email Verification Token
  const emailVerificationToken = crypto.randomBytes(32).toString("hex");
  userData.isEmailVerified = false;
  userData.emailVerificationToken = emailVerificationToken;

  // Create & Save User
  const newUser = new User(userData);
  await newUser.save();

  // Send verification email
  await sendVerificationEmail(email, emailVerificationToken);

  sendSuccessResponse(
    res,
    201,
    "Registration successful. Please verify your email.",
    {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
      fullName: newUser.fullName,
    }
  );
});

// 📌 Vendor Registration - Step 1 (Personal Info)

// Controller for handling vendor verification document uploads
const uploadVerificationDocs = asyncWrapper(async (req, res, next) => {
  // Find the user by ID
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.role !== "vendor") {
    return next(
      new AppError("Only vendors can upload verification documents", 403)
    );
  }

  // Ensure files were uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new AppError("No files uploaded. Please upload valid documents.", 400)
    );
  }

  // Extract file paths from uploaded files
  const businessLicense = req.files.businessLicense
    ? req.files.businessLicense[0].path
    : null;
  const taxIdentificationNumber = req.files.taxIdentificationNumber
    ? req.files.taxIdentificationNumber[0].path
    : null;
  const additionalDocs = req.files.additionalDocs
    ? req.files.additionalDocs.map((file) => file.path)
    : [];

  // Limit additional documents to 5 files
  if (additionalDocs.length > 5) {
    return next(
      new AppError("You can upload a maximum of 5 additional documents.", 400)
    );
  }

  // Update user's businessInfo with existing businessName
  user.businessInfo = {
    businessName: user.businessName, // Take from previously registered data
    businessLicense,
    taxIdentificationNumber,
    additionalDocs,
  };

  // Update user's address
  user.address = {
    street: req.body.street || user.address?.street || "",
    city: req.body.city || user.address?.city || "",
    region: req.body.region || user.address?.region || "",
  };

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Vendor verification documents uploaded successfully",
    data: {
      businessInfo: user.businessInfo,
      address: user.address,
    },
  });
});

module.exports = {
  registerCustomer,
  uploadVerificationDocs,
  googleAuthCallback,
  googleAuth,
};
