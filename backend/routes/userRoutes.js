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
        
        res.redirect(`https://infina-tech.vercel.applogin-success?token=${token}&name=${req.user.name}&email=${req.user.email}&id=${req.user._id}`);
    }
);

module.exports = router;