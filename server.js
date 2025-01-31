const app = require('./src/app');
const config = require('./src/config');
const connectDB = require('./src/config/database');

const startServer = async () => {
  try {
    // Check if config and mongodb uri exists
    if (!config || !config.mongodb || !config.mongodb.uri) {
      throw new Error('MongoDB URI is not defined in configuration');
    }

    // Connect to database
    await connectDB(config.mongodb.uri);
    
    // Start server
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();