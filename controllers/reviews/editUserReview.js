const { Review } = require("../../models/reviewSchema");
const { ctrlWrapper, HttpError } = require("../../helpers");

const editUserReview = async (req, res) => {
  const { _id: owner } = req.user;

  const resultReview = await Review.findOneAndUpdate({ owner }, req.body, {
    new: true,
  });

  if (!resultReview) {
    throw HttpError(404, "Reviews not found");
  }

  res.json(resultReview);
};

module.exports = {
  editUserReview: ctrlWrapper(editUserReview),
};
