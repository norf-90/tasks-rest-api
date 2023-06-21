const express = require('express');

const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

// auth/signup
router.post('/register', validateBody(schemas.registerSchema));

// verify email
// router.get('/verify/{verificationToken}');

// resend verification email
// router.post('/verify', validateBody(schemas.userEmailSchema));

// login/signin
router.post('/login', validateBody(schemas.loginSchema));

// current
router.get('/current', authenticate);

// logout
router.post('/logout', authenticate);

// update user
router.put('/{id}', authenticate, upload.single('avatar'));

module.exports = router;
