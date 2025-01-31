const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;