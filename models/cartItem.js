const { Schema, model } = require('mongoose');

const CartItemSchema = Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    price: {
      type: Number,
    },
    discount: Number,
    count: {
      type: Number,
      default: 1,
      max: 5,
      min: 1,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports.CartItemSchema = CartItemSchema;
module.exports.CartItem = model('CartItem', CartItemSchema);
