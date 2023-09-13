const nodemailer = require('nodemailer');
const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 2525, // 25, 2525, 465
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmailViaNodemailer = async data => {
  const email = {
    from: UKR_NET_EMAIL,
    ...data,
  };
  transport
    .sendMail(email)
    .then(() => console.log('Email is sended'))
    .catch(err => console.log(err));
};

module.exports = sendEmailViaNodemailer;
