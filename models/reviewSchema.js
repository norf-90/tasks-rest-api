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
    rating: {
      type: Number,
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

const addSchema = Joi.object({
  comment: Joi.string().required().messages({
    'any.required': 'Missing required comment field',
    'string.base': 'Comment field should be a string',
  }),

  rating: Joi.number().required().integer().min(1).max(5),
});

const schemas = {
  addSchema,
};

module.exports = {
  Review,
  schemas,
};
