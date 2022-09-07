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
/*
Need to send something back
router.put('/:id', (req, res) => {
  console.log(req.body);
  Player.findByIdAndUpdate(req.params.id, req.body, (err, unUpdatedPlayer) => {
    console.log(req.params.id);
  });
});
*/

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
