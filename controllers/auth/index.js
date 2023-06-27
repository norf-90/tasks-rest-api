const { signup } = require('./signup');
const { signin } = require('./signin');
const { current } = require('./current');
const { logout } = require('./logout');
const { updateUserInfo } = require('./updateUserInfo');
const { emailVerify } = require('./emailVerify');
const { verify } = require('./verify');

module.exports = {
  signup,
  signin,
  current,
  logout,
  updateUserInfo,
  emailVerify,
  verify,
};
