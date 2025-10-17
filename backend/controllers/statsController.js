const User = require('../models/User');
const Word = require('../models/Word');

exports.getDashboard = async (req, res) => {
  const user = await User.findById(req.user.id).populate('stats.wordId');
  if (!user) {
    return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  }
  // Aynı wordId için sadece en güncel statı al
  const statsMap = new Map();
  user.stats
    .filter(s => s.wordId)
    .forEach(s => {
      const id = s.wordId._id ? s.wordId._id.toString() : s.wordId.toString();
      if (!statsMap.has(id) || (statsMap.get(id).lastDate < s.lastDate)) {
        statsMap.set(id, s);
      }
    });
  const stats = Array.from(statsMap.values()).map(s => ({
    german: s.wordId.german,
    english: s.wordId.english,
    turkish: s.wordId.turkish,
    correct: s.correctCount,
    wrong: s.wrongCount,
    lastResult: String(s.lastResult),
    lastDate: s.lastDate,
    language: s.wordId.language
  }));
  console.log('DASHBOARD STATS:', stats);
  res.json(stats);
};