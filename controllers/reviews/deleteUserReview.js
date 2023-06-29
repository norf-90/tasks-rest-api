const { Review } = require("../../models/reviewSchema");
const { ctrlWrapper } = require("../../helpers");

const deleteUserReview = async (req, res) => {};

module.exports = {
  deleteUserReview: ctrlWrapper(deleteUserReview),
};
