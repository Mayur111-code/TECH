const Blog = require('../models/Blog');

// @desc    Create new blog
exports.createBlog = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path; 
        }
        
        // 🚨 CRITICAL CHANGE: 
        // Apan Admin separate kela aahe, mhanun 'req.user' chya jagi 'req.admin' vapra
        // Ani 'authorModel' Blog schema madhe 'Admin' asava lagel jar fakt admin blog lihinar asel tar.
        req.body.author = req.admin.id; 

        const blog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: blog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all blogs (He barobar aahe)
exports.getBlogs = async (req, res) => {
    try {
        // 'author' populate kartaana check kara ki Blog model madhe 'ref' konta aahe (User ki Admin?)
        const blogs = await Blog.find().populate('author', 'name email').sort('-createdAt');
        res.status(200).json({ success: true, count: blogs.length, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single blog
exports.getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email');
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update blog
exports.updateBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        if (req.file) {
            req.body.image = req.file.path;
        }

        blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        
        await blog.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};