const { Task } = require('../../models/taskSchema');
const { ctrlWrapper, HttpError } = require('../../helpers');

const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  const { _id: owner } = req.user;
  const result = await Task.findById(taskId);
  if (!result) {
    throw HttpError(404, `Task id: ${taskId} not found`);
  }
  if (result.owner !== owner) {
    throw HttpError(400);
  }
  res.json(result);
};

module.exports = {
  getTaskById: ctrlWrapper(getTaskById),
};
