const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const permitRoutes = require('./routes/permitRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/permits', permitRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;