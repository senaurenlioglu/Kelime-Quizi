const express = require('express');
const router = express.Router();
const { getRandomWord, checkWord } = require('../controllers/wordsController');
const auth = require('../middleware/authMiddleware');

router.get('/random', auth, getRandomWord);
router.post('/check', auth, checkWord);

module.exports = router;