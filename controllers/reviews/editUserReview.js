const { Review } = require("../../models/reviewSchema");
const { ctrlWrapper } = require("../../helpers");

const editUserReview = async (req, res) => {};

module.exports = {
  editUserReview: ctrlWrapper(editUserReview),
};
