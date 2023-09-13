const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = data => {
  const email = { ...data, from: 'goose.track.crm@gmail.com' };
  sgMail
    .send(email)
    .then(resp => {
      console.log('All is good');
      console.log(resp);
      return true;
    })
    .catch(err => {
      console.log('Something goes wrong');
      console.log(err);
    });
};

module.exports = sendEmail;
