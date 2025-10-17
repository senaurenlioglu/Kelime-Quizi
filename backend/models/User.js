const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  wordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Word' },
  correctCount: { type: Number, default: 0 },
  wrongCount: { type: Number, default: 0 },
  lastResult: { type: String, enum: ['correct', 'wrong', ''], default: '' },
  lastDate: { type: Date }
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  stats: [statSchema]
});

module.exports = mongoose.model('User', userSchema);