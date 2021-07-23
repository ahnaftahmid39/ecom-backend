const userRouter = require('../routers/userRouter');
const categoryRouter = require('../routers/categoryRouter');
const productRouter = require('../routers/productRouter');
const cartRouter = require('../routers/cartRouter');
const profileRouter = require('../routers/profileRouter');
const paymentRouter = require('../routers/paymentRouter');
const couponRouter = require('../routers/couponRouter');

module.exports = (app) => {
  app.use('/auth/google', )
  app.use('/api/user', userRouter);
  app.use('/api/category', categoryRouter);
  app.use('/api/product', productRouter);
  app.use('/api/cart', cartRouter);
  app.use('/api/payment', paymentRouter);
  app.use('/api/profile', profileRouter);
  app.use('/api/coupon', couponRouter);
};
