const bcrypt = require('bcrypt');
const { HttpError, sendEmail } = require('../../helpers');
const { User } = require('../../models/authSchema');
const { ctrlWrapper } = require('../../helpers');
const { AvatarGenerator } = require('random-avatar-generator');
const { v4: uuidv4 } = require('uuid');
const generator = new AvatarGenerator();

const APP_HOST = process.env.APP_HOST;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, 'Email already in use');
  const hashPassword = await bcrypt.hash(password, 10);
  const avatar = await generator.generateRandomAvatar();
  const verificationToken = uuidv4();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatar,
    verificationToken,
  });
  const { password: pass, ...newUserInfo } = newUser;
  const verifyEmail = {
    from: process.env.UKR_NET_EMAIL,
    to: email,
    subject: 'Verify email',
    html: `
		<div style="background-color: #f5f5f5; padding: 20px;">
		  <div style="background-color: white; padding: 20px; border-radius: 5px;">
			<h2 style="text-align: center; color: #333;">Verify Your Email Address</h2>
			<p style="text-align: center; color: #777;">
			  Thank you for signing up! To complete your registration, please click the button below to verify your email address.
			</p>
			<div style="text-align: center; margin-top: 30px;">
				<a href="${APP_HOST}/register/${newUser.verificationToken}"
				style="display: inline-block; padding: 12px 24px; background-color: #4caf50; color: white; text-decoration: none; border-radius: 5px;">
				Verify Email
			  </a>
			</div>
			<p style="text-align: center; color: #777; margin-top: 30px;">
			  If you did not sign up for an account, you can safely ignore this email.
			</p>
		  </div>
		</div>
	  `,
  };
  await sendEmail(verifyEmail);

  res.status(201).json({
    message: 'User created successfully',
    newUser: newUserInfo._doc,
  });
};

module.exports = { signup: ctrlWrapper(signup) };
