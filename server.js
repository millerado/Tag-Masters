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

// Homepage Redirect
app.get('/', (req, res) => {
  res.render('homepage.ejs');
});

// Mount Controllers
app.use('/events', eventsRouter);
app.use('/players', playersRouter);

app.put('/events/:id/addplayer', (req, res) => {
  Player.find(req.body, (err, foundPlayer) => {
    console.log('Find Error: ', err);
    if (foundPlayer.length === 0) {
      return res.redirect('/events/' + req.params.id);
    }
    console.log(foundPlayer);
    Event.findByIdAndUpdate(
      req.params.id,
      {
        $push: { players: foundPlayer[0].name },
      },
      (err2, unUpdatedEvent) => {
        console.log('Update Error: ', err2);
        res.redirect('/events/' + req.params.id);
      }
    );
  });
});

// Listen
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
