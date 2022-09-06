// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const eventsRouter = require('./controllers/events');
const playersRouter = require('./controllers/players');
const methodOverride = require('method-override');
const Player = require('./models/player');
const Event = require('./models/event');

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
app.use(express.static('public'));

// Homepage Redirect
app.get('/', (req, res) => {
  res.render('homepage.ejs');
});

// Mount Controllers
app.use('/events', eventsRouter);
app.use('/players', playersRouter);

// Listen
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
