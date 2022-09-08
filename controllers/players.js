const express = require('express');
const router = express.Router();
const Player = require('../models/player');

// Routes - INDUCES
// Index Route
router.get('/', (req, res) => {
  Player.find({}, (err, foundPlayers) => {
    res.render('players/index.ejs', { players: foundPlayers });
  });
});

// New Route
router.get('/new', (req, res) => {
  res.render('players/new.ejs');
});

// Delete Route

// Update Route
router.put('/update', (req, res) => {
  const ids = stringToArray(req.body.ids);
  const tags = stringToArray(req.body.tags);
  ids.forEach((id, i) => {
    Player.findByIdAndUpdate(
      id,
      { currentTag: tags[i] },
      (err, unUpdatedPlayer) => {}
    );
  });
  res.redirect('/events/' + req.body.eventId);
});

// Create Route
router.post('/', (req, res) => {
  Player.create(req.body, (err, createdPlayer) => {
    console.log('Error: ', err);
    res.redirect('/players');
  });
});

// Edit Route

// Show Route
module.exports = router;

function stringToArray(string) {
  let arr = [];
  let str = '';
  for (let i = 0; i < string.length + 1; i++) {
    if (string[i] === ',' || i === string.length) {
      arr.push(str);
      str = '';
    } else {
      str += string[i];
    }
  }
  return arr;
}
