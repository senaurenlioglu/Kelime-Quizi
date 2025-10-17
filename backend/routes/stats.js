const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/statsController');
const auth = require('../middleware/authMiddleware');

router.get('/dashboard', auth, getDashboard);

module.exports = router;