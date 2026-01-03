const Blog = require('../models/Blog');


exports.createBlog = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path; 
        }
        
        
        req.body.author = req.admin.id; 

        const blog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: blog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getBlogs = async (req, res) => {
    try {
       
        const blogs = await Blog.find().populate('author', 'name email').sort('-createdAt');
        res.status(200).json({ success: true, count: blogs.length, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name email');
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

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