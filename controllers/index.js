const { signup, signin, current, logout, updateUserInfo, emailVerify, verify } = require('./auth');

const {
  getAllTasks,
  getTasksForMonth,
  getTasksForDay,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
} = require('./tasks');

const { statistics } = require('./statistics');

module.exports = {
  signup,
  signin,
  current,
  logout,
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

  statistics,
};
