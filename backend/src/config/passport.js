const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/users/google/callback",
      scope: ["profile", "email"],
      passReqToCallback: true, // Allows access to req
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Get role from query params or session storage
          const role = req.query.role || "vendor"; // Default to "customer" if role not provided

          user = new User({
            googleId: profile.id,
            fullName: profile.displayName || "Unknown User",
            email: profile.emails[0].value,
            role: role, // Use the selected role
            isEmailVerified: true,
            isVerified: role === "customer", // Set true for customer, false for vendor
            profilePicture: profile.photos[0]?.value || null,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
