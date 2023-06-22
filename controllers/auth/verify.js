const { ctrlWrapper } = require('../../helpers');
const { HttpError, sendEmail } = require('../../helpers');
const { User } = require('../../models/authSchema');
const APP_HOST = process.env.APP_HOST;

const verify = async (req, res) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) throw HttpError(400, 'missing required field email');
    if (findUser.verificationToken === null)
        throw HttpError(400, 'Verification has already been passed');
        const verifyEmail = {
            to: email,
            subject: 'Verify your email',
            html: `
              <div style="background-color: #f5f5f5; padding: 20px;">
                <div style="background-color: white; padding: 20px; border-radius: 5px;">
                  <h2 style="text-align: center; color: #333;">Verify Your Email Address</h2>
                  <p style="text-align: center; color: #777;">
                    Thank you for signing up! To complete your registration, please click the button below to verify your email address.
                  </p>
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="${APP_HOST}/api/auth/verify/${findUser.verificationToken}"
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
    res.json({
        message: 'Verification email sent',
    });
};

module.exports = { verify: ctrlWrapper(verify) };