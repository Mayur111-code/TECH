const express = require('express');
const router = express.Router();
const { 
    createBlog, 
    getBlogs, 
    getBlog, 
    updateBlog, 
    deleteBlog 
} = require('../controllers/blogController');

// 🛡️ Navin Middleware Import
const { adminProtect } = require('../middleware/auth');
const upload = require('../middleware/upload'); 

router.route('/')
    .get(getBlogs) // Sab dekh sakte hain (Public)
    .post(adminProtect, upload.single('image'), createBlog); // Fakt Admin + Image

router.route('/:id')
    .get(getBlog) // Single blog details (Public)
    .put(adminProtect, upload.single('image'), updateBlog) // Edit blog
    .delete(adminProtect, deleteBlog); // Delete blog

module.exports = router;