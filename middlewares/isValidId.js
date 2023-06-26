const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { taskId, userId } = req.params;
  if (!isValidObjectId(taskId) && !isValidObjectId(userId)) {
    next(HttpError(400, `${taskId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
