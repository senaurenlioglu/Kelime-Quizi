const Word = require('../models/Word');

exports.addWord = async (req, res) => {
  try {
    const { german, english, turkish, exampleSentence, language } = req.body;
    
    const word = new Word({ german, english, turkish, exampleSentence, language, createdBy: req.user.id });
    await word.save();
    res.json(word);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};

exports.updateWord = async (req, res) => {
  try {
    const { id } = req.params;
    const { german, english, turkish, exampleSentence, language } = req.body;
    const word = await Word.findByIdAndUpdate(id, { german, english, turkish, exampleSentence, language }, { new: true });
    res.json(word);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};

exports.deleteWord = async (req, res) => {
  try {
    const { id } = req.params;
    await Word.findByIdAndDelete(id);
    res.json({ message: 'Word deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası', error: err.message });
  }
};