const express = require('express');
const router = express.Router();
const { adminLogin, adminRegister } = require('../controllers/adminController');
const { adminProtect } = require('../middleware/auth');

router.post('/register', adminRegister); 
router.post('/login', adminLogin);

router.get('/dashboard-data', adminProtect, (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard", admin: req.admin });
});

module.exports = router;