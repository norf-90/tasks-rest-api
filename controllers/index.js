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

const {
  getAllReviews,
  getUserReview,
  addUserReview,
  editUserReview,
  deleteUserReview,
} = require("./reviews");

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


  getAllReviews,
  getUserReview,
  addUserReview,
  editUserReview,
  deleteUserReview,

  statistics,
};
