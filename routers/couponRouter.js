const router = require('express').Router();
const {
  validateCoupon,
  getCoupons,
  createCoupon,
} = require('../controllers/couponController');
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');

router
  .route('/')
  .get([authorize, admin], getCoupons)
  .post([authorize, admin], createCoupon);
router.route('/validate').post(authorize, validateCoupon);

module.exports = router;
