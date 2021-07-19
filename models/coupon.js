const { Schema, model } = require('mongoose');

const couponSchema = Schema(
  {
    name: {
      type: String,
      maxlength: 20,
      required: true,
    },
    code: {
      type: String,
      maxlength: 100,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports.Coupon = model('Coupon', couponSchema);
