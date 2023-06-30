const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError, HttpError, checkDate } = require('../helpers');

const timeRegExp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // HH:MM 24-hour with leading 0
const dateRegExp = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/; // exact match for yyyy-mm-dd

const taskSchema = new Schema(
  {
    title: {
      type: String,
      maxLength: 250,
      required: true,
    },
    start: {
      type: String,
      required: true,
      match: timeRegExp,
    },
    end: {
      type: String,
      required: true,
      match: timeRegExp,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    date: {
      type: String,
      required: true,
      match: dateRegExp,
    },
    category: {
      type: String,
      required: true,
      enum: ['todo', 'in-progress', 'done'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.pre('save', function (next) {
  if (this.start > this.end) {
    throw HttpError(400, 'End value must be greater than start value.');
  }
  checkDate(this.date);
  next();
});

taskSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.start > this._update.end) {
    throw HttpError(400, 'End value must be greater than start value.');
  }
  checkDate(this._update.date);
  next();
});

taskSchema.post('save', handleMongooseError);
const Task = model('task', taskSchema);

// ------------------------------JOI---------------------------------

const addSchema = Joi.object({
  title: Joi.string().max(250).required().messages({
    'any.required': 'Missing required title field',
    'string.base': 'Tittle field should be a string',
    'string.max': 'Tittle length should be less than or equal to 250 characters long',
  }),
  start: Joi.string().pattern(timeRegExp).required().messages({
    'string.base': 'Start field should be a string',
    'any.required': 'Missing required start field',
    'string.pattern.base': 'String field must be in format "09:00" (HH:MM 24-hour with leading 0)',
  }),
  end: Joi.string().pattern(timeRegExp).required().messages({
    'string.base': 'End field should be a string',
    'any.required': 'Missing required end field',
    'string.pattern.base': 'End field should be in format "09:30" (HH:MM 24-hour with leading 0)',
  }),
  priority: Joi.string().valid('low', 'medium', 'high').required().messages({
    'string.base': 'Priority field should be a string',
    'any.only': "Priority field should be only 'low', 'medium' or 'high'",
    'any.required': 'Missing required priority field',
  }),
  date: Joi.string().pattern(dateRegExp).required().messages({
    'string.base': 'Date field should be a string',
    'any.required': 'Missing required date field',
    'string.pattern.base': 'Date field should be in format "YYYY-MM-DD"',
  }),
  category: Joi.string().valid('todo', 'in-progress', 'done').required().messages({
    'string.base': 'Category field should be a string',
    'any.only': "Category field should be only 'todo', 'in-progress' or 'done'",
    'any.required': 'Missing required category field',
  }),
});

const schemas = {
  addSchema,
};

module.exports = {
  Task,
  schemas,
};
