const { Review } = require("../../models/reviewSchema");
const { ctrlWrapper, HttpError } = require("../../helpers");

const getUserReview = async (req, res) => {
  const { _id } = req.user;
  const owner = _id.toString();

  const resultReview = await Review.findOne({ owner: owner });

  if (!resultReview) {
    throw HttpError(404, "Reviews not found");
  }

  res.json(resultReview);
};

module.exports = {
  getUserReview: ctrlWrapper(getUserReview),
};
