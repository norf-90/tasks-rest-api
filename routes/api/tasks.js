const express = require('express');
const router = express.Router();
// const ctrl = require('../../controllers');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
// const { schemas } = require('../../models/task');

// get tasks on month
router.get('/', authenticate);

// post new task
router.post('/', authenticate, validateBody());

// delete task
router.delete('/{id}', authenticate, isValidId);

// change task
router.patch('/{id}', authenticate, isValidId, validateBody());

module.exports = router;

