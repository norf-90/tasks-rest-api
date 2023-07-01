const { Task } = require('../../models/taskSchema');
const { ctrlWrapper, HttpError } = require('../../helpers');

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const { _id: owner } = req.user;
  const result = await Task.findOneAndDelete({ _id: taskId, owner }).populate('owner', 'name');
  if (!result) {
    throw HttpError(404, `Task id: ${taskId} not found`);
  }
  res.json({ message: 'Task deleted', task: result });
};

module.exports = {
  deleteTask: ctrlWrapper(deleteTask),
};
