const { Review } = require("../../models/reviewSchema");
const { ctrlWrapper } = require("../../helpers");

const getUserReview = async (req, res) => {};

module.exports = {
  getUserReview: ctrlWrapper(getUserReview),
};
