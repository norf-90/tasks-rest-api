const { Task } = require('../../models/taskSchema');
const { ctrlWrapper, HttpError } = require('../../helpers');

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const result = await Task.findByIdAndDelete(taskId).populate('owner', 'name');
  if (!result) {
    throw HttpError(404, `Task id: ${taskId} not found`);
  }
  res.json({ message: 'Task deleted', result });
};

module.exports = {
  deleteTask: ctrlWrapper(deleteTask),
};
