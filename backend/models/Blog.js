const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    image: { type: String, default: 'no-photo.jpg' }, // Cloudinary URL yahan aayega
    category: { type: String, enum: ['Tech', 'Business', 'Design'], default: 'Tech' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);