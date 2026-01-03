const express = require('express');
const router = express.Router();
const { 
    createService, 
    getServices, 
    updateService, // 👈 Ha import missing hota
    deleteService 
} = require('../controllers/serviceController');

// 🛡️ Middleware import
const { adminProtect } = require('../middleware/auth');

// 📍 Route: /api/services
router.route('/')
    .get(getServices) 
    .post(adminProtect, createService);

// 📍 Route: /api/services/:id
router.route('/:id')
    .put(adminProtect, updateService) // 👈 Edit sathi ha garjecha aahe
    .delete(adminProtect, deleteService);

module.exports = router;