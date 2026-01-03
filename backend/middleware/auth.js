const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

// User sathi guard
exports.userProtect = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "User token missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid User Token" });
    }
};

// Admin sathi guard
exports.adminProtect = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Admin token missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id);
        if (!req.admin) return res.status(403).json({ message: "Not authorized as Admin" });
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid Admin Token" });
    }
};