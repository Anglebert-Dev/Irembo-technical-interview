require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/permits'
  },
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  nodeEnv: process.env.NODE_ENV || 'development'
};