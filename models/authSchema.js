const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const emailRegExp = /^([a-z0-9_.-]+)@([a-z09_.-]+).([a-z]{2,6})$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: emailRegExp,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: '',
    },
    birthday: {
      type: String,
      default: '',
    },
    skype: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
      match: /^\+[\d-]+$/,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post('save', handleMongooseError);

// ----------------JOI-------------------------------------------------

const userSchemaSignup = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9 ]{2,30}$/)
    .required()
    .messages({
      'any.required': 'Missing required name field',
      'string.base': 'Name field must be a string',
      'string.pattern.base': 'Name field may contain only latin letters, numbers and spaces',
    }),
  email: Joi.string().pattern(emailRegExp).required().messages({
    'any.required': 'Missing required email field',
    'string.base': 'Email field must be a string',
    'string.pattern.base':
      'Email field may contain only latin letters, numbers, signs ("_", ".", "-"). Must contain @ and domain.',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Missing required password field',
    'string.base': 'Password field must be a string',
    'string.min': `Password field should have a minimum length of 6`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    'any.required': 'Missing required email field',
    'string.base': 'Email field must be a string',
    'string.pattern.base':
      'Email field may contain only latin letters, numbers, signs ("_", ".", "-"). Must contain @ and domain.',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Missing required password field',
    'string.base': 'Password field must be a string',
    'string.min': `Password field should have a minimum length of 6`,
  }),
});

const userUpdateSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9 ]{2,30}$/)
    .messages({
      'string.base': 'Name field must be a string',
      'string.pattern.base': 'Name field may contain only latin letters, numbers and spaces',
    }),
  email: Joi.string().pattern(emailRegExp).messages({
    'string.base': 'Email field must be a string',
    'string.pattern.base':
      'Email field may contain only latin letters, numbers, signs ("_", ".", "-"). Must contain @ and domain.',
  }),
  password: Joi.string().min(6).messages({
    'string.base': 'Password field must be a string',
    'string.min': `Password field should have a minimum length of 6`,
  }),
  avatarURL: Joi.string().messages({
    'string.base': 'Email field must be a string',
  }),
  birthday: Joi.string().messages({
    'string.base': 'Birthday field must be a string',
  }),
  skype: Joi.string().messages({
    'string.base': 'Skype field must be a string',
  }),
  phone: Joi.string().messages({
    'string.base': 'Phone field must be a string',
  }),
});

const schemas = {
  userSchemaSignup,
  loginSchema,
  userUpdateSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
