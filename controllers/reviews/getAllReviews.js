const { Review } = require("../../models/reviewSchema");
const { User } = require("../../models/authSchema");
const { ctrlWrapper, HttpError } = require("../../helpers");

const getAllReviews = async (req, res) => {
  const resultReviews = await Review.find({});

  if (!resultReviews) {
    throw HttpError(404, "Reviews not found");
  }

  const updatedReviews = await Promise.all(
    resultReviews.map(async (item) => {
      const resultUserAvatarUrl = await User.findOne(
        { name: item.name },
        "avatarURL"
      );
      if (resultUserAvatarUrl) {
        item = { ...item._doc, avatarURL: resultUserAvatarUrl.avatarURL };
      }
      return item;
    })
  );
  res.json(updatedReviews);
};

module.exports = {
  getAllReviews: ctrlWrapper(getAllReviews),
};
