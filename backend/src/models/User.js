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
    isActive: { type: Boolean, default: true },
    emailVerificationToken: { type: String },
    tokenVersion: { type: Number, default: 0 },
    address: {
      street: { type: String, default: undefined },
      city: { type: String, default: undefined },
      country: { type: String, default: undefined },
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

// Hash Password Before Saving
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// Password Comparison Method
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// Create & Export Model
const User = mongoose.model("User", UserSchema);
module.exports = User;
