const {
  signup,
  signin,
  current,
  logout,
  updateAvatar,
  updateUserInfo,
  emailVerify,
  verify,
} = require("./auth");
const { statistics } = require("./statistics/statistics-controller");

module.exports = {
  signup,
  signin,
  current,
  logout,
  updateAvatar,
  updateUserInfo,
  emailVerify,
  verify,
  statistics,
};
