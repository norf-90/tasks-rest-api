const { getAllReviews } = require("./getAllReviews");
const { getUserReview } = require("./getUserReview");
const { addUserReview } = require("./addUserReview");
const { editUserReview } = require("./editUserReview");
const { deleteUserReview } = require("./deleteUserReview");

module.exports = {
  getAllReviews,
  getUserReview,
  addUserReview,
  editUserReview,
  deleteUserReview,
};