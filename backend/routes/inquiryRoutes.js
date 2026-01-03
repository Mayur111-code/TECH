const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries } = require('../controllers/inquiryController');


const { adminProtect, userProtect } = require('../middleware/auth'); 

router.route('/')
  
    .post(userProtect, createInquiry) 
    
    .get(adminProtect, getInquiries);

module.exports = router;