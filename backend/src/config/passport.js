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
      passReqToCallback: true, // Ensures `req` is accessible in the callback
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Get role from session, ensure session exists
          const role = req.session?.role || "vendor";
          console.log("User Role from Session:", role);

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
  done(null, { id: user.id, role: user.role }); // Store user ID & role in session
});

passport.deserializeUser(async (obj, done) => {
  try {
    const user = await User.findById(obj.id);
    if (user) user.role = obj.role; // Restore role from session
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
