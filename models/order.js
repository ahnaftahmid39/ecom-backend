const { Schema, model } = require('mongoose');
const { CartItemSchema } = require('./cartItem');

const orderSchema = Schema(
  {
    cartItems: [CartItemSchema],
    transactionId: {
      type: String,
      unique: true,
    },
    address: {
      phone: String,
      add1: String,
      add2: String,
      city: String,
      state: String,
      postcode: Number,
      country: String,
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Complete'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    sessionKey: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports.Order = model('Order', orderSchema);
