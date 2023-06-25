const express = require('express');
const router = express.Router();
const tasksCtrl = require('../../controllers/tasks');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/taskSchema');

router.use(authenticate);

// get all tasks
router.get('/', tasksCtrl.getAllTasks);

// get tasks for month
router.get('/month', tasksCtrl.getTasksForMonth);

// get tasks for day
router.get('/day', tasksCtrl.getTasksForDay);

// get task by id
router.get('/:taskId', isValidId, tasksCtrl.getTaskById);

// post new task
router.post('/', validateBody(schemas.addSchema), tasksCtrl.addTask);

// update task
router.patch('/:taskId', isValidId, validateBody(schemas.addSchema), tasksCtrl.updateTask);

// delete task
router.delete('/:taskId', isValidId, tasksCtrl.deleteTask);

module.exports = router;
