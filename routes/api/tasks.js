const express = require('express');
const router = express.Router();
const tasksCtrl = require('../../controllers');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/taskSchema');

router.use(authenticate);

router
  .get('/', tasksCtrl.getAllTasks)
  .get('/month', tasksCtrl.getTasksForMonth)
  .get('/day', tasksCtrl.getTasksForDay)
  .get('/:taskId', isValidId, tasksCtrl.getTaskById)
  .post('/', validateBody(schemas.addSchema), tasksCtrl.addTask)
  .patch('/:taskId', isValidId, validateBody(schemas.addSchema), tasksCtrl.updateTask)
  .delete('/:taskId', isValidId, tasksCtrl.deleteTask);

module.exports = router;
