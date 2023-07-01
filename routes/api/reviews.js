const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../../controllers');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/reviewSchema');

router
  .get('/', reviewsCtrl.getAllReviews)
  .get('/own', authenticate, reviewsCtrl.getUserReview)
  .post('/own', authenticate, validateBody(schemas.addSchema), reviewsCtrl.addUserReview)
  .delete('/own', authenticate, reviewsCtrl.deleteUserReview)
  .patch('/own', authenticate, validateBody(schemas.addSchema), reviewsCtrl.editUserReview);

module.exports = router;
