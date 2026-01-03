const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email }).select('+password');
        
        if (!admin || !(await admin.matchPassword(password))) {
            return res.status(401).json({ success: false, message: "Invalid Admin Credentials" });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ success: true, token, admin: { id: admin._id, name: admin.name } });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};