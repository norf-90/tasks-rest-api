const { Task } = require("../../models/taskSchema");
const { ctrlWrapper } = require("../../helpers");

const getTasksForMonth = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query; // YYYY-MM-DD
  const year = date.split("-")[0];
  const month = date.split("-")[1];

  const result = await Task.find(
    { owner, date: { $regex: `${year}-${month}` } },
    "-createdAt -updatedAt"
  ).populate("owner", "name");
  res.json(result);
};

module.exports = {
  getTasksForMonth: ctrlWrapper(getTasksForMonth),
};
