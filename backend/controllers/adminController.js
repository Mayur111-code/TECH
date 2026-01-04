// const Admin = require('../models/Admin');
// const jwt = require('jsonwebtoken');

// exports.adminLogin = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const admin = await Admin.findOne({ email }).select('+password');
        
//         if (!admin || !(await admin.matchPassword(password))) {
//             return res.status(401).json({ success: false, message: "Invalid Admin Credentials" });
//         }

//         const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//         res.status(200).json({ success: true, token, admin: { id: admin._id, name: admin.name } });
//     } catch (err) {
//         res.status(500).json({ message: "Server Error" });
//     }
// };






const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

exports.adminRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ success: false, message: "Admin already exists" });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Admin Registered Successfully",
            admin: { id: admin._id, name: admin.name, email: admin.email }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

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