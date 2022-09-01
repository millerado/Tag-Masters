const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// INDUCES
// Index
router.get('/', (req, res) => {
  Event.find({}, (err, foundEvents) => {
    res.render('eventIndex.ejs', { events: foundEvents });
  });
});

// New
router.get('/new', (req, res) => {
  res.render('newEvent.ejs');
});

// Delete

// Update

// Create

// Edit
router.get('/:id/edit', (req, res) => {
  res.send('index');
});

// Show
router.get('/:id', (req, res) => {
  res.send('index');
});

module.exports = router;
