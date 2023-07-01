const { Task } = require('../../models/taskSchema');
const { ctrlWrapper, HttpError, checkDate } = require('../../helpers');

const getTasksForDay = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query; // YYYY-MM-DD

  checkDate(date);
  const dateRegExp = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!dateRegExp.test(date)) throw HttpError(400, 'Date field should be in format "YYYY-MM-DD"');

  const year = date.split('-')[0];
  const month = date.split('-')[1];
  const day = date.split('-')[2];

  const result = await Task.find(
    { owner, date: { $regex: `${year}-${month}-${day}` } },
    '-createdAt -updatedAt'
  ).populate('owner', 'name');
  res.json(result);
};

module.exports = {
  getTasksForDay: ctrlWrapper(getTasksForDay),
};
