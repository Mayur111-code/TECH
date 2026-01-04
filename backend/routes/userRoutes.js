const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/userAuthController'); 


router.post('/register', register);
router.post('/login', login);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { session: false }), 
    (req, res) => {
       
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        
       const frontendURL = `https://infina-tech.vercel.app/login-success?token=${token}&name=${encodeURIComponent(req.user.name)}&email=${req.user.email}&id=${req.user._id}`;
        
        res.redirect(frontendURL);
    }
);

module.exports = router;