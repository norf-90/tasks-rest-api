const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

//   title: 'max250 | required',
//   start: 'format "09:00" | required',
//   end: 'format "09:30" | end > start | required ',
//   priority: ' low medium high  | required',
//   date: 'format YYYY-MM-DD | required',
//   category: ' todo in-progres done | require',
//   owner: 'userId'

const timeRegExp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // HH:MM 24-hour with leading 0
const dateRegExp = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/; // exact match for yyyy-mm-dd

const taskShema = new Schema(
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
      //  end > start
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
      enum: ['todo', 'in-progres', 'done'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

taskShema.post('save', handleMongooseError);
const Task = model('task', taskShema);

module.exports = {
  Task,
};
