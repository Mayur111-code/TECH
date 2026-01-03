const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries } = require('../controllers/inquiryController');

// 🚨 ITHE BADAL KARA: 'protect' chya jagi 'userProtect' lihila pahije
const { adminProtect, userProtect } = require('../middleware/auth'); 

router.route('/')
    // ✅ Ithe pan 'userProtect' vapara
    .post(userProtect, createInquiry) 
    
    .get(adminProtect, getInquiries);

module.exports = router;