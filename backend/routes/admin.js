const express = require('express');
const router = express.Router();
const { addWord, updateWord, deleteWord } = require('../controllers/adminController');
const { getAllWords } = require('../controllers/wordsController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

router.post('/words', auth, admin, addWord);
router.put('/words/:id', auth, admin, updateWord);
router.delete('/words/:id', auth, admin, deleteWord);
router.get('/words', auth, admin, getAllWords);

module.exports = router;