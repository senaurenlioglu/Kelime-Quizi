const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  german: String,
  english: String,
  turkish: String,
  exampleSentence: String,
  language: { type: String, default: 'german' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Word', wordSchema);