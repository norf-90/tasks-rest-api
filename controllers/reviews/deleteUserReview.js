const { Review } = require('../../models/reviewSchema');
const { ctrlWrapper, HttpError } = require('../../helpers');

const deleteUserReview = async (req, res) => {
  const { _id: owner } = req.user;

  const resultReview = await Review.findOneAndRemove({ owner });

  if (!resultReview) {
    throw HttpError(404, 'Reviews not found');
  }

  res.json({ message: 'Reviews deleted' });
};

module.exports = {
  deleteUserReview: ctrlWrapper(deleteUserReview),
};
