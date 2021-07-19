const { Schema, model } = require('mongoose');
const Joi = require('joi');

const reviewSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
});

module.exports.Product = model(
  'Product',
  Schema(
    {
      name: String,
      description: String,
      price: Number,
      category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
      quantity: Number,
      photo: {
        data: Buffer,
        contentType: String,
      },
      sold: {
        type: Number,
        default: 0,
      },
      // avgRating: {
      //   type: Number,
      //   default: 0,
      //   min: 0,
      //   max: 5,
      // },
      reviews: [reviewSchema],
    },
    { timestamps: true }
  )
);

module.exports.validate = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().max(2000).required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
  });
  return schema.validate(product);
};
