const { Task } = require('../../models/taskSchema');
const { ctrlWrapper } = require('../../helpers');

const getTasksForDay = async (req, res) => {
  const { _id: owner } = req.user;
  const { year, month, day } = req.query; // YYYY-MM-DD
  const dayRegExp = new RegExp(`^${year}-${month}-${day}$`);
  console.log(dayRegExp);

  // const result = await Task.find(
  //   { owner, date: `${year}-${month}-${day}` },
  //   '-createdAt -updatedAt'
  // ).populate('owner', 'name');

  const result = await Task.find({ owner, date: dayRegExp }, '-createdAt -updatedAt').populate(
    'owner',
    'name'
  );
  res.json(result);
};

module.exports = {
  getTasksForDay: ctrlWrapper(getTasksForDay),
};
