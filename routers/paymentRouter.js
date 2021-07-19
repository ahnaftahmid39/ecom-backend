const router = require('express').Router();
const {
  initPayment,
  ipn,
  paymentSuccess,
  paymentFailure,
  paymentCancel,
} = require('../controllers/paymentController');
const authorize = require('../middlewares/authorize');

router.route('/').get(authorize, initPayment);

router.route('/ipn').post(ipn);

router.route('/success').post(paymentSuccess);
router.route('/cancel').post(paymentCancel);
router.route('/failure').post(paymentFailure);

module.exports = router;
