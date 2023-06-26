const {
  signup,
  signin,
  current,
  logout,
  updateAvatar,
  updateUserInfo,
  emailVerify,
  verify,
} = require('./auth');

const {
  getAllTasks,
  getTasksForMonth,
  getTasksForDay,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
} = require('./tasks');

module.exports = {
  signup,
  signin,
  current,
  logout,
  updateAvatar,
  updateUserInfo,
  emailVerify,
  verify,

  getAllTasks,
  getTasksForMonth,
  getTasksForDay,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};
