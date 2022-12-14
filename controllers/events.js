const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const Player = require('../models/player');

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
router.put('/:id', (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body, (err, unUpdatedEvent) => {
    res.redirect('/events/' + req.params.id);
  });
});

router.put('/:id/score', (req, res) => {
  Event.findByIdAndUpdate(
    req.params.id,
    { $push: { scores: req.body } },
    (err, unUpdatedEvent) => {
      res.redirect('/events/' + req.params.id);
    }
  );
});

router.put('/:id/addplayer', (req, res) => {
  Player.find(req.body, (err, foundPlayer) => {
    console.log('Find Error: ', err);
    if (foundPlayer.length === 0) {
      return res.redirect('/events/' + req.params.id);
    }
    Event.findByIdAndUpdate(
      req.params.id,
      {
        $push: { players: foundPlayer[0] },
      },
      (err2, unUpdatedEvent) => {
        console.log('Update Error: ', err2);
        res.redirect('/events/' + req.params.id);
      }
    );
  });
});

router.put('/:id/update', (req, res) => {
  const ids = stringToArray(req.body.ids);
  const newTags = stringToArray(req.body.newTags);
  newTags.forEach((tag, i) => {
    Event.findByIdAndUpdate(
      req.params.id,
      {
        $push: { newTags: { _id: ids[i], tag: tag } },
      },
      (err, unUpdatedEvent) => {}
    );
  });
  res.redirect('/events/' + req.params.id);
});

// Create
router.post('/', (req, res) => {
  Event.create(req.body, (err, createdEvent) => {
    console.log('Error: ', err);
    res.redirect('/events');
  });
});

// Edit
router.get('/:id/edit', (req, res) => {
  Event.findById(req.params.id, (err, foundEvent) => {
    res.render('events/edit.ejs', { event: foundEvent });
  });
});

// Show
router.get('/:id', (req, res) => {
  Event.findById(req.params.id, (err, foundEvent) => {
    res.render('events/show.ejs', { event: foundEvent });
  });
});

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
