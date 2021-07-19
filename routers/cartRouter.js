const router = require('express').Router();

const {
  createCartItem,
  deleteCartItem,
  getCartItem,
  updateCartItem,
  updateCartDiscount,
} = require('../controllers/cartItemController');

const authorize = require('../middlewares/authorize');

router
  .route('/')
  .get(authorize, getCartItem)
  .post(authorize, createCartItem)
  .put(authorize, updateCartItem);

router.route('/:id').delete(authorize, deleteCartItem);

router.route('/discount').post(authorize, updateCartDiscount);

module.exports = router;
