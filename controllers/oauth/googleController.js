const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../../models/user');
const _ = require('lodash');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.HEROKU_URL}/auth/google/redirect`,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({
        email: profile._json.email,
      });
      let res = {};
      try {
        if (user) {
          res.user = _.pick(user, ['email', '_id']);
          res.token = user.generateJWT();
        } else {
          const newUser = new User({
            email: profile._json.email,
            googleId: profile.id,
            name: profile.displayName,
          });
          await newUser.save();
          res.user = _.pick(newUser, ['email', '_id']);
          res.token = newUser.generateJWT();
        }
        return cb(null, res);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

module.exports.redirect = async (req, res) => {
  return res.status(200).send(req.user);
};
