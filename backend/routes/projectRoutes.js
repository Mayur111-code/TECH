const express = require('express');
const router = express.Router();
const { 
    createProject, 
    getProjects, 
    updateProject, // 👈 Ha pan import kara
    deleteProject  // 👈 Ha pan import kara
} = require('../controllers/projectController');
const upload = require('../middleware/upload');
const { adminProtect } = require('../middleware/auth');

// 📍 Route: /api/projects
router.route('/')
    .get(getProjects) 
    .post(adminProtect, upload.single('image'), createProject);

// 📍 Route: /api/projects/:id
router.route('/:id')
    .put(adminProtect, upload.single('image'), updateProject) // Edit sathi
    .delete(adminProtect, deleteProject); // Delete sathi

module.exports = router;