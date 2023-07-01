const { Task } = require('../../models/taskSchema');
const { ctrlWrapper, HttpError } = require('../../helpers');

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const result = await Task.findByIdAndUpdate(taskId, req.body, {
    new: true,
  }).populate('owner', 'name');
  if (!result) {
    throw HttpError(404, `Task id: ${taskId} not found`);
  }
  res.json({ message: 'Task updated', task: result });
};

module.exports = {
  updateTask: ctrlWrapper(updateTask),
};
