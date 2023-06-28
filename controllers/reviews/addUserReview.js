const { Review } = require("../../models/reviewSchema");
const { ctrlWrapper } = require("../../helpers");

const addUserReview = async (req, res) => {};

module.exports = {
  addUserReview: ctrlWrapper(addUserReview),
};
