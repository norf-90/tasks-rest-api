const express = require('express');
const router = express.Router();

const { authenticate, upload, validateBody } = require('../../middlewares');
const userCtrl = require('../../controllers');
const { schemas } = require('../../models/authSchema');

router
  .post('/signup', validateBody(schemas.userSchemaSignup), userCtrl.signup)
  .post('/signin', validateBody(schemas.loginSchema), userCtrl.signin)
  .get('/current', authenticate, userCtrl.current)
  .post('/logout', authenticate, userCtrl.logout)
  .patch(
    '/updateUser',
    authenticate,
    upload.single('avatar'),
    validateBody(schemas.userUpdateSchema),
    userCtrl.updateUserInfo
  )
  .get('/verify/:verificationToken', userCtrl.emailVerify)
  .post('/verify', userCtrl.verify);

module.exports = router;
