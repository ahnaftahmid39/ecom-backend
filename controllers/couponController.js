const { Coupon } = require('../models/coupon');

// admin authorize
module.exports.getCoupons = async (req, res) => {
  const coupons = await Coupon.find();
  return res.status(200).send(coupons);
};

// admin authorize
module.exports.createCoupon = async (req, res) => {
  const coupon = new Coupon(req.body);
  const result = coupon.save();
  return res
    .status(201)
    .send({ data: coupon, message: 'Created a coupon successfully' });
};

module.exports.validateCoupon = async (req, res) => {
  const code = req.body.code;
  const coupon = await Coupon.findOne({ code: code });
  if (coupon) return res.status(200).send(coupon);
  else return res.status(400).send({ message: 'Coupon not valid!' });
};
