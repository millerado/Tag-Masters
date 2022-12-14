const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    course: { type: String, required: true },
    players: { type: Array },
    scores: { type: Array, default: [] },
    newTags: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
