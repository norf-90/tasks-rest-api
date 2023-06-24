const { Task } = require("../../models/taskSchema");
const { ctrlWrapper } = require("../../helpers");

const getTasksForDay = async (req, res) => {
  const { _id: owner } = req.user;
  const { day } = req.query; //YYYY-MM-DD
  const result = await Task.find(
    { owner, date: { $regex: `${day}` } },
    "-createdAt -updatedAt"
  ).populate("owner");

  res.json(result);
};

module.exports = {
  getTasksForDay: ctrlWrapper(getTasksForDay),
};
