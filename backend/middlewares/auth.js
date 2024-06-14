const jwt = require("jsonwebtoken");
const passport = require("passport");

const dotenv = require('dotenv');

dotenv.config();

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const UserModel = require("../models/user");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

//   /**
//    * Points to be validated in token
//    * 1. Token should be present
//    * 2. Secret key validation (This is the same tokne that we have generated)
//    * 3. Token expiry date should not be passed
//    * 4. Validate the issued at date (Optional)
//    * 5. Validate the user id if it is present in database
//    */

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecretKey;

const strategy = new JwtStrategy(opts, async function (jwt_payload, done) {
  const userId = jwt_payload.userId;
  const user = await UserModel.findById(userId);
  if (!user) {
    return done("Invalid user", false);
  }
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
    // or you could create a new account
  }
});

passport.use(strategy);

module.exports = passport;