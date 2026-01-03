const express = require('express');
const router = express.Router();
const { 
    createBlog, 
    getBlogs, 
    getBlog, 
    updateBlog, 
    deleteBlog 
} = require('../controllers/blogController');


const { adminProtect } = require('../middleware/auth');
const upload = require('../middleware/upload'); 

router.route('/')
    .get(getBlogs) 
    .post(adminProtect, upload.single('image'), createBlog); 

router.route('/:id')
    .get(getBlog) 
    .put(adminProtect, upload.single('image'), updateBlog) 
    .delete(adminProtect, deleteBlog); 

module.exports = router;