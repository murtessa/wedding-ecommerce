const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db.js");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// 🔹 Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan("dev")); // Logger for API requests in development mode
app.use(errorHandler);

// 🔹 API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// 🔹 Default Route
app.get("/", (req, res) => {
  res.send("🚀 Wedding E-commerce API is running...");
});

// 🔹 Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

module.exports = app;
