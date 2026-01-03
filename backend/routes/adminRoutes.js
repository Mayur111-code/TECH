const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminController');
const { adminProtect } = require('../middleware/auth');

router.post('/login', adminLogin);

// Dashboard stats example
router.get('/dashboard-data', adminProtect, (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard", admin: req.admin });
});

module.exports = router;