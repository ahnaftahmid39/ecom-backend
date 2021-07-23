const passport = require('passport');
const { redirect } = require('../../controllers/oauth/googleController');

const router = require('express').Router();

router
  .route('/')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router
  .route('/redirect')
  .get(passport.authenticate('google', { session: false }), redirect);

module.exports = router;
