const express = require("express");
const router = express.Router();

const { authenticate, upload } = require("../../middlewares");
const userCtrl = require('../../controllers')

router
	.post("/signup", userCtrl.signup)
	.post("/signin", userCtrl.signin)
	.get("/current", authenticate, userCtrl.current)
	.post("/logout", authenticate, userCtrl.logout)
	.put('/avatar', authenticate, upload.single('avatar'), userCtrl.updateAvatar)
	.patch('/updateUser', authenticate, userCtrl.updateUserInfo)
	.post('/verify', userCtrl.verify)

module.exports = router;
