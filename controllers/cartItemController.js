const _ = require('lodash');
const { CartItem, CartItemSchema } = require('../models/cartItem');

module.exports.createCartItem = async (req, res) => {
  const { price, productId, count } = _.pick(req.body, [
    'price',
    'productId',
    'count',
  ]);
  const item = await CartItem.findOne({
    user: req.user._id,
    product: productId,
  });
  if (item) return res.status(400).send({ message: 'Product already exists!' });
  const cartItem = new CartItem({
    product: productId,
    user: req.user._id,
    price: price,
    count: count,
  });
  const result = await cartItem.save();
  return res.status(201).send({
    message: 'Created cart item successfully',
    data: result,
  });
};

module.exports.getCartItem = async (req, res) => {
  const cartItem = await CartItem.find({ user: req.user._id })
    .populate('product', 'name')
    .populate('user', 'name');
  return res.status(200).send(cartItem);
};

module.exports.updateCartItem = async (req, res) => {
  const { count, _id } = _.pick(req.body, ['count', '_id']);
  await CartItem.updateOne({ _id: _id, user: req.user._id }, { count: count });
  return res.status(200).send({ message: 'Successfully updated cart item' });
};

module.exports.deleteCartItem = async (req, res) => {
  const _id = req.params.id;
  await CartItem.deleteOne({ _id: _id, user: req.user._id });
};
