const Word = require('../models/Word');
const User = require('../models/User');

exports.getRandomWord = async (req, res) => {
  try {
    const { language } = req.query;
    const filter = language ? { language } : {};
    const words = await Word.find(filter);
    if (words.length === 0) {
      return res.status(404).json({ message: 'Bu dilde kelime bulunamadı.' });
    }
    const word = words[Math.floor(Math.random() * words.length)];
    // Hangi dil gösterilecek?
    let showLang;
    switch (language) {
      case 'english':
        showLang = 'english';
        break;
      default:
        showLang = 'german';
    }
    const value = word[showLang] || word.german || word.english || word.turkish;
    res.json({
      _id: word._id,
      showLang,
      value,
      exampleSentence: word.exampleSentence || word.example || ""
    });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};

exports.checkWord = async (req, res) => {
  try {
    const { wordId, answer } = req.body;
    const word = await Word.findById(wordId);
    // Kullanıcıyı bul
    let user = null;
    if (req.user._id) {
      user = await User.findById(req.user._id);
    } else if (req.user.id) {
      user = await User.findById(req.user.id);
    }
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    const userAnswer = answer.trim().toLowerCase();
    const turkishAnswers = word.turkish ? word.turkish.toLowerCase().split(',').map(s => s.trim()) : [];
    const germanAnswers = word.german ? word.german.toLowerCase().split(',').map(s => s.trim()) : [];
    const englishAnswers = word.english ? word.english.toLowerCase().split(',').map(s => s.trim()) : [];
    let correct = false;
    if (!userAnswer) {
      correct = false;
    } else if (word.language === 'german') {
      correct = turkishAnswers.some(ans => ans === userAnswer) || germanAnswers.some(ans => ans === userAnswer);
    } else if (word.language === 'english') {
      correct = turkishAnswers.some(ans => ans === userAnswer) || englishAnswers.some(ans => ans === userAnswer);
    } else {
      // fallback: eski davranış
      correct = turkishAnswers.some(ans => ans === userAnswer) || germanAnswers.some(ans => ans === userAnswer) || englishAnswers.some(ans => ans === userAnswer);
    }
    // Kullanıcı stats güncelle
    let statIndex = user.stats.findIndex(s => s.wordId.equals(wordId));
    if (statIndex === -1) {
      user.stats.push({
        wordId,
        correctCount: correct ? 1 : 0,
        wrongCount: correct ? 0 : 1,
        lastResult: correct ? 'correct' : 'wrong',
        lastDate: new Date()
      });
    } else {
      if (correct) {
        user.stats[statIndex].correctCount += 1;
        user.stats[statIndex].lastResult = 'correct';
      } else {
        user.stats[statIndex].wrongCount += 1;
        user.stats[statIndex].lastResult = 'wrong';
      }
      user.stats[statIndex].lastDate = new Date();
    }
    await user.save();
    res.json({ correct, word });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};

exports.getAllWords = async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};