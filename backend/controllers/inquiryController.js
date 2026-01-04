const Inquiry = require('../models/Inquiry');


exports.createInquiry = async (req, res) => {
    try {
        const { subject, message } = req.body; 

        const inquiry = await Inquiry.create({
            user: req.user._id, 
            subject,  
            message
           
        });

        res.status(201).json({ success: true, data: inquiry });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};



exports.getInquiries = async (req, res) => {
    try {
        
        const inquiries = await Inquiry.find()
            .populate('user', 'name email')
            .sort('-createdAt');

        res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};