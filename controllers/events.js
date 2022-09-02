const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// INDUCES
// Index
router.get('/', (req, res) => {
  Event.find({}, (err, foundEvents) => {
    res.render('events/index.ejs', { events: foundEvents });
  });
});

// New
router.get('/new', (req, res) => {
  res.render('events/new.ejs');
});

// Delete
router.delete('/:id', (req, res) => {
  Event.findByIdAndDelete(req.params.id, (err, deletedEvent) => {
    res.redirect('/events');
  });
});

// Update

// Create
router.post('/', (req, res) => {
  Event.create(req.body, (err, createdEvent) => {
    console.log('Error: ', err);
    res.redirect('/events');
  });
});

// Edit
router.get('/:id/edit', (req, res) => {
  res.send('index');
});

// Show
router.get('/:id', (req, res) => {
  Event.findById(req.params.id, (err, foundEvent) => {
    res.render('events/show.ejs', { event: foundEvent });
  });
});

module.exports = router;
