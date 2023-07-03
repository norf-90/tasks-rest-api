const { Review } = require('../../models/reviewSchema');
const { ctrlWrapper, HttpError } = require('../../helpers');

const addUserReview = async (req, res) => {
  const { _id: owner } = req.user;
  const existingReview = await Review.findOne({ owner: owner });

  if (existingReview) {
    throw HttpError(409, 'The review exists');
  }

  const resultReview = await Review.create({ ...req.body, owner });
  res.status(201).json(resultReview);
};

module.exports = {
  addUserReview: ctrlWrapper(addUserReview),
};
