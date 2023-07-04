const { HttpError, checkDate } = require('../helpers');

const validateDate = async (req, res, next) => {
  const { date } = req.query; // YYYY-MM-DD

  const dateRegExp = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!date.match(dateRegExp)) throw HttpError(400, 'Date should be in format YYYY-MM-DD');
  checkDate(date);

  next();
};

module.exports = { validateDate };
