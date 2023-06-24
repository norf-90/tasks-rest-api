const { ctrlWrapper } = require('../../helpers');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/authSchema');

const emailVerify = async (req, res) => {
  console.log(req);
  console.log('in emailVerify');
  const verificationToken = req.params.verificationToken;
  console.log(verificationToken);
  const findUser = await User.findOne({ verificationToken });

  if (!findUser || findUser.verify) throw HttpError(404, 'User not found');
  await User.findByIdAndUpdate(findUser._id, {
    verificationToken: null,
    verify: true,
  });
  res.json({ message: 'Verification successful' });
};

module.exports = { emailVerify: ctrlWrapper(emailVerify) };
