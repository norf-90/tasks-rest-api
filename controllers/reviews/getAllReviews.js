const { Review } = require('../../models/reviewSchema');
// const { User } = require('../../models/authSchema');
const { ctrlWrapper, HttpError } = require('../../helpers');

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: 'owner',
    select: 'avatarURL',
  });

  if (!reviews) {
    throw HttpError(404, 'Reviews not found');
  }

  res.json(reviews);
};

module.exports = {
  getAllReviews: ctrlWrapper(getAllReviews),
};
