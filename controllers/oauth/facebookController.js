const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const _ = require('lodash');
const { User } = require('../../models/user');

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.HEROKU_URL}/auth/facebook/redirect`,
      profileFields: [
        'id',
        'email',
        'gender',
        'link',
        'locale',
        'name',
        'timezone',
        'updated_time',
        'verified',
      ],
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      try {
        const user = await User.findOne({
          email: profile._json.email,
        });
        let res = {};
        if (user) {
          res.user = _.pick(user, ['email', '_id']);
          res.token = user.generateJWT();
        } else {
          const newUser = new User({
            email: profile._json.email,
            facebookId: profile.id,
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

module.exports.redirect = (req, res) => {
  return res.status(200).send(req.user);
};
