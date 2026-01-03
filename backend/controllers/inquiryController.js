const Inquiry = require('../models/Inquiry');

// @desc    Create new inquiry (BY USER)
// @route   POST /api/inquiries
// @access  Private (User)
exports.createInquiry = async (req, res) => {
    try {
        const { subject, message } = req.body;

        const inquiry = await Inquiry.create({
            user: req.user._id, // 👈 He id 'protect' middleware mule yete
            subject,
            message
        });

        res.status(201).json({ success: true, data: inquiry });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all inquiries (FOR ADMIN)
// @route   GET /api/inquiries
// @access  Private (Admin Only)
exports.getInquiries = async (req, res) => {
    try {
        // Dashboard var admin la sagle messages dakhvne
        // populate('user') he User collection madhun name/email gheil
        const inquiries = await Inquiry.find()
            .populate('user', 'name email')
            .sort('-createdAt');

        res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};