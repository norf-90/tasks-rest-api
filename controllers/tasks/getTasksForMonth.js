const { Task } = require('../../models/taskSchema');
const { ctrlWrapper } = require('../../helpers');

const getTasksForMonth = async (req, res) => {
  const { _id: owner } = req.user;
  const { month } = req.query; // YYYY-MM
  const result = await Task.find(
    { owner, date: { $regex: `${month}` } },
    '-createdAt -updatedAt'
  ).populate('owner');

  res.json(result);
};

module.exports = {
  getTasksForMonth: ctrlWrapper(getTasksForMonth),
};
