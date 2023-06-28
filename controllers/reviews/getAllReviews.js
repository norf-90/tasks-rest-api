const { Review } = require("../../models/reviewSchema");
const { ctrlWrapper } = require("../../helpers");

const getAllReviews = async (req, res) => {
  const result = await Review.find({});
  console.log(result);
  res.json(result);
};

module.exports = {
  getAllReviews: ctrlWrapper(getAllReviews),
};
