const { User, schemas } = require("../../models/authSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ctrlWrapper } = require("../../helpers");
const { HttpError } = require("../../helpers");

const signin = async (req, res) => {
	const { error } = schemas.userSchemaSignin.validate(req.body);
	if (error) throw HttpError(400, error.message);
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) throw HttpError(404);
	const comparePassword = await bcrypt.compare(password, user.password);
	if (!comparePassword) throw HttpError(401, "Email or Password wrong");
	const payload = {
		id: user._id,
	};
	const token = await jwt.sign(payload, process.env.SECRET_KEY, {
		expiresIn: "24h",
	});
	await User.findByIdAndUpdate(user.id, { token });
	res.json({
		message: "Success Signed In",
		user,
	});
};

module.exports = { signin: ctrlWrapper(signin) };
