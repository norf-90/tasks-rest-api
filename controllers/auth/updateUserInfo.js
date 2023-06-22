const { User } = require("../../models/authSchema");
const bcrypt = require("bcrypt");
const { ctrlWrapper } = require("../../helpers");
const { HttpError } = require("../../helpers");


const updateUserInfo = async (req, res) => {
	const { _id } = req.user;
	const { name, email, password } = req.body;
	const user = await User.findById({ _id });
	if (!user) throw HttpError(404, "User not found");
	if (name) user.name = name;
	if (email) user.email = email;
	if (password) {
		const hashPassword = await bcrypt.hash(password, 10);
		user.password = hashPassword;
	}
	await user.save();
	user.token = "";
	res.json({ message: "Success changed, sign in now with new data", data: { user } });
};

module.exports = {
	updateUserInfo: ctrlWrapper(updateUserInfo),
};
