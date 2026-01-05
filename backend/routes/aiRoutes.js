// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../controllers/aiController');
const { userProtect } = require('../middleware/auth');

// Sarvansathi open thevayla (Public)
router.post('/chat', userProtect, chatWithAI);

module.exports = router;