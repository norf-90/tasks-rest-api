const { User } = require('../../models/authSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ctrlWrapper } = require('../../helpers');
const { HttpError } = require('../../helpers');

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw HttpError(404);
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw HttpError(401, 'Email or Password wrong');
  if (!user.verify) {
    throw HttpError(401, 'Email is not verified');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
  const newUser = await User.findByIdAndUpdate(user.id, { token });
  const { password: userPassword, token: prevToken, ...userInfo } = newUser._doc;

  res.json({
    message: 'Success Signed In',
    user: userInfo,
    token,
  });
};

module.exports = { signin: ctrlWrapper(signin) };
