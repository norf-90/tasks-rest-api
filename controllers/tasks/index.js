const { getAllTasks } = require("./getAllTasks");
const { getTasksForMonth } = require("./getTasksForMonth");
const { getTasksForDay } = require("./getTasksForDay");
const { getTaskById } = require("./getTaskById");
const { addTask } = require("./addTask");
const { updateTask } = require("./updateTask");
const { deleteTask } = require("./deleteTask");

module.exports = {
  getAllTasks,
  getTasksForMonth,
  getTasksForDay,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};
