const _ = require('lodash');
const { Product, validate } = require('../models/product');
const formidable = require('formidable');
const fs = require('fs');
const { CLIENT_RENEG_LIMIT } = require('tls');

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
              '_id',
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

// api/product?order=desc&sortBy=name&limit=10
module.exports.getProducts = async (req, res) => {
  const order = req.query.order == 'asc' ? 1 : -1;
  const sortBy = req.query.sortBy || 'name';
  const limit = parseInt(req.query.limit) || 20;
  const products = await Product.find({}, { photo: 0, description: 0 })
    .populate('category', 'name createdAt -_id')
    .sort({ [sortBy]: order })
    .limit(limit);
  return res.status(200).send(products);
};

module.exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId, { photo: 0 }).populate(
    'category',
    'name -_id'
  );
  if (!product)
    return res.status(400).send({ message: 'No product exists with this id' });
  return res.status(200).send(product);
};

module.exports.getPhoto = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId, { photo: 1, _id: 0 });
  if (!product) return res.status(400).send({ message: 'No product found!' });
  res.set('Content-Type', product.photo.contentType);

  return res.status(200).send(product.photo.data);
};

module.exports.updateProductById = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product)
    return res.status(400).send({ message: 'This product does not exist' });
  const form = new formidable({ keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).send(defaultErrMsg(err));
    const updatedProduct = _.pick(fields, [
      'name',
      'price',
      'category',
      'quantity',
      'description',
    ]);
    _.assignIn(product, updatedProduct);
    if (files.photo) {
      fs.readFile(files.photo.path, (err, data) => {
        const newPhoto = {
          data: data,
          contentType: files.photo.type,
        };
        product.photo = newPhoto;
        product.save((err, result) => {
          if (err) return res.status(500).send(defaultErrMsg(err));
          else
            return res
              .status(200)
              .send({ message: 'Successfully updated product!' });
        });
      });
    } else {
      product.save((err, result) => {
        if (err) return res.status(500).send(defaultErrMsg(err));
        else
          return res
            .status(200)
            .send({ message: 'Successfully updated product!' });
      });
    }
  });
};

module.exports.filterProducts = async (req, res) => {
  const order = req.body.order == 'asc' ? 1 : -1;
  let sortBy = req.body.sortBy || 'name';
  const limit = parseInt(req.body.limit) || 20;
  const skip = parseInt(req.body.skip) || 0;
  const filters = req.body.filters;

  const args = {};
  if (filters) {
    for (const key in filters) {
      if (filters[key].length > 0) {
        if (key === 'price') {
          args[key] = {
            $gte: parseInt(filters[key][0]),
            $lte: parseInt(filters[key][1]),
          };
        }
        if (key === 'category') {
          args[key] = { $in: filters[key] };
        }
      }
    }
  }

  if (sortBy == 'arrival') {
    sortBy = 'createdAt';
  }

  const products = await Product.find(args)
    .select({ photo: 0 })
    .populate('category', 'name')
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit);
  return res.status(200).send(products);
};
