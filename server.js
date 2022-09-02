// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const eventsRouter = require('./controllers/events');
const methodOverride = require('method-override');

// Intialize App
const app = express();

// Configure Settings
require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
const db = mongoose.connection;

// Connect to MongoDB
mongoose.connect(DATABASE_URI);
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.log('MongoDB Error: ', err));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Homepage Redirect

// Mount Controllers
app.use('/events', eventsRouter);

// Listen
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
