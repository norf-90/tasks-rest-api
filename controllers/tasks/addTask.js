const { Task } = require('../../models/taskSchema');
const { ctrlWrapper } = require('../../helpers');

const addTask = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Task.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  addTask: ctrlWrapper(addTask),
};
