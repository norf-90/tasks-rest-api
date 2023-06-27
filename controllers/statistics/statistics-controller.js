const { Task } = require("../../models/taskSchema");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const statistics = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Task.find({ owner });
  res.json(result);
};

module.exports = { statistics: ctrlWrapper(statistics) };
