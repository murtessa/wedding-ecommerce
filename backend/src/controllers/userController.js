const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const sendSuccessResponse = require("../utils/appHelper");
const AppError = require("../utils/appError");
const asyncWrapper = require("../middleware/asyncWrapper");
const {
  sendVerificationEmail,
  sendEmailUpdateVerification,
} = require("../utils/emailService");

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
      const { address, location, businessInfo } = req.body;
      userData = {
        ...userData,
        address,
        location,
        businessInfo,
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
const registerVendorStep1 = async (req, res, next) => {
  try {
    const { fullName, email, password, phone } = req.body;

    // Check if email exists
    if (await User.findOne({ email })) {
      throw new AppError("Email already registered", 400);
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Vendor (without business info)
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      role: "vendor",
      isVerified: false, // Vendor requires admin verification
    });

    sendSuccessResponse(
      res,
      201,
      "Vendor Step 1 completed. Proceed to Step 2.",
      {
        userId: user._id,
      }
    );
  } catch (error) {
    next(error);
  }
};

// 📌 Vendor Registration - Step 2 (Business Verification)
const registerVendorStep2 = async (req, res, next) => {
  try {
    const {
      userId,
      businessName,
      businessLicense,
      taxIdentificationNumber,
      location,
    } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user || user.role !== "vendor") {
      throw new AppError("Invalid vendor account", 400);
    }

    // Update Vendor with Business Info
    user.businessInfo = {
      businessName,
      businessLicense,
      taxIdentificationNumber,
      location,
    };
    await user.save();

    sendSuccessResponse(
      res,
      200,
      "Vendor registration completed. Awaiting admin verification."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { registerCustomer, registerVendorStep1, registerVendorStep2 };
