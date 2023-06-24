const { ctrlWrapper } = require('../../helpers');

const current = async (req, res) => {
  const { token, ...userInfo } = req.user._doc;
  res.json({ user: { ...userInfo }, token });
};

module.exports = { current: ctrlWrapper(current) };
