const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/appError");

const protect = asyncWrapper(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      if (!user) throw new AppError("User not found.", 401);

      // Check if tokenVersion is still valid
      if (decoded.resetTokenVersion !== user.resetTokenVersion) {
        throw new AppError(
          "Token is no longer valid. Please log in again.",
          401
        );
      }

      req.user = user;
      next();
    } catch (error) {
      throw new AppError("Not authorized, invalid token.", 401);
    }
  } else {
    throw new AppError("Not authorized, no token provided.", 401);
  }
});

module.exports = { protect };
