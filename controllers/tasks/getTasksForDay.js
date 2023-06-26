const { Task } = require('../../models/taskSchema');
const { ctrlWrapper } = require('../../helpers');

const getTasksForDay = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query; // YYYY-MM-DD
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
