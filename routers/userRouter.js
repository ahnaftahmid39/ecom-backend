const router = require('express').Router();
const {
  signIn,
  signUp,
  getPurchaseHistory,
} = require('../controllers/userControllers');
const authorize = require('../middlewares/authorize');

router.route('/signup').post(signUp);

router.route('/signin').post(signIn);
router.route('/purchase-history').get(authorize, getPurchaseHistory);

module.exports = router;
