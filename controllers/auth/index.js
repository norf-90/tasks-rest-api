const { signup } = require("./signup");
const { signin } = require("./signin");
const { current } = require("./current");
const { logout } = require("./logout");
const { updateAvatar } = require("./updateAvatar");
const { updateUserInfo } = require("./updateUserInfo");
const { emailVerify } = require("./emailVerify");
const { verify } = require("./verify");

module.exports = {
  signup,
  signin,
  current,
  logout,
  updateAvatar,
  updateUserInfo,
  emailVerify,
  verify,
};
