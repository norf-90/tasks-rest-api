const { Task } = require("../../models/taskSchema");
const { ctrlWrapper } = require("../../helpers");

const getAllTasks = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Task.find({ owner }, "-createdAt -updatedAt").populate(
    "owner"
  );

  res.json(result);
};

module.exports = {
  getAllTasks: ctrlWrapper(getAllTasks),
};
