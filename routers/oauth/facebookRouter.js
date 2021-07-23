const passport = require('passport');
const { redirect } = require('../../controllers/oauth/facebookController');

const router = require('express').Router();

router.route('/').get(passport.authenticate('facebook', { scope: ['email'] }));

router
  .route('/redirect')
  .get(passport.authenticate('facebook', { session: false }), redirect);

module.exports = router;
