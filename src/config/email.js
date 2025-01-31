const nodemailer = require('nodemailer');

const createTransporter = (config) => {
  return nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.pass
    }
  });
};

module.exports = createTransporter;