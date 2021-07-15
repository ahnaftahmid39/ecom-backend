module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV == 'development') console.log(err.message);
  return res.status(500).send('Something Failed!!!!');
};
