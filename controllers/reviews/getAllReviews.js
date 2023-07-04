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

  // const updatedReviews = await Promise.all(
  //   resultReviews.map(async item => {
  //     const { owner } = item;

  //     const resultUserAvatarUrl = await User.findOne({ _id: owner }, 'avatarURL');
  //     if (resultUserAvatarUrl) {
  //       item = { ...item._doc, avatarURL: resultUserAvatarUrl.avatarURL };
  //     }
  //     return item;
  //   })
  // );
  res.json(reviews);
};

module.exports = {
  getAllReviews: ctrlWrapper(getAllReviews),
};
