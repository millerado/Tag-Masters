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

module.exports = router;
