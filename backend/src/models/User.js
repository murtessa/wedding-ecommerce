const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User Roles Enum
const UserRoles = ["customer", "vendor", "admin", "delivery"];

// Define the Business Info Schema
const BusinessInfoSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  businessLicense: { type: String, required: true }, // File path for license upload
  taxIdentificationNumber: { type: String, required: true },
  additionalDocs: [{ type: String }], // Array to store document paths
});

// Mongoose Schema
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Exclude password from queries by default
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: UserRoles,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false, // Vendors must be verified by admin
    },

    businessName: { type: String, default: null },
    profilePicture: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    emailVerificationToken: { type: String },
    tokenVersion: { type: Number, default: 0 },
    address: {
      street: { type: String, default: undefined },
      city: { type: String, default: undefined },
      region: { type: String, default: undefined },
    },

    isEmailVerified: { type: Boolean, default: false },
    businessInfo: {
      type: BusinessInfoSchema,
      default: null, // Only applicable for vendors
    },
    location: {
      latitude: { type: Number, default: undefined },
      longitude: { type: Number, default: undefined },
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create & Export Model
const User = mongoose.model("User", UserSchema);
module.exports = User;
