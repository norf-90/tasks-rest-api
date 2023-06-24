const { Task } = require("../../models/taskSchema");
const { ctrlWrapper } = require("../../helpers");

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const result = await Task.findByIdAndDelete(taskId);
  if (!result) {
    throw HttpError(404, `Task id: ${taskId} not found`);
  }
  res.json({ message: "Task deleted", result });
};

module.exports = {
  deleteTask: ctrlWrapper(deleteTask),
};
