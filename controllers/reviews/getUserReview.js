const { Review } = require("../../models/reviewSchema");
const { ctrlWrapper, HttpError } = require("../../helpers");

const getUserReview = async (req, res) => {
  const resultReview = await Review.findOne({ name: req.user.name });

  if (!resultReview) {
    throw HttpError(404, "Reviews not found");
  }

  res.json(resultReview);
};

module.exports = {
  getUserReview: ctrlWrapper(getUserReview),
};
