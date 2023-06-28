const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../../controllers');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
// const { schemas } = require('../../models/review');

// get all reviews
router.get('/', reviewsCtrl.getAllReviews);

// get own reviews
router.get("/own", authenticate, reviewsCtrl.getUserReview);

// create review
router.post("/own", authenticate, validateBody(), reviewsCtrl.addUserReview);

// delete own review
router.delete('/own', authenticate, isValidId, reviewsCtrl.deleteUserReview);

// change own review
router.patch("/own", authenticate, isValidId, validateBody(), reviewsCtrl.editUserReview);

module.exports = router;
