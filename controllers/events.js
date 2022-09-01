const express = require('express');
const router = express.Router();
const Book = require('../models/event');

// INDUCES
// Index
router.get('/', (req, res) => {
  res.send('index');
});

// New
router.get('/new', (req, res) => {
  res.send('index');
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
