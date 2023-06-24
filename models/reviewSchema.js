const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

reviewSchema.post('save', handleMongooseError);
const Review = model('review', reviewSchema);

// ---------------JOI--------------------------

const addShema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Missing required name field',
    'string.base': 'Name field should be a string',
  }),

  comment: Joi.string().required().messages({
    'any.required': 'Missing required comment field',
    'string.base': 'Comment field should be a string',
  }),
});

const shemas = {
  addShema,
};

module.exports = {
  Review,
  shemas,
};