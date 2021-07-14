const _ = require('lodash');
const { Product, validate } = require('../models/product');
const formidable = require('formidable');
const fs = require('fs');

const defaultErrMsg = (err) => ({
  message: err.messsage || 'Something went wrong!',
});

module.exports.createProduct = async (req, res) => {
  const form = new formidable.IncomingForm({ keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).send(defaultErrMsg(err));
    }
    const { error } = validate(
      _.pick(fields, ['name', 'description', 'price', 'category', 'quantity'])
    );
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const newProduct = new Product(fields);
    if (files.photo) {
      fs.readFile(files.photo.path, (err, data) => {
        if (err) return res.status(400).send({ message: 'Error with photo' });
        newProduct.photo = {
          data: data,
          contentType: files.photo.type,
        };
        newProduct.save((err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send(defaultErrMsg(err));
          }
          return res.status(201).send({
            message: 'Product successfully created',
            data: _.pick(result, [
              'name',
              'description',
              'price',
              'category',
              'quantity',
            ]),
          });
        });
      });
    } else {
      return res.status(400).send({ message: 'No photo provided!' });
    }
  });
};

module.exports.getProducts = async (req, res) => {
  const products = await Product.find({}, { photo: 0, _id: 0 }).populate(
    'category',
    'name createdAt -_id'
  );
  return res.status(200).send(products);
};

module.exports.getProductById = async (req, res) => {};

module.exports.updateProductById = async (req, res) => {};
