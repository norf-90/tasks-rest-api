const HttpError = require('./HttpError');

const checkDate = date => {
  const [year, month, day] = date.split('-');
  const result = new Date(year, month - 1, day);
  const isValidDate =
    result.getFullYear().toString() === year &&
    result.getMonth() === month - 1 &&
    result.getDate() === Number(day);
  if (!isValidDate) throw HttpError(400, 'Nonexistent date');
};

module.exports = checkDate;
