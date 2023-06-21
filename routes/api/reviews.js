const express = require('express');
const router = express.Router();
// const ctrl = require('../../controllers');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
// const { schemas } = require('../../models/review');

// get all reviews
router.get('/');

// get own reviews
router.get('/own', authenticate);

// create review
router.post('/own', authenticate, validateBody());

// delete own review
router.delete('/own', authenticate, isValidId);

// change own review
router.patch('/own', authenticate, isValidId, validateBody());

module.exports = router;
