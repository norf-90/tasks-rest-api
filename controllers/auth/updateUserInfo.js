const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const { ctrlWrapper } = require('../../helpers');
const { User } = require('../../models/authSchema');

const updateUserInfo = async (req, res) => {
  const { _id } = req.user;
  const { path, originalname } = req.file;
  const password = req.body.password;

  const fileName = `${_id}${originalname}`;
  const resCloudinary = await cloudinary.uploader.upload(path, {
    public_id: fileName,
  });

  if (password) {
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.findByIdAndUpdate(
      _id,
      { ...req.body, avatarURL: resCloudinary.url },
      {
        new: true,
      }
    );
    const { token, ...userInfo } = result._doc;

    res.json({
      message: 'Success changed',
      user: { ...userInfo, password: hashPassword },
      token,
    });
  }
};

// const updateUserInfo = async (req, res) => {
// 	const { _id } = req.user;
// 	const { name, email, password } = req.body;
// 	const user = await User.findById({ _id });
// 	if (!user) throw HttpError(404, "User not found");
// 	if (name) user.name = name;
// 	if (email) user.email = email;
// 	if (password) {
// 		const hashPassword = await bcrypt.hash(password, 10);
// 		user.password = hashPassword;
// 	}
// 	await user.save();
// 	await User.findByIdAndUpdate(_id, {token: null});
// res.json({ message: "Success changed, sign in now with new data", data: { user } });
// };

module.exports = {
  updateUserInfo: ctrlWrapper(updateUserInfo),
};
