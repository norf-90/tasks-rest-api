const { ctrlWrapper } = require('../../helpers');

const current = async (req, res) => {
  const { token, ...userInfo } = req.user._doc;
  console.log(req.user);
  res.json({ user: { ...userInfo }, token });
};

module.exports = { current: ctrlWrapper(current) };
