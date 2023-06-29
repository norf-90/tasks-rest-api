const { Review } = require("../../models/reviewSchema");
const { ctrlWrapper, HttpError } = require("../../helpers");

const addUserReview = async (req, res) => {
  const existingReview = await Review.findOne({ name: req.user.name });

  if (existingReview) {
    throw HttpError(404, "The review exists");
  }
  
  const resultReview = await Review.create(req.body);
  res.status(201).json(resultReview);
};

module.exports = {
  addUserReview: ctrlWrapper(addUserReview),
};
