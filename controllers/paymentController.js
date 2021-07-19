const { PaymentSession } = require('ssl-commerz-node');
const path = require('path');
const { CartItem } = require('../models/cartItem');
const { Order } = require('../models/order');
const { Payment } = require('../models/payment');
const { Profile } = require('../models/profile');
const { Product } = require('../models/product');
const { ObjectId } = require('mongoose').Types;
const FormData = require('form-data');
const fetch = require('node-fetch');

module.exports.ipn = async (req, res) => {
  const payment = new Payment(req.body);
  const tran_id = payment['tran_id'];

  if (payment['status'] === 'VALID') {
    const storeId = process.env.STORE_ID;
    const storePassword = process.env.STORE_PASSWORD;
    const val_id = payment['val_id'];

    const formData = new FormData();
    formData.append('store_id', storeId);
    formData.append('store_passwd', storePassword);
    formData.append('val_id', val_id);

    const response = await fetch(
      `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${storeId}&store_passwd=${storePassword}&format=json`,
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
      }
    );
    const data = await response.json();
    if (data.status === 'VALID') {
      const order = await Order.findOneAndUpdate(
        { transaction_id: tran_id },
        { status: 'Complete', paymentStatus: data.status }
      );
      const cartItemIds = [];
      for (const cartItem of order.cartItems) {
        cartItemIds.push(new ObjectId(cartItem._id));
        await Product.updateOne(
          { _id: cartItem.product },
          { $inc: { sold: cartItem.count, quantity: -cartItem.count } }
        );
      }
      await CartItem.deleteMany({ _id: { $in: cartItemIds } });
    } else {
      await Order.deleteOne({ transaction_id: tran_id });
    }
  } else {
    await Order.deleteOne({ transaction_id: tran_id });
  }
  await payment.save();
  return res.status(200).send('IPN');
};

module.exports.initPayment = async (req, res) => {
  const userId = req.user._id;
  const cartItems = await CartItem.find({ user: userId });
  const profile = await Profile.findOne({ user: userId });

  const { address1, address2, city, state, postcode, country, phone } = profile;

  const total = cartItems.reduce(
    (a, b) => {
      return {
        count: a.count + b.count,
        price:
          a.count * a.price * (a.discount ? 1 - a.discount / 100 : 1) +
          b.count * b.price * (b.discount ? 1 - b.discount / 100 : 1),
      };
    },
    { count: 0, price: 0, discount: 0 }
  );

  console.log(total);

  const storeId = process.env.STORE_ID;
  const storePassword = process.env.STORE_PASSWORD;
  const payment = new PaymentSession(true, storeId, storePassword);

  const backendURL =
    process.env.HEROKU_URL || 'https://guarded-lake-12126.herokuapp.com';
  // Set the urls
  payment.setUrls({
    success: `${backendURL}/api/payment/success`, // If payment Succeed
    fail: '${backendURL}/api/payment/failure', // If payment failed
    cancel: '${backendURL}/api/payment/cancel', // If user cancel payment
    ipn: `${backendURL}/api/payment/ipn`, // SSLCommerz will send http post request in this link
  });

  const tran_id =
    '_' + Math.random().toString(36).substr(2, 9) + new Date().getTime();
  // Set order details
  payment.setOrderInfo({
    total_amount: total.price, // Number field
    currency: 'BDT', // Must be three character string
    tran_id: tran_id, // Unique Transaction id
    emi_option: 0, // 1 or 0
  });

  // Set customer info
  payment.setCusInfo({
    name: req.user.name,
    email: req.user.email,
    add1: address1,
    add2: address2,
    city: city,
    state: state,
    postcode: postcode,
    country: country,
    phone: phone,
    fax: phone,
  });

  // Set shipping info
  payment.setShippingInfo({
    method: 'Courier', //Shipping method of the order. Example: YES or NO or Courier
    num_item: total.count,
    name: req.user.name,
    add1: address1,
    add2: address2,
    city: city,
    state: state,
    postcode: postcode,
    country: country,
  });

  // Set Product Profile
  payment.setProductInfo({
    product_name: 'Bohubrihi E-com Products',
    product_category: 'General',
    product_profile: 'general',
  });

  const response = await payment.paymentInit();
  const order = new Order({
    cartItems: cartItems,
    user: userId,
    transaction_id: tran_id,
    address: profile,
  });
  if (response.status === 'SUCCESS') {
    order.sessionKey = response['sessionkey'];
    await order.save();
  }
  return res.status(200).send(response);
};

module.exports.paymentSuccess = async (req, res) => {
  res.sendFile(path.join(__baseDir + '/public/success.html'));
};

module.exports.paymentFailure = async (req, res) => {
  res.sendFile(path.join(__baseDir + '/public/failure.html'));
};

module.exports.paymentCancel = async (req, res) => {
  res.sendFile(path.join(__baseDir + '/public/cancel.html'));
};
