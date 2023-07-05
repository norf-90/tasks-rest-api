const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const { ctrlWrapper } = require('../../helpers');
const { User } = require('../../models/authSchema');

const updateUserInfo = async (req, res) => {
  const { _id } = req.user;
  const { name, email, password, skype, birthday, phone } = req.body;
  const user = await User.findById({ _id });
  if (name) user.name = name;
  if (email) user.email = email;
  if (password) {
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
  }
  if (skype) user.skype = skype;
  if (birthday) user.birthday = birthday;
  if (phone) user.phone = phone;
  if (req.file) {
    const { path, originalname } = req.file;
    const fileName = `${_id}${originalname}`;
    const result = await cloudinary.uploader.upload(path, {
      public_id: fileName,
    });
    user.avatarURL = result.url;
  }
  await user.save('-passord');
  const { password: pass, ...userInfo } = user._doc;

  res.json({
    message: 'Success changed',
    user: userInfo,
  });
};

module.exports = {
  updateUserInfo: ctrlWrapper(updateUserInfo),
};
