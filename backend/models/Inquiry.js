const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // User model se link karenge
        required: true
    },
    subject: {
        type: String,
        required: [true, 'Please add a subject'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Please add a message']
    },
    status: {
        type: String,
        enum: ['Pending', 'In-Progress', 'Resolved'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Inquiry', InquirySchema);