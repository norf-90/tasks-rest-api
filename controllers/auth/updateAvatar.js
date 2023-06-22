const cloudinary = require("cloudinary").v2;
const { User } = require("../../models/authSchema");
const fs = require("fs").promises;
const { ctrlWrapper } = require("../../helpers");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path, originalname } = req.file;
	const fileName = `${_id}${originalname}`;
	const resCloudinary = await cloudinary.uploader.upload(path, {
		public_id: fileName,
	});
	await User.findByIdAndUpdate(_id, { avatarUrl: resCloudinary.url });
	await fs.unlink(path);
	res.json({ avatarUrl: resCloudinary.url });
};

module.exports = {
	updateAvatar: ctrlWrapper(updateAvatar),
};
