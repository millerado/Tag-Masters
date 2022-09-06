const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: { type: String, required: true },
  currentTag: { type: Number, default: 1000 },
});

module.exports = mongoose.model('Player', playerSchema);
