const { Task } = require('../../models/taskSchema');
const { ctrlWrapper, HttpError } = require('../../helpers');

const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  const { _id: owner } = req.user;
  const result = await Task.findOne({ _id: taskId, owner }, '-createdAt -updatedAt').populate(
    'owner',
    'name'
  );
  if (!result) {
    throw HttpError(404, `Task id: ${taskId} not found`);
  }

  res.json(result);
};

module.exports = {
  getTaskById: ctrlWrapper(getTaskById),
};
